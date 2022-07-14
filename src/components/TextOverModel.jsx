import React, { useState, useEffect } from 'react'
import { OrbitControls, Center, useGLTF,Html } from "@react-three/drei";
import * as THREE from "three";
import { fabric } from 'fabric';


function TextOverModel() {
    const cnvs = document.getElementById("cnvs");
    const { scene, cameras, materials } = useGLTF("./ShirtCamera.gltf");
  
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 10);
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.setScalar(10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    var canvasTexture = new THREE.CanvasTexture(cnvs);
    canvasTexture.wrapS = THREE.RepeatWrapping;
    canvasTexture.wrapT = THREE.RepeatWrapping;
    canvasTexture.repeat.set(1, 1);

    var geometry = scene.getObjectByName("T-Shirt_Base")
   

    var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
        map: canvasTexture,
        metalness: 0.25,
        roughness: 0.25
    }));


    var canvas = new fabric.Canvas('cnvs', {
        backgroundColor: 'white'
    });
    canvas.on("after:render", function () {
        mesh.material.map.needsUpdate = true;
    });



    var text = new fabric.IText('Three.js\n+\nFaBric.js', {
        fontSize: 40,
        fontWeight: 'bold',
        left: 128,
        top: 128,
        angle: 30,
        shadow: 'blue -5px 6px 5px',
        styles: {
            0: {
                0: {
                    fontSize: 60,
                    fontFamily: 'Impact',
                    fontWeight: 'normal',
                    fill: 'orange'
                }
            },
            1: {
                0: {
                    fill: "blue"
                }
            },
            2: {
                0: {
                    textBackgroundColor: 'red'
                },
                2: {
                    fill: 'fuchsia',
                    stroke: 'orange',
                    strokeWidth: 1
                }
            }
        }
    });
    text.setSelectionStyles({
        fontStyle: 'italic',
        fill: '',
        stroke: 'red',
        strokeWidth: 2
    }, 1, 5);
    canvas.add(text);
    canvas.setActiveObject(text);


    var clock = new THREE.Clock();
    var time = 0;
  

    function render() {
        requestAnimationFrame(render);
        time += clock.getDelta();
        mesh.lookAt(Math.cos(time * 0.314) * 20, Math.sin(time * 0.157) * 10, 40);
        renderer.render(scene, camera);
    }

    return (
        <div  id="container">
            <canvas id="cnvs" height="256" width="256"></canvas>
          <div>
            </div>  {render()}
        </div>

    )
}

export default TextOverModel