import { useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [isBreadMoving, setIsBreadMoving] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isFurnaceOn, setIsFurnaceOn] = useState(false)
  const [isBreadBakedMoving, setIsBreadBakedMoving] = useState(false)
  const [isConveyorBeltLit1, setIsConveyorBeltLit1] = useState(false)
  const [isConveyorBeltLit2, setIsConveyorBeltLit2] = useState(false)
  const [process, setProcess] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)

  const timeouts = useRef<number[]>([])

  useEffect(() => {
    let timer: number 
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [remainingTime])

  function run() {
    setIsBreadMoving(true)
    setIsConveyorBeltLit1(true)
    setProcess(1)
    setRemainingTime(4)
    timeouts.current.push(window.setTimeout(() => {
      setIsFurnaceOn(true)
      setIsConveyorBeltLit1(false)
      setProcess(2)
      setRemainingTime(10)
      timeouts.current.push(window.setTimeout(() => {
        setIsFurnaceOn(false)
        setIsConveyorBeltLit2(true)
        setIsBreadBakedMoving(true)
        setProcess(3)
        setRemainingTime(4)
        timeouts.current.push(window.setTimeout(() => {
          setIsConveyorBeltLit2(false)
          setProcess(4)
          setRemainingTime(0)
          timeouts.current.push(window.setTimeout(() => {
            handleReset()
            timeouts.current.push(window.setTimeout(() => {
              run()
            }, 1000))
            
          },1000))
        }, 4000))
      }, 10000))
    }, 4000))
  }

  function handleStart(){
    if(!isRunning){
      run()
    }
   setIsRunning(true)
   
  }

  const handleReset = () => {
    setProcess(0)
    setRemainingTime(0)
    setIsBreadMoving(false)
    setIsFurnaceOn(false)
    setIsBreadBakedMoving(false)
    setIsConveyorBeltLit1(false)
    setIsConveyorBeltLit2(false)
    setIsRunning(false)
    timeouts.current.forEach(timeout => clearTimeout(timeout))
    timeouts.current = []
  }

let processArray=["Inactivo", "Cinta transpotadora 1", "Horneado","Cinta transpotadora 2", "Finalizado" ]

  return (
    <>
      <div className='mainContainer'>
        <div className='gridContainer'>
          <div className='inputsAndTextContainer'>
            <div className='inputContainer'>
              <div className='buttomContainer'>
                <h3>Iniciar</h3>
                <button className='buttonStart' onClick={() => handleStart()}/>
              </div>
              <div className='buttomContainer'>
                <h3>Reset</h3>
                <button className='buttonStop' onClick={() =>  handleReset()}/>
              </div>
             
            </div>
            <div className='textContainer'>
              <h3>Proceso: <span>{processArray[process]}</span></h3>
              <p>Tiempo restante: <span>{remainingTime} segundos</span></p>
            </div>
          </div>
          <div className='processContainer'>
            <div className='processLayout'>
              <div className='conveyorBelt'>
                <div className={`ligth ${isConveyorBeltLit1 ? 'greenL' : 'redL'}`}/>
              </div>
              <div className='furnace'>
                <div className={`ligth ${isFurnaceOn ? 'greenL' : 'redL'}`}/>
              </div>
              <div className='conveyorBelt'>
                <div className={`ligth ${isConveyorBeltLit2 ? 'greenL' : 'redL'}`}/>
              </div>
              <div className={`bread ${isBreadMoving ? 'move' : ''}`}/>
              <div className={`breadBaked ${isBreadBakedMoving ? 'move' : ''}`}/>
            </div>
          </div>
          <div className="nameContainer">
              <p> Jordano Pernia, Automatización Industrial, sección 1, 2024-3</p>
           </div>
        </div>
        
      </div>
      
    </>
  )
}

export default App
