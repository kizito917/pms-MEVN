<template>
    <div class="main-body">
        <topNav />
        <sideNav />
        <div class="content">
            <h4><b>Welcome {{ username }}<span class="glyphicon glyphicon-user"></span></b></h4>
            <p><strong>We could help you find your way easily...</strong></p>
            <div class="row">
                <div class="col-md-4 sm-4 lg-4" id="col-row">
                    <p>You can easily book appointment as a user by clicking the 
                        button below and filling all required informations as regards appointment.</p>
                        <router-link to="/client/appointment" class="btn btn-info" id="btnn">Book an Appointment</router-link>
                    <!-- <button class="btn btn-info">Book an Appointment</button> -->
                </div>
                <div class="col-md-4 sm-4 lg-4" id="col-row">
                    <p>Viewing your profile as a user has been made easy for you... Isn't that awesome? 
                        click the button below to view your profile
                    </p>
                    <router-link to="" class="btn btn-info" id="btnn">View your Profile</router-link>
                    <!-- <button class="btn btn-info">View your Profile</button> -->
                </div>
                <div class="col-md-4 sm-4 lg-4" id="col-row">
                    <p>To be able to view invoices generated/issued to users by admin, its made easy by 
                        clicking the button below 
                    </p>
                    <router-link to="/client/myInvoice" class="btn btn-info" id="btnn">View Invoice</router-link>
                    <!-- <button class="btn btn-info">View Invoice</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { bus } from '../../main'
import axios from 'axios'
import topNav from '../navbar/Topnav'
import sideNav from '../navbar/Sidenav'
export default {
    components: {
        topNav,
        sideNav
    },
    data() {
        return{
            username: ''
        }
    },
    created(){
        const headerToSend = localStorage.getItem('userToken')
        const options = {
            headers: {'authorization': headerToSend}
        };
        axios.get('http://localhost:1000/auth/dashboard', options)
        .then((res)=> {
            // console.log(res.data.authData.user.fullName),
            this.username = res.data.authData.user.fullName
            bus.$emit('clientName', res.data.authData.user.fullName)
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

.content> h4 {
    text-align: center;
    margin-top: 70px;
}

.content> p {
    text-align: center;
    font-style: italic;
}

.row {
    text-align: center;
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 50px;
}

#col-row {
    border: 1px solid #17a2b8;
}

#col-row> p {
    margin-top: 20px;
    margin-bottom: 20px;
}

#col-row> #btnn {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>