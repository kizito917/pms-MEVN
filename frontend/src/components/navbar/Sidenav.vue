<template>
    <div class="main-body">
        <!-- The sidebar -->
        <div class="sidebar">
            <div class="link-area">
                
                <a href="/client/dashboard">Dashboard</a>
                <a href="#news">profile</a>
                <a href="#contact">Appointment</a>
                <a href="/client/uploadDocuments">Documents</a>
                <a href="#about">Invoice</a>
                <a href="#about">Log Out</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    /* The side navigation menu */
.sidebar {
  margin: 0;
  padding-top: 50px;
  width: 200px;
  background-color: grey !important;
  position: fixed;
  height: 100%;
  overflow: auto;
}

/* Sidebar links */
.sidebar a {
  display: block;
  color: #ffffff;
  padding: 16px;
  text-decoration: none;
}

.link-area {
    margin-top: 30px;
}

/* Active/current link */

/* Links on mouse-over */
.sidebar a:hover:not(.active) {
  background-color: #17a2b8;
  color: white;
}

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
</style>