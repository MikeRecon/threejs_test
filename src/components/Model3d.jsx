import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
//import Box from './Box'
import { Center, OrbitControls } from '@react-three/drei'
import Iphone from '../Modelcomponent/Iphone'
import Hoodie from '../Modelcomponent/Hoodie'
import Tshirt from '../Modelcomponent/TshirtNew'
import Test from './Test'




function Model3d() {

    const [Color, setColor] = useState()
    const [ColorBody, setColorBody] = useState()
    const [ColorStraps, setColorStraps] = useState()
    const [ColorCamera, setColorCamera] = useState()
    const [ColorLogo, setColorLogo] = useState()
    const [ColorRib, setColorRib] = useState()
    const [Cam, setCam] = useState("0")

    const onChangeCarcasa = (event) => {
        setColor(event.target.value)
    }

    const onChangeCam = (event) => {
        setCam(event.target.value)
    }

    const onChangeCamara = (event) => {
        setColorCamera(event.target.value)
    }

    const onChangeLogo = (event) => {
        setColorLogo(event.target.value)
    }

    const onChangeBody = (event) => {
        setColorBody(event.target.value)
    }

    const onChangeStraps = (event) => {
        setColorStraps(event.target.value)
    }
    const onChangeRib = (event) => {
        setColorRib(event.target.value)
    }

    return (
        <div className=' bg-gray-400 h-auto w-full flex flex-col  gap-20     '>
            <div className=' pl-5 pt-10 w-full   flex gap-10'>
                <div className='  bg-white w-1/2 h-[20rem] border-4 border-black rounded-xl'>
                    <Canvas >
                        <OrbitControls enableZoom={false} />
                        <ambientLight intensity={1} />
                        <pointLight position={[10, 10, 10]} />


                        <Iphone color={Color} camera={ColorCamera} logo={ColorLogo} />
                    </Canvas>
                </div>
                <div className='w-1/2'>
                    <h1 >Carcasa</h1>
                    <select className={` w-40 text-center h-10`} value={Color} name="select" onChange={onChangeCarcasa} >
                        <option value="#f000ff">Rosa</option>
                        <option value="#760300" >Terracota</option>
                        <option value="#76eec6">Aqua</option>
                    </select>

                    <h1 className='pt-10'>Color Camara</h1>
                    <select className={` w-40 text-center h-10`} value={ColorCamera} name="select" onChange={onChangeCamara} >
                        <option value="#66ccff">Azul</option>
                        <option value="#ffe700" >Amarillo</option>
                        <option value="#7b2e99">Morado</option>
                    </select>

                    <h1 className='pt-10'>Color Logo</h1>
                    <select className={` w-40 text-center h-10`} value={ColorLogo} name="select" onChange={onChangeLogo} >
                        <option value="#66ccff">Azul</option>
                        <option value="#ffe700" >Amarillo</option>
                        <option value="#7b2e99">Morado</option>
                    </select>


                </div>
            </div>
            <div className=''>
                <div className=' flex gap-10  px-5 pb-20'>
                    <div className=' w-1/2  bg-black    h-[25rem] border-4 border-black rounded-xl    '>
                        <Canvas >

                            <OrbitControls enableZoom={true} />


                            <ambientLight intensity={1} />
                            <pointLight position={[10, 10, 10]} />
                            <directionalLight position={[-1, 10, 2]} />
                            <Center>
                                <Hoodie straps={ColorStraps} color={ColorBody} rib={ColorRib} />
                            </Center>


                        </Canvas>
                    </div>

                    <div className='w-1/2'>
                        <h1 >Body</h1>
                        <select className={` w-40 text-center h-10`} value={ColorBody} name="select" onChange={onChangeBody} >
                            <option value="#f000ff">Rosa</option>
                            <option value="#760300" >Terracota</option>
                            <option value="#76eec6">Aqua</option>
                        </select>

                        <h1 className='pt-10'>Straps</h1>
                        <select className={` w-40 text-center h-10`} value={ColorStraps} name="select" onChange={onChangeStraps} >
                            <option value="#66ccff">Azul</option>
                            <option value="#ffe700" >Amarillo</option>
                            <option value="#7b2e99">Morado</option>
                        </select>

                        <h1 className='pt-10'>Rib</h1>
                        <select className={` w-40 text-center h-10`} value={ColorRib} name="select" onChange={onChangeRib} >
                            <option value="#66ccff">Azul</option>
                            <option value="#ffe700">Amarillo</option>
                            <option value="#7b2e99">Morado</option>
                        </select>




                    </div>
                </div>
            </div>
            <div className=''>
                <div className=' flex gap-10  px-5 pb-20'>
                    <div className=' w-1/2     h-[25rem] border-4 border-black rounded-xl    '>
                        <Canvas >

                            <OrbitControls enableZoom={true} />


                            <ambientLight intensity={1} />
                            <pointLight position={[10, 10, 10]} />
                            <directionalLight position={[-1, 10, 2]} />
                            <gridHelper args={[10, 10, `white`, `gray`]} />
                            <Center>
                                <Tshirt />
                            </Center>


                        </Canvas>
                    </div>

                    <div className='w-1/2'>
                        <h1 >Body</h1>
                        <select className={` w-40 text-center h-10`} value={ColorBody} name="select" onChange={onChangeBody} >
                            <option value="#f000ff">Rosa</option>
                            <option value="#760300" >Terracota</option>
                            <option value="#76eec6">Aqua</option>
                        </select>

                        <h1 className='pt-10'>Straps</h1>
                        <select className={` w-40 text-center h-10`} value={ColorStraps} name="select" onChange={onChangeStraps} >
                            <option value="#66ccff">Azul</option>
                            <option value="#ffe700" >Amarillo</option>
                            <option value="#7b2e99">Morado</option>
                        </select>

                        <h1 className='pt-10'>Rib</h1>
                        <select className={` w-40 text-center h-10`} value={ColorRib} name="select" onChange={onChangeRib} >
                            <option value="#66ccff">Azul</option>
                            <option value="#ffe700">Amarillo</option>
                            <option value="#7b2e99">Morado</option>
                        </select>




                    </div>
                </div>
            </div>

            <div className=''>
                <div className=' flex gap-10  px-5 pb-20'>
                    <div className=' w-1/2     h-[25rem] border-4 border-black rounded-xl    '>
                    <Test cam={Cam} />
                    </div>

                    <div className='w-1/2'>
                        <h1 >Camara</h1>
                        <select className={` w-40 text-center h-10`} value={Cam} name="select" onChange={onChangeCam} >
                            <option value="0">Primera </option>
                            <option value="1" >Segunda</option>
                          
                        </select>

                       




                    </div>
                </div>
            </div>
          
          
        </div>
    )
}

export default Model3d