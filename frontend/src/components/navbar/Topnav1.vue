<template>
    <div class="main-body">
            <b-navbar toggleable="lg" type="dark" variant="info" class="navbar fixed-top">
                <b-navbar-brand href="/">PMS</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <!-- <b-navbar-nav>
                        <b-nav-item href="#">Link</b-nav-item>
                        <b-nav-item href="#" disabled>Disabled</b-nav-item>
                    </b-navbar-nav> -->

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <!-- <b-nav-form>
                            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                        </b-nav-form> -->

                        <b-nav-item>online</b-nav-item>

                        <b-nav-item-dropdown right>
                            <template v-slot:button-content>
                                <em>{{ username }}</em>
                            </template>
                            <b-dropdown-item href="#">Profile</b-dropdown-item>
                            <b-dropdown-item href="#" @click="signOutAdmin">Sign out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            username: ''
        }
    },
    created() {
        const headerToSend = localStorage.getItem('adminToken')
        const options = {
            headers: {'authorization': headerToSend}
        };
        axios.get('https://pmsbackendapi.herokuapp.com/adminAuth/dashboard', options)
        .then((res)=> {this.username = res.data.authData.user.fullName})
        .catch((err) => console.log(err))
    },
    methods: {
        signOutAdmin() {
            localStorage.removeItem('adminToken')
            this.$router.push('/admin/login')
        }
    }
}
</script>

<style scoped>

</style>