import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';
const Quiz = () => {
  let [index,setindex]=useState(0);
  let [question,setquestion]=useState(data[index])
  let [lock,setlock]=useState(false);
  let [score,setscore]=useState(0);
  let [result,setresult]=useState(false);
  let [name,setname]=useState("")

  let Option1=useRef(null);
  let Option2=useRef(null);
  let Option3=useRef(null);
  let Option4=useRef(null);
  let option_array=[Option1,Option2,Option3,Option4];

  const checkAns=(e,ans)=>{
    if(lock===false)
    {
      if(question.ans===ans){
        e.target.classList.add("correct");
        setlock(true);
        setscore(prev=>prev+1);
      }
        else{
        e.target.classList.add("wrong");
        setlock(true);
        option_array[question.ans-1].current.classList.add("correct");
        }
    }
    }
    const next=()=>{
      if(lock===true){
        if(index===data.length-1){
          setresult(true);
          return 0;
        }
        setindex(++index);
        setquestion(data[index]);
        setlock(false);
        option_array.map((option)=>{
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
          return null;
        })
      }
    }
    const reset= ()=>{
      setindex(0);
      setquestion(data[0]);
      setscore(0);
      setlock(false);
      setresult(false);
    }

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <h5 style={{color:'green'}}>~created by Rajdeep</h5>
       <hr/>
       {result?<></>:<> <label>Name<span style={{color:'red'}}>*</span></label>
      <input type="text" className='name' value={name} onChange={(e)=>setname(e.target.value)}  placeholder='Enter your name' />
       
       <h2>{index+1}. {question.question}</h2>
       <ul>
         <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
         <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
         <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
         <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
       </ul>
       <button onClick={next}>Next</button>
       <div className='index'>{index+1} of {data.length}</div>
       </>}
       {result?(<>{name.length>0?<>
        <h2>{name} scored {score} out of {data.length}</h2>
      <button onClick={reset} >Restart the Quiz</button>
      </>:<> <h2>You scored {score} out of {data.length}</h2>
      <button onClick={reset} >Restart the Quiz</button></>}
       </>):<></>}
      
    </div>
  )
  }
  export default Quiz
