import React, { useRef, useState } from 'react';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

let eixo = { box: { x: -1.2, y: 0, z: 0 }, boxPink: { x: 0, z: 0 } };

const collision = ({ position, geometry }: { position: { x: number, y: number, z: number }, geometry: { parameters?: { width: number, height: number } } | any }) => {
  const { x, y, z } = position
  const collisionEixoX = eixo.box.x - (0.5 + 0.5 * geometry.parameters.width) < x 
  && eixo.box.x > x - (0.5 + 0.5 * geometry.parameters.width)
  const collisionEixoY = eixo.box.y - (0.5 + 0.5 * geometry.parameters.height) < y 
  && eixo.box.y > y - (0.5 + 0.5 * geometry.parameters.height)
  const collisionEixoZ = eixo.box.z + (0.5 + 0.5 * geometry.parameters.height) > z
  && eixo.box.z < z + (0.5 + 0.5 * geometry.parameters.height)

  if (collisionEixoX && collisionEixoY && collisionEixoZ) {
    console.log('bateu')
  }
}

function Box (props: { position: any, keyboardButton: string, movi: (event: string) => void }) {
  const ref = useRef<Mesh>(null!)
  const [clicked, click] = useState(false)

  useFrame((_state, _delta) => {
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
    else if (props.keyboardButton === 'q') {
      ref.current.rotation.x += 0.01
    }
    else if (props.keyboardButton === 'e') {
      ref.current.rotation.x -= 0.01
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
