import React, { useRef, useState } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Geometry } from 'three-stdlib';
let eixo = { box: { x: -1.2, z: 0 }, boxPink: { x: 0, z: 0 } };

const collision = ({ position, geometry }: { position:{ x: number, z: number }  , geometry: { parameters?:{ width: number, height: number }} | any}) => {
  const { x } = position
  const collisionEixoX = eixo.box.x - (0.5 + 0.5 * geometry.parameters.width) < x && eixo.box.x > x  - (0.5 + 0.5 * geometry.parameters.width) 
 
  if(collisionEixoX){
    console.log('')
  }
}

function Box (props: { position: any, keyboardButton: string, movi: (event: string) => void }) {
  const ref = useRef<Mesh>(null!)
  const [clicked, click] = useState(false)

  useFrame((_state, _delta) => {
    console.log(ref.current.position)
    if (props.keyboardButton === 'a') {
      ref.current.position.x -= 0.01
    }
    else if (props.keyboardButton === 'd') {
      ref.current.position.x += 0.01
    }
    else if (props.keyboardButton === 'w') {
      ref.current.position.y += 0.01
    }
    else if (props.keyboardButton === 's') {
      ref.current.position.y -= 0.01
    }
    eixo.box = ref.current.position
  })


  props.keyboardButton === 's' ?
    useFrame((_state, _delta) => {

      console.log(ref.current.geometry)
    })
    : useFrame((_state, _delta) => ref.current.position.y -= 0)

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(_event) => click(!clicked)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

function BoxPink (props: { position: any, keyboardButton: string, movi: (event: string) => void }) {
  const ref = useRef<Mesh>(null!)
  const [clicked, click] = useState(false)
  console.log(ref.current)
  useFrame((_state, _delta) => {


    if (props.keyboardButton === 'ArrowLeft') {
      ref.current.position.x -= 0.01;
    }
    else if (props.keyboardButton === 'ArrowRight') {
      ref.current.position.x += 0.01
    }
    else if (props.keyboardButton === 'ArrowUp') {
      ref.current.position.z -= 0.01
    }
    else if (props.keyboardButton === 'ArrowDown') {
      ref.current.position.z += 0.01
    }
    
    collision(ref.current)
  })

  return (

    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(_event) => click(!clicked)}>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  )
}

function App () {
  const [keyboardButton, setKeyboardButton] = useState('');
  return (
    <div className="App" tabIndex={0} onKeyDown={event => { setKeyboardButton(event.key) }}>
      <Canvas camera={{ fov: 10, position: [50, 55, 50] }}  >
        <ambientLight />
        <pointLight position={[(window.innerWidth / (window.innerHeight)), (window.innerWidth / (window.innerHeight / 20)), -80]} />

        <Box position={[-1.2, 0, 0]} keyboardButton={keyboardButton} movi={(event) => { setKeyboardButton(event) }} />
        <BoxPink position={[1.2, 0, 0]} keyboardButton={keyboardButton} movi={(event) => { setKeyboardButton(event) }} />
      </Canvas>
    </div>
  );
}

export default App;
