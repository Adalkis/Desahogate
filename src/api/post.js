import axios from 'axios'

export default{
    async postData(currentPost){
        let data = await axios.post('http://localhost:8000/api/post', currentPost);
        return data;
    }
}