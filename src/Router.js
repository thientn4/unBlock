import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from './pages/login'
import Account from './pages/account'
import EditGroup from './pages/editGroup'
import Group from './pages/group'

const Content = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/group/edit" element={<EditGroup/>}/>
                <Route path="/group" element={<Group/>}/>
            </Routes>
        </div>
    );
}

export default Content;