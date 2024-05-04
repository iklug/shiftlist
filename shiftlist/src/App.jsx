import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import TodoList from "./pages/TodoList";
import Sidebar from "./components/Sidebar";
import SidebarTab from "./components/SidebarTab";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<TodoList />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>
        </div>
    );
}

export default App;
