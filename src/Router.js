import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from './pages/login'
import Account from './pages/account'
import EditGroup from './pages/editGroup'

const Content = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/group/edit" element={<EditGroup/>}/>
            </Routes>
        </div>
    );
}

export default Content;