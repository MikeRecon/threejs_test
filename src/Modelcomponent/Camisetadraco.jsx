/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Camisetadraco.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={599.87}>
        <mesh geometry={nodes['T-Shirt_base'].geometry} material={materials.Primary} position={[0, -0.02, 0]} rotation={[-Math.PI, 1.56, -Math.PI]} scale={0} />
        <mesh geometry={nodes['T-Shirt_Circulos'].geometry} material={materials.Extra} position={[0, -0.02, 0]} rotation={[-Math.PI, 1.56, -Math.PI]} scale={0} />
        <mesh geometry={nodes['T-Shirt_Rayas'].geometry} material={materials.Second} position={[0, -0.02, 0]} rotation={[-Math.PI, 1.56, -Math.PI]} scale={0} />
      </group>
    </group>
  )
}

useGLTF.preload('/Camisetadraco.gltf')