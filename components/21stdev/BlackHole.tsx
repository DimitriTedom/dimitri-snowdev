'use client'

import * as React from 'react'

export interface BlackHoleProps {
  height?: string
  accentColor?: string
  particles?: number
  interactive?: boolean
  className?: string
}

function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace('#', '')
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('')
  }
  const num = parseInt(clean, 16)
  if (isNaN(num)) return [0.37, 0.09, 0.92] // fallback #5e17eb
  const r = ((num >> 16) & 255) / 255
  const g = ((num >> 8) & 255) / 255
  const b = (num & 255) / 255
  return [r, g, b]
}

const HORIZON = 4
const CORE_QUAD = 5.6

const DISK_VERT = `#version 300 es
precision highp float;

in vec2 aCorner;
in vec3 aSeed;

uniform mat4 uProj;
uniform mat4 uView;
uniform vec3 uCam;
uniform float uTime;
uniform float uMorph;
uniform float uCompression;
uniform float uIntensity;
uniform float uOrbit;
uniform vec3 uAccent;

out vec3 vColor;
out float vAlpha;
out vec2 vCorner;

float turbulence(vec2 p, float t) {
  return sin(p.x * 0.9 + t) * 0.5
       + sin(p.y * 1.1 - t * 0.8) * 0.3
       + sin((p.x + p.y) * 0.7 + t * 1.3) * 0.2;
}

void main() {
  float r0 = aSeed.x;
  float r = r0 * uCompression;
  float angle = aSeed.y + uTime * (1.5 / sqrt(r0)) * uOrbit;

  vec3 pos = vec3(cos(angle) * r, aSeed.z, sin(angle) * r);
  pos.y += turbulence(pos.xz * 0.08, uTime * 0.3) * uMorph * 4.0;

  vec3 viewDir = normalize(uCam - pos);
  vec3 tangent = vec3(-sin(angle), 0.0, cos(angle));

  float doppler = dot(tangent, viewDir);

  vec3 hot = vec3(1.0, 0.98, 0.95);
  vec3 warm = uAccent * 1.35;
  vec3 cool = uAccent * 0.45;
  
  vec3 color = mix(cool, warm, smoothstep(45.0, 12.0, r));
  color = mix(color, hot, smoothstep(10.0, 4.0, r));

  vColor = color * (1.3 + doppler * 0.7) * uIntensity;
  vAlpha = smoothstep(3.8, 5.5, r) * (1.0 - smoothstep(38.0, 48.0, r)) * 0.85;
  vCorner = aCorner;

  vec3 side = cross(tangent, viewDir);
  side = length(side) > 0.001 ? normalize(side) : vec3(0.0, 1.0, 0.0);
  vec3 offset = tangent * aCorner.x * 1.1 + side * aCorner.y * 0.13;

  gl_Position = uProj * uView * vec4(pos + offset, 1.0);
}
`

const DISK_FRAG = `#version 300 es
precision highp float;

in vec3 vColor;
in float vAlpha;
in vec2 vCorner;
out vec4 outColor;

void main() {
  float across = 1.0 - vCorner.y * vCorner.y;
  float along = 1.0 - vCorner.x * vCorner.x * 0.35;
  outColor = vec4(vColor, vAlpha * across * along);
}
`

const CORE_VERT = `#version 300 es
precision highp float;

in vec2 aCorner;

uniform mat4 uProj;
uniform mat4 uView;
uniform vec3 uRight;
uniform vec3 uUp;
uniform float uSize;

out vec2 vCorner;

void main() {
  vCorner = aCorner;
  vec3 pos = uRight * aCorner.x * uSize + uUp * aCorner.y * uSize;
  gl_Position = uProj * uView * vec4(pos, 1.0);
}
`

const CORE_FRAG = `#version 300 es
precision highp float;

in vec2 vCorner;

uniform mat4 uProj;
uniform mat4 uView;
uniform vec3 uRight;
uniform vec3 uUp;
uniform vec3 uForward;
uniform float uSize;
uniform float uHorizon;
uniform float uIntensity;
uniform bool uGlow;
uniform vec3 uAccent;

out vec4 outColor;

void main() {
  float d = length(vCorner) * uSize;
  if (uGlow) {
    if (d < uHorizon) discard;
    float rim = pow(smoothstep(uSize, uHorizon, d), 3.0);
    gl_FragDepth = gl_FragCoord.z;
    outColor = vec4(uAccent * rim * uIntensity * 2.2, rim);
  } else {
    if (d > uHorizon) discard;
    float bulge = sqrt(max(uHorizon * uHorizon - d * d, 0.0));
    vec3 pos = uRight * vCorner.x * uSize + uUp * vCorner.y * uSize + uForward * bulge;
    vec4 clip = uProj * uView * vec4(pos, 1.0);
    gl_FragDepth = (clip.z / clip.w) * 0.5 + 0.5;
    outColor = vec4(0.005, 0.005, 0.015, 1.0);
  }
}
`

function compile(gl: WebGL2RenderingContext, vert: string, frag: string) {
  const program = gl.createProgram()
  if (!program) return null
  for (const [type, source] of [
    [gl.VERTEX_SHADER, vert],
    [gl.FRAGMENT_SHADER, frag],
  ] as const) {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('black-hole-shader:', gl.getShaderInfoLog(shader))
      return null
    }
    gl.attachShader(program, shader)
    gl.deleteShader(shader)
  }
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('black-hole-program:', gl.getProgramInfoLog(program))
    return null
  }
  return program
}

function perspective(out: Float32Array, fovy: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fovy / 2)
  out.fill(0)
  out[0] = f / aspect
  out[5] = f
  out[10] = (far + near) / (near - far)
  out[11] = -1
  out[14] = (2 * far * near) / (near - far)
}

function lookAtOrigin(
  out: Float32Array,
  eye: number[],
  right: number[],
  up: number[],
  forward: number[],
) {
  const len = Math.hypot(eye[0], eye[1], eye[2]) || 1
  const z = [eye[0] / len, eye[1] / len, eye[2] / len]
  const flat = Math.hypot(z[2], z[0])
  const x = flat > 1e-5 ? [z[2] / flat, 0, -z[0] / flat] : [1, 0, 0]
  const y = [
    z[1] * x[2] - z[2] * x[1],
    z[2] * x[0] - z[0] * x[2],
    z[0] * x[1] - z[1] * x[0],
  ]
  out.set([
    x[0], y[0], z[0], 0,
    x[1], y[1], z[1], 0,
    x[2], y[2], z[2], 0,
    -(x[0] * eye[0] + x[1] * eye[1] + x[2] * eye[2]),
    -(y[0] * eye[0] + y[1] * eye[1] + y[2] * eye[2]),
    -(z[0] * eye[0] + z[1] * eye[1] + z[2] * eye[2]),
    1,
  ])
  for (let i = 0; i < 3; i++) {
    right[i] = x[i]
    up[i] = y[i]
    forward[i] = z[i]
  }
}

export default function BlackHole({
  height = '480px',
  accentColor = '#5e17eb',
  particles = 4200,
  interactive = true,
  className = '',
}: BlackHoleProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [generation, setGeneration] = React.useState(0)
  const [failed, setFailed] = React.useState(false)

  const rgbAccent = React.useMemo(() => hexToRgb(accentColor), [accentColor])
  const rgbRef = React.useRef(rgbAccent)
  rgbRef.current = rgbAccent

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2', {
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    if (!gl) {
      setFailed(true)
      return
    }

    const diskProgram = compile(gl, DISK_VERT, DISK_FRAG)
    const coreProgram = compile(gl, CORE_VERT, CORE_FRAG)
    if (!diskProgram || !coreProgram) {
      setFailed(true)
      return
    }

    const count = Math.max(1, Math.round(particles))
    const seeds = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.pow(Math.random(), 1.3) * 40
      seeds[i * 3] = r
      seeds[i * 3 + 1] = Math.random() * Math.PI * 2
      seeds[i * 3 + 2] = (Math.random() - 0.5) * (8 / r)
    }

    const corners = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const cornerBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, cornerBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, corners, gl.STATIC_DRAW)

    const seedBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW)

    const diskVao = gl.createVertexArray()
    gl.bindVertexArray(diskVao)
    const diskCorner = gl.getAttribLocation(diskProgram, 'aCorner')
    gl.bindBuffer(gl.ARRAY_BUFFER, cornerBuffer)
    gl.enableVertexAttribArray(diskCorner)
    gl.vertexAttribPointer(diskCorner, 2, gl.FLOAT, false, 0, 0)
    const diskSeed = gl.getAttribLocation(diskProgram, 'aSeed')
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer)
    gl.enableVertexAttribArray(diskSeed)
    gl.vertexAttribPointer(diskSeed, 3, gl.FLOAT, false, 0, 0)
    gl.vertexAttribDivisor(diskSeed, 1)

    const coreVao = gl.createVertexArray()
    gl.bindVertexArray(coreVao)
    const coreCorner = gl.getAttribLocation(coreProgram, 'aCorner')
    gl.bindBuffer(gl.ARRAY_BUFFER, cornerBuffer)
    gl.enableVertexAttribArray(coreCorner)
    gl.vertexAttribPointer(coreCorner, 2, gl.FLOAT, false, 0, 0)
    gl.bindVertexArray(null)

    const u = (program: WebGLProgram, name: string) => gl.getUniformLocation(program, name)
    const diskU = {
      proj: u(diskProgram, 'uProj'),
      view: u(diskProgram, 'uView'),
      cam: u(diskProgram, 'uCam'),
      time: u(diskProgram, 'uTime'),
      morph: u(diskProgram, 'uMorph'),
      compression: u(diskProgram, 'uCompression'),
      intensity: u(diskProgram, 'uIntensity'),
      orbit: u(diskProgram, 'uOrbit'),
      accent: u(diskProgram, 'uAccent'),
    }
    const coreU = {
      proj: u(coreProgram, 'uProj'),
      view: u(coreProgram, 'uView'),
      right: u(coreProgram, 'uRight'),
      up: u(coreProgram, 'uUp'),
      forward: u(coreProgram, 'uForward'),
      size: u(coreProgram, 'uSize'),
      horizon: u(coreProgram, 'uHorizon'),
      intensity: u(coreProgram, 'uIntensity'),
      glow: u(coreProgram, 'uGlow'),
      accent: u(coreProgram, 'uAccent'),
    }

    const proj = new Float32Array(16)
    const view = new Float32Array(16)
    const right = [1, 0, 0]
    const up = [0, 1, 0]
    const forward = [0, 0, 1]

    let theta = Math.PI * 0.25
    let heightOffset = 0
    let simTime = 0
    let last = 0
    let raf = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }

    const draw = (now: number) => {
      raf = 0
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016
      last = now
      resize()

      simTime += dt
      theta += 0.12 * dt

      const aspect = canvas.width / canvas.height
      const fit = aspect < 1 ? Math.min(1 / aspect, 1.6) : 1
      const distance = 80 * fit
      const camY = Math.max(
        -distance * 0.9,
        Math.min(distance * 0.9, 22 * fit + heightOffset),
      )
      const radius = Math.sqrt(Math.max(distance * distance - camY * camY, 16))
      const eye = [Math.cos(theta) * radius, camY, Math.sin(theta) * radius]

      perspective(proj, (38 * Math.PI) / 180, aspect, 0.1, 1000)
      lookAtOrigin(view, eye, right, up, forward)

      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.enable(gl.DEPTH_TEST)

      const currentAccent = rgbRef.current

      // 1. Opaque horizon
      gl.disable(gl.BLEND)
      gl.depthMask(true)
      gl.useProgram(coreProgram)
      gl.bindVertexArray(coreVao)
      gl.uniformMatrix4fv(coreU.proj, false, proj)
      gl.uniformMatrix4fv(coreU.view, false, view)
      gl.uniform3fv(coreU.right, right)
      gl.uniform3fv(coreU.up, up)
      gl.uniform3fv(coreU.forward, forward)
      gl.uniform1f(coreU.size, CORE_QUAD)
      gl.uniform1f(coreU.horizon, HORIZON)
      gl.uniform1f(coreU.intensity, 1.2)
      gl.uniform1i(coreU.glow, 0)
      gl.uniform3fv(coreU.accent, currentAccent)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // 2. Accretion Disk
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
      gl.depthMask(false)
      gl.useProgram(diskProgram)
      gl.bindVertexArray(diskVao)
      gl.uniformMatrix4fv(diskU.proj, false, proj)
      gl.uniformMatrix4fv(diskU.view, false, view)
      gl.uniform3fv(diskU.cam, eye)
      gl.uniform1f(diskU.time, simTime)
      gl.uniform1f(diskU.morph, 0.25)
      gl.uniform1f(diskU.compression, 1.0)
      gl.uniform1f(diskU.intensity, 1.25)
      gl.uniform1f(diskU.orbit, 1.1)
      gl.uniform3fv(diskU.accent, currentAccent)
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count)

      // 3. Photon Rim Glow
      gl.disable(gl.DEPTH_TEST)
      gl.useProgram(coreProgram)
      gl.bindVertexArray(coreVao)
      gl.uniform1i(coreU.glow, 1)
      gl.uniform3fv(coreU.accent, currentAccent)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      gl.bindVertexArray(null)

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    const observer = new ResizeObserver(() => {
      if (!raf) raf = requestAnimationFrame(draw)
    })
    observer.observe(canvas)

    let dragging = false
    let lastX = 0
    let lastY = 0

    const onDown = (e: PointerEvent) => {
      if (!interactive) return
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      canvas.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      theta -= (e.clientX - lastX) * 0.005
      heightOffset = Math.max(-25, Math.min(25, heightOffset + (e.clientY - lastY) * 0.15))
      lastX = e.clientX
      lastY = e.clientY
    }
    const onUp = (e: PointerEvent) => {
      dragging = false
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId)
    }
    const onLost = (e: Event) => {
      e.preventDefault()
      cancelAnimationFrame(raf)
      raf = 0
    }
    const onRestored = () => setGeneration((g) => g + 1)

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)
    canvas.addEventListener('webglcontextlost', onLost)
    canvas.addEventListener('webglcontextrestored', onRestored)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
      gl.deleteProgram(diskProgram)
      gl.deleteProgram(coreProgram)
      gl.deleteBuffer(cornerBuffer)
      gl.deleteBuffer(seedBuffer)
      gl.deleteVertexArray(diskVao)
      gl.deleteVertexArray(coreVao)
    }
  }, [particles, interactive, generation])

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height }}
      aria-label="Singularity Accretion Horizon"
    >
      {failed ? (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, #000 12%, ${accentColor}88 20%, transparent 65%)`,
          }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 block h-full w-full ${
            interactive ? 'cursor-grab touch-none active:cursor-grabbing' : ''
          }`}
        />
      )}

      {/* Radial Vignette & Bottom Energy Conductor Fade */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 30%, #000000 95%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent z-10" />
    </div>
  )
}
