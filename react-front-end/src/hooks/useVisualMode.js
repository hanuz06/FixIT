import {useState} from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if(replace===true){
      history.pop()
    }
    setMode(newMode);
    setHistory([...history, newMode]);
  };

  const back = () => {    
    
    if(history.length>1){
      history.pop();
      setHistory(history);        
      setMode(history[history.length-1]);      
    } 
    else {
      setMode(history[0])
    }
  };
  return { mode, transition, back };
}