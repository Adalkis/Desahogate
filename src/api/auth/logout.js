import axios from 'axios'

export default{
    async logout(user){
        let data = await axios.post("http://localhost:8000/api/logout", user, {withCredentials:true});
        return data;
    }
}