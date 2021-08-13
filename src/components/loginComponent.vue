<template>
<div class="hola">


  <div class="container">
 
      

    
         <b-form @submit="login" class="form-control">
           <div class="login_container mt-3">
           <div class="login_icon">
             <b-icon icon="share-fill" class="text-primary h4" ></b-icon>
           </div>
           </div>
          <p class="text-start  mt-3 mb-3">Hey, <br/> Ingresa ahora</p>
         
          <b-form-input
            class="mb-3"
            placeholder="Email"
            type="email"
            v-model="form.email"
          ></b-form-input>
          <b-form-input
            class="mb-3"
            placeholder="Password"
            type="password"
            v-model="form.password"
          ></b-form-input>
          <div class="mb-3">
          <b-button @click="login" variant="outline-primary" class="m-2"
            ><b-spinner variant="primary" small v-if="spinner == true"></b-spinner>Ingresar</b-button
          >
          
          <b-button v-b-modal.modal-1 variant="outline-primary" 
            >Crear cuenta</b-button
          >
          </div>
        </b-form>

  
    <b-modal id="modal-1" title="Sign Up" hide-footer v-if="modal=true">
      <b-form inline @submit="register">
        <b-form-input class="mb-3"
          placeholder="Firstname"
          v-model="sign.name"
          type="text"
        ></b-form-input>
        <b-form-input class="mb-3"
          placeholder="Lastname"
          v-model="sign.lastname"
          type="text"
        ></b-form-input>
        <b-form-input class="mb-3"
          placeholder="email"
          v-model="sign.email"
          type="email"
        ></b-form-input>
        <b-form-input class="mb-3"
          placeholder="password"
          v-model="sign.password"
          type="password"
        ></b-form-input>
        <div class="sign_up">
          <b-button type="submit" variant="outline-primary"> Sign up</b-button>
        </div>
        
      </b-form>
    </b-modal>
  </div>
  </div>
</template>

<script>
import registerApi from "@/api/auth/register.js";
import loginApi from "@/api/auth/login.js";
import authenticatedUserApi from "@/api/auth/authenticatedUser.js";
export default {
  name: "loginComponent",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      sign: {
        name: "",
        lastname: "",
        email: "",
        password: "",
      },
      spinner:false,
      modal:false
    }
  },
  methods: {
    login() {
      this.spinner=true
      loginApi
        .loginUser(this.form)
        .then((res) => {
          authenticatedUserApi.authenticated()
          .then(res =>{
            this.$store.dispatch("setAuth", true);
          this.$router.push({ name: "Home" });
            
          })
          .catch(err=>{
            console.log(err);
            alert('Error, try once again')
          
            this.spinner=false;
          })
         
         
          
        })
        .catch((err) => console.log(err));
    },
    register(e) {
      this.modal=true;
      e.preventDefault(this.sign);
      registerApi
        .registerUser(this.sign)
        .then((res) => {
          console.log(res);
          this.modal=false;
        })
        .catch((err) => console.log(err));
    },
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}


form.form-control {
  width: 400px;
 
}
p.text-start.mt-3.mb-3 {
    font-size: 20px;
    font-weight: 700;
}
.login_icon {
    background: #ECF3FF;
    width: 70px;
    border-radius: 50px;
    height: 70px;
}
.login_container{
  display: flex;
  justify-content: center;
}
.sign_up{
  display: flex;
  justify-content: center;
}
svg.bi-share-fill.text-primary.h4.b-icon.bi {
    margin-top: 20px;
}
</style>
