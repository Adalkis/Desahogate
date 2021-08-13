import axios from 'axios'


export default{
    async authenticated(){
        let data = await axios.get('http://localhost:8000/api/user',{withCredentials:true});
        return data;
    
    }
}