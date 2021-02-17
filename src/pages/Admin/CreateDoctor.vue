<template>
  <card >
    <h4 slot="header" class="card-title">Create Doctor</h4>
    <form>
      <div class="row">
        <div class="col-md-4">
          <base-input type="text"
                    label="Name"
                    placeholder="Enter Name"
                    v-model="doctor.name">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="text"
                    label="Field"
                    placeholder="Enter Fieled"
                    v-model="doctor.field">
          </base-input>
        </div>
        <div class="col-md-2">
            <base-input type="text"
                    label="Gender"
                    placeholder="Enter Gender"
                    v-model="doctor.gender">
            </base-input>
        </div>
        <div class="col-md-2">
            <base-input type="number"
                    label="Age"
                    placeholder="Enter Age"
                    v-model="doctor.age">
            </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
            <base-input type="number"
                        label="Phone"
                        placeholder="Enter Phone Number"
                        v-model="doctor.phone">
            </base-input>
        </div>
        <div class="col-md-6">
            <base-input type="email"
                        label="Email"
                        placeholder="Email"
                        v-model="doctor.email">
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
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="saveDoctor">
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
            doctor:{},
            allergies:[],
            password:"",
            repassword:""
        }
    },
    beforeMount(){
        
    },
    methods:{
        saveDoctor(){
            if(this.doctor.email != "" && this.passoword != ''){
                if(this.password != this.repassword){
                    this.notify(`Please make sure that the passwords entered match`,'warning')
                    return
                }
                firebase.auth.createUserWithEmailAndPassword(this.doctor.email, this.password).then(auth=>{
                    firebase.db.doc("users/"+auth.user.uid).set({
                        ...this.doctor,...{'id':auth.user.uid,'type':'Doctor'}
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
