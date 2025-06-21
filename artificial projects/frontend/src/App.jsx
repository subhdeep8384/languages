import { useState , useEffect } from 'react'
import askQuestion from "../src/hooks/askQuestion"
import Loading from './skeletons/loading'
import { TypeAnimation } from 'react-type-animation';
import { stringify } from 'postcss';

const TypingAnimation = ({ text, speed = 1500 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const words = text.split(' ');
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => (prev + (index > 0 ? ' ' : '') + words[index]));
      index++;
      if (index >= words.length -1 ) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <div>{displayedText}</div>;
};



function App() {

  const {ask ,loading} = askQuestion() 
  const [question, setQuestion] = useState("")
  const [ans , setAns] = useState("")
  console.log(ans)

  const submitHandler = async (e) => {
    e.preventDefault()
    let data =  await ask(question)
    setQuestion("")
    setAns(data)
  }

 
  return (
    <>
<div className="w-full h-[90vh] bg-gray-800">
  {ans ? (
    <div className="text-2xl text-center items-center font-bold w-full h-[90vh] bg-gray-800 overflow-auto">
      {loading ? <Loading /> :  <TypingAnimation text={ans} speed={100} />}
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen text-center text-5xl font-bold">
      hi how can i help you
    </div>
  )}
</div>



        <div>
          <form onSubmit={submitHandler} >
            <label htmlFor="question">
              <span>Ask anything</span>
            </label>
            <input type="text" id="question" name="question" required 
            value={question}
             onChange={(e) => {setQuestion(e.target.value)}} 
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      
    </>
  )
}

export default App
