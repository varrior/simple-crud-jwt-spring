import axios from 'axios';

function register(data){
    return axios({
        url:'/api/user',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    }).then(response => {
        return response.data;
    })
    .catch(({response, message}) => {

        return {
            success: false,
            message: response.data.details ? 
                response.data.details.message ? 
                    response.data.details.message : 
                    response.data.details.messages ? 
                        response.data.details.messages.join('<br>') :
                        message :
                response.data.message
        }
    })
}
function checkUsername(data){
    return axios({
        url: '/api/user/checkusername',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    }).then(response => {
        return response.data;
    })
    .catch(error => {
        return {
            success: false,
            message: error.message
        }
    })
}
function checkEmail(data){
    return axios({
        url: '/api/user/checkemail',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data)
    }).then(response => {
        return response.data;
    })
    .catch(error => {
        return {
            success: false,
            message: error.message
        }
    })
}

function onLoginUser(data){
    return axios({
        url: '/api/authenticate',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        data: JSON.stringify(data)
    }).then(data => {
        return {
            ...data.data,
            message: "You have logged in correctly! Redirecting..."
        };
    })
    .catch(error => {
        return {
            message: "Unknown error occured",
            success: false,
            ...error.response.data,
        }
    })
}
function getUser(){
    return axios({
        url: '/api/user/me', 
        method: 'GET',
    }).then(response => {
        if(response){
            return  response.data    
        }
    })
    .catch(error => {
        return {
            success: false,
            message: error.response.message
        }
    })
}
function getAllUsers(id){
    return axios({
        url: '/api/user/list/' + id, 
        method: 'GET',
    }).then(response => {
        if(response){
            return  response.data    
        }
    })
    .catch(error => {
        return {
            success: false,
            message: error.message
        }
    })
}
function updateUser(data,id){
    return axios({
        url:'/api/user/update/' + id,
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    }).then(response => {
        return response.data;
    })
    .catch(({response, message}) => {

        return {
            success: false,
            message: response.data.details ? 
                response.data.details.message ? 
                    response.data.details.message : 
                    response.data.details.messages ? 
                        response.data.details.messages.join('<br>') :
                        message :
                response.data.message
        }
    })
}
function removeUser(id){
    return axios({
        url: '/api/user/' + id, 
        method: 'DELETE',
    }).then(response => {
        if(response){
            return  response.data    
        }
    })
    .catch(error => {
        return {
            success: false,
            message: error.message
        }
    })
}

export { register, checkUsername, checkEmail, onLoginUser, getUser, getAllUsers, updateUser, removeUser }