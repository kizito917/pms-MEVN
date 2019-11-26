<template>
	<div class="main-body">
		<topNav1 />
		<sideNav1 />
		<div class="content">
			<div class="main-content">
				<h5>All Clients Documents</h5>
				<div class="table-fetched-area">
					<div class="table-responsive">
						<table class="table table-stripped table-hover table-bordered">
							<thead>
								<tr>
									<td>Client Name</td>
									<td>Document Name</td>
									<td>Uploaded On</td>
									<td>View Document(s)</td>
								</tr>
							</thead>
							<tbody v-for="fetchedDocument in fetchedDocuments" v-bind:key="fetchedDocument._id">
								<tr>
									<td>{{ fetchedDocument.client.fullName }}</td>
									<td>{{ fetchedDocument.docName }}</td>
									<td>{{ fetchedDocument.created_dt }}</td>
									<td><a target="blank" v-bind:href="fetchedDocument.docContentUrl"><font-awesome-icon id="font-icon" icon="eye" /></a></td>
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
				fetchedDocuments: []
			}
		},
		created() {
			const token = localStorage.getItem('adminToken')
			const options = {
				headers: {
					'authorization' : token
				}
			}
			axios.get('https://pmsbackendapi.herokuapp.com/admin/getClientDocuments', options)
			.then((res) => {
				console.log(res.data.doc),
				this.fetchedDocuments = res.data.doc
			})
			.catch(err => console.log(err))
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

.main-content> h5 {
	margin-top: 60px;
	text-align: center;
}

#font-icon {
	font-size: 30px;
}

.table-fetched-area {
	margin-top: 30px;
}
</style>