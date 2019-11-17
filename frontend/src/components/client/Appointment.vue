<template>
    <div class="main-body">
        <topNav />
        <sideNav />
        <div class="content">
            <div class="appointment-area">
                <h5>Hi <strong>{{ user }}</strong> , Use the form Below to Book Appointment</h5>
                <div v-if="successMsg" class="alert alert-success">
                    You have successfully booked an appointment, An email will be sent to you once confirmed...
                </div>
                <div class="form-area">
                    <form v-on:submit.prevent="bookAppointment">
                        <div class="form-group">
                            <label for="appointment_date">Appointment Date</label>
                            <input type="date" v-model="appointmentDate" class="form-control" placeholder="Enter Appointment Date">
                        </div>
                        <div class="form-group">
                            <label for="appointment_message">Reason for Appointment</label>
                            <textarea class="form-control" v-model="appointmentMessage" placeholder="Write Briefly Reason for appointment" cols="30" rows="10"></textarea>
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btn btn-info" value="Book Appointment"> <router-link to="" id="app-book-viewBtn" class="btn btn-info">View All My Booked Appointment</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { bus } from '../../main'
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
            pageTitle: 'Use the form Below to Book Appointment',
            user: '',
            appointmentDate: '',
            appointmentMessage: '',
            successMsg: false
        }
    },
    methods: {
        bookAppointment() {
            const headerToSend = localStorage.getItem('userToken')
            const options = {
                headers: {'authorization': headerToSend}
            };
            axios.post('http://localhost:1000/client/appointment', {
                appointmentDate: this.appointmentDate,
                appointmentMessage: this.appointmentMessage
            } , options)
            .then((res) => {
                console.log(res),
                this.successMsg = true
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

.appointment-area {
    margin-top: 70px;
    text-align: center;
}

.form-area{
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 50px;
}

#app-book-viewBtn{
    background-color: transparent;
    color: #17a2b8;
}

#app-book-viewBtn:hover{
    background-color: #17a2b8;
    color: #fff;
    border-color: transparent;
}
</style>