<template>
    <div>
        <div class="wrapper">
            <!-- Sidebar  -->
            <navbar></navbar>
            <div class="container my-10">
                <div class="d-flex flex-column p-3">
                    <div class="container">
                        <div >
                            <h2 class="text-wrap">New Assignments</h2>
                        </div>
                        <newAssigned></newAssigned>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import newAssigned from '~/components/newAssigned'
import navbar from '~/components/header/navbar'


export default {
  components:{navbar, newAssigned},
  data() {
    return {
      username: '',
    }
  },
  beforeMount() {
    this.userData = this.storage();
  },
  mounted() {
  },
  methods:{
    storage(){
      return { 
        userName : localStorage.getItem("UserName"),
        userEmail : localStorage.getItem("Email"),
      }
    },
    logOut(){
        localStorage.removeItem("UserName"); 
        localStorage.removeItem("Email"); 
        localStorage.removeItem("token"); 
        this.$router.push('/')
    }
  },
}
</script>
<style scoped>
.wrapper {
    display: flex;
    position:relative;
    z-index: 999;
    width: 100%;
    align-items: stretch;
}
</style>

