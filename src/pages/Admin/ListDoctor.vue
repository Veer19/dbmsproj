<template>
    <card >
        <div class="row">
            <div class="col-12">
            <card class="card-plain">
                <template slot="header">
                <h4 class="card-title">All Doctors</h4>
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
    methods:{
    }
  }
</script>
<style>
</style>
