<template>
    <div>
      <div class="d-flex mx-4">
        <h2 class="text-wrap"> User Listing</h2>
      </div>
      <b-table responsive striped hover :items="getUsers"></b-table>
    </div>
</template>
  
<script>
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
  name: 'dbUsers',
    data() {
        return {
        }
    },
    apollo: {
        getUsers: {
            query: getUser,
            prefetch: true,
        },
    }
}
</script>