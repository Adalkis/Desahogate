import axios from 'axios';

export default{
    async commentPost(comment){
        let data = await axios.post("http://localhost:8000/api/comment", comment);
        return data;
    }
}