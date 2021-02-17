<template>
    <div>
        <card >
            <h4 slot="header" class="card-title">View Profile</h4>
            <form v-if="patient">
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
                                disabled
                                label="Email"
                                placeholder="Email"
                                v-model="patient.email">
                    </base-input>
                </div>
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile">
                Save
                </button>
            </div>
            </form>
            <br>
        </card>
    </div>
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
            patient:null,
            id:''
        }
    },
    beforeMount(){
        this.id = localStorage.getItem('id')
        firebase.db.doc('users/'+this.id).get().then(response=>{
            this.patient = response.data()
        })
    },
    methods:{
        updateProfile(){
            let appointments = []
            firebase.db.collection('appointments').where('patientId','==',this.id).get().then(response=>{
                appointments = response.docs.map(d=>{return {...d.data(),...{'id':d.id}}})
                console.log(appointments)
                let promiseArr = [
                    firebase.db.doc('users/'+this.id).update(this.patient)
                ]
                promiseArr = appointments.map(a=>{
                    return firebase.db.doc('appointments/'+a.id).update({
                        'patientName':this.patient.name
                    })
                })
                Promise.all(promiseArr).then(response=>{
                    this.notify(`Profile Updated`,'success')
                })
            })
        }
    }
}
</script>
