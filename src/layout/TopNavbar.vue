<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a @click="logout" class="nav-link">
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import firebase from 'src/firebaseInit.js'
  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
        logout(){
            firebase.auth.signOut().then(() => {
                localStorage.removeItem('id')
                localStorage.removeItem('type')
                this.$router.push('/login')
            })
        },
        capitalizeFirstLetter (string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        },
        toggleNotificationDropDown () {
            this.activeNotifications = !this.activeNotifications
        },
        closeDropDown () {
            this.activeNotifications = false
        },
        toggleSidebar () {
            this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
        },
        hideSidebar () {
            this.$sidebar.displaySidebar(false)
        }
    }
  }

</script>
<style>

</style>
