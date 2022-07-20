import React, { useRef, Suspense, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, ContactShadows, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { fabric } from 'fabric'
import * as THREE from 'three'

function Model({ color }) {
    const group = useRef()
    const { nodes, materials, scene } = useGLTF('./Bigshirt.gltf')





    const mesh = scene.getObjectByName("T-Shirt_Base")
    const { gl } = useThree()
    let canvas = Array.from(document.getElementsByTagName('canvas'))[1],
        ctx,
        texture

    ctx = canvas.getContext('2d')


    texture = new THREE.CanvasTexture(ctx.canvas)
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = 10;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

    texture.needsUpdate = true
    useEffect(() => {
        console.log(texture)
    }, [])





    const decalMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        sizeAttenuation: false


    });

    var material = new THREE.MeshBasicMaterial({
        color: color,
        map: texture
    });

    material.onBeforeCompile = function (shader) {

        var custom_map_fragment = THREE.ShaderChunk.map_fragment.replace(

            `diffuseColor *= sampledDiffuseColor;`,

            `diffuseColor = vec4( mix( diffuse, sampledDiffuseColor.rgb, sampledDiffuseColor.a ), opacity );`

        );

        shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', custom_map_fragment);

    };

    useMemo(() => {
        materials.Primary.color.set("#ff0000")

    }, [materials])

    useFrame(() => {
        texture.needsUpdate = true

    })

    mesh['material'] = material;


    mesh['material'].needsUpdate = true;

    return (
        <primitive object={scene} />);


}

useGLTF.preload('/thisMayWork.glb')

const Canvas3d = () => {
    const { editor, onReady } = useFabricJSEditor()

    useEffect(() => {
        if (editor) {
            editor.setFillColor('#ff0000')
            editor.canvas.setHeight(400);
            editor.canvas.setWidth(600);
            editor.canvas.renderAll();

            // editor.canvas.backgroundColor = 'yellow'
        }
    })

    const onAddCircle = () => {
        editor.addText("Adapa test")

    }

    function upload(e) {
        e.preventDefault();
        var fileType = e.target.files[0].type;
        var url = URL.createObjectURL(e.target.files[0]);

        if (fileType === 'image/png') { //check if png
            fabric.Image.fromURL(url, function (img) {
                img.objectCaching = true;
               //var scaling = editor.canvas.getHeight() / img.height;
               
            
                img.resizeFilter = new fabric.Image.filters.Resize({resizeType: 'hermite'});
              
                //  img.filters.push(new fabric.Image.filters.Grayscale());
             
                // apply filters and re-render canvas when done
                img.applyFilters();
                // img.scale(.25)
                editor.canvas.add(img);

                editor.canvas.renderAll()
            });
        } else if (fileType === 'image/svg+xml') { //check if svg
            fabric.loadSVGFromURL(url, function (objects, options) {
                var svg = fabric.util.groupSVGElements(objects, options);
                //svg.scaleToWidth(180);
                //svg.scaleToHeight(180);
                editor.canvas.add(svg);

            });
        }
    }

    const [Color, setColor] = useState("#ffffff")

    const onChangeCarcasa = (event) => {
        setColor(event.target.value)
    }

    return (
        <>
            <div className='h-screen w-full flex   items-center bg-slate-400'>
                <div className='h-[30rem] bg-slate-500 w-1/2' >
                    <Canvas frameloop="always" shadows >
                        <ambientLight intensity={0.2} />

                        <Suspense fallback={null}>
                            <Center>
                                <Model color={Color} />
                            </Center>

                            <Environment preset="city" />

                        </Suspense>
                        <OrbitControls />
                    </Canvas>
                </div>

                <div className=" w-1/2 flex flex-col items-center gap-5 pt-10">
                    <button className=' bg-green-700  px-2 rounded-xl py-2 hover:bg-green-600' onClick={onAddCircle}>Texto de prueba</button>
                    <div>
                        <select className={` w-40 text-center h-10`} value={Color} name="select" onChange={onChangeCarcasa} >
                            <option value="#f000ff">Rosa</option>
                            <option value="#760300" >Terracota</option>
                            <option value="#76eec6">Aqua</option>
                            <option value="#ffffff">Blanco</option>
                        </select>
                    </div>

                    <input type="file" onChange={e => upload(e)} />
                    <FabricJSCanvas id="cnvs" className=" border-2 border-black" onReady={onReady} />

                </div>
            </div>

        </>
    )
}

export default Canvas3d