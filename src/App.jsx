import { useTexture } from '@react-three/drei'
import React, { useRef, useMemo } from 'react'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'

import atmosphereVertex from './shaders/atmosphereVertex.glsl'
import atmosphereFragment from './shaders/atmosphereFragment.glsl'

import { AdditiveBlending } from 'three'
import { BackSide } from 'three'
import { useFrame } from '@react-three/fiber'
import { BufferAttribute } from 'three'

const App = () => {
  const earthTexture = useTexture('earthmap10k.jpg')

  const groupRef = useRef()
  const earthRef = useRef()
  useFrame(({ camera }) => {
    groupRef.current.rotation.y += 0.0025
    camera.position.z = 15 * Math.sin(Math.abs(groupRef.current.rotation.y))
  })

  const points = useMemo(() => {
    const p = new Array(1000).fill(0).map((v) => (0.5 - Math.random()) * 15)
    return new BufferAttribute(new Float32Array(p), 3)
  }, [])

  return (
    <>
      <group ref={groupRef}>
        <mesh ref={earthRef} rotation={[0, 180, 0]}>
          <sphereGeometry />
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={{
              globeTexture: {
                value: earthTexture,
              },
            }}
          />
        </mesh>
        <mesh scale={[1.2, 1.2, 1.2]}>
          <sphereGeometry />
          <shaderMaterial vertexShader={atmosphereVertex} fragmentShader={atmosphereFragment} blendin={AdditiveBlending} side={BackSide} />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach={'attributes-position'} {...points} />
          </bufferGeometry>
          <pointsMaterial size={0.02} color={0xffffff} />
        </points>
      </group>
    </>
  )
}

export default App
