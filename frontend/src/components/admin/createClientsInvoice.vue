<template>
    <div class="main-body">
        <topNav1 />
        <sideNav1 />
        <div class="content">
            <div class="invoice-content-area">
                <div class="top">
                    <h5>Generate Client's Invoice</h5>
                    <router-link to="/admin/viewInvoice" id="viewInv-btn" class="btn btn-info">View Created Invoices</router-link>
                </div>
                <div class="alert alert-success" v-if="invoiceMsg">
                    You have successfully Created invoice for user: {{ this.fullName }}
                </div>
                <div class="invoice-form-area">
                    <form @submit.prevent="createClientsInvoice">
                    <div class="row" id="row-invoice">
                            <div class="col-md-6">
                                
                                <div class="form-group">
                                    <label for="clientName">Client Name</label>
                                    <input type="text" v-model="fullName" class="form-control" v-bind:placeholder="fullName" disabled>
                                </div>
                                <div class="form-group">
                                    <label for="dateIssued">Date Issued</label>
                                    <input type="date" v-model="dateIssued" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="serviceRendered">Service Rendered</label>
                                    <input type="text" v-model="serviceRendered" class="form-control" placeholder="Enter Services Rendered">
                                </div>
                                <div class="form-group">
                                    <label for="invoiceTitle">Invoice Title</label>
                                    <input type="text" v-model="title" class="form-control" placeholder="Enter Invoice Title">
                                </div>
                                <div class="form-group">
                                    <label for="qty">Quantity</label>
                                    <select v-model="qty" class="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group" v-for="companyName in companyNames" v-bind:key="companyName.id">
                                    <label for="clientName">Company Name</label>
                                    <select  class="form-control" v-on:change="getClientName">
                                        <option class="form-control">Select Company Name</option>
                                        <option id="companyOption" v-bind:value="companyName.companyName">{{ companyName.companyName}}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="dateDue">Date Due</label>
                                    <input type="date" v-model="dateDue" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="invoiceNumber">Invoice Number</label>
                                    <input type="text" v-model="invoiceNumber" class="form-control" placeholder="Enter Invoice Number">
                                </div>
                                <div class="form-group">
                                    <label for="invoiceDescription">Invoice Description</label>
                                    <input type="text" v-model="description" class="form-control" placeholder="Enter Invoice Description">
                                </div>
                                <div class="form-group">
                                    <label for="price">Price</label>
                                    <input type="number" v-model="price" class="form-control" placeholder="Enter Invoice Price">
                                </div>
                            </div>
                            <div class="form-group" id="submit-div">
                                <input type="submit" value="Create Invoice" class="btn btn-info">
                            </div>
                    </div>
                    </form>
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
            gottenAdminToken: '',
            gottenClientName: '',
            companyNames: [],
            companyName: '',
            fullName: '',
            dateIssued: '',
            serviceRendered: '',
            title: '',
            qty: '',
            dateDue: '',
            invoiceNumber: '',
            description: '',
            price: '',
            invoiceMsg: false
        }
    },
    created() {
        this.$store.getters.getAdminToken
        this.gottenAdminToken = this.$store.getters.getAdminToken
        const options = {
            headers: {'authorization': this.gottenAdminToken}
        }
        axios.get('http://localhost:1000/admin/getClients', options)
        .then((res) => {
            this.companyNames = res.data.clients
            })
        .catch((err) => console.log(err))
    },
    methods: {
       getClientName() {
           const get = document.getElementById('companyOption').value;
           this.companyName = get
           const options = {
                headers: {'authorization' : this.gottenAdminToken}
             }
           axios.post('http://localhost:1000/admin/getClientName', {companyName: get} ,options)
           .then((res) => {
               this.fullName = res.data
               })
           .catch((err) => console.log(err))
       },
       createClientsInvoice() {
           const options = {
               headers: {'authorization' : this.gottenAdminToken}
           }
           axios.post('http://localhost:1000/admin/createClientInvoice', 
           { dateIssued: this.dateIssued, dateDue: this.dateDue, serviceRendered: this.serviceRendered, invoiceNumber: this.invoiceNumber,
				fullName: this.fullName,
				companyName: this.companyName,
                title: this.title,
				description: this.description,
				qty: this.qty,
				price: this.price
           }, options)
           .then((res) => {
               console.log(res),
               this.invoiceMsg = true
               setTimeout(() => {
                   this.$router.push('/admin/viewInvoice')
               }, 2000);
               })
           .catch((err) => console.log(err))
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

.invoice-content-area{
    margin-top: 70px;
    text-align: center;
}

#row-invoice {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 40px;
}

#submit-div {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
}

#submit-div> input {
    width: 100%;
}
.top {
    text-align: center;
}

#viewInv-btn {
    background-color: transparent;
    color: #17a2b8;
}
</style>