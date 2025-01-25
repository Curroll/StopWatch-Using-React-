import { useEffect, useRef, useState } from "react"
/*    This is my Codes*/ 

function StopWatch(){
    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0);
    const IntervalIdRef= useRef(null);
    const StartTimeRef = useRef(0);

    useEffect(()=>{
       if(isRunning){
        IntervalIdRef.current = setInterval(()=>{
            setElapsedTime(Date.now()-StartTimeRef.current)
        },10); 
       }
        return()=>{
            if(IntervalIdRef.current){
                clearInterval(IntervalIdRef.current);
                IntervalIdRef.current=null;
            }
        }
    },[isRunning])

    function Start(){
       if(!isRunning){
        setIsRunning(true);
        StartTimeRef.current = Date.now() - elapsedTime;
       }
    }
    function Stop(){ 
        setIsRunning(false)
    }
    function Reset(){
        setElapsedTime(0)
        setIsRunning(false)
    }
    function FormatTime(){

        let hours = Math.floor(elapsedTime / (1000*60*60));
        let minutes = Math.floor(elapsedTime / (1000*60)%60);
        let seconds = Math.floor(elapsedTime / (1000)%60);
        let milisecods = Math.floor((elapsedTime % 1000)/10);

        hours = String(hours).padStart(2,"0")
        minutes = String(minutes).padStart(2,"0")
        seconds = String(seconds).padStart(2,"0")
        milisecods = String(milisecods).padStart(2,"0")




        return(`${hours}:${minutes}:${seconds}:${milisecods}`)

    }

    return(
       <>
       
        <div className="Stopwatch">
        <h1 className="head">StopWatch</h1>
            <div className="display">{FormatTime()}</div>
            <div className="controls">
                <button className="Start" onClick={Start}>Start</button>
                <button className="Stop" onClick={Stop}>Stop</button>
                <button className="Reset" onClick={Reset}>Reset</button>
            </div>
        </div>
       </>
    )
}
export default StopWatch