<template>
  <div class="wrapper">
    <side-bar >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/appointments" v-if="type == 'Doctor' || type == 'Patient'">
        <i class="nc-icon nc-time-alarm"></i>
        <p>Appointments</p>
      </sidebar-link>
      <sidebar-link to="/createPatient" v-if="type == 'Doctor' || type == 'Admin'">
        <i class="nc-icon nc-circle-09"></i>
        <p>Create Patient</p>
      </sidebar-link>
      <sidebar-link to="/createDoctor" v-if="type == 'Admin'">
        <i class="nc-icon nc-circle-09"></i>
        <p>Create Doctor</p>
      </sidebar-link>
      <sidebar-link to="/doctors" v-if="type == 'Admin'">
        <i class="nc-icon nc-notes"></i>
        <p>Doctor list</p>
      </sidebar-link>
      <sidebar-link to="/patients" v-if="type == 'Doctor' || type == 'Admin'">
        <i class="nc-icon nc-notes"></i>
        <p>Patient list</p>
      </sidebar-link>

      <sidebar-link to="/profile" v-if="type == 'Doctor' || type == 'Patient'">
        <i class="nc-icon nc-notes"></i>
        <p>Profile</p>
      </sidebar-link>
      <sidebar-link to="/history" v-if="type == 'Patient'">
        <i class="nc-icon nc-notes"></i>
        <p>Medical History</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content style="margin:25px; padding:25px" @click="toggleSidebar">
      </dashboard-content>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
import firebase from 'src/firebaseInit.js'
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
      data(){
          return {
              type:''
          }
      },
        components: {
            TopNavbar,
            ContentFooter,
            DashboardContent,
            MobileMenu
        },
        beforeMount(){
            console.log(localStorage.getItem('id'))
            firebase.db.doc('users/'+localStorage.getItem('id')).get().then(response =>{
                this.type = response.data().type
                localStorage.setItem('type', this.type)
                
            })
        },
        methods: {
            toggleSidebar () {
                if (this.$sidebar.showSidebar) {
                this.$sidebar.displaySidebar(false)
                }
            }
        }
  }

</script>
