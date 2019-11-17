<template>
    <div class="main-body">
        <topNav />
        <sideNav />
        <div class="content">
            <div class="invoice-fetched-area">
                <h5>My Invoice(s)</h5>
                <div class="fetched-data-tables">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover table-stripped">
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
                                    <td>Invoice Payment Status</td>
                                    <td>Issued By</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody v-for="fetchedInvoice in fetchedInvoices" v-bind:key="fetchedInvoice._id">
                                <tr>
                                    <td>{{ fetchedInvoice.fullName }}</td>
                                    <td>{{ fetchedInvoice.companyName }}</td>
                                    <td>{{ fetchedInvoice.title }}</td>
                                    <td>{{ fetchedInvoice.description }}</td>
                                    <td>{{ fetchedInvoice.serviceRendered }}</td>
                                    <td>{{ fetchedInvoice.invoiceNumber }}</td>
                                    <td>{{ fetchedInvoice.price }}</td>
                                    <td>{{ fetchedInvoice.qty }}</td>
                                    <td>{{ fetchedInvoice.dateIssued }}</td>
                                    <td>{{ fetchedInvoice.dateDue }}</td>
                                    <td>{{ fetchedInvoice.created_dt }}</td>
                                    <td>{{ fetchedInvoice.status }}</td>
                                    <td>Admin</td>
                                    <td><font-awesome-icon icon="credit-card" style="color: #28a745; font-size: 25px;" /></td>
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
import topNav from '../navbar/Topnav'
import sideNav from '../navbar/Sidenav'
export default {
    components: {
        topNav,
        sideNav
    },
    data() {
        return {
            fetchedInvoices: []
        }
    },
    created() {
        const headerToSend = localStorage.getItem('userToken')
        const options = {
            headers: {'authorization': headerToSend}
        };
        axios.get('http://localhost:1000/client/myInvoice', options)
        .then((res) => {
            console.log(res.data.result),
            this.fetchedInvoices = res.data.result
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

.invoice-fetched-area> h5 {
    text-align: center;
    margin-top: 60px;
}

.fetched-data-tables {
    margin-top: 40px;
}

table {
    font-size: 12px;
}
</style>