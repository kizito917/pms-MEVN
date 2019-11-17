<template>
    <div class="main-body">
         <topNav />
         <sideNav />
         <div class="content">
             <div class="upload-area">
                 <h5>Upload Documents</h5>
                 <div class="upload-div">
                     <div class="upload-content">
                        <router-link to="" data-toggle="modal" data-target="#myModal"><font-awesome-icon icon="upload" id="upload-icon" /></router-link>
                        <h5>Upload Your Document(s)</h5>
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
          <span>Choose document type by clicking button below (single/multiple)</span>
        <p style="text-align: center;"><strong>Upload Your Documents Below</strong></p>
        <div class="row">
            <div class="col-md-6">
                <button class="btn btn-primary" v-on:click="showSingleUpload">Single</button>
            </div>
            <div class="col-md-6">
                <button class="btn btn-info" v-on:click="showMultipleUpload">Multiple</button>
            </div>
        </div>
        <div class="form-div">
            
                <div class="row">
                    <div class="col-md-6 sm-6 lg-6" v-if="singleUpload">
                        <form enctype="multipart/form-data">
                            <div class="form-group" id="first-fg">
                                <label for="file">Upload File</label>
                                <input type="file" name="file" ref="pdf" v-on:change="onSelect" required class="form-control">
                            </div>
                            <div class="form-group">
                                <input type="submit" @click.prevent="uploadSingleDoc" value="Upload" class="btn btn-success">
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6 sm-6 lg-6" v-if="multipleUpload">
                        <form action="">
                            <div class="form-group" id="first-fg">
                                <label for="file">Upload File</label>
                                <input type="file" ref="pdf" v-on:change="onSelectMultiple" required class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="file">Upload File</label>
                                <input type="file" ref="pdf1" v-on:change="onSelectMultiple1" required class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="file">Upload File</label>
                                <input type="file" ref="pdf2" v-on:change="onSelectMultiple2" required class="form-control">
                            </div>
                        </form>
                    </div>
                </div>
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
            singleUpload: false,
            multipleUpload: false,
            fileInfo: '',
            multipleFileInfo: []
        }
    },
    created() {
        this.$store.getters.getAdminToken
    },
    methods: {
        showSingleUpload() {
            this.singleUpload = true
            this.multipleUpload = false
        },
        showMultipleUpload() {
            this.multipleUpload = true
            this.singleUpload = false
        },
        onSelect() {
            this.fileInfo = this.$refs.pdf.files[0];
            console.log(this.fileInfo)
        },
        onSelectMultiple() {
           this.multipleFileInfo.push(this.$refs.pdf.files[0])
           console.log(this.multipleFileInfo)
            
        },
        onSelectMultiple1() {
           this.multipleFileInfo.push(this.$refs.pdf1.files[0])
           console.log(this.multipleFileInfo)
            
        },
        onSelectMultiple2() {
           this.multipleFileInfo.push(this.$refs.pdf2.files[0])
           console.log(this.multipleFileInfo)
            
        },
        uploadSingleDoc() {
            const formData = new FormData()
                formData.append('file', this.fileInfo);
            const config = {
                headers: {
                    'authorization': this.$store.state.userToken,
                    'Accept': 'multipart/form-data'
                    },
                        
            };
            axios.post('http://localhost:1000/client/singleDoc', formData, config)
            .then((res) => console.log(res))
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

.upload-area> h5 {
    margin-top: 60px;
    text-align: center;
}

.upload-div {
    text-align: center;
    margin-top: 200px;
    border: 1px solid #17a2b8;
    border-radius: 12px;
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;
    background-color: whitesmoke;
}

#upload-icon {
    font-size: 40px;
    color: #17a2b8;
    margin-bottom: 20px;
}

.upload-content> h5 {
    font-size: 15px;
    font-style: italic;
}

.upload-content {
    padding-top: 30px;
    padding-bottom: 30px;
}

#first-fg {
    margin-top: 20px;
}
</style>