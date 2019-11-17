<template>
    <div class="main-body">
        <div class="row">
            <div class="col-md-6 sm-6 lg-6" id="first-col">
                
            </div>
            <div class="col-md-6 sm-6 lg-6">
                <div class="alert alert-success" v-if="message" id="alert-box">
                     Login Successful!!! Redirecting...
                </div>
                <div class="alert alert-danger" v-if="errorMsg" id="alert-box1">
                     Incorrect email and password combination
                </div>
                <div class="content-area">
                    <h6>{{ adminLoginTitle }}</h6>
                    <div class="form-area">
                        <form v-on:submit.prevent="loginAdmin">
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" v-model="email" class="form-control" required placeholder="Enter Email Address">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" v-model="password" class="form-control" required placeholder="Choose Password">
                            </div>
                            <div class="form-group">
                                <input type="submit" class="btn btn-info" value="Login Account">
                            </div>
                        </form>
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
        return {
            adminLoginTitle: this.$store.state.adminLoginTitle,
            email: '',
            password: '',
            message: false,
            errorMsg: false
        }
    },
    methods: {
        loginAdmin() {
            axios.post('http://localhost:1000/adminAuth/login', {
                email: this.email,
                password: this.password
            })
            .then((res) => {
                console.log(res.data)
                this.message = true
                localStorage.setItem('adminToken', res.data)
                setTimeout( () => this.$router.push({ path: '/admin/dashboard'}), 2000);
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
        background-image: url('../../assets/contactpics2.jpg');
        background-size: cover;
        background-repeat: no-repeat;
    }

    .content-area {
        width: 60%;
        margin-left: 20%;
        margin-right: 20%;
        border: 1px solid #17a2b8;
        border-radius: 3px;
        margin-top: 200px;
        margin-bottom: 200px;
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
        margin-bottom: -140px;
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }

    #alert-box1 {
        margin-top: 20px;
        margin-bottom: -140px;
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }
</style>