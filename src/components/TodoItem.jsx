import React, { useState } from "react";
import { useTodo } from "../context/Context";

function TodoItem({todo}) {
    const {updatetodo,deletetodo,checktodo}=useTodo();
    const [isTodoEditable,setIsTodoEditable]=useState(false);
    const [todoMsg,setTodoMsg]=useState(todo.todo);
    const edit=()=>{
        updatetodo(todo.id,{...todo,todo:todoMsg});//By spreading we are ensuring that we only change one value that is to msg
        setIsTodoEditable(false);// then we cant edit
    }
const toggle=()=>{
    checktodo(todo.id);
}
    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.checked}
                onChange={toggle}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.checked ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.checked) return;

                    if (isTodoEditable) {
                        edit();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.checked}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deletetodo(todo.id)
                }
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
