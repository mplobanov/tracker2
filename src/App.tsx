import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import {Login} from "./pages/Login";
import {TaskList} from "./pages/TaskList";
import {TaskPage} from "./pages/TaskPage";
import {CreateTask} from "./pages/CreateTask";
import {UserPage} from "./pages/UserPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login/>} path={"/login"}/>
                <Route path={"/list"} element={<TaskList/>}/>
                <Route path={"/task/:taskSlug"} element={<TaskPage />} />
                <Route path={"/create"} element={<CreateTask />} />
                <Route path={"/user/:userId"} element={<UserPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
