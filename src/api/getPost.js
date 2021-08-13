import axios from 'axios'

export default{
    async getPost(){
        let data = await axios.get('http://localhost:8000/api/post');
        return data;
    }
}