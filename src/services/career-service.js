import axios from "axios"
let baseUrl = 'https://teknorix.jobsoid.com/'
const careerService = {
    getJobList(search,dept,loc,fun){
        let queryParams = {}
        if(search)
            queryParams['q'] = search
        if(dept)
            queryParams['dept'] = dept
        if(loc)
            queryParams['loc'] = loc
        if(fun)
            queryParams['fun'] = fun
        return axios.get(baseUrl + 'api/v1/jobs', { params: queryParams})
    },
    getAllDepartments(){
        return axios.get(baseUrl + '/api/v1/departments')
    },
    getAllLocations(){
        return axios.get(baseUrl + '/api/v1/locations')
    },
    getAllFunctions(){
        return axios.get(baseUrl + '/api/v1/functions')
    },

}

export default careerService