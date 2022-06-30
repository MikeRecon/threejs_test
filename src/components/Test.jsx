import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, useGLTF, PerspectiveCamera, TransformControls } from "@react-three/drei";
import { Suspense,useMemo } from "react";
import * as THREE from "three";




export default function Test({ cam }) {

  const { scene, cameras, materials } = useGLTF("./ShirtCamera.gltf");
  const mesh = scene.getObjectByName("T-Shirt_Base")
  const texture = new THREE.TextureLoader().load("./images/homer.jpeg");
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });

  useMemo(() => {
    materials.Primary.color.set("#76eec6")
   

  }, [materials])
  mesh['material'] = material;
  mesh['material'].needsUpdate = true;


  texture.offset.x = .10 
  texture.offset.y = .20

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

