<template>
  <div class="d-flex flex-column md:p-3">
    <div v-if="fileUploaded">
      <div class="d-flex mx-4 border-bottom border-primary">
        <h2 class="text-wrap">File Uploaded Succesfully</h2>
      </div>
      <div v-if="dataUploaded" class="d-block mt-4">
        <h4>Data succesfully saved in mongo db database.</h4>
        <div class="my-4 md:m-4">
          <nuxt-link to="/Dashboard"><b-button block variant="primary" size="lg" class="m-4" @click="toDash">Go to Dashboard</b-button></nuxt-link>
        </div> 
      </div>
      <div v-else class="d-block mt-4">
        <h4>Do you want to save data in mongo db database.</h4>
        <div class="my-4 md:m-4">
            <b-button block variant="outline-primary" size="lg" class="m-4" @click="submitData">Upload data</b-button>
        </div> 
      </div>
    </div>
    <div v-else>
      <div class="d-flex md:mx-4 border-bottom border-primary">
      </div>
      <div class="d-flex mt-4">
        <div class="pt-4">
          <input type="text" v-model="uploadName" name="uploadName" class="my-4 md:m-4 form-control form-control-md" placeholder="Upload name *" >
          <input type="file" name="uploadfile" class="my-4 md:m-4 form-control form-control-lg" accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' @change="uploadFile" ref="file">
          <b-button block variant="outline-primary" size="lg" class="my-4 md:m-4" @click="submitFile">Upload</b-button>
        </div> 
      </div>
    </div>
    <div v-if="uploadData" class="overflow-auto">
      <h4 class="my-4">Data Preview : </h4>
      <b-pagination
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
      <b-table responsive striped hover :fields="fields" :items="uploadData" :per-page="perPage" :current-page="currentPage">
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default{
  name: 'uploads',
  data() {
    return {
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
          { key: 'FileName', label: 'FileName' }, 
  
        ],
        uploadName: '',
        fileName: '',
        NoOfRows: '',
        perPage: 10,
        currentPage: 1,
        userEmail: '',
        uploadData: null,
        xlFile: null,
        fileUploaded: false,
        dataUploaded: false
    }
  },
  computed: {
    rows() {
      return this.uploadData.length
    }
  },
  mounted() {
    this.userEmail = this.storage();
  },
  methods:{
    storage(){
      return localStorage.getItem("Email");
    },
    uploadFile() {
      this.xlFile = this.$refs.file.files[0];
    },
    submitFile() {
      const formData = new FormData();
      formData.append('uploadfile', this.xlFile);
      const headers = { 'Content-Type': 'multipart/form-data' };
      axios.post('http://127.0.0.1:8000/uploadfile', formData, { headers }).then((res) => {          
        
        const receivedData = res.data;
        console.log(receivedData);
        const data2 = {CreatedBy:this.userEmail, UploadName:this.uploadName};

        for (let i = 0; i < receivedData.length; i++) {
          receivedData[i] = Object.assign(receivedData[i], data2);
        }
        this.uploadData = receivedData;
        this.fileName = receivedData[0].FileName;
        console.log(this.uploadData);
        this.fileUploaded = true;
      });
    },
    submitData() {
      const newData = this.uploadData;
      const DataObj = {
        UploadName: this.uploadName,
        UploadedBy: this.userEmail,
        FileName: this.fileName,
        NewData: newData
      }
      const headers = { 'Content-Type': 'application/json' };
      axios.post('http://127.0.0.1:8000/uploaddata', DataObj, { headers }).then((res) => {          
        if(res.data == "Successful") {
          this.dataUploaded = true;
        }
      });
    },
    ChangeNoRows() {
      this.perPage = this.NoOfRows
    }
  }
}
</script>
