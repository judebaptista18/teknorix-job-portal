import { Grid, Paper, TextField, FormControl, Select, MenuItem, InputLabel, Chip, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

import BusinessIcon from '@mui/icons-material/Business';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

import './styles/view.scss'

export default function View(jobDetails){
    const location = useLocation()
    const { job, otherJobs } = location.state

    useEffect(()=>{
        if(job.description){
            document.getElementById('job-desc').innerHTML = job.description
        }
    })

    return(
        <Grid className="job-list-container">
            <div>
                <h2>{job.slug}</h2>
                <h1 className="view-job-title">{job.title}</h1>
                <div className="job-summary-details">
                    <div className="job-summary-item"><div className="detail-icon"><BusinessIcon/></div>{job.department.title}</div>
                    <div className="job-summary-item"><div className="detail-icon"><PlaceOutlinedIcon/></div>{job.location.title}</div>
                    <div className="job-summary-item job-type">{job.type}</div>
                </div>
                <div className="view-apply-btn-container">
                    <a href={job.applyUrl} target="_blank"><Button className="view-apply-btn" variant="contained" color="primary">Apply</Button></a>
                </div>
            </div>
            <hr style={{"border": "0.01em solid rgb(227, 230, 240)"}}></hr>
            <Grid container className="view-container" spacing={3}>
                <Grid item lg={9}>
                    <div className="job-desc" id="job-desc">
                    </div>
                </Grid>
                <Grid item lg={3}>
                <div className="other-job-openings">
                    <h3>OTHER JOB OPENINGS</h3>
                    <div className="short-underline"></div>
                    {otherJobs.map((job) => {
                        return (
                        <>
                            <h4 className="other-job-title">{job.title}</h4>
                            <div className="job-summary-details">
                                <div className="job-summary-item"><div className="detail-icon"><BusinessIcon/></div>{job.department.title}</div>
                                <div className="job-summary-item"><div className="detail-icon"><PlaceOutlinedIcon/></div>{job.location.title}</div>
                            </div>
                        </>
                        )
                    })}                
                </div>
                </Grid>
            </Grid>
           
        </Grid>
    )
   
}