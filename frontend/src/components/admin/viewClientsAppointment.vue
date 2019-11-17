<template>
    <div class="main-body">
        <topNav1 />
        <sideNav1 />
        <div class="content">
            <div class="main-content-area">
                <h5>All Clients Appointment</h5>
                <div class="fetched-data-area">
                    <div class="table-responsive">
                        <table class="table table-stripped table-bordered table-hover" 
                        v-for="fetchedAppointment in fetchedAppointments" 
                        v-bind:key="fetchedAppointment.id">
                            <thead>
                                <tr>
                                    <td>Client Name</td>
                                    <td>Company Name</td>
                                    <td>Appointment Date</td>
                                    <td>Appointment Message</td>
                                    <td>Status</td>
                                    <td>Created On</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ fetchedAppointment.client.fullName}}</td>
                                    <td>{{ fetchedAppointment.companyName }}</td>
                                    <td>{{ fetchedAppointment.appointmentDate }}</td>
                                    <td>{{ fetchedAppointment.appointmentMessage }}</td>
                                    <td>{{ fetchedAppointment.status }}</td>
                                    <td>{{ fetchedAppointment.created_dt }}</td>
                                    <td><button @click="confirmAppointment(fetchedAppointment._id)" class="btn btn-success"><font-awesome-icon icon="check" /></button> <button @click="rescheuleAppointment(fetchedAppointment._id)" class="btn btn-info" data-toggle="modal" data-target="#myModal"><font-awesome-icon icon="edit" /></button> <button @click="cancelAppointment(fetchedAppointment._id)" class="btn btn-warning"><font-awesome-icon icon="times" /></button> <button @click="deleteAppointment(fetchedAppointment._id)" class="btn btn-danger"><font-awesome-icon icon="trash" /></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">
          <p style="text-align: center;">Reschedule Client's Appointment</p>
        <div class="resch">
            <div class="alert alert-success" v-if="rescheduled">
                You Have Successfully Rescheduled Client's Appointment
            </div>
            <form v-on:submit="updateRescheduleAppointment(rescheduleData._id)">
                <div class="form-group">
                    <label for="appointmentDate">Choose New Appointment Date</label>
                    <input type="date" v-model="appointmentDate" class="form-control">
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-success" value="Update Appointment">
                </div>
            </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
            headerToken: this.$store.state.gottenToken,
            fetchedAppointments: [],
            rescheduleData: {},
            appointmentDate: '',
            rescheduled: false
        }
    },
    //lifecycle for fetching all clients appointment details from API endpoint
    created(){
        this.$store.getters.getAdminToken
        const options = {
            headers: {'authorization': this.$store.state.gottenToken}
        };
        axios.get('http://localhost:1000/admin/clientsAppointment', options)
        .then((res) => {
            console.log(res.data.fetchedData),
            this.fetchedAppointments = res.data.fetchedData
            })
        .catch((err) => console.log(err))
    },
    methods: {
        //method for confirming selected client's appointment
        confirmAppointment(paramsId) {
            const options = {
                headers: {'authorization': this.$store.state.gottenToken}
            };
            axios.patch('http://localhost:1000/admin/confirmClientsAppointment/' + paramsId,
             {_id: paramsId} ,options)
             .then((res) => {
                    console.log(res),
                    axios.get('http://localhost:1000/admin/clientsAppointment', options)
                    .then((res) => {
                        console.log(res.data.fetchedData),
                        this.fetchedAppointments = res.data.fetchedData
                        })
                    .catch((err) => console.log(err))
                 })
             .catch((err) => console.log(err))
        },
        //method for cancelling selected client's appointment
        cancelAppointment(paramsId) {
            const options = {
                headers: {'authorization': this.$store.state.gottenToken}
            }
            axios.patch('http://localhost:1000/admin/cancelClientsAppointment/' + paramsId,
            {_id: paramsId}, options)
            .then((res) => {
                console.log(res),
                axios.get('http://localhost:1000/admin/clientsAppointment', options)
                    .then((res) => {
                        console.log(res.data.fetchedData),
                        this.fetchedAppointments = res.data.fetchedData
                        })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
        },
        //method for deleting selected client's appointment
        deleteAppointment(paramsId) {
            const options = {
                headers: {'authorization': this.$store.state.gottenToken}
            }
            axios.delete('http://localhost:1000/admin/deleteClientsAppointment/' + paramsId,
            options)
            .then((res) => {
                console.log(res),
                axios.get('http://localhost:1000/admin/clientsAppointment', options)
                    .then((res) => {
                        console.log(res.data.fetchedData),
                        this.fetchedAppointments = res.data.fetchedData
                        })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
        },
        rescheuleAppointment(paramsId) {
            const options = {
                headers: {'authorization' : this.$store.state.gottenToken}
            }
            axios.get('http://localhost:1000/admin/clientsAppointment/' + paramsId, options)
            .then((res) => {
                console.log(res.data.Data),
                this.rescheduleData = res.data.Data
            })
            .catch((err) => console.log(err))
        },
        updateRescheduleAppointment(id) {
            const options = {
                headers: {'authorization': this.$store.state.gottenToken}
            }
            axios.put('http://localhost:1000/admin/rescheduleClientsAppointment/' + id ,
            {appointmentDate: this.appointmentDate}, options)
            .then((res) => {
                console.log(res),
                axios.get('http://localhost:1000/admin/clientsAppointment', options)
                    .then((res) => {
                        console.log(res.data.fetchedData),
                        this.fetchedAppointments = res.data.fetchedData,
                        this.rescheduled = true
                        })
                    .catch((err) => console.log(err))
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

.main-content-area> h5 {
    text-align: center;
    margin-top: 60px;
}

.fetched-data-area {
    margin-top: 50px;
}

#reschedule-btn {
    width: 100%;
}

button{
    font-size: 10px;
}
</style>