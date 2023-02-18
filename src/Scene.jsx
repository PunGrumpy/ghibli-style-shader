import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trees } from './Trees'
import { Color } from 'three'

export const Scene = () => {
  const refTrees = useRef(null)

  useFrame(() => {
    const { current: group } = refTrees
    if (group) {
      group.rotation.x = group.rotation.y += 0.01
    }
  })

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        color="#fff"
        position={[15, 15, 15]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-blurSamples={25}
      />
      <Trees
        ref={refTrees}
        position={[0, 0, 0]}
        colors={[
          new Color('#81a5ba').convertLinearToSRGB(),
          new Color('#396b89').convertLinearToSRGB(),
          new Color('#323456').convertLinearToSRGB(),
          new Color('#202547').convertLinearToSRGB()
        ]}
      />
    </>
  )
}
