import React, { useState } from "react";
import { z } from 'zod';

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
})

const LoginForm: React.FC<{ onLogin: (username: string) => void }> = ({ onLogin }) => {

const [username,setUsername]=useState<string>('');
const [error,setError]=useState<string | null>(null);



const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();

    try{
        loginSchema.parse({username});
        setError(null);
        onLogin(username)
    }catch(e){
        if(e instanceof z.ZodError){
            setError(e.errors[0].message);
        }
    }

}

    return (
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    )
}

export default LoginForm;