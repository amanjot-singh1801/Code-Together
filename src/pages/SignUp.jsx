import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../Services/operations/authAPI';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    signUp(name,username,pwd,email,navigate);
  }

  return (
    <div>

        <div className='flex items-center justify-between h-screen'>
            <div className='w-[38%] flex-col justify-center pl-20 rightForm '>
                <div>
                    <img className='w-[300px] flex justify-center' src="/logo.png" alt="" />
                </div>
                <form onSubmit={submitForm} className='mt-[10px]' action="">
                    <div className="inputBox">
                    <input required onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text" placeholder='Username'/>
                    </div>

                    <div className="inputBox">
                    <input required onChange={(e)=>{setName(e.target.value)}} value={name} type="text" placeholder='Name'/>
                    </div>

                    <div className="inputBox">
                    <input required onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" placeholder='Email'/>
                    </div>

                    <div className="inputBox">
                    <input required onChange={(e)=>{setPwd(e.target.value)}} value={pwd} type="password" placeholder='Password'/>
                    </div>

                    <p className='text-[gray]'>Already have an account <Link to="/login" className='text-[#00AEEF]'>login</Link></p>

                    <p className='text-red-500 text-[14px] my-2'>{error}</p>

                    <button className="px-5 py-2 border-none bg-green-700 rounded-md text-center text-xl w-full cursor-pointer mt-[20px]">Sign Up</button>
                </form>
            </div>
            

            <div className="hidden md:flex md:w-1/2 lg:w-[55%] items-center justify-end">
                <img
                className="h-screen w-screen object-cover"
                src="authPageSide.png"
                alt="Auth Background"
                />
            </div>

        </div>
      
    </div>
  )
}

export default SignUp