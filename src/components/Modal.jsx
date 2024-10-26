import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Modal = ({ closeModal,setProjectTitle,code }) => {

    const[projectName,setProjectName] = useState("");

    if(code === ""){
        toast.error("Please Write something to save code");
        closeModal();
    }
    
    const handleSubmitTitle = (e)=>{
        e.preventDefault();
        setProjectTitle(projectName);
        closeModal();
    }
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-2xl font-semibold mb-4">Save Changes</h2>
                <form>
                <input 
                type='text'
                value={projectName}
                onChange={(e)=> setProjectName(e.target.value)}
                placeholder='Enter Project Title'
                className='w-full text-center border-none outline-none text-black font-bold'
                />
        
                <div className="mt-4 flex justify-center space-x-4">
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-all"
                        onClick={handleSubmitTitle}
                    >
                        Save
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-all"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
