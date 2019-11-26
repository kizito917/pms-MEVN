<template>
    <div class="main-body">
    	<topNav />
    	<sideNav />
    	<div class="content">
    		<div class="view-content-area">
    		 	<h5>My Appointments</h5>
    		 	<div class="table-of-data">
    		 		<div class="table-responsive">
    		 			<table class="table table-bordered table-stripped table-hover">
    		 				<thead>
    		 					<tr>
    		 						<td>Client Name</td>
    		 						<td>Company Name</td>
    		 						<td>Email</td>
    		 						<td>Appointment Date</td>
    		 						<td>Appointment Message</td>
    		 						<td>Status</td>
    		 						<td>Created On</td>
    		 					</tr>
    		 				</thead>
    		 				<tbody v-for="fetchedInfo in fetchedInfos" v-bind:key="fetchedInfo._id">
    		 					<tr>
    		 						<td>{{ fetchedInfo.client.fullName }}</td>
    		 						<td>{{ fetchedInfo.companyName }}</td>
    		 						<td>{{ fetchedInfo.email }}</td>
    		 						<td>{{ fetchedInfo.appointmentDate }}</td>
    		 						<td>{{ fetchedInfo.appointmentMessage }}</td>
    		 						<td>{{ fetchedInfo.status }}</td>
    		 						<td>{{ fetchedInfo.created_dt }}</td>
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
        	gottenToken: this.$store.getters.getUserToken,
        	fetchedInfos: []
        }
    },
    created() {
        this.$store.getters.getAdminToken
        const headerOptions  = {
        	headers: {
                    'authorization': this.$store.state.userToken
                }
        }
        axios.get('https://pmsbackendapi.herokuapp.com/client/myBookedAppointments', headerOptions)
        .then((res) => {
        	console.log(res.data.data),
        	this.fetchedInfos = res.data.data
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

.view-content-area> h5 {
	margin-top: 60px;
	text-align: center;
}

.table-of-data {
	margin-top: 30px;
}
</style>