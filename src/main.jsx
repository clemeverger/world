import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import App from './App'
import './index.css'
import { OrbitControls } from '@react-three/drei'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <Canvas
        camera={{ position: [5, 5, 5], fov: 15 }}
        style={{
          backgroundColor: 'black',
          width: '100vw',
          height: '100vh',
        }}
      >
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <App></App>
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </>
  </React.StrictMode>
)
