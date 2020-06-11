import axios from 'axios';

axios.interceptors.request.use((config)=>{
    
    let token = localStorage.getItem('token');
    if(!!token){
        config.headers['Authorization'] = "Bearer " + token;
    }

    return config
});
axios.interceptors.response.use(function(response){
    return response
}, function(error){

    return error.response
})