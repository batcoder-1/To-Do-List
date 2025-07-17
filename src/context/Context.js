import { createContext,useContext } from "react";

export const Context=createContext({
 todos:[
    {
        id:1,
        value:"Do something",
        checked:false,
    }
 ],
 addtodo:(todo)=>{},
 updatetodo:(todo,id)=>{},
 deletetodo:(id)=>{},
 checktodo:(id)=>{},
});
export const useTodo=()=>{
    return useContext(Context);
}
export const Todoprovider=Context.Provider