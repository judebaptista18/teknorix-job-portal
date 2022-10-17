import * as React from 'react';
import {Router,BrowserRouter, Route , Routes } from 'react-router-dom'

import JobList from "../pages/jobList";
import View from "../pages/view";
export default function ViewController() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/job-list" element={<JobList />}/>
                <Route path="/view" element={<View />}/>
            </Routes>
        </BrowserRouter>
    )
}
