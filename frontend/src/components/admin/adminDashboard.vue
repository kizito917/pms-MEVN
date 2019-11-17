<template>
    <div class="main-body">
        <topNav1 />
        <sideNav1 />
        <div class="content">
            <h5 id="content-h5"><b>Welcome <strong>{{ name }}</strong>, we've got you some easy navigations...</b> </h5>
            <div class="navigation-area">
                <div class="row" id="nav-row">
                    <div class="col-md-4 sm-4 lg-4" id="col-of-row">
                        <p>It's been made easy, You can generate Invoice for one or all of
                            your clients by clicking the below button and providing clients info.
                        </p>
                        <router-link class="btn btn-info" to="/admin/createClientsInvoice">Generate Clients Invoice</router-link>
                    </div>
                    <div class="col-md-4 sm-4 lg-4" id="col-of-row">
                        <p>View all appointment being booked by registered clients/users and 
                            have the ability to perform actions on boooked appointment.
                        </p>
                        <router-link class="btn btn-info" to="/admin/viewClientsAppointment">see Clients Appointment</router-link>
                    </div>
                    <div class="col-md-4 sm-4 lg-4" id="col-of-row">
                        <p>Easily get to view all registered users on the platfrom with their
                            necessary informations needed by you for further communications.
                        </p>
                        <router-link class="btn btn-info" to="/admin/viewClients">view all registered clients</router-link>
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
            name: ''
        }
    },
    created() {
        const gotLocalToken = localStorage.getItem('adminToken')
        const options = {
            headers: {'authorization': gotLocalToken}
        };
        axios.get('http://localhost:1000/adminAuth/dashboard', options)
        .then((res) => {
            console.log(res.data.authData.user.fullName),
            this.name = res.data.authData.user.fullName
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

#content-h5 {
    text-align: center;
    margin-top: 60px;
}

#nav-row {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 50px;
}

#col-of-row {
    border: 1px solid #17a2b8;
    text-align: center;
}

#col-of-row> p {
    margin-top: 10px;
    margin-bottom: 10px;
}

#col-of-row> .btn-info {
    margin-bottom: 30px;
    margin-top: 20px;
}
</style>