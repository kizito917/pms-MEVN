<template>
    <div class="main-body">
        <div class="row">
            <div class="col-md-6 sm-6 lg-6" id="first-col">
                
            </div>
            <div class="col-md-6 sm-6 lg-6">
                <div class="alert alert-success" v-if="message" id="alert-box">
                    You have successfully created an account, kindly <router-link to="/client/login">login</router-link>
                </div>
                <div class="content-area">
                    <h6>{{ secondColTitle }}</h6>
                    <div class="form-area">
                        <form v-on:submit.prevent="registerUser">
                            <div class="form-group">
                                <label for="fullName">Full Name</label>
                                <input type="text" class="form-control" v-model="fullName" required placeholder="Enter Full name(Starting with surname)">
                            </div>
                            <div class="form-group">
                                <label for="companyName">Company Name</label>
                                <input type="text" class="form-control" v-model="companyName" required placeholder="Enter Company Name">
                            </div>
                            <div class="form-group">
                                <label for="phoneNumber">Phone Number</label>
                                <input type="number" class="form-control" v-model="phoneNumber" required placeholder="Enter Phone Number">
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" class="form-control" v-model="email" required placeholder="Enter Email Address">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" v-model="password" required placeholder="Choose Password">
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btn btn-info" value="Register Account">
                            </div>
                        </form>
                        <p>Already Registered, <router-link to="/client/login">Login</router-link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return{
            secondColTitle: 'Hi Client!!!, Sign Up for an account with PMS',
            fullName: '',
            companyName: '',
            phoneNumber: '',
            email: '',
            password: '',
            message: false
        }
    },
    methods: {
        registerUser() {
            axios.post('http://localhost:1000/auth/signup', {
                fullName: this.fullName,
                companyName: this.companyName,
                phoneNumber: this.phoneNumber,
                email: this.email,
                password: this.password
            })
            .then((res) => {
                console.log(res),
                this.message = true
                setTimeout( () => this.$router.push({ path: '/client/login'}), 4000);
            })
            .catch((err) => console.log(err))
        }
    }
}
</script>

<style scoped>
    .row {
        width: 100%;
        text-align: center;
    }

    #first-col{
        background-image: url('../../assets/contactpics.jpg');
        background-size: cover;
        background-repeat: no-repeat;
    }

    .content-area {
        width: 60%;
        margin-left: 20%;
        margin-right: 20%;
        border: 1px solid #17a2b8;
        border-radius: 3px;
        margin-top: 67px;
        margin-bottom: 67px;
    }

    .content-area> h6 {
        margin-top: 10px;
    }

    .form-group {
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }

    #alert-box {
        margin-top: 20px;
        margin-bottom: -40px;
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }
</style>