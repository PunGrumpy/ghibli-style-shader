import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Scene } from './Scene'
import { Ground } from './Ground'

export function FiberContainer() {
  return (
    <Canvas camera={{ position: [14.4666, 2.0365, 5.556165], fov: 30 }} shadows>
      <Scene />
      <Ground />
      <OrbitControls minDistance={5} maxDistance={100} />
    </Canvas>
  )
}
