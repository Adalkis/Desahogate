<template>
  <div class="hola">
    <div class="container">
      <b-form @submit="login" class="form-control">
        <div class="login_container mt-3">
          <div class="login_icon">
            <b-icon icon="share-fill" class="text-primary h4"></b-icon>
          </div>
        </div>
        <p class="text-start mt-3 mb-3">
          Hey, <br />
          Ingresa ahora
        </p>

        <b-form-input
          placeholder="Email"
          type="email"
          :state="emailValidation"
          v-model="form.email"
          required
        ></b-form-input>
        <div class="mb-3">
          <b-form-invalid-feedback :state="emailValidation">
            Correo electrónico debe de ser mayor a 10.
          </b-form-invalid-feedback>
        </div>
        <b-form-input
          placeholder="Password"
          type="password"
          v-model="form.password"
          :state="passwordValidation"
        ></b-form-input>

        <div class="mb-3">
          <b-form-invalid-feedback :state="passwordValidation">
            La contraseña debe de ser mayor a 10.
          </b-form-invalid-feedback>
        </div>

        <div class="mb-3">
          <b-button @click="login" variant="outline-primary" class="m-2"
            ><b-spinner
              variant="primary"
              small
              v-if="spinner == true"
            ></b-spinner
            >Ingresar</b-button
          >

          <b-button v-b-modal.modal-1 variant="outline-primary"
            >Crear cuenta</b-button
          >
        </div>
      </b-form>

      <b-modal id="modal-1" title="Registrar" hide-footer>
        <b-form inline @submit="register">
          <b-form-input
            placeholder="Firstname"
            v-model="form.name"
            type="text"
            :state="firstnameValidation"
          ></b-form-input>
          <div class="mb-3">
            <b-form-invalid-feedback :state="firstnameValidation">
              Nombre debe de ser mayor a 2.
            </b-form-invalid-feedback>
          </div>
          <b-form-input
            placeholder="Lastname"
            v-model="form.lastname"
            type="text"
            :state="lastnameValidation"
          ></b-form-input>
          <div class="mb-3">
            <b-form-invalid-feedback :state="lastnameValidation">
              El apellido debe de ser mayor a 2.
            </b-form-invalid-feedback>
          </div>
          <b-form-input
            placeholder="email"
            v-model="form.email"
            type="email"
          ></b-form-input>
          <div class="mb-3">
            <b-form-invalid-feedback :state="emailValidation">
              Correo electrónico debe de ser mayor a 10.
            </b-form-invalid-feedback>
          </div>
          <b-form-input
            placeholder="password"
            v-model="form.password"
            type="password"
          ></b-form-input>
          <div class="mb-3">
            <b-form-invalid-feedback :state="passwordValidation">
              La contraseña debe de ser mayor a 10.
            </b-form-invalid-feedback>
          </div>
          <div class="sign_up">
            <b-button type="submit" variant="outline-primary">
              Registrar</b-button
            >
          </div>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import authApi from "../api/auth/auth";
export default {
  name: "loginComponent",
  data() {
    return {
      form: {
        email: "",
        password: "",
        name: "",
        lastname: "",
      },
      spinner: false,
    };
  },
  methods: {
    async login() {
      let data = { email: this.form.email, password: this.form.password };
      this.$store.dispatch("LOGIN", data);
    },
    register(e) {
      this.modal = true;
      e.preventDefault(this.form);
      authApi
        .register(this.form)
        .then((res) => {
          alert("Felicidades, te has registrado a desahogate!");
          this.$bvModal.hide("modal-1");
          this.open = false;
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    emailValidation() {
      if (this.form.email.length > 0) {
        return this.form.email.length > 10;
      }
    },
    passwordValidation() {
      if (this.form.password.length > 0) {
        return this.form.password.length > 8;
      }
    },
    firstnameValidation() {
      if (this.form.name.length > 0) {
        return this.form.name.length > 2;
      }
    },
    lastnameValidation() {
      if (this.form.lastname.length > 0) {
        return this.form.lastname.length > 2;
      }
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
  background: #ecf3ff;
  width: 70px;
  border-radius: 50px;
  height: 70px;
}
.login_container {
  display: flex;
  justify-content: center;
}
.sign_up {
  display: flex;
  justify-content: center;
}
svg.bi-share-fill.text-primary.h4.b-icon.bi {
  margin-top: 20px;
}
</style>
