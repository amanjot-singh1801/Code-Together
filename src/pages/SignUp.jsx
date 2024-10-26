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
    <>
      <div className="container w-screen min-h-screen flex items-center justify-between pl-[100px]">
        <div className="left w-[35%]">
          <img className='w-[200px] flex justify-center' src="/code-sync.png" alt="" />
          <form onSubmit={submitForm} className='w-full mt-[40px]' action="">
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
        <div className="right w-[55%]">
          <img className='hidden lg:block md:block h-[100vh] w-[100%] object-cover' src='authPageSide.png' alt="" />
        </div>
      </div>
    </>
  )
}

export default SignUp