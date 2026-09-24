'use client'

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, MeshDistortMaterial, Center, Environment, Lightformer, OrbitControls } from '@react-three/drei'
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
function GlbModel({ path, accentColor }: { path: string; accentColor: string }) {
  const { scene } = useGLTF(path)
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial
          if (mat.map) {
            mat.map.colorSpace = THREE.SRGBColorSpace
            mat.map.needsUpdate = true
          }
          // Metallic specular gloss
          mat.envMapIntensity = 2.2
          mat.roughness = 0.2
          mat.metalness = 0.82

          // Deep energetic persona emissive glow
          mat.emissive = new THREE.Color(accentColor)
          mat.emissiveIntensity = 0.22
          mat.needsUpdate = true
        }
      }
    })
  }, [scene, accentColor])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35
    }
  })

  return (
    <group ref={groupRef} dispose={null}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Center>
          <primitive object={scene} scale={2.4} />
        </Center>
      </Float>
    </group>
  )
}

// ─── Scene Container ───
function SceneContent({ modelPath, accentColor }: { modelPath: string; accentColor: string }) {
  return (
    <>
      {/* 
        Cinematic PBR Lighting:
        - Low ambient light (0.22) preserves deep midnight obsidian shadows and prevents milky washing
        - Sharp cool directional key light (1.0) creates crisp faceted specular reflections
        - Vibrant persona-colored rim light (2.2) outlines the geometric silhouette
        - Bottom energy focal point light (7.0) surges through the lower crystal tip
      */}
      <ambientLight intensity={0.22} />
      <directionalLight position={[6, 8, 6]} intensity={1.0} color="#ffffff" />
      <directionalLight position={[-6, -3, -6]} intensity={2.2} color={accentColor} />
      <directionalLight position={[0, 6, -8]} intensity={1.5} color="#ae6bf6" />

      {/* Internal Core & Bottom Tip Energy Flares */}
      <pointLight position={[0, -1.6, 0]} intensity={7.0} color={accentColor} distance={7} />
      <pointLight position={[0, 0.2, 0.8]} intensity={3.0} color="#ae6bf6" distance={6} />
      <pointLight position={[0, 1.8, -0.8]} intensity={2.0} color="#ffffff" distance={5} />

      {/* Procedural Local Environment: 0 external network requests, zero CDN failures */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={3} position={[0, 6, -8]} scale={4} />
          <Lightformer form="circle" intensity={2} color={accentColor} position={[-6, 1, -1]} scale={3} />
          <Lightformer form="rect" intensity={3} color="#ae6bf6" position={[6, 2, 2]} scale={[8, 3, 1]} />
          <Lightformer form="rect" intensity={6} color={accentColor} position={[0, -4, 0]} scale={[12, 4, 1]} />
        </group>
      </Environment>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.6}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.5}
      />

      <Suspense fallback={<ProceduralQuantumCore accentColor={accentColor} />}>
        <GlbModel path={modelPath} accentColor={accentColor} />
      </Suspense>
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
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        className="w-full h-full"
      >
        <SceneContent modelPath={modelPath} accentColor={accentColor} />
      </Canvas>
    </div>
  )
}
