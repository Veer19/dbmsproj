<template>
  <card >
    <h4 slot="header" class="card-title">Add Diagnosis</h4>
      <div class="row py-2">
        <div class="col-md-12">
          <base-input type="text"
                    label="Issue"
                    placeholder="Enter Issue"
                    v-model="diag.issue">
          </base-input>
        </div>
        <div class="col-md-12 pl-3">
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" label="Notes" placeholder="Enter Notes" v-model="diag.notes"> </textarea>
        </div>
      </div>
  
      <div class="row py-2" v-for="(p,index) in diag.prescription" v-bind:key="index">
        <div class="col-md-6">
          <base-input type="text"
                    label="Medicine Name"
                    placeholder="Enter Medicine Name"
                    v-model="diag.prescription[index].medicineName">
          </base-input>
        </div>
        <div class="col-md-5">
          <base-input type="number"
                    label="Medicine Quantitiy"
                    placeholder="Enter Medicine Quantitiy"
                    v-model="diag.prescription[index].quantity">
          </base-input>
        </div>
        <div class="col-md-1">
            <button type="submit" class="btn btn-warning btn-fill float-right mt-4" @click.prevent="diag.prescription.splice(index,1)">
                Delete
            </button>
        </div>
      </div>
      <div class="row py-2" >
        <button type="submit" style="margin:auto;" class="btn btn-success btn-fill float-right" @click.prevent="diag.prescription.push({})">
            Add Medicine
        </button>
      </div>
      <br><br>
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="savePrescription">
          Save
        </button>
      </div>
  </card>
</template>
<script>
import firebase from 'src/firebaseInit.js'
import Card from 'src/components/Cards/Card.vue'
export default {
    data(){
        return {
            id : "",
            date : '',
            pushedTimeStamp : "",
            diag: {
                pushedTimeStamp : (new Date).getTime(),
                issue : '',
                prescription: [{
                    medicineName : '',
                    quantity : '',
                }]
            },
            user:null,
            patient:null
        }
    },
    beforeMount(){
        this.id = this.$route.params.id
        firebase.db.doc('users/'+localStorage.getItem("id")).get().then(response=>{
            this.user = response.data()
        })
        firebase.db.doc('users/'+this.id).get().then(response=>{
            this.patient = response.data()
        })
        this.date = (new Date()).toLocaleDateString('en-GB')
        this.date = this.date.replace(/\//g,"-");
        this.pushedTimeStamp = (new Date).toDateString()
    },
    methods : 
    {
        addMedicine() {
            this.diag.prescription.push({
                medicineName : '',
                quantity : '',
            });
        },
        removeMedicine(){
            this.diag.prescription.pop()
        },
        savePrescription(){   
            firebase.db.collection('prescriptions').add({
                patientId : this.patient.id,
                dod : this.pushedTimeStamp,
                issue: this.diag.issue,
                prescription : this.diag.prescription,
                doctorId : this.user.id,
                doctorName : this.user.name,
                doctorEmail: this.user.email
            }).then(snapshot=>{
                this.notify(`Prescription Added`,'success')
                this.$router.go(-1)
            })   
        }
    },
    components: {
        Card
    },
}
</script>
