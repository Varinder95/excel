<template>
    <div>
        <div class="wrapper">
            <!-- Sidebar  -->
            <navbar></navbar>
            <div class="container my-10">
                <div class="d-flex flex-column p-3">
                    <div class="container">
                        <div >
                            <h2 class="text-wrap">Your Uploads</h2>
                        </div>
                        <recentUploads></recentUploads>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import recentUploads from '~/components/recentUploads'
import navbar from '~/components/header/navbar'

export default {
  components:{navbar, recentUploads},
  data() {
    return {
      username: '',
    }
  },
  beforeMount() {
    this.username = this.storage();
  },
  mounted() {
  },
  methods:{
    storage(){
      return localStorage.getItem("UserName");
    },
    logOut(){
        localStorage.removeItem("UserName"); 
        localStorage.removeItem("Email"); 
        localStorage.removeItem("token"); 
        this.$router.push('/')
    }
  }
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

