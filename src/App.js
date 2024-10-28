import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ShowProject from './components/ShowProject';
import PrivateRoute from './components/PrivateRoute';
import NewFile from './pages/NewFile';

function App() {
    return (
        <>
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
            </div>
            <BrowserRouter>
                <Routes>
                    {/* <Route path='/' element={<SignUp/> }></Route> */}
                    <Route path='/' element={<NewFile/> }></Route>
                    <Route path='/login' element={<Login/> }></Route>

                    <Route path='/home' element={ <PrivateRoute><Home/></PrivateRoute>  }></Route>
                    <Route
                        path="/editor/:roomId"
                        element={ <PrivateRoute> <EditorPage/></PrivateRoute> }
                    ></Route>

                    <Route path='/allprojects' element={<PrivateRoute><ShowProject/></PrivateRoute> }></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
