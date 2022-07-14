import React, { useState, useEffect } from 'react'
import * as THREE from "three";
import { fabric } from 'fabric';















function Canvas() {
 
   
    const [canvas, setCanvas] = useState('');
    const [imgURL, setImgURL] = useState('https://sm.ign.com/ign_es/screenshot/default/analisis-halo-infinite_cjdd.jpg');
    useEffect(() => {
        setCanvas(initCanvas());
     }, []);
    
     const initCanvas = () => (
        new fabric.Canvas('cnvs', {
          height: 200,
          width: 200,
          backgroundColor: 'pink',
          viewportTransform:[1, 0, 0, 1, 250, 250]
        })
      )
    const addRect = canvi => {
        const rect = new fabric.Rect({
          height: 100,
          width: 100,
          fill: 'yellow',
          moveCursor: 'pointer'
        });
        
        canvi.add(rect);
      
      }
    
    const addImg = (e, url, canvi) => {
      e.preventDefault();
      new fabric.Image.fromURL(url, img => {
        img.scale(0.25);
        canvi.add(img);
        canvi.renderAll();
        setImgURL('');
      });
    }
    return(
      <div>
      
        <button onClick={() => addRect(canvas)}>Rectangle</button>
        <form onSubmit={e => addImg(e, imgURL, canvas)}>
          <div>
            <input 
              type="text" 
              value={imgURL} 
              onChange={ e => setImgURL(e.target.value)} 
            />
            <button className=' bg-white  rounded-xl ml-5 px-2' type="submit">Add Image</button>
          </div>
        </form>
       <br/><br/>
       <canvas id="cnvs" />
      </div>
    );
    

}

export default Canvas