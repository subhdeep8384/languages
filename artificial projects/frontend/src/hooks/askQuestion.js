import { useState } from "react"
const askQuestion = () =>{
    const [loading , setLoading ] = useState(false)
    const ask = async ( question ) => {
        setLoading(true)
        try{
            console.log(question)
            const res = await fetch("http://localhost:3000" ,{
                method : "POST" ,
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ question})
            })
            if (res.ok) {
                setLoading(false)
                const data = await res.json(); 
                const text = data.candidates[0].content;
                return text.parts[0].text;  
            } else {
                console.error("Failed to fetch:", res.status, res.statusText);
                return null; 
            }
        }catch(e){
            setLoading(false)
            console.log(e)
        }
    }
    return {ask , loading }
}

export default askQuestion 