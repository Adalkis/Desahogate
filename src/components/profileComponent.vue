<template>
  <div class="container">
  

    
    <div class="row" no-gutters>
      <b-col cols="4" md="4" lg="3" class="mb-3">
        <div class="person_content">
          <b-icon icon="person" class="person_icon"></b-icon>
        </div>
      </b-col>
      <b-col cols="8" md="4" lg="8" class="user_content">
        <div class="text-start mt-4">
          <p >{{ name }}</p>

          <p>Este usuario ha compartido {{ posts.length }} post</p>
         
        </div>
      </b-col>
      
      
      <div v-for="(post, index) in posts" :key="index" class="mb-3">
        <b-card>
          <b-card-body>
            <div class="post_content">
              <div class="name">
                {{ post.users.name }}

              </div>
                
             
              

              <p class="text-dark">{{ post.post_name }}</p>
            </div>

            <div
              class="content_section mb-3 px-3"
              v-for="(comment_post, comment) in post.comments"
              :key="comment"
              v-if="see_comments == true && index == index_post"
            >
              <div
                class="text-dark"
                @click="profile(comment_post.user_id, comment_post.username,  comment_post.username)"
              >
                <p class="name">{{ comment_post.username }}</p>
              </div>
              <p>{{ comment_post.comment }}</p>
              
              
            </div>
            
            <div class="comment_button">
              <b-button
                variant="outline-primary"
                size="sm"
                @click="display_comments(index, post.comments, post.id)"
              >
                <b-icon icon="chat"></b-icon> {{ post.comments.length }}
              </b-button>
            </div>
            <b-form-input
              class="mt-2"
              placeholder="Comentar"
              @keyup.enter="submitComment(post.id, $event)"
            >
            </b-form-input>
          </b-card-body>
        </b-card>
      </div>
    </div>

  </div>
</template>

<script>
import commentApi from "@/api/postComment.js";
import authenticatedUserApi from "@/api/auth/authenticatedUser.js";
import getPostApi from "@/api/getPost.js";
export default {
  data() {
    return {
      name: this.$route.params.username,
      total_post: this.$route.params.total,
      posts: this.$route.params.post,
      id: this.$route.params.id,
      index_post: null,
      see_comments: false,
      total_post: [],
      result_total_post: null,
      user_id: this.$route.params.user_id,
      username: this.$route.params.logged_user,
      user_name: "",
      last_name: "",
      testing_userid: null,
      all_post:[],
   
     
     
    };
  },
  methods: {
    display_comments(index) {
      this.see_comments = true;
      this.index_post = index;
    },
    submitComment(id, event) {
      let index = this.posts.findIndex((x) => {
        return x.id == id;
      });
      let comment = {
        comment: event.target.value,
        post_id: id,
        username: this.username,
        user_id: this.user_id,
      };

      commentApi.commentPost(comment).then((res) => {
        console.log(res);
        this.posts[index].comments.unshift({
          comment: res.data.comment,
          username: res.data.username,
        });
        event.target.value = "";
      });
    },
    display_comments(index) {
      this.see_comments = true;
      this.index_post = index;
    },

    profile(id, username, data) {
      
   
      this.all_post.map((x) => {
        let result = x.user_id == id;
     
        if (result) {
         
          this.total_post.push(x);
        }
      });
      this.result_total_post = this.total_post.length;
      this.$router.push({
        name: "Profile",
        params: { username:username,id: id, data:data,total:this.result_total_post, post:this.total_post},
      });
    },
  },

  mounted: async function () {
       await getPostApi
      .getPost()
      .then((res) => {
        this.all_post = res.data;
       
      })
      .catch((err) => console.log(err));
  },
 
  
};
</script>

<style scoped>
.container {
  width: 700px;
  margin-top: 10px;
}
.person_icon {
  font-size: 100px;
  padding: 20px;
}
.person_content {
  border-color: gray;
  border-width: 1px;
  border-style: solid;
}
.user_content.col-md-4.col-lg-8.col-12 {
  text-align: start;
}
.content_section {
  background: #eff6f5;
  border-radius: 10px;
  text-align: start;
}
.post_content {
  text-align: start;
}
.comment_button {
  display: flex;
  justify-content: flex-start;
}
.name{
      text-decoration: underline;
    cursor: pointer;
}
</style>