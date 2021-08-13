import axios from 'axios';

export default{
    async getComment(){
        let data = await axios.get("http://localhost:8000/api/comment");
        return data;
    }
}