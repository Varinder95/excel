<template>
    <div class="d-flex justify-content-center container w-100">
        <div class="d-block justify-content-center p-3 w-50">
            <div class="d-block w-100">
                <form id="SignUpForm" @submit.prevent="validateData">
                    <img class="mb-4" src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
                    <h1 class="h3 mb-3 fw-normal">Please Sign Up</h1>
            
                    <div class="form-floating">
                        <input type="text" class="form-control" id="name" v-model="name" name="name" placeholder="Your Full Name">
                        <label for="floatingInput">Full Name</label>
                    </div>
                    <div class="form-floating">
                        <input type="email" class="form-control" id="email" v-model="email" name="email" placeholder="name@example.com">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input :type="`${showPass ? 'text' : 'password'}`" class="form-control" id="password" v-model="password" name="password" placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div class="form-floating">
                        <input :type="`${showPass ? 'text' : 'password'}`" class="form-control" id="confirmPassword" v-model="confirmPassword" name="confirmPassword" placeholder="Re-enter Password">
                        <label for="floatingPassword">Re-enter Password</label>
                    </div>
            
                    <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" @click="showPassword"> Show Password
                    </label>
                    </div>
                    <div v-if="error" class="d-block justify-content-center p-3 w-100">
                        <b-alert v-if="signUpError" variant="danger" show>
                            {{signUpError}}
                        </b-alert>
                        <b-alert v-if="emailInvalid" variant="danger" show>
                            Please Enter valid email
                        </b-alert>
                        <b-alert v-if="passwordMismatch" variant="danger" show>
                            Please enter same password
                        </b-alert>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import gql from 'graphql-tag'

export default {
    name: 'SignIn',
    data () {
        return {
        name: '',
        email: '',
        password: '',
        confirmPassword:'',
        emailInvalid: null,
        passwordMismatch: null,
        error: null,
        signUpError: null,
        showPass: false
        }
    },

    methods: {

        validateData() {
            const result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
            this.emailInvalid = !result
            if(this.password === this.confirmPassword) {
                if(result){
                    this.userRegister()
                }
                else this.error = true
            }
            else{
                this.passwordMismatch = true
                this.error = true
            }
        },
        async userRegister () {
        try {
            await this.$apollo.mutate({
            mutation: gql`
            mutation (
                $registerInput: RegisterInput
            ) {
                registerUser (
                    registerInput: $registerInput
                ) {
                    _id
                    name
                    email
                    token
                }
            }
            `,
            variables: {
                registerInput: {
                name: this.name,
                email: this.email,
                password: this.password
                }
            }
            })
            .then((response) => {
            // save user token to localstorage
                this.userData = response.data.registerUser
                console.log(response.data.registerUser)
                localStorage.setItem('token', response.data.registerUser.token)
                localStorage.setItem('UserName', response.data.registerUser.name)
                localStorage.setItem('loggedIn', true)
                localStorage.setItem('id', response.data.registerUser._id)
                localStorage.setItem('Email', response.data.registerUser.email)
                this.$router.push('/dashboard')
                
            })
        } catch (e) {
            this.error = true
            this.signUpError = e
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
