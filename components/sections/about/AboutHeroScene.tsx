'use client'

import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// ─── Mouse position stored globally to avoid React re-renders on every move ───
const mouse = { x: 0, y: 0 }

// ─── The inner model component that does the actual head tracking ───
function SnowDevModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const texture = useTexture('/models/extracted_texture.jpg')
  const groupRef = useRef<THREE.Group>(null)
  const { size } = useThree()

  // Apply texture properly with GLTF UV alignment and correct color space
  useEffect(() => {
    if (!texture) return
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial
          mat.map = texture
          mat.color.set('#ffffff')
          mat.roughness = 0.82
          mat.metalness = 0.08
          mat.needsUpdate = true
        }
      }
    })
  }, [scene, texture])

  const targetRotation = useRef({ x: 0, y: 0, z: 0 })

  useFrame(() => {
    if (!groupRef.current) return

    // Normalized Device Coordinates: -1 (left/bottom) to +1 (right/top)
    const ndcX = (mouse.x / size.width) * 2 - 1
    const ndcY = -(mouse.y / size.height) * 2 + 1

    // Target gaze rotations:
    // To look towards cursor on the right (+ndcX), rotation around Y must be positive (+Y).
    // To look towards cursor on the left (-ndcX), rotation around Y must be negative (-Y).
    // To look towards cursor at the top (+ndcY), rotation around X must be negative (-X).
    // To look towards cursor at the bottom (-ndcY), rotation around X must be positive (+X).
    targetRotation.current.y = ndcX * 0.52
    targetRotation.current.x = -ndcY * 0.32
    targetRotation.current.z = -ndcX * 0.04

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      0.08,
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      0.08,
    )
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotation.current.z,
      0.08,
    )
  })

  return (
    // Pivot at base/neck level [0, -0.98, 0] so head turns naturally
    // Primitive offset submerges the bust bottom into the fade zone
    <group ref={groupRef} position={[0, -0.98, 0]}>
      <primitive
        object={scene}
        scale={2.75}
        position={[0, -0.72, 0]}
      />
    </group>
  )
}

// ─── Balanced studio & rim lights for facial detail and cyber aesthetic ───
function StudioLights() {
  const rimRef = useRef<THREE.DirectionalLight>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pulse = 0.92 + Math.sin(t * 1.2) * 0.08
    if (rimRef.current) rimRef.current.intensity = 0.75 * pulse
  })

  return (
    <>
      {/* Front-left soft white key light — illuminates face & skin tone */}
      <directionalLight
        position={[-1.8, 2.2, 3]}
        color="#ffffff"
        intensity={0.85}
      />
      {/* Front-right cool lavender fill light */}
      <directionalLight
        position={[2.5, 1.2, 2.5]}
        color="#d8c7ff"
        intensity={0.45}
      />
      {/* Dynamic violet cyber rim light — grazes cheek & shoulder */}
      <directionalLight
        ref={rimRef}
        position={[-3.5, 2.5, -1]}
        color="#ae6bf6"
        intensity={0.75}
      />
      {/* Back rim light for silhouette separation */}
      <pointLight
        position={[0, 1.5, -2.5]}
        color="#5e17eb"
        intensity={0.8}
        distance={6}
      />
    </>
  )
}

export default function AboutHeroScene() {
  useEffect(() => {
    // Default gaze forward (center of screen)
    mouse.x = window.innerWidth / 2
    mouse.y = window.innerHeight / 2

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 46, near: 0.1, far: 100 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.95,
        }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <StudioLights />
        <Suspense fallback={null}>
          <SnowDevModel url="/models/snowdev.glb" />
          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.3}
            scale={4}
            blur={2.0}
            far={3}
            color="#5e17eb"
          />
          <Environment preset="night" environmentIntensity={0.2} />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/snowdev.glb')
useTexture.preload('/models/extracted_texture.jpg')
