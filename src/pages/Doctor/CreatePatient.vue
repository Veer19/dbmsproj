<template>
  <card >
    <h4 slot="header" class="card-title">Create Patient</h4>
    <form>
      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                    label="Name"
                    placeholder="Enter Name"
                    v-model="patient.name">
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input type="number"
                    label="Age"
                    placeholder="Enter Age"
                    v-model="patient.age">
          </base-input>
        </div>
        <div class="col-md-4">
            <base-input type="text"
                    label="Gender"
                    placeholder="Enter Gender"
                    v-model="patient.gender">
            </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
            <base-input type="number"
                        label="Phone"
                        placeholder="Enter Phone Number"
                        v-model="patient.phone">
            </base-input>
        </div>
        <div class="col-md-6">
            <base-input type="email"
                        label="Email"
                        placeholder="Email"
                        v-model="patient.email">
            </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
            <base-input type="password"
                        label="Password"
                        placeholder="Enter Password"
                        v-model="password">
            </base-input>
        </div>
        <div class="col-md-6">
            <base-input type="password"
                        label="Re-Password"
                        placeholder="Enter Re-Password"
                        v-model="repassword">
            </base-input>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="savePatient">
          Create Profile
        </button>
      </div>
    </form>
  </card>
</template>
<script>
import firebase from 'src/firebaseInit.js'
import Card from 'src/components/Cards/Card.vue'

export default {
    components: {
      Card
    },
    data() {
        return {
            patient:{},
            allergies:[],
            password:"",
            repassword:""
        }
    },
    beforeMount(){
        
    },
    methods:{
        savePatient(){
            if(this.patient.email != "" && this.passoword != ''){
                if(this.password != this.repassword){
                    this.notify(`Please make sure that the passwords entered match`,'warning')
                    return
                }
                firebase.auth.createUserWithEmailAndPassword(this.patient.email, this.password).then(auth=>{
                    firebase.db.doc("users/"+auth.user.uid).set({
                        ...this.patient,...{'id':auth.user.uid,'type':'Patient'}
                    })
                    .then(data=>{
                        this.notify(`Account Created`,'success')
                        this.$router.go(0)
                    })
                })
            }
            else{
                this.$f7.dialog.alert("Please Enter Valid Data")
            }
        }
    }
}
</script>
