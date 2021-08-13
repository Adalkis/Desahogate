import axios from 'axios';

export default{
    async loginUser(user){
        let data = await axios.post('http://localhost:8000/api/login', user,{withCredentials:true});
        return data;
    }
}