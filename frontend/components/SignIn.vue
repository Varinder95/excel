<template>
    <div class="d-flex justify-content-center container w-100">
        <div class="d-block justify-content-center p-3 w-50">
          <form id="SignInForm" @submit.prevent="validateEmail">
            <img class="mb-4" src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      
            <div class="form-floating">
              <input type="email" class="form-control" id="email" v-model="email" name="email" placeholder="name@example.com">
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input :type="`${showPass ? 'text' : 'password'}`" class="form-control" id="password" v-model="password" name="password" placeholder="Password">
              <label for="floatingPassword">Password</label>
            </div>
      
            <div class="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" @click="showPassword"> Show password
              </label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <div v-if="error" class="d-block justify-content-center p-3 w-100">
              <b-alert v-if="signInError" variant="danger" show>
                  {{signInError}}
              </b-alert>
              <b-alert v-if="emailInvalid" variant="danger" show>
                  Please Enter valid email
              </b-alert>
          </div>
          </form>
        </div>
    </div>
</template>
<script>
import gql from 'graphql-tag'

export default {
    name: 'SignIn',
    data () {
        return {
        email: '',
        password: '',
        error: null,
        emailInvalid: null,
        signInError: null,
        showPass: false
        }
    },

    methods: {
        validateEmail() {
            const result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
            this.emailInvalid = !result
            if(result){
              this.userLogin()
            }
            else this.error = true
        },
        async userLogin () {
        try {
            await this.$apollo.mutate({
            mutation: gql`
            mutation (
                $loginInput: LoginInput
            ) {
                loginUser (
                loginInput: $loginInput
                ) {
                    _id
                    name
                    email
                    status
                    token
                }
            }
            `,
            variables: {
                loginInput: {
                email: this.email,
                password: this.password
                }
            }
            })
            .then((response) => {
            // save user token to localstorage
                this.userData = response.data.loginUser
                console.log(response.data.loginUser)
                localStorage.setItem('token', response.data.loginUser.token)
                localStorage.setItem('UserName', response.data.loginUser.name)
                localStorage.setItem('status', response.data.loginUser.status)
                localStorage.setItem('loggedIn', true)
                localStorage.setItem('id', response.data.loginUser._id)
                localStorage.setItem('Email', response.data.loginUser.email)
                this.$router.push('/Dashboard')
                
            })
        } catch (e) {
            this.signInError = e
            console.error(e)
        }

        },
        showPassword() {
            if(this.showPass) {
                this.showPass = false
            }
            else {
                this.showPass = true
            }
        }
        //saveUserData (id, token) {
        //localStorage.setItem(GC_USER_ID, id)
        //  localStorage.setItem(GC_AUTH_TOKEN, token)
        //this.$root.$data.userId = localStorage.getItem(GC_USER_ID)
        //}
    }

}
</script>
