import { Point, useTexture } from '@react-three/drei'
import React, { useRef, useMemo } from 'react'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'

import atmosphereVertex from './shaders/atmosphereVertex.glsl'
import atmosphereFragment from './shaders/atmosphereFragment.glsl'

import { AdditiveBlending } from 'three'
import { BackSide } from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { BufferAttribute } from 'three'
import { DoubleSide } from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import myFont from './shaders/montserrat.json'
import gsap from 'gsap'

extend({ TextGeometry })
const font = new FontLoader().parse(myFont)

const App = () => {
  const earthTexture = useTexture('earthmap10k.jpg')

  const groupRef = useRef()
  const earthRef = useRef()
  /*   useFrame(({ clock, camera }) => {
      
      gsap.to(camera.position, {
        x: 0, y: 0, z: 25, duration: 10, onUpdate: function () {
          camera.lookAt(earthRef.current.position);
        } 
      })
      groupRef.current.rotation.y += 0.0025;
    }); */

  const points = useMemo(() => {
    const p = new Array(1000).fill(0).map((v) => (0.5 - Math.random()) * 25)
    return new BufferAttribute(new Float32Array(p), 3)
  }, [])

  let earthLimit = [
    { name: 'Le changement climatique', position: 0 },
    { name: 'L’érosion de la biodiversité', position: 0.5 },
    { name: 'Le changement d’utilisation des sols', position: 1 },
    { name: 'L’introduction d’entités nouvelles dans la biosphère', position: 1.5 },
    { name: 'La perturbation du cycle du phosphore et de l’azote', position: 2 },
    { name: 'L’acidification des océans', position: 2.5 },
    { name: 'L’augmentation des aérosols dans l’atmosphère', position: 3 },
    { name: 'L’appauvrissement de  l’ozone stratosphérique', position: 3.5 },
    { name: 'Le cycle d’eau douce bleue et verte', position: 4 },
  ]

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
