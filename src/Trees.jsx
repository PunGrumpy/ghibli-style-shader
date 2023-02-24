import { forwardRef, useMemo } from 'react'
import { useGLTF, SoftShadows } from '@react-three/drei'
import { Vector3 } from 'three'
import { GhibliShader } from './GhibliShader'

export const Trees = forwardRef((props, ref) => {
  const { nodes } = useGLTF('/trees.glb')

  const uniforms = useMemo(
    () => ({
      colorMap: {
        value: props.colors
      },
      brightnessThresholds: {
        value: [0.6, 0.3, 0.001]
      },
      lightPosition: { value: new Vector3(15, 15, 15) }
    }),
    [props.colors]
  )

  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Foliage.geometry}
        position={[0.3, -0.06, -0.7]}
      >
        <shaderMaterial
          attach="material"
          {...GhibliShader}
          uniforms={uniforms}
        />
        <SoftShadows
          frustum={3.75}
          size={0.005}
          near={9.5}
          samples={17}
          rings={11}
        />
      </mesh>
    </group>
  )
})

useGLTF.preload('/trees.glb')
