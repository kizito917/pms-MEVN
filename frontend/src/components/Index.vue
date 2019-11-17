<template>
    <div class="main-body">
        <h1 id="index-h1">{{ title }}</h1>
        <div class="btn-area">
                <router-link to="/client/register" class="btn btn-info" id="btn-trig">Get Started as a Client</router-link><br><br>
                <router-link to="/admin/register" class="btn btn-info" id="btn-trig">Get started as an Admin</router-link>
        </div>
    </div>
</template>

<script>
// import topNav from './navbar/Topnav'
export default {
    components: {
        // topNav
    },
    data(){
        return{
            title: this.$store.state.indexTitle
        }
    }
}
</script>

<style scoped>
    .main-body {
        background-color: whitesmoke;
    }

    #index-h1{
        text-align: center;
        padding-top: 230px;
        padding-bottom: 25px;
    }

    .btn-area {
        width: 60%;
        margin-left: 20%;
        margin-right: 20%;
        text-align: center;
        padding-bottom: 240px;
    }

    #btn-trig {
        width: 60%;
        background-color: transparent;
        color: #000;
    }

    #btn-trig:hover {
        width: 60%;
        background-color: #17a2b8;
        color: #fff;
        border-color: #17a2b8
    }
</style>