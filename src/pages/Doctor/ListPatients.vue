<template>
    <card >
        <div class="row">
            <div class="col-12">
            <card class="card-plain">
                <template slot="header">
                <h4 class="card-title">List of registrered patients</h4>
                </template>
                <div class="table-responsive">
                <l-table class="table-hover"
                        :columns="columns"
                        :data="filteredPatients"
                        @click="openPatient">
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
          columns:['name','email','phone','gender'],
          documents: []
      }
    },
    beforeMount(){
        firebase.db.collection('users').where('type','==','Patient').get().then(response=>{
            this.documents = response.docs.map(d=>{return {...d.data(),...{'id':d.id}}})
        })
    },
    computed:{
        filteredPatients: function(){
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
        openPatient(id){
            this.$router.push('patients/'+id)
        }
    }
  }
</script>
<style>
</style>
