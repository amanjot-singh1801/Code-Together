import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../Services/operations/authAPI';

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    // console.log(email);
    // console.log(pwd);
    login(email,pwd,navigate);
  }

  return (
    <>
      <div className="container w-screen min-h-screen flex items-center justify-between pl-[100px]">
        <div className="left w-[35%]">
          <img className='w-[200px]' src="/code-sync.png" alt="" />
          <form onSubmit={submitForm} className='w-full mt-[60px]' action="">

            <div className="inputBox">
              <input required onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" placeholder='Email'/>
            </div>

            <div className="inputBox">
              <input required onChange={(e)=>{setPwd(e.target.value)}} value={pwd} type="password" placeholder='Password'/>
            </div>

            <p className='text-[gray]'>Don't have an account <Link to="/signUp" className='text-[#00AEEF]'>Sign Up</Link></p>
            
            <p className='text-red-500 text-[14px] my-2'>{error}</p>

            <button className="px-5 py-2 border-none bg-green-700 rounded-md text-center text-xl w-full cursor-pointer mt-[20px]">Login</button>
          </form>
        </div>
        <div className="right w-[55%]">
          <img className='h-[100vh] w-[100%] object-cover' src="/authPageSide.png" alt="" />
        </div>
      </div>
    </>
  )
}

export default Login