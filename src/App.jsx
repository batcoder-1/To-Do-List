import { useEffect, useState } from 'react'
import './App.css'
import { Todoprovider } from './context/Context'
import { useContext } from 'react'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setodos] = useState([]);
const addtodo =(todo)=>{   // we define functionality here of our all functions 
  // In this we set new todo remember todos is an array of objects so setodos removes all previous one and add new hence we get prevtodos by callback spread them and created a todo with id as random date and spread it as well
  setodos((prevtodo)=>[...prevtodo,{id: Date.now(),...todo}])
}
const updatetodo=(id,todo)=>{// here we are updating by looping through each todo and checking for given id 
setodos((prevtodo)=>prevtodo.map((prevtodo)=>(prevtodo.id===id?todo:prevtodo)))
}
const deletetodo=(id)=>{  
  console.log(id);  // same as spread operator it creates shallow copy of original while ensuring that the unwanted doesnt come
  setodos((prevtodo)=>prevtodo.filter((todo)=>(todo.id!==id)))
}
const checktodo=(id)=>{ // iterating over every todo and checking for id after finding we spread the previous properties and toggled checked otherwise same
  setodos((prevtodo)=>prevtodo.map((todo)=>todo.id===id?{...todo,checked:!todo.checked}:todo))
}
useEffect(()=>{
 const todos=JSON.parse(localStorage.getItem("todos"));// basically getting all todo to by its key and converting it in json format
 if(todos&&todos.length>0){ // it loads todos on site
  setodos(todos);
 }
},[])
// another useffect so that whenever todo is changed it we should set it in localstorage
useEffect(()=>{
localStorage.setItem("todos",JSON.stringify(todos))
},[todos])
  return (
    <Todoprovider value={{todos,addtodo,deletetodo,updatetodo,checktodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'><TodoItem todo={todo}/></div>  // we are using keys instead of indexes so as indexes is not recommended to use for optimisation
                        ))}
                    </div>
                </div>
            </div>
    </Todoprovider>
  )
}

export default App
