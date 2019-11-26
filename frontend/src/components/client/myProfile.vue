<template>
	<div class="main-body">
		<topNav />
		<sideNav />
		<div class="content">
			<div class="main-content">
				<div class="row">
					<div class="col-md-6">
						<div class="profile-picture">
							<font-awesome-icon id="font-icon" icon="user" />
						</div>
						<button id="btn-profile" class="btn btn-info">Change Avatar</button>
						<div class="profile-details">
							<p><strong>User</strong></p>
							<p><strong>About Me:</strong> lorem ipsum In my assets folder, I have a plain text file called “helloworld.txt” ... helloworld.txt as a string in Javascript in one of my Vue components so I can lorem ipsum In my assets folder, I have a plain text file called “helloworld.txt” ... helloworld.txt as a string in Javascript in one of my Vue components so I can </p>
						</div>
					</div>
					<div class="col-md-6">
						<div class="profile-info">
							<div class="alert alert-info">
								<h6 id="profile-h6">Profile Details Information</h6>
							</div>
							<div class="divOfProfile">
								<div class="user-info">
									<p><strong>FullName:</strong> {{ gottenFullName }}</p>
								</div>
								<div class="user-info">
									<p><strong>CompanyName:</strong> {{ gottenCompanyName }}</p>
								</div>
								<div class="user-info">
									<p><strong>Email:</strong> {{ gottenEmail }}</p>
								</div>
								<div class="user-info">
									<p><strong>Phone Number:</strong> {{ gottenPhoneNumber }}</p>
								</div>
								<div class="user-info">
									<p><strong>Date Of Account Creation:</strong> {{ gottenDate }}</p>
								</div>
							</div>
						</div>
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
				userToken: this.$store.state.userToken,
				gottenFullName: '',
				gottenCompanyName: '',
				gottenEmail: '',
				gottenPhoneNumber: '',
				gottenDate: ''
			}
		},
		created() {
			this.$store.getters.getUserToken
			const options = {
				headers: {'authorization' : this.$store.state.userToken}
			}
			axios.get('https://pmsbackendapi.herokuapp.com/client/profileDetails', options)
			.then((res) => {
				console.log(res.data.result),
				this.gottenFullName = res.data.result.fullName,
				this.gottenCompanyName = res.data.result.companyName,
				this.gottenEmail = res.data.result.email,
				this.gottenPhoneNumber = res.data.result.phoneNumber,
				this.gottenDate = res.data.result.created_dt
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

.main-content {
	margin-top: 60px;
	text-align: center;
}

#font-icon {
	font-size: 150px;
	color: #ccc;
}

.profile-picture {
	margin-top: 30px;
}

.profile-details {
	margin-top: 10px;
}

.profile-info {
	margin-top: 60px;
}

.divOfProfile {
	text-align: left;
}

#btn-profile{
	margin-top: 10px;
}

/*#profile-h6{
	margin-bottom: 30px;
}*/
</style>