<template>
    <div>
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
                </div>
            </nav>
        </div>
        <nav id="sidebar" :class="`${showSidebar ? 'active' : ''}`">
            <div class="sidebar-header">
                <h3>Menu</h3>
            </div>

            <ul class="list-unstyled components">
                <p>Hello {{username}}</p>
                <li class="nav-item">
                    <nuxt-link class="nav-link active" to="/dashboard">
                    <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
                    Dashboard
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link active" to="/upload">
                    <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
                    Upload
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link active" to="/uploads">
                    <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
                    Files
                    </nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link active" to="/employees">
                    <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
                    Employees
                    </nuxt-link>
                </li>
            </ul>

            <ul class="list-unstyled CTAs">
                <li>
                    <a class="download log-out" @click="logOut">Log Out</a>
                </li>
            </ul>
        </nav>
    </div>
    
</template>
<script>
export default {
    name: 'navbar',
    data() {
        return {
            username: '',
            showSidebar: true,
        }
    },
    beforeMount() {
        this.username = this.storage();
    },
    methods:{
        storage(){
        return localStorage.getItem("UserName");
        },
        toggleSidebar(){
            if(this.showSidebar) {
                this.showSidebar = false
            }
            else {
                this.showSidebar = true
            }
        },
        logOut(){
            localStorage.removeItem("UserName"); 
            localStorage.removeItem("Email"); 
            localStorage.removeItem("token"); 
            this.$router.push('/')
        },
    }

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
    min-height: 5em;
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