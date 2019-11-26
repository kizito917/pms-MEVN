<template>
    <div class="main-body">
         <topNav1 />
         <sideNav1 />
         <div class="content">
             <div class="main-content-area">
                 <h5>All Created Invoices</h5>
                 <router-link to="/admin/createClientsInvoice" id="viewInv-btn" class="btn btn-info">Create Client Invoice</router-link>
                 <div class="fetchedinTable">
                     <div class="table-responsive">
                         <table  border="1" class="table table-stripped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <td>Client Name</td>
                                    <td>Company Name</td>
                                    <td>Invoice Title</td>
                                    <td>Invoice Description</td>
                                    <td>Service Rendered</td>
                                    <td>Invoice Number</td>
                                    <td>Price</td>
                                    <td>Qty</td>
                                    <td>Date Issued</td>
                                    <td>Date Due</td>
                                    <td>Invoice Created On</td>
                                    <td>Invoice Status</td>
                                </tr>
                            </thead>
                            <tbody v-for="fetchedDatum in fetchedData" v-bind:key="fetchedDatum._id">
                                <tr>
                                    <td>{{ fetchedDatum.fullName }}</td>
                                    <td>{{ fetchedDatum.companyName }}</td>
                                    <td>{{ fetchedDatum.title }}</td>
                                    <td>{{ fetchedDatum.description }}</td>
                                    <td>{{ fetchedDatum.serviceRendered }}</td>
                                    <td>{{ fetchedDatum.invoiceNumber }}</td>
                                    <td>{{ fetchedDatum.price }}</td>
                                    <td>{{ fetchedDatum.qty }}</td>
                                    <td>{{ fetchedDatum.dateIssued }}</td>
                                    <td>{{ fetchedDatum.dateDue }}</td>
                                    <td>{{ fetchedDatum.created_dt }}</td>
                                    <td>{{ fetchedDatum.status }}</td>
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
            adminToken: this.$store.state.gottenToken,
            fetchedData: []
        }
    },
    created() {
        this.$store.getters.getAdminToken
        const options = {
            headers: {'authorization' : this.$store.state.gottenToken}
        }
        axios.get('https://pmsbackendapi.herokuapp.com/admin/allClientsInvoice', options)
        .then((res) => {
            console.log(res.data.dataFetched),
            this.fetchedData = res.data.dataFetched
            })
        .catch((err) => console.log(err))
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

.main-content-area> h5 {
    margin-top: 60px;
    text-align: center;
}

.fetchedinTable {
    margin-top: 40px;
}

table {
    font-size: 13px;
}
</style>