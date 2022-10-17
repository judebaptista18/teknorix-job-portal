import { Grid, Paper, TextField, FormControl, Select, MenuItem, InputLabel, Chip, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import careerService from "../services/career-service";

import { Link } from 'react-router-dom'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BusinessIcon from '@mui/icons-material/Business';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

import './styles/jobList.scss'

function DepartmentJobList(jobList){
    let departmentJobList = []
    for(let job in jobList){
        departmentJobList.push(
            <Grid container>
                <div className="job-summary-container">
                    <h4 className="job-title">{jobList[job].title}</h4>
                    <div className="job-summary-details">
                        <div className="job-summary-item"><div className="detail-icon"><BusinessIcon/></div>{jobList[job].department.title}</div>
                        <div className="job-summary-item"><div className="detail-icon"><PlaceOutlinedIcon/></div>{jobList[job].location.title}</div>
                        <div className="job-summary-item job-type">{jobList[job].type}</div>
                        <div className="apply-view-btn-container">
                            <a href={jobList[job].applyUrl} target="_blank"><Button className="apply-btn" variant="outlined" color="primary">Apply</Button></a>
                            <Link to='/view' state={{ job: jobList[job], otherJobs:jobList }}><Button className="view-btn" variant="text">View</Button></Link>
                        </div>
                    </div>
                </div>
            </Grid>
        )
    }
    return departmentJobList
}

export default function JobList(){
    let storeFilters = getFilterStore()
    const [jobList, setJobList] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [allLocations, setAllLocations] = useState([]);
    const [allFunctions, setAllFunctions] = useState([]);
    const [searchText, setSearchText] = useState(storeFilters ? storeFilters.searchText : "" );
    const [selectedDepartment, setSelectedDepartment] = useState(storeFilters ? storeFilters.dept : "None");
    const [selectedLocation, setSelectedLocation] = useState(storeFilters ? storeFilters.loc : "None");
    const [selectedFunction, setSelectedFunction] = useState(storeFilters ? storeFilters.func : "None");
    useEffect(()=>{
        getAllDepartments()
        getAllLocations()
        getAllFunctions()
        let storeFilters = getFilterStore()
        if(storeFilters === null){
            setFilterStore()
        }
    },[])
    useEffect(()=>{
        setFilterStore()
        getJobList(searchText,selectedDepartment.id,selectedLocation.id,selectedFunction.id)
    },[searchText,selectedDepartment,selectedLocation,selectedFunction])

    function setFilterStore(){
        let filters = {'searchText': searchText, 'dept': selectedDepartment, 'loc': selectedLocation, 'func': selectedFunction}
        localStorage.setItem("filters",JSON.stringify(filters))
    }

    function getFilterStore(){
        let filters = localStorage.getItem('filters')
        if (filters !== null){
            return JSON.parse(filters)
        }
        else{
            return null
        }
    }

    function handleSearchChange(evt){
        let timer = setTimeout(function(){
            clearTimeout(timer) 
            setSearchText(evt.target.value)
        },1000)
    }

    function getJobList(search,dept,loc,fun){
        careerService.getJobList(search,dept,loc,fun).then((res) => {
            if(res.status === 200){
                let groupedJobList = groupJobsByDepartment(res.data)
                setJobList(groupedJobList)
            }
        })
    }

    function groupJobsByDepartment(jobList){
        let deptArray = jobList.map((job) => job.department.title)
        let uniqueDepts = [...new Set(deptArray)]
        let groupedByDepartments = {}
        for(let dept in uniqueDepts){
            for(let job in jobList){
                if(uniqueDepts[dept] === jobList[job].department.title){
                    if(groupedByDepartments[uniqueDepts[dept]]){
                        groupedByDepartments[uniqueDepts[dept]] = [...groupedByDepartments[uniqueDepts[dept]],jobList[job]]
                    }
                    else{
                        groupedByDepartments[uniqueDepts[dept]] = [jobList[job]]
                    }                
                }
            }
        }
        return groupedByDepartments
    }

    function getAllDepartments(){
        careerService.getAllDepartments().then((res) => {
            if(res.status === 200){
                setAllDepartments(res.data)
            }
        })
    }

    function getAllLocations(){
        careerService.getAllLocations().then((res) => {
            if(res.status === 200){
                setAllLocations(res.data)
            }
        })
    }
    
    function getAllFunctions(){
        careerService.getAllFunctions().then((res) => {
            if(res.status === 200){
                setAllFunctions(res.data)
            }
        })
    }

    return (
        <Grid container>
            <Paper className="filter-card">
                <TextField onChange={(evt) => {handleSearchChange(evt);setFilterStore()}} label="Search for Job" className="search-input" id="outlined-basic" variant="outlined" defaultValue={searchText} />
                <div className="filter-container">
                    <FormControl className="select-form-control" variant="outlined" fullWidth>
                        <InputLabel id="dept-label">Department</InputLabel>
                        <Select
                            defaultValue={selectedDepartment.title}
                            labelId="dept-label"
                            id="dept"
                            value={selectedDepartment}
                            onChange={(evt) => setSelectedDepartment(evt.target.value)}
                            label="Department"
                            IconComponent = {KeyboardArrowRightIcon}
                        >
                            <MenuItem value='None'>
                                <em>All</em>
                            </MenuItem>
                            {allDepartments && allDepartments.map((dept) => {
                                return <MenuItem key={dept.id} value={dept}>{dept.title}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className="select-form-control" variant="outlined" fullWidth>
                        <InputLabel id="location-label">Loacation</InputLabel>
                        <Select
                            labelId="location-label"
                            id="location"
                            value={selectedLocation}
                            onChange={(evt) => setSelectedLocation(evt.target.value)}
                            label="Location"
                            IconComponent = {KeyboardArrowRightIcon}
                        >
                            <MenuItem value='None'>
                                <em>All</em>
                            </MenuItem>
                            {allLocations && allLocations.map((loc) => {
                                return <MenuItem key={loc.id} value={loc}>{loc.title}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className="select-form-control" variant="outlined" fullWidth>
                        <InputLabel id="func-label">Function</InputLabel>
                        <Select
                            labelId="func-label"
                            id="func"
                            value={selectedFunction}
                            onChange={(evt) => setSelectedFunction(evt.target.value)}
                            label="Function"
                            IconComponent = {KeyboardArrowRightIcon}
                        >
                            <MenuItem value='None'>
                                <em>All</em>
                            </MenuItem>
                                {allFunctions && allFunctions.map((fun) => {
                                    return <MenuItem key={fun.id} value={fun}>{fun.title}</MenuItem>
                                })}
                        </Select>
                    </FormControl>
                </div>
            </Paper>
            { (selectedDepartment !== 'None' || selectedLocation !== 'None' || selectedFunction !== 'None') && <Paper className="filter-card">
                <div>
                    {selectedDepartment !== 'None' && <Chip className="chip-item" label={selectedDepartment.title} variant="outlined" onDelete={() => setSelectedDepartment('None')} />}
                    {selectedLocation !== 'None' && <Chip className="chip-item" label={selectedLocation.title} variant="outlined" onDelete={() => setSelectedLocation('None')} />}
                    {selectedFunction !== 'None' && <Chip className="chip-item" label={selectedFunction.title} variant="outlined" onDelete={() => setSelectedFunction('None')} />}
                </div>
            </Paper>}

            <Paper className="job-list-container">
                {Object.keys(jobList).length > 0 ? Object.keys(jobList).map((dept) => {
                    return(
                        <div>
                            <h2>{dept}</h2>
                            <div className="short-underline"></div>
                            {DepartmentJobList(jobList[dept])}
                        </div>
                    )
                }): <Typography className="no-jobs" variant="subtitle2"><em>No jobs found</em></Typography>}
            </Paper>
        </Grid>
    )
}
