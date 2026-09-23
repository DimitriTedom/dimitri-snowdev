'use client'

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ArtifactCoreProps {
  modelPath?: string
  accentColor?: string
  className?: string
}

// ─── Procedural Quantum Singularity Fallback ───
function ProceduralQuantumCore({ accentColor }: { accentColor: string }) {
  const outerRingRef = useRef<THREE.Group>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.4
      outerRingRef.current.rotation.y += delta * 0.6
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y -= delta * 0.7
      innerRingRef.current.rotation.z += delta * 0.5
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 1.0
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Gyro Ring */}
      <group ref={outerRingRef}>
        <mesh>
          <torusGeometry args={[1.5, 0.04, 32, 100]} />
          <meshStandardMaterial
            color="#2a2a38"
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Mid Concentric Ring */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.03, 32, 100]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Central Floating Crystalline Polyhedron */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.8}>
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.7, 0]} />
          <MeshDistortMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={1.2}
            distort={0.25}
            speed={2}
            roughness={0.1}
            metalness={0.5}
            transparent
            opacity={0.92}
          />
        </mesh>
      </Float>

      {/* Bottom Emission Flare Node */}
      <mesh position={[0, -1.3, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

// ─── External GLB Model Loader ───
function GlbModel({ path }: { path: string }) {
  const { scene } = useGLTF(path)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4
    }
  })

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} scale={1.8} position={[0, -0.4, 0]} />
    </group>
  )
}

// ─── Scene Container ───
function SceneContent({ modelPath, accentColor }: { modelPath: string; accentColor: string }) {
  const [modelAvailable, setModelAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if the model file is accessible on the server
    fetch(modelPath, { method: 'HEAD' })
      .then((res) => {
        setModelAvailable(res.ok)
      })
      .catch(() => {
        setModelAvailable(false)
      })
  }, [modelPath])

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, -1.2, 0]} intensity={3.5} color={accentColor} distance={6} />
      <pointLight position={[0, 2, 2]} intensity={2.0} color="#ae6bf6" distance={8} />

      {modelAvailable ? (
        <Suspense fallback={<ProceduralQuantumCore accentColor={accentColor} />}>
          <GlbModel path={modelPath} />
        </Suspense>
      ) : (
        <ProceduralQuantumCore accentColor={accentColor} />
      )}
    </>
  )
}

// ─── Main Exported Component ───
export default function ArtifactCore3D({
  modelPath = '/models/artifact-core.glb',
  accentColor = '#5e17eb',
  className = '',
}: ArtifactCoreProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div
          className="w-16 h-16 rounded-full border border-white/20 animate-spin"
          style={{ borderTopColor: accentColor }}
        />
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <SceneContent modelPath={modelPath} accentColor={accentColor} />
      </Canvas>
    </div>
  )
}
