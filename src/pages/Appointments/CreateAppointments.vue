<template>
    <card >
        <div class="row">
            <div class="col-12">
            <card class="card-plain">
                <template slot="header">
                <h4 class="card-title" v-if="selectedDoctor">Selected Doctor</h4>
                <h4 class="card-title" v-else>Select Doctor</h4>
                </template>
                <div class="table-responsive">
                    <l-table class="table-hover"
                            :columns="columns"
                            :data="selectedDoctor?[selectedDoctor]:filteredDoctors"
                            @click="showForm">
                    </l-table>
                </div>
                <div v-if="selectedDoctor">
                    <form>
                        <div class="row px-3">
                            <div class="col-md-2 p-2"> 
                                <datepicker style="width:100%;" v-model="appDate" placeholder="Select Date"></datepicker>
                            </div>
                            <div class="col-md-2">
                                <vue-timepicker v-model="appTime"></vue-timepicker>
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="createAppointment">
                            Create Appointment
                            </button>
                        </div>
                        </form>
                </div>
            </card>
            </div>
        </div>
    </card>
</template>
<script>
import LTable from 'src/components/Table.vue'
import Card from 'src/components/Cards/Card.vue'
import firebase from 'src/firebaseInit.js'
import Datepicker from 'vuejs-datepicker';
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
export default {
    components: {
      LTable,
      Card,
      Datepicker,
      VueTimepicker
    },
    data () {
      return {
          search:"",
          columns:['name','email','phone','gender','field'],
          documents: [],
          selectedDoctor:null,
          appDate:'',
          appTime:'',
          user:null
      }
    },
    beforeMount(){
        firebase.db.doc('users/'+localStorage.getItem('id')).get().then(response=>{
             this.user = response.data()
        })
        firebase.db.collection('users').where('type','==','Doctor').get().then(response=>{
            this.documents = response.docs.map(d=>{return {...d.data(),...{'id':d.id}}})
        })
    },
    computed:{
        filteredDoctors: function(){
            if(this.search != "")
                return this.documents.filter(doc=>{
                    return doc.name.match(this.search) || doc.email.match(this.search) || doc.phone.match(this.search)
                })
            else{
                return this.documents
            }
        }  
    },
    methods:{
        showForm(id){
            this.selectedDoctor = this.documents.filter(d=>{return d.id == id})[0]
        },
        createAppointment(){
            firebase.db.collection('appointments').add({
                doctorId:this.selectedDoctor.id,
                doctorName:this.selectedDoctor.name,
                doctorEmail:this.selectedDoctor.email,
                patientId: localStorage.getItem('id'),
                patientName: this.user.name,
                patientEmail: this.user.email,
                date: new Date(this.appDate.toString()).toDateString(),
                time: this.appTime,
                status: 'Pending'
            })
            .then(snapshot=>{
                this.notify(`Appointment Created`,'success')
                this.$router.go(-1)
            }) 
        }
    }
  }
</script>
<style>
</style>
