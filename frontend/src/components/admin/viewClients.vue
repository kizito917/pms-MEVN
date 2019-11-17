<template>
    <div class="main-body">
        <topNav1 />
        <sideNav1 />
        <div class="content">
            <div class="fetchedData-area">
                <h5>All Registered Clients</h5>
                <div class="fetched-data">
                    <div class="alert alert-success" v-if="successMsg">
                        You have successfully deleted a user
                    </div>
                    <div class="table-responsive">
                        <table v-for="client in clients" v-bind:key="client._id" border="1" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <td>Client's Name</td>
                                    <td>Client's Email address</td>
                                    <td>Company Name</td>
                                    <td>Contact Number</td>
                                    <td>Date of Registration</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ client.fullName }}</td>
                                    <td>{{ client.email }}</td>
                                    <td>{{ client.companyName }}</td>
                                    <td>{{ client.phoneNumber }}</td>
                                    <td>{{ client.created_dt }}</td>
                                    <td><button @click="deleteUser(client._id)" class="btn btn-danger"><font-awesome-icon icon="trash" /></button></td>
                                </tr>
                            </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import topNav1 from '../navbar/Topnav1'
import sideNav1 from '../navbar/Sidenav1'
export default {
    components: {
        topNav1,
        sideNav1
    },
    data() {
        return {
            clients: [],
            optionToken: '',
            successMsg: false
        }
    },
    created() {
        const gotLocalToken = localStorage.getItem('adminToken')
        this.optionToken = gotLocalToken
        const options = {
            headers: {'authorization': gotLocalToken}
        };
        axios.get('http://localhost:1000/admin/getClients', options)
        .then((res) => {
            console.log(res.data.clients),
            this.clients = res.data.clients
            })
        .catch((err) => console.log(err))
    },
    methods: {
        deleteUser(id) {
            const headerOption = {
                headers: {'authorization' : this.optionToken}
            }
            axios.delete('http://localhost:1000/admin/clients/' + id, headerOption)
            .then((res) => {
                console.log(res),
                this.$router.push('/admin/viewClients'),
                this.successMsg = true
                })
            .catch((err) => console.log(err))
            // console.log(this.optionToken)
        }
    }
}
</script>

<style scoped>
/* Page content. The value of the margin-left property should match the value of the sidebar's width property */
div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
  background-color: whitesmoke;
}

/* On screens that are less than 700px wide, make the sidebar into a topbar */
@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}

  .link-area {
    margin-top: 0px;}
}

/* On screens that are less than 400px, display the bar vertically, instead of horizontally */
@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }

  .link-area {
    margin-top: 0px;
}

} 

.fetchedData-area> h5 {
    margin-top: 60px;
    text-align: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 30px;
}

table {
    width: 100%;
}

.fetched-data {
    margin-top: 50px;
}
</style>