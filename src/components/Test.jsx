import { Canvas } from "@react-three/fiber";
import { fabric } from 'fabric';
import { OrbitControls, Center, useGLTF, Html } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

import imgtest from "../images/homer.jpeg"


export default function Test({ cam }) {
  const cnvs = document.getElementById("cnvs");

  const { scene, cameras, materials } = useGLTF("./ShirtCamera.gltf");
  const mesh = scene.getObjectByName("T-Shirt_Base")
  const texture = new THREE.TextureLoader().load("./images/webb-dark.png");
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });



  var canvasTexture = new THREE.CanvasTexture(cnvs);

  canvasTexture.wrapS = THREE.RepeatWrapping;
  canvasTexture.wrapT = THREE.RepeatWrapping;

  canvasTexture.repeat.set(1, 1);
  const decalMaterial = new THREE.MeshBasicMaterial({
    map: canvasTexture,
  


  });
  useMemo(() => {
    materials.Extra.color.set("#000000")

    decalMaterial.needsUpdate=true

  }, [materials,decalMaterial])



  //
  mesh['material'] = decalMaterial;

  //
  mesh['material'].needsUpdate = true;

  //texture.offset.x = .10
  //texture.offset.y = .10
  //texture.repeat.set( 1, 1 );










  const Model = () => {
    return (
      <primitive object={scene} />);
  };


  return (



    <div className=' w-full   h-full    '>
      <Suspense>
        <Canvas camera={cameras[0]} flat linear>
          <OrbitControls makeDefault />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <directionalLight position={[-1, 10, 2]} />


          <Center>
            <Model />

          </Center>

        </Canvas>
      </Suspense>

    </div>




  );
}

