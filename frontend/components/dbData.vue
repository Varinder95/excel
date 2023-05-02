<template>
  <div>
    <div class="d-flex mx-4">
      <h2 class="text-wrap"> Business Listing</h2>
    </div>
    <b-pagination responsive
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
    <!-- If there is one or more queries loading -->
    <div v-if="loading > 0">
      Loading
    </div>
    <!-- Actual view -->
    <div v-else>
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
    </div>
    <b-table responsive striped hover :fields="fields" :items="getData" :per-page="perPage" :current-page="currentPage">
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
  </div>
</template>
  
<script>
import gql from 'graphql-tag'

const getData = gql`
  
query GetData {
  getData {
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
  }
}
`;
export default {
  name: 'dbData',
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
          { key: 'FileName', label: 'File Name' }, 
          { key: 'createdAt', label: 'Created On' }, 
  
        ],
        getData:'',
        NoOfRows: '',
        perPage: 10,
        currentPage: 1,
        loading: 0,
      }
    },
    apollo: {
        getData: {
            query: getData,
            prefetch: true,
            loadingKey: 'loading',
        },
    },
    methods:{
      ChangeNoRows() {
        this.perPage = this.NoOfRows
      }
    },
    computed: {
      rows() {
        return this.getData.length
      }
    }
}
</script>