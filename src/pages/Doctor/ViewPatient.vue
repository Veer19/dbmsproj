<template>
    <div>
        <card >
            <h4 slot="header" class="card-title">View Profile</h4>
            <form v-if="patient">
            <div class="row">
                <div class="col-md-5">
                <base-input type="text"
                            label="Name"
                            disabled
                            placeholder="Enter Name"
                            v-model="patient.name">
                </base-input>
                </div>
                <div class="col-md-3">
                <base-input type="text"
                            label="Age"
                            disabled
                            placeholder="Enter Age"
                            v-model="patient.age">
                </base-input>
                </div>
                <div class="col-md-4">
                    <base-input type="text"
                            label="Gender"
                            disabled
                            placeholder="Enter Gender"
                            v-model="patient.gender">
                    </base-input>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <base-input type="phone"
                                label="Phone"
                                disabled
                                placeholder="Enter Phone Number"
                                v-model="patient.phone">
                    </base-input>
                </div>
                <div class="col-md-6">
                    <base-input type="email"
                                disabled
                                label="Email"
                                placeholder="Email"
                                v-model="patient.email">
                    </base-input>
                </div>
            </div>
            </form>
        </card>
        <card v-if="diag">
            <div class="row">
                <div class="col-12">
                <card class="card-plain">
                    <template slot="header">
                        <h4 class="card-title" style="display:inline-block">Medical Information</h4>
                        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="addDiag()">
                            Add Diagnosis
                        </button>
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
            columns:['issue','dod','doctorName','precriptions'],
            prescriptions:null,
            id:''
        }
    },
    beforeMount(){
        this.id = this.$route.params.id
        firebase.db.doc('users/'+this.id).get().then(response=>{
            this.patient = response.data()
        })
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
