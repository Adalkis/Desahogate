import axios from 'axios';

export default{
    async registerUser(user){
        let data = await axios.post('http://localhost:8000/api/register', user);
        return data;
    }
}