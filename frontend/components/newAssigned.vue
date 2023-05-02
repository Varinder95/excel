<template>
    <div class="md:p-3">
      <div class="d-block my-4 md:m-4 w-100 border-bottom border-primary">
        <h2 class="text-wrap">Assigned</h2>
      </div>
      <div v-if="uploadedData" class="d-flex w-100 flex-wrap">
        <b-card-group columns>
          <b-card title-tag="title" header-tag="header" footer-tag="footer"  v-for="data in getAssigned" :key="data.FileName">
            <template #header>
              <h6 class="mb-0"><span class="font-weight-bold">File Name :</span> {{data.FileName}}</h6>
            </template>
            <b-card-text><h2>{{data.UploadName}}</h2></b-card-text>
            <p><span class="font-weight-bold">Uploaded by :</span> {{data.AssignedBy}}</p>
            <p><span class="font-weight-bold">Uploaded on :</span> {{new Date(data.createdAt * 1000)}}</p>
            <p><span class="font-weight-bold">Report By :</span> {{data.ReportingBy}}</p>
            <b-button @click="reportData(data.FileName)" variant="primary">View</b-button>
            <template #footer>
              <em><span class="font-weight-bold">Number of Entries :</span> {{data.Entries}}</em>
            </template>
          </b-card>
        </b-card-group>
      </div>
      <div v-else class="d-block w-100">
        <div class="mx-auto w-100 d-flex">
          <div class="alert alert-danger w-100" role="alert">
            No Data Available
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import gql from 'graphql-tag'

const getAssigned = gql`
  
query GetAssigned($email: String!) {
  getAssigned(email: $email) {
    UploadName
    FileName
    Entries
    AssignedTo
    AssignedBy
    ReportingBy
    createdAt
  }
}
`;
export default {
  name: 'newAssigned',
  data() {
    return {
      uploadedData: false,
      getAssigned : '',
      loading: 0,
    }
  },
  methods: {
    uploadRows() {
      if (this.getAssigned.length > 0) {
        this.uploadedData = true;
      }
      localStorage.removeItem("assignFileName"); 
      localStorage.removeItem("assignUploadName"); 
      localStorage.removeItem("assignNoOfEntries"); 
      localStorage.removeItem("assignUploadedBy"); 
      localStorage.removeItem("assignUploadedOn"); 
    },
    assignData(data) {
      localStorage.setItem('assignedFileName', data.FileName);
      this.$router.push('/assignData')
    }, 
    reportData(filename) {
      
    }
  },
  beforeMount() {
    this.uploadRows();
  },
  mounted() {
    this.uploadRows();
  },
  apollo: {
    getAssigned: {
        query: getAssigned,
        prefetch: true,
        variables: {
            email : localStorage.getItem("Email")
        },
        loadingKey: 'loading',
    },
  },
}
</script>
