<template>
  <div class="container">
   

    
    <b-form-textarea
      class="mt-5"
      placeholder="Comparte tu historia"
      v-model="text.post_name"
    ></b-form-textarea>
    <b-button class="mt-2 mb-2" variant="outline-primary" @click="share"
      ><b-spinner variant="primary" small v-if="spinner == true"></b-spinner>Compartir</b-button
    >
    

    <div v-for="(post, index) in all_post" :key="index" class="mb-3">
      <b-card>
        <b-card-body>
          <div class="post_content">
            <router-link
              class="text-dark"
              @click.native="profile(post.users.id)"
              :to="{
                name: 'Profile',
                params: {
                  
                  id: post.users.id,
                  username: post.users.name,
                   post: total_post,
                  data: post.users,
                  total: result_total_post,
                 
                  user_id: text.user_id,
                }
              }"
              >{{post.users.name }} </router-link
            >

            <p class="post_name text-dark">{{ post.post_name }}</p>
           
          </div>

          <hr />
          <div
            class="content_section mb-3 px-3"
            v-for="(comment_post, comment) in post.comments"
            :key="comment"
            v-if="see_comments == true && index == index_post"
          >
            <router-link
              @click.native="profile(comment_post.user_id)"
              :to="{
                name: 'Profile',
                params: {
                  id: comment_post.user_id,
                  username: comment_post.username,
                  total: result_total_post,
                  post: total_post,
                  user_id: text.user_id,
                 
                },
              }"
            >
            
              <p>{{ comment_post.username }}  </p></router-link
            >
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
        </b-card-body>

        <b-form-input
          placeholder="Comentar"
          @keyup.enter="submitComment(post.id, $event)"
        >
        </b-form-input>
      </b-card>
    </div>
  
  </div>
</template>
 
<script>
import postApi from "@/api/post.js";
import getPostApi from "@/api/getPost.js";
import authenticatedUserApi from "@/api/auth/authenticatedUser.js";
import commentApi from "@/api/postComment.js";
import sideBarComponent from "./sideBar.vue";

export default {
  components: { sideBarComponent },
  data() {
    return {
      text: {
        post_name: "",
        user_id: null,
        users: { name: ""},
        comments: 0,
      },
      all_post: [],
      result: [],
      username: "",
      see_comments: false,
      index_post: null,
      total_post: [],
      result_total_post: null,
      spinner:false
    };
  },
  methods: {
    share() {
      this.spinner=true;
      postApi
        .postData(this.text)
        .then((res) => {
          this.all_post.unshift({
            users: { name: this.text.users.name },
            post_name: this.text.post_name,
            comments: 0,
          });
          this.text.post_name = "";
          this.spinner=false;
        })
        .catch((err) => console.log(err));
    },
    submitComment(id, event) {
      let index = this.all_post.findIndex((x) => {
        return x.id == id;
      });

      let comment = {
        comment: event.target.value,
        post_id: id,
        username: this.username,
        user_id: this.text.user_id,
      };
    
      commentApi.commentPost(comment).then((res) => {
        this.all_post[index].comments.unshift({
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
    profile(id) {
     
      
      this.all_post.map((x) => {
        let result = x.user_id == id;
   
        if (result) {
          
          this.total_post.push(x);
         
        }
      });
      this.result_total_post = this.total_post.length;
     
    },
  },
  mounted: async function () {
    await getPostApi
      .getPost()
      .then((res) => {
        this.all_post = res.data;
      })
      .catch((err) => console.log(err));

    await authenticatedUserApi
      .authenticated()
      .then((res) => {
        this.text.user_id = res.data.id;
        this.username = res.data.name;
        this.lastname =  res.data.lastname
        this.text.users.name = res.data.name;
      })
      .catch((err) => console.log(err));
  },
  
 
};
</script>

<style scoped>
hr:not([size]) {
  height: 0.5px;
}
.post_content {
  text-align: start;
}
.comment_button {
  display: flex;
  justify-content: flex-start;
}
.content_section {
  background: #eff6f5;
  border-radius: 10px;
  text-align: start;
}
p {
  display: flex;
  justify-content: flex-start;
}
.side_bar_items {
  display: flex;
  justify-content: center;
}
.row {
  width: 100%;
}
.container {
  width: 700px;
}
.card-header {
  height: 10px;
  font-size: 10px;
  display: flex;
  justify-content: flex-end;
}
.card {
  background: white;
}
a.text-dark:hover {
  color: #007bff !important;
}
</style>