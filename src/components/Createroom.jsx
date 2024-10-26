import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import ShowProject from './ShowProject';

const Createroom = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room');
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & username is required');
            return;
        }

        // Redirect
        navigate(`/editor/${roomId}`, {
            state: {
                username,
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };

    const handleLogout = (e)=>{
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate("/login");
    }
    return (
        <div className="homePageWrapper relative">
            <div className="formWrapper">
                <img
                    className="homePageLogo"
                    src="/logo.png"
                    alt="logo"
                />
                <h4 className="mainLabel">Paste invitation ROOM ID</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="USERNAME"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />
                    <button className="btn joinBtn" onClick={joinRoom}>
                        Join
                    </button>
                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <a
                            onClick={createNewRoom}
                            href=""
                            className="createNewBtn"
                        >
                            new room
                        </a>
                    </span>
                </div>
            </div>
            <div className='mt-10'>
                <Link to="/allprojects" className='bg-green-500 px-10 py-4 hover:bg-green-800 transition-all rounded-md font-bold'>
                    View All Saved Projects
                </Link>
            </div>

            <button className='absolute top-0 right-5 bg-green-500 px-5 py-2 hover:bg-green-800 transition-all rounded-md font-bold' onClick={handleLogout}>
                logout
            </button>
        </div>
    );
};

export default Createroom;
