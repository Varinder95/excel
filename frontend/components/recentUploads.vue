<template>
    <div class="md:p-3">
      <div class="d-block my-4 md:m-4 w-100 border-bottom border-primary">
        <h2 class="text-wrap">Uploaded Files</h2>
      </div>
      <div v-if="uploadedData" class="d-flex w-100 flex-wrap">
        <b-card-group columns>
          <b-card title-tag="title" header-tag="header" footer-tag="footer"  v-for="data in getUploads" :key="data.FileName">
            <template #header>
              <h6 class="mb-0"><span class="font-weight-bold">File Name :</span> {{data.FileName}}</h6>
            </template>
            <b-card-text><h2>{{data.UploadName}}</h2></b-card-text>
            <p><span class="font-weight-bold">Uploaded by :</span> {{data.UploadedBy}}</p>
            <p><span class="font-weight-bold">Uploaded on :</span> {{new Date(data.createdAt * 1000)}}</p>
            <b-button @click="assignData(data)" variant="primary">Assign</b-button>
            <template #footer>
              <em><span class="font-weight-bold">Number of Entries :</span> {{data.NoOfEntries}}</em>
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

const getUploads = gql`
  
query GetUploads {
  getUploads {
    UploadName
    FileName
    NoOfEntries
    UploadedBy
    createdAt
  }
}
`;
export default {
  name: 'recentUploads',
  data() {
    return {
      uploadedData: false,
      getUploads : '',
      loading: 0,
    }
  },
  methods: {
    uploadRows() {
      if (this.getUploads.length > 0) {
        this.uploadedData = true;
      }
      localStorage.removeItem("assignFileName"); 
      localStorage.removeItem("assignUploadName"); 
      localStorage.removeItem("assignNoOfEntries"); 
      localStorage.removeItem("assignUploadedBy"); 
      localStorage.removeItem("assignUploadedOn"); 
    },
    assignData(data) {
      localStorage.setItem('assignFileName', data.FileName);
      localStorage.setItem('assignUploadName', data.UploadName);
      localStorage.setItem('assignNoOfEntries', data.NoOfEntries);
      localStorage.setItem('assignUploadedBy', data.UploadedBy);
      localStorage.setItem('assignUploadedOn', data.createdAt);
      this.$router.push('/assignData')
    }
  },
  beforeMount() {
    this.uploadRows();
  },
  mounted() {
    this.uploadRows();
  },
  apollo: {
    getUploads: {
      query: getUploads,
      prefetch: true,
      loadingKey: 'loading',
    },
  },
}
</script>
