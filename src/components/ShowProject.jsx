import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../Services/operations/projectAPI';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import DeleteModal from './DeleteModal';

const ShowProject = () => {
  const [projects, setProjects] = useState([]);
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState("");
  const token = JSON.parse(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    console.log("Token value is:", token);
    const response = await getAllProjects(token);
    if (response) {
      setProjects(response.projects);
      console.log(response.projects);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]);

  function handleClick(e, project) {
    e.preventDefault();
    const id = uuidV4();
    console.log("Generated UUID:", id);
    console.log("Selected Project:", project);

    localStorage.setItem("projectId", JSON.stringify(project._id));

    navigate(`/editor/${id}`, {
      state: {
        project,
        username:project.userId.username,
        ownerId: project.userId._id,
      },
    });
  }

  function handleDeleteModal(projectId) {
    setDeleteProjectId(projectId);
    setIsDeleteModelShow(true);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full relative">
      <div className='absolute top-3 left-6'>
        <button className='bg-green-600 px-5 py-2 rounded-md font-bold text-white' onClick={()=> {navigate('/home')}}>
          Back
        </button>
      </div>

      {projects.length > 0 ? projects.map((project) => (
        <div key={project.id} className=" mt-8 w-full max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
            <div className="flex items-center gap-3 w-full" onClick={(e) => handleClick(e, project)}>
              <img className="w-14 h-14 rounded-lg shadow-lg" src="./green_code.png" alt="" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm">
                  {project.userId.username} - {project.userId.email}
                </p>
              </div>
            </div>
            <div className="mt-2 sm:mt-0">
              <img
                onClick={() => handleDeleteModal(project._id)}
                className="w-8 h-8 cursor-pointer mx-4 transition duration-300 transform hover:scale-110"
                src="./delete.png"
                alt="Delete"
              />
            </div>
          </div>
        </div>
      )) : (
        <div className='flex justify-center items-center mt-10'>
          <div className='px-10 py-3 bg-green-600 rounded-md'>
            No Project Found
          </div>
        </div>
      )}
      {isDeleteModelShow && (
        <DeleteModal setIsDeleteModelShow={setIsDeleteModelShow} deleteProjectId={deleteProjectId} refreshProject={fetchProjects} />
      )}
    </div>
  );
};

export default ShowProject;
