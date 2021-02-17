<template>
    <card >
        <div class="row">
            <div class="col-12">
            <card class="card-plain">
                <template slot="header">
                <h4 style="display:inline-block" class="card-title">Your Appointments</h4>
                <button style="display:inline-block" type="submit" class="btn btn-info btn-fill float-right" @click.prevent="createAppointment">
                    New
                </button>
                </template>
                <div class="table-responsive">
                    <l-table class="table-hover"
                            :columns="columns"
                            :data="documents">
                    </l-table>
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
export default {
    components: {
      LTable,
      Card
    },
    data () {
      return {
          columns:[],
          documents: [],
          type:""
      }
    },
    beforeMount(){
        let id = localStorage.getItem('id')
        let type = localStorage.getItem('type').toLowerCase()
        this.type = type
        if(type == 'doctor')
            this.columns=['patientName','patientEmail','date','time','status','|']
        else if (type == 'patient')
            this.columns=['doctorName','doctorEmail','date','time','status']
        firebase.db.collection('appointments').where(type+'Id','==',id).get().then(response=>{
            this.documents = response.docs.map(d=>{return {...d.data(),...{'id':d.id}}})
        })
    },
    methods:{
        createAppointment(){
            this.$router.push('appointments/new')
        }
    }
  }
</script>
<style>
</style>
