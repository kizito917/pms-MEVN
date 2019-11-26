<template>
	<div class="main-body">
		<topNav />
		<sideNav />
		<div class="content">
			<div class="fetched-documents">
				 <h5>My Documents</h5>
				 <router-link to="/client/uploadDocuments" class="btn btn-info">Upload A Document</router-link>
				 <div class="fetched-doc-table">
				 	<div class="table-responsive">
				 		<table class="table table-stripped table-hover table-bordered">
				 			<thead>
				 				<tr>
				 					<td>Name</td>
				 					<td>document Name</td>
				 					<td>Uploaded on</td>
				 					<td>View Document</td>
				 				</tr>
				 			</thead>
				 			<tbody v-for="fetchedData in Data" v-bind:key="fetchedData._id">
				 				<tr>
				 					<td>{{ fetchedData.client.fullName }}</td>
				 					<td>{{ fetchedData.docName }}</td>
				 					<td>{{ fetchedData.created_dt }}</td>
				 					<td><a target="blank" v-bind:href="fetchedData.docContentUrl"><font-awesome-icon id="font-icon" icon="eye" /></a></td>
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
				userGottenToken: this.$store.state.userToken,
				Data: []
			}
		},
		created() {
			this.$store.getters.getAdminToken
			const token = localStorage.getItem('userToken')
			const headerOptions  = {
	        	headers: {
	                    'authorization': token
	                }
        	}
			axios.get('https://pmsbackendapi.herokuapp.com/client/myDocs', headerOptions)
			.then((res) => {
				console.log(res.data.datafetched)
				this.Data = res.data.datafetched
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

.fetched-documents > h5 {
	margin-top: 60px;
	text-align: center;
} 

.fetched-doc-table {
	margin-top: 30px;
}
</style>