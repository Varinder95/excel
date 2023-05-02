<template>
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar" class="active">
            <div class="sidebar-header">
                <h3>Menu</h3>
            </div>

            <ul class="list-unstyled components">
                <p>Dummy Heading</p>
                <li class="nav-item">
                    <a id="dash" class="nav-link active" @click="TabToggle(1)">
                      <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a id="uploadTab" class="nav-link" @click="TabToggle(2)">
                      <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"></use></svg>
                      Upload Excel
                    </a>
                  </li>
                  <li>
                    <a id="dataTab" class="nav-link" @click="TabToggle(3)">
                      <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid"></use></svg>
                      Show Uploaded Files
                    </a>
                  </li>
                  <li>
                    <a id="usersTab" class="nav-link" @click="TabToggle(4)">
                      <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle"></use></svg>
                      Show Users
                    </a>
                  </li>
            </ul>

            <ul class="list-unstyled CTAs">
                <li>
                    <a class="download log-out" @click="logOut">Log Out</a>
                </li>
                <li>
                    <a href="#" class="article">Contact</a>
                </li>
            </ul>
        </nav>

        <!-- Page Content  -->
        <div id="content">

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">

                    <button type="button" id="sidebarCollapse" class="btn btn-primary" @click="toggleSidebar">
                        <i class="fas fa-align-left"></i>
                        <span>Menu</span>
                    </button>
                    <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-align-justify"></i>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav navbar-nav ml-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Page</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Page</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Page</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Page</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="d-flex flex-column p-3">
                <div v-if="dashboard">
                    <h2 class="text-wrap"> Welcome {{username}}</h2>
                    <p>Select what you need</p>
                    <recentUploads></recentUploads>
                </div>
                <div v-if="uploads">
                <uploads></uploads>
                </div>
                <div v-if="dbData">
                    <recentUploads></recentUploads>
                </div>
                <div v-if="dbUsers">
                <dbUsers></dbUsers>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import dbData from '~/components/dbData'
import uploads from '~/components/uploads'
import dbUsers from '~/components/dbUsers'
import recentUploads from '~/components/recentUploads'
import gql from 'graphql-tag'

const getUser = gql`
  
query GetUser {
  getUser {
    status
  }
}
`;

export default {
  components:{dbData, uploads, dbUsers, recentUploads},
  data() {
    return {
      username: '',
      dashboard: true,
      uploads: false,
      dbUsers: false,
      dbData: false,
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
    toggleSidebar(){
        $('#sidebar').toggleClass('active');
    },
    logOut(){
        localStorage.removeItem("UserName"); 
        localStorage.removeItem("Email"); 
        localStorage.removeItem("token"); 
        this.$router.push('/')
    },
    TabToggle (tab) {
      var tabID = tab
      if (tabID == 1) {
        this.dashboard = true
        this.uploads = false
        this.dbUsers = false
        this.dbData = false
      }
      else  if (tabID == 2) {
        this.dashboard = false
        this.uploads = true
        this.dbUsers = false
        this.dbData = false
      }
      else  if (tabID == 3) {
        this.dashboard = false
        this.uploads = false
        this.dbUsers = false
        this.dbData = true
      }
      else  if (tabID == 4) {
        this.dashboard = false
        this.uploads = false
        this.dbUsers = true
        this.dbData = false
      }
    }
  },
}
</script>
<style scoped>
.log-out {
    cursor: pointer;
}
.nav-link {
    color: white;
    cursor: pointer;
}
.nav-link.active {
    color: #067eff;
    background: #fff;
}
.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
}

#sidebar {
    min-width: 250px;
    max-width: 250px;
    background: #067eff;
    color: #fff;
    transition: all 0.3s;
}

#sidebar.active {
    margin-left: -250px;
}

#sidebar .sidebar-header {
    padding: 20px;
    background: #067eff;
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul li a:hover {
    color: #067eff;
    background: #fff;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    color: #fff;
    background: #067eff;
}

a[data-toggle="collapse"] {
    position: relative;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}

ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #067eff;
}

ul.CTAs {
    padding: 20px;
}

ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
}

a.download {
    background: #fff;
    color: #067eff;
}

a.article,
a.article:hover {
    background: #067eff !important;
    color: #fff !important;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
    width: 100%;
    padding: 20px;
    min-height: 100vh;
    transition: all 0.3s;
}

/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }
    #sidebar.active {
        margin-left: 0;
    }
    #sidebarCollapse span {
        display: none;
    }
}
</style>
