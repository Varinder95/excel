<template>
<div>
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <ul class="nav nav-pills">
        <li class="nav-item"><a href="#" class="nav-link" aria-current="page">Home</a></li>
        <li class="nav-item"><a id="loginButton" class="nav-link active" @click="SignInToggle">Login</a></li>
        <li class="nav-item"><a id="registerButton" class="nav-link" @click="SignInToggle">Register</a></li>
      </ul>
    </header>
  </div>

  <div v-if="SignInTrue">
    <SignIn />
  </div>
  <div v-else>
    <SignUp />
  </div>
</div>
</template>

<script>
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';

export default {
  components:{SignIn, SignUp},
  data() {
    return {
      SignInTrue: true
    }
  },
  methods: {
    SignInToggle () {
      if (this.SignInTrue) {
        this.SignInTrue = false
        document.getElementById('loginButton').classList.remove("active")
        document.getElementById('registerButton').classList.add("active")
      }
      else {
        this.SignInTrue = true
        document.getElementById('loginButton').classList.add("active")
        document.getElementById('registerButton').classList.remove("active")
      }
    }
  }
}

</script>
<style scoped>
.nav-link {
  cursor: pointer;
}
</style>