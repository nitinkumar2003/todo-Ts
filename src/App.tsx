import React,{useState} from "react";
import { BrowserRouter,Router,Route, Routes, } from "react-router-dom";
import TodoList from "./components/TodoList";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";


const App:React.FC=()=>{
const [username,setUserName]=useState<string | null>(null);
const hadleLogin=(user:string)=>{
  setUserName(user);
}


  return (
    <BrowserRouter>
            <div className="container">
                <h1>APP</h1>
                <Routes>
                    <Route path="/" element={username ? <TodoList /> : <LoginForm onLogin={hadleLogin} />} />
                    <Route path="users" element={<UserList />} />
                </Routes>
            </div>
        </BrowserRouter>
  )
}

export default App;