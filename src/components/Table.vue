<template>
    <div>
        <base-input type="text"
            placeholder="Search"
            v-model="search">
        </base-input>
        <table class="table" :key="search">
            <thead>
            <slot name="columns">
                <tr>
                <th v-for="column in columns" :key="column">{{column}}</th>
                </tr>
            </slot>
            </thead>
            <tbody>
            <tr v-for="(item, index) in filteredData" :key="index">
            <slot :row="item">
                <td @click="clickHandler(item.id)" v-for="column in columns" :key="column" v-if="hasValue(item, column)">
                    <span v-if="column == 'precriptions'">
                        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="showPrescriptions(item.id)">
                            Show Precriptions
                        </button>
                    </span>
                    <span v-if="column == '|'">
                        <button type="submit" v-if="item.status == 'Pending'" class="ml-2 btn btn-success btn-fill float-right" @click.prevent="changeAppStatus(item.id,'Accepted')">
                            Accept
                        </button>
                        <button type="submit" v-if="item.status == 'Pending'" class="ml-2 btn btn-danger btn-fill float-right" @click.prevent="changeAppStatus(item.id,'Declined')">
                            Decline
                        </button>
                    </span>
                    <span v-else>{{itemValue(item, column)}}</span>
                </td>
            </slot>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import firebase from 'src/firebaseInit.js'

  export default {
    name: 'l-table',
    data(){
        return {
            search:""
        }
    },
    props: {
      columns: Array,
      data: Array
    },
    computed:{
        filteredData: function(){
            let fd = []
            if(this.search != "") {
                this.data.forEach(d=>{
                    for(let i=0;i<this.columns.length;i++){  
                        let col = this.columns[i];
                        console.log(d[col])
                        if(d[col] && d[col].toString().toLowerCase().match(this.search.toLowerCase())){
                            fd.push(d)
                            break
                        }     
                    } 
                })
                console.log(fd)
                return fd
            }
            else{
                return this.data
            }
        }  
    },
    methods: {
      hasValue (item, column) {
        return item[column] !== 'undefined'
      },
      itemValue (item, column) {
          if(column == 'dod')
            return new Date(item[column]).toDateString();
            return item[column]
      },
      clickHandler(id){
          this.$emit('click',id)
      },
      showPrescriptions(id){
          this.$emit('showPrescriptions',id)
      },
      changeAppStatus(id,status){
            firebase.db.doc('appointments/'+id).update({
                'status':status
            }).then(response=>{
                this.$router.go(0)
            })
      }
    }
  }
</script>
<style>
</style>
