import { Stars, useTexture } from '@react-three/drei'
import React, { useRef, useMemo } from 'react'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'

import atmosphereVertex from './shaders/atmosphereVertex.glsl'
import atmosphereFragment from './shaders/atmosphereFragment.glsl'

import { AdditiveBlending } from 'three'
import { BackSide } from 'three'
import { useFrame } from '@react-three/fiber'

const App = () => {
  const earthTexture = useTexture('earthmap10k.jpg')

  const groupRef = useRef()
  const earthRef = useRef()
  useFrame(({ camera }) => {
    earthRef.current.rotation.y += 0.0025
    camera.position.z = 15 * Math.sin(Math.abs(earthRef.current.rotation.y))
  })

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
        <Stars />
      </group>
    </>
  )
}

export default App
