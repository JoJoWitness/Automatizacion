import { useState, useEffect } from 'react'

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

  useEffect(() => {
    let timer: number 
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [remainingTime])

  function run(){
    setIsBreadMoving(true)
    setIsConveyorBeltLit1(true)
    setProcess(1)
    setRemainingTime(4)
    setTimeout(() => {
      setIsFurnaceOn(true)
      setIsConveyorBeltLit1(false)
      setProcess(2)
      setRemainingTime(10)
      setTimeout(() => {
        setIsFurnaceOn(false)
        setIsConveyorBeltLit2(true)
        setIsBreadBakedMoving(true)
        setProcess(3)
        setRemainingTime(4)
        setTimeout(() => {
          setIsConveyorBeltLit2(false)
          setProcess(4)
          setRemainingTime(0)
          }, 4000)
      }, 10000) // Furnace on for 10 seconds
    }, 4000) // Bread moving for 4 seconds
  }

  function handleStartClick(){
    if(isRunning == false){
      run()
    }
   setIsRunning(true)
   
  }

  const handleResetClick = () => {
    setIsBreadMoving(false)
    setIsFurnaceOn(false)
    setIsBreadBakedMoving(false)
    setIsConveyorBeltLit1(false)
    setIsConveyorBeltLit2(false)
    setIsRunning(false)
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
                <button className='buttonStart' onClick={() => handleStartClick()}/>
              </div>
              <div className='buttomContainer'>
                <h3>Reset</h3>
                <button className='buttonStop' onClick={() =>  handleResetClick()}/>
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
              <p> Jordano Pernia, Automatización Industrial, seccion 1, 2024-3</p>
           </div>
        </div>
        
      </div>
      
    </>
  )
}

export default App
