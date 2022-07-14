import Test from '../components/Test';
import { fabric } from 'fabric';
import React, { useState, useEffect } from 'react'

function TshirtExample() {
    const [canvas, setCanvas] = useState('');
    const [imgURL, setImgURL] = useState('https://sm.ign.com/ign_es/screenshot/default/analisis-halo-infinite_cjdd.jpg');
    useEffect(() => {
        setCanvas(initCanvas());
     }, []);
    
     const initCanvas = () => (
        new fabric.Canvas('cnvs', {
          height: 200,
          width: 200,
          backgroundColor: 'green'
        })
      )
    const addRect = canvi => {
        const rect = new fabric.Rect({
          height: 100,
          width: 100,
          fill: 'yellow'
        });
        canvi.add(rect);
        canvi.renderAll();
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
    function upload(e) {
      e.preventDefault();
      var fileType = e.target.files[0].type;
      var url = URL.createObjectURL(e.target.files[0]);
   
      if (fileType === 'image/png') { //check if png
         fabric.Image.fromURL(url, function(img) {
            img.scale(.25)
            canvas.add(img);
            canvas.renderAll()
         });
      } else if (fileType === 'image/svg+xml') { //check if svg
         fabric.loadSVGFromURL(url, function(objects, options) {
            var svg = fabric.util.groupSVGElements(objects, options);
            svg.scaleToWidth(180);
            svg.scaleToHeight(180);
            canvas.add(svg);
            
         });
      }
   }
   
    return (
      <div className='w-full h-screen bg-slate-800 flex'>
      <div className='w-1/2'>
      <Test/>
      </div>
  <div className='w-1/2 flex items-center justify-center pt-10'>
  <div>
  <button onClick={() => addRect(canvas)}>Rectangle</button>
       
          <div>
            <input 
              type="file" 
              onChange={ e => upload(e)} 
            />
           
          </div>
      
       <br/><br/>
       <canvas id="cnvs" />
      </div>
  </div>
    
      </div>
    
    );
}

export default TshirtExample