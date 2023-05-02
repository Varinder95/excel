<template>
    <div class="wrapper">
        <navbar></navbar>
        <!-- Page Content  -->
        <div class="container my-10">

            <div class="d-flex flex-column p-1 md:p-3">
                <div class="container">
                    <div class="d-flex md:mx-4 border-bottom border-primary">
                      <h2 class="text-wrap">File Data Listing</h2>
                    </div>
                    <div class="d-flex my-4 md:m-4">
                        <div class="d-block w-100">
                            <b-card title-tag="title" header-tag="header" footer-tag="footer">
                              <template #header>
                                <h6 class="mb-0"><span class="font-weight-bold">File Name :</span> {{fileDetails.FileName}}</h6>
                              </template>
                              <b-card-text><h2>{{fileDetails.UploadName}}</h2></b-card-text>
                              <p><span class="font-weight-bold">Uploaded by :</span> {{fileDetails.UploadedBy}}</p>
                              <p><span class="font-weight-bold">Uploaded on :</span> {{new Date(fileDetails.UploadedOn * 1000)}}</p>
                              <template #footer>
                                <em><span class="font-weight-bold">Number of Entries :</span> {{fileDetails.NoOfEntries}}</em>
                              </template>
                            </b-card>
                        </div>
                    </div>
                    <button type="button" class="m-4 btn btn-primary" @click="fetchFileData">
                        <i class="fas fa-arrow-down"></i>
                        <span>Refetch File Data</span>
                    </button>
                    <div v-if="fetchedData">
                        <b-pagination responsive
                            v-model="currentPage"
                            :total-rows="rows"
                            :per-page="perPage"
                            aria-controls="my-table"
                        ></b-pagination>
                        <div class="d-flex w-100 justify-content-between p-4">
                        <div class="d-inline-flex w-50 justify-content-center">
                            <p class="mt-3">Current Page: {{ currentPage }}</p>
                        </div>
                        <div class="d-inline-flex w-50 justify-content-center">
                            <div class="d-flex w-75 justify-content-end">
                            <p class="mt-3 mr-4">Select No. Of Rows : </p>
                            </div>
                            <div class="d-block w-25">
                            <select placeholder="No. of Rows" v-model="NoOfRows" class="mt-3" id="RowCount" @change="ChangeNoRows">
                                <option value="10" selected>10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            </div>
                        </div>
                        </div>
                        <p>
                            <b-button size="sm" @click="selectAllRows">Select all</b-button>
                            <b-button size="sm" @click="clearSelected">Clear selected</b-button>

                            <downloadExcel
                                class="btn btn-secondary btn-sm"
                                :data="fileData.DataByFilename"
                                :fields="downloadFields"
                                worksheet="Worksheet 1"
                                :name="fileDetails.FileName"
                            >
                                Download Excel
                            </downloadExcel>
                        </p>
                        <b-table responsive striped :select-mode="selectMode" hover :fields="fields" :items="fileData.DataByFilename" :per-page="perPage" :current-page="currentPage" ref="selectableTable" selectable @row-selected="onRowSelected">
                        
                        <template #cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <!-- Example scoped slot for select state illustrative purposes -->
                        <template #cell(selected)="{ rowSelected }">
                            <template v-if="rowSelected">
                            <span aria-hidden="true">&check;</span>
                            <span class="sr-only">Selected</span>
                            </template>
                            <template v-else>
                            <span aria-hidden="true">&nbsp;</span>
                            <span class="sr-only">Not selected</span>
                            </template>
                        </template>
                        </b-table>
                        <p>
                          Selected Rows:<br>
                          {{ selectedCount }}
                        </p>
                        <div v-if="selected" class="mt-10">
                            <div class="d-flex container">
                                <div class="w-100 md:m-4">
                                    <div class="d-flex w-100 justify-content-start">
                                        <p class="mt-3 mr-4">Assign selected to user : </p>
                                    </div>
                                    <div class="d-block w-100">
                                        <select placeholder="User" v-model="userEmail" class="my-3 form-control form-control-lg" id="RowCount" @change="fetchUser(userEmail)">
                                            <option v-for="data in getUsers" :key="data._id" :value="data.email"> {{data.email}}</option>
                                        </select>
                                    </div>
                                    <div v-if="fetchedUserData" class="d-flex flex-wrap mt-5 justify-content-center">
                                        <section class="jumbotron text-center">
                                            <div class="container">
                                                <h1 class="jumbotron-heading">{{userData.name}}</h1>
                                                <p class="lead text-muted"><span class="font-weight-bold">User ID :</span> {{userData._id}}</p>
                                                <p class="lead text-muted"><span class="font-weight-bold">User Email :</span> {{userData.email}}</p>
                                                <div v-if="assigned">
                                                    <a href="#" class="btn btn-success my-2"><i class="fas fa-check"></i><span>Assigned {{assignedCount}}</span></a>
                                                    <a class="btn btn-secondary my-2 link-cursor" href="/dashboard">Go Back</a>
                                                </div>
                                                <div v-else-if="assignedLoading">
                                                    <button type="button" class="my-2 btn btn-secondary" disabled>
                                                        <i class="fas fa-arrow-up"></i>
                                                        <span>Assigning  {{assignedCount}} Entries</span>
                                                    </button>
                                                </div>
                                                <div v-else>
                                                    <div>
                                                        <label for="example-datepicker">Choose reporting date</label>
                                                        <b-form-datepicker id="reportDate" v-model="reportDate" class="mb-2"></b-form-datepicker>
                                                    </div>
                                                    <button type="button" class="my-2 btn btn-primary" @click="setNewAssign">
                                                        <i class="fas fa-arrow-right"></i>
                                                        <span>Assign to {{userData.name}}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navbar from '~/components/header/navbar'
import dbData from '~/components/dbData'
import uploads from '~/components/uploads'
import dbUsers from '~/components/dbUsers'
import recentUploads from '~/components/recentUploads'
import downloadExcel from "vue-json-excel";
import gql from 'graphql-tag'

const getUser = gql`
  
query GetUsers {
  getUsers {
    _id
    name
    email
  }
}
`;

export default {
  components:{dbData, uploads, dbUsers, recentUploads, downloadExcel, navbar},
  data() {
    return {
        fileDetails: '',
        fetchedData: false,
        userData: '',
        userEmail: '',
        loading: 0,
        fields: [
            // A virtual column that doesn't exist in items
            'index', 
                'Business',
            { key: 'Address_1', label: 'Address 1' },
            { key: 'Address_2', label: 'Address 2' },
            { key: 'Address_3', label: 'Address 3' },
            'County',
            'Region',
            'Postcode',
            'Supplier',
            { key: 'Decision_Maker', label: 'Decision Maker' },
            { key: 'Telephone_1', label: 'Telephone 1' },
            { key: 'Telephone_2', label: 'Telephone 2' },
            'PC',
            'MTC',
            'LLF',
            'MPRN',
            'MPAN',
            'EAC',
            'CED',
            { key: 'UploadName', label: 'Upload Name' },
            { key: 'CreatedBy', label: 'Created By' }, 
            { key: 'FileName', label: 'File Name' }, 
            { key: 'createdAt', label: 'Created On' },
            { key: 'AssignedTo', label: 'Assigned To' },
            { key: 'AssignedBy', label: 'Assigned By' },
            { key: 'ReportingBy', label: 'Reporting Date' }, 
  
        ],
        downloadFields: {
            // A virtual column that doesn't exist in items
            Business : 'Business',
            'Address 1' : 'Address_1',
            'Address 2' : 'Address_2',
            'Address 3' : 'Address_3',
            County : 'County',
            Region : 'Region',
            Postcode : 'Postcode',
            Supplier : 'Supplier',
            'Decision Maker' : 'Decision_Maker',
            'Telephone 1' : 'Telephone_1',
            'Telephone 2' : 'Telephone_2',
            PC : 'PC',
            MTC : 'MTC',
            LLF : 'LLF',
            MPRN : 'MPRN',
            MPAN : 'MPAN',
            EAC : 'EAC',
            CED : 'CED',
            'Upload Name' : 'UploadName',
            'Created By' : 'CreatedBy',
            'File Name' : 'FileName',
            'Created On' : 'createdAt',
            'Assigned To' : 'AssignedTo',
            'Assigned By' : 'AssignedBy',
            'Reporting Date' : 'ReportingBy',
  
        }   ,
        fileData: '',
        NoOfRows: 10,
        perPage: 10,
        currentPage: 1,
        fetchError: null,
        selectMode: 'multi',
        selected: [],
        reportDate: '',
        assigningCount: '',
        assignedCount: 0,
        selectedCount: '',
        assigned: false,
        assignedLoading: false
    }
  },
  beforeMount() {
    this.fileDetails = this.getFileName();
    this.fetchFileData()
  },
  mounted() {
      if(!process.client) return;
      const loggedIn = localStorage.getItem("loggedIn");
      if(!loggedIn){
          this.$router.push('/')
      }
      else{
        this.loaded = true
      }
  },
  methods:{
    getFileName(){
      return {
        FileName : localStorage.getItem("assignFileName"),
        UploadName : localStorage.getItem("assignUploadName"),
        NoOfEntries : localStorage.getItem("assignNoOfEntries"), 
        UploadedBy : localStorage.getItem("assignUploadedBy"), 
        UploadedOn : localStorage.getItem("assignUploadedOn")
      }
    },
    logOut(){
        localStorage.removeItem("assignFileName"); 
        localStorage.removeItem("assignUploadName"); 
        localStorage.removeItem("assignNoOfEntries"); 
        localStorage.removeItem("assignUploadedBy"); 
        localStorage.removeItem("assignUploadedOn");
        localStorage.removeItem("UserName"); 
        localStorage.removeItem("Email"); 
        localStorage.removeItem("token"); 
        this.$router.push('/')
    },
    ChangeNoRows() {
      this.perPage = this.NoOfRows
    },
    async fetchFileData () {
        try {
            await this.$apollo.query({
                query: gql`
                    query DataAssignedToUser ($FileName : String!) {
                        DataByFilename (FileName : $FileName) {
                        _id
                        Business
                        Address_1
                        Address_2
                        Address_3
                        County
                        Region
                        Postcode
                        Supplier
                        Decision_Maker
                        Telephone_1
                        Telephone_2
                        PC
                        MTC
                        LLF
                        MPRN
                        MPAN
                        EAC
                        CED
                        UploadName
                        CreatedBy
                        FileName
                        createdAt
                        AssignedTo
                        AssignedBy
                        ReportingBy
                        }
                    }
                `,
                variables: { 
                    fileInput : {
                        FileName : this.fileDetails.FileName,
                    }
                }
            })
            .then((response) => {
            // save user token to localstorage
            console.log(Date.now())
                console.log(response.data)
                this.fileData = response.data
                this.fetchedData = true
                
            })
        } catch (e) {
            this.fetchError = e
            console.error(e)
        }
    },
    async fetchUser (data) {
        try {
            await this.$apollo.query({
                query: gql`
                    query GetUser($email: String!) {
                        getUser(email: $email) {
                            _id
                            name
                            email
                        }
                    }
                `,
                variables: { email : data }
            })
            .then((response) => {
                this.userData = response.data.getUser
                this.fetchedUserData = true
                
            })
            } catch (e) {
            this.fetchUserError = e
            console.error(e)
            }
        },
        onRowSelected(items) {
            var data = items
            this.selected = data.map(({ _id }) => _id)
            this.selectedCount = this.selected.length;

            
        },
        selectAllRows() {
            this.$refs.selectableTable.selectAllRows()
        },
        clearSelected() {
            this.$refs.selectableTable.clearSelected()
        },
    },
    computed: {
        rows() {
        return this.fileData.length
        }
    },
    apollo: {
        getUsers: {
            query: getUser,
            prefetch: true,
            loadingKey: 'loading',
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

.link-cursor {
    cursor: pointer;
}
</style>
