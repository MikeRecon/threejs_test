
import { Canvas, useFrame } from "@react-three/fiber";
import { fabric } from 'fabric';
import { OrbitControls, Center, useGLTF, Html } from "@react-three/drei";
import { Suspense, useMemo, useRef, useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import * as THREE from "three";


export default function Test({ }) {
  const { scene, cameras, materials } = useGLTF("./TestShirt.glb");


  /*const material = new THREE.MeshBasicMaterial({
    map: texture,
  });*/

  //texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;

  /*var canvasTexture = new THREE.CanvasTexture(cnvs);

  canvasTexture.wrapS = THREE.RepeatWrapping;
  canvasTexture.wrapT = THREE.RepeatWrapping;

  canvasTexture.repeat.set(1, 1);
  const decalMaterial = new THREE.MeshBasicMaterial({
    map: canvasTexture,

  });*/
  /*useMemo(() => {
    materials.Extra.color.set("#000000")

    material.needsUpdate=true

  }, [materials])*/



  //
  //mesh['material'] = material;


  //mesh['material'].needsUpdate = true;

  //texture.offset.x = .10
  //texture.offset.y = .10
  //texture.repeat.set( 1, 1 );










  const Model = () => {



    let canvas = Array.from(document.getElementsByTagName('canvas'))[1],
      ctx,
      texture

    ctx = canvas.getContext('2d')
    texture = new THREE.CanvasTexture(ctx.canvas)

    const texture1 = new THREE.TextureLoader().load("./images/texture.png");
    texture.flipY = false
    scene.traverse(function (object) {

      if (object.isMesh) object.material.map = texture;

    });

    useFrame(() => {
      texture.needsUpdate = true

    })
    return (
      <primitive object={scene} />);
  };


  const [ColorLogo, setColorLogo] = useState()
  const [ColorS, setColorS] = useState()
  const { editor, onReady } = useFabricJSEditor()

  useEffect(() => {
    if (editor) {

      editor.setFillColor('#ff0000')
      editor.canvas.renderAll();
      editor.canvas.setWidth(500)
      editor.canvas.setHeight(500)
      editor.canvas.preserveObjectStacking=false

      /*fabric.Image.fromURL("images/texture.png", function (img) {    
        editor.canvas.setBackgroundImage(img, editor.canvas.renderAll.bind(editor.canvas), {
             scaleX: editor.canvas.width / img.width,
             scaleY: editor.canvas.height / img.height
         });
     });*/
      /* fabric.Image.fromURL("images/TestShirt.svg", function(img) { 
        editor.canvas.setBackgroundImage(img, editor.canvas.renderAll.bind(editor.canvas), {
          scaleX: editor.canvas.width / img.width,
          scaleY: editor.canvas.height / img.height
      });
      });*/
      // editor.canvas.backgroundColor = 'yellow'

      fetch('./images/TestShirt.svg')
        .then(res => res.text())
        .then(res => {
          const holder = document.getElementById("svgContainer")

          holder.innerHTML = res
          console.log(holder.querySelector('svg'))
          document.getElementById("ZONE(stars)").setAttribute("fill", ColorS); 
          document.getElementById('ZONE(base)').setAttribute("fill", ColorLogo);


svgload()
        })
    }
  }, [editor])


  

  function svgload() {
    var svgEl = document.querySelector('svg');
    var serializer = new XMLSerializer();
    var svgStr = serializer.serializeToString(svgEl);
    fabric.loadSVGFromString(svgStr, function (objects, options) {
      var obj = fabric.util.groupSVGElements(objects, options);
      obj.scaleToHeight(editor.canvas.height - 10)
      obj.scaleToWidth(editor.canvas.getWidth());
      obj.selectable = false
      obj.evented=false   
      obj.hasControls=false
      editor.canvas.remove(editor.canvas._objects[0])
      editor.canvas.add(obj).renderAll();
      editor.canvas.sendToBack(obj);

    });
  }


  function upload(e) {
    e.preventDefault();
    var fileType = e.target.files[0].type;
    var url = URL.createObjectURL(e.target.files[0]);

    if (fileType === 'image/png') { //check if png
      fabric.Image.fromURL(url, function (img) {
        img.objectCaching = true;
        //var scaling = editor.canvas.getHeight() / img.height;
        
        img.scaleToWidth(editor.canvas.getWidth());

        img.resizeFilter = new fabric.Image.filters.Resize({ resizeType: 'hermite' });

        //  img.filters.push(new fabric.Image.filters.Grayscale());
        img.applyFilters();
      
        editor.canvas.add(img);

        editor.canvas.renderAll()
      });
    } else if (fileType === 'image/svg+xml') { //check if svg
      fabric.loadSVGFromURL(url, function (objects, options) {
        var svg = fabric.util.groupSVGElements(objects, options);
        svg.scaleToWidth(editor.canvas.getWidth());
        svg.selectable = false
        //svg.scaleToHeight(180);
        editor.canvas.add(svg);

      });
    }
  }
 
  const onChangeLogo = (event) => {
    setColorLogo(event.target.value)
    //var test=document.querySelector("svg")
    //console.log(test)
    var selectedMaterial = 'ZONE(base)';
    //document.getElementById(selectedMaterial).setAttribute("fill", ColorLogo);

    document.getElementById(selectedMaterial).setAttribute("fill", ColorLogo);
    var test = document.getElementById(selectedMaterial)
    console.log(test)
  }


  const onChangeStars = (event) => {
    setColorS(event.target.value)
    //var test=document.querySelector("svg")
    //console.log(test)
    var selectedMaterial = "ZONE(stars)";
    //document.getElementById(selectedMaterial).setAttribute("fill", ColorLogo);

    document.getElementById(selectedMaterial).setAttribute("fill", ColorS);
    var test = document.getElementById(selectedMaterial)
    console.log(test)
  }

  return (



    <div className=' w-full   h-screen flex flex-col   bg-slate-500'>
      <div className=' w-full   h-screen flex items-center'>
        <div className="w-1/2 h-[20rem]">
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


        <div className="w-1/2">

          <FabricJSCanvas id="cnvs" className=" border-2 border-black" onReady={onReady} />
          <input type="file" onChange={e => upload(e)} />

        </div>

        <div className=" w-72 h-72 hidden" id="svgContainer">

        </div>

      </div>
      <div>
        <div>
          <h1 className='pt-10'>Color base</h1>
          <select className={` w-40 text-center h-10`} value={ColorLogo} name="select" onChange={onChangeLogo} >
            <option value="#66ccff">Azul</option>
            <option value="#ffe700" >Amarillo</option>
            <option value="#7b2e99">Morado</option>
          </select>
        </div>
        <div>
          <h1 className='pt-10'>Color Estrellitas</h1>
          <select className={` w-40 text-center h-10`} value={ColorS} name="select" onChange={onChangeStars} >
            <option value="#66ccff">Azul</option>
            <option value="#ffe700" >Amarillo</option>
            <option value="#7b2e99">Morado</option>
          </select>
        </div>
      </div>

    </div>




  );
}

