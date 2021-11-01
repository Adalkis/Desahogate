<template>
  <div class="container" >
    <div v-if="this.$store.state.login.isLoggedIn">
    <b-form-textarea
      class="mt-5"
      placeholder="Comparte tu historia"
      v-model="text.post_name"
    ></b-form-textarea>

      <b-button class="mt-2 mb-2" variant="outline-primary" @click="share"
        ><b-spinner variant="primary" small v-if="spinner == true"></b-spinner
        >Compartir</b-button
      >
      </div>
    <div v-for="(post, index) in all_post" :key="index" class="mb-3">
      <b-card>
        <b-card-body>
          <div class="post_content">
              <h6>{{ post.users.name }}</h6>
            <p class="post_name text-dark">{{ post.post_name }}</p>
          </div>

          <hr />
          <div
            class="content_section mb-3 px-3"
            v-for="(comment_post, comment) in post.comments"
            :key="comment"
           
          >
          <div  v-if="see_comments == true && index == index_post">
              <span>{{ comment_post.username }}</span>
            <p>{{ comment_post.comment }}</p>
            </div>
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
        <div v-if="isAuthenticated">
        <b-form-input
          placeholder="Comentar"
          @keyup.enter="submitComment(post.id, $event)"
        >
        </b-form-input>
        </div>
      </b-card>
    </div>
  </div>
</template>
 
<script>
import postApi from "../api/post/post"
import authApi from "../api/auth/auth";

export default {
  data() {
    return {
      text: {
        post_name: "",
      },
      all_post: [],
      result: [],
      username: "",
      see_comments: false,
      index_post: null,
      total_post: [],
      result_total_post: null,
      spinner: false,
      currentUser: this.$store.state.login.user.name,
    };
  },
  methods: {
    share() {
      this.spinner = true;
      postApi.post(this.text)
        .then((res) => {
          this.all_post.unshift({
            users: { name: this.currentUser },
            post_name: this.text.post_name,
            comments: 0,
          });
          this.text.post_name = "";
          this.spinner = false;
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
      };
      console.log('esto es comment')
      console.log(comment)

      postApi.commentPost(comment).then((res) => {
        this.all_post[index].comments.unshift({
          comment: res.data.comment,
          username: this.currentUser,
        });
        event.target.value = "";
      });
    },
    display_comments(index) {
      this.see_comments = true;
      this.index_post = index;
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.login.isLoggedIn;
    },
  },
  mounted: async function () {
    await postApi.getPost()
      .then((res) => {
        this.all_post = res.data;
      })
      .catch((err) => console.log(err));
    await authApi.authenticated().then((res) => {
      this.$store.dispatch("SETAUTH", true);
    });
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
.post_content h6 {
    text-decoration: underline;
    cursor:pointer;
}
.content_section.mb-3.px-3 div span {
    text-decoration: underline;
     cursor:pointer;
}
.content_section.mb-3.px-3 div span:hover {
    text-decoration: underline;
     color:#0063cf;
}
.post_content h6:hover{
    color:#0063cf;
}
.comment_button {
  display: flex;
  justify-content: flex-start;
}
.content_section {
  background: #f0f2f5;
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