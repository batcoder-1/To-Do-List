import React, { useEffect, useState } from "react";
const url='https://api.realinspire.live/v1/quotes/random';
 function Quote(){
    const [quote,setquote]=useState("");
    const [author,setauthor]=useState("");
    const getquote= async()=>{
   const res= await fetch(url);
   const data=await res.json();
  setquote(data[0].content);
  setauthor(data[0].author);
    }
  useEffect(()=>{
  getquote();
  },[])

return(
    <>
    <div id="quote-container"><p>{quote}</p><br/><p>{author}</p></div>
    </>
)
 }
 export default Quote;