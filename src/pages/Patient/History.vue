<template>
    <div>
        <card v-if="diag">
            <div class="row">
                <div class="col-12">
                <card class="card-plain">
                    <template slot="header">
                        <h4 class="card-title" style="display:inline-block">Medical Information</h4>
                    </template>
                    <div class="table-responsive">
                    <l-table class="table-hover"
                            :columns="columns"
                            :data="diag"
                            @showPrescriptions="showPrescriptions">
                    </l-table>
                    </div>
                </card>
                </div>
            </div>
        </card>
        <modal name="popup">
            <div class="row">
                <div class="col-12">
                <card class="card">
                    <h4 slot="header" class="card-title">Prescriptions</h4>
                    <template slot="header">
                    </template>
                    <div class="table-responsive">
                    <l-table class="table-hover"
                            :columns="['medicineName','quantity']"
                            :data="prescriptions"
                            @showPrescriptions="showPrescriptions">
                    </l-table>
                    </div>
                </card>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
import LTable from 'src/components/Table.vue'
import firebase from 'src/firebaseInit.js'
import Card from 'src/components/Cards/Card.vue'

export default {
    components: {
      Card,
      LTable
    },
    data() {
        return {
            patient:null,
            diag:null,
            columns:['issue','dod','doctorName','doctorEmail','precriptions'],
            prescriptions:null,
            id:''
        }
    },
    beforeMount(){
        this.id = localStorage.getItem('id')
        firebase.db.collection('prescriptions').where('patientId','==',this.id).get().then(response=>{
            this.diag = response.docs.map(d=>{return {...d.data(),...{'id':d.id}}})
        })
    },
    methods:{
        showPrescriptions(id){
            this.prescriptions = this.diag.filter(d=>{return d.id == id})[0].prescription
            this.$modal.show('popup');
        },
        addDiag(){
            this.$router.push('/patients/'+this.id+'/addDiag')
        }
    }
}
</script>
