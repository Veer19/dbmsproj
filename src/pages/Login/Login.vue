<template>
  <card style="width:30%;margin:200px auto;">
    <h4 slot="header" class="card-title">Hospital Database Management</h4>
    <form>
        <div class="row">
            <div class="col-md-12">
                <base-input type="text"
                            label="Email"
                            placeholder="Enter Email"
                            v-model="username">
                </base-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
            <base-input type="password"
                        label="Password"
                        placeholder="Password"
                        v-model="password">
            </base-input>
            </div>
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="login">
                Login
            </button>
        </div>
    </form>
  </card>
</template>
<script>
import firebase from 'src/firebaseInit'
import Card from 'src/components/Cards/Card.vue'
    export default {
        components: {
            Card
        },
        data(){
            return {
                password:'',
                username:'',
            }
        },
        methods: {
            login() {
                let user = this.username;
                let pswd = this.password;
                if(user.toLowerCase() == 'admin')
                    user = user + '@gmail.com'
                firebase.auth.signInWithEmailAndPassword(user,pswd)
                .then(auth=>{
                    console.log(auth)
                    localStorage.setItem('id',auth.user.uid)
                    this.$router.push('/')
                })
                .catch(err=>{
                    this.notify(err.message,'warning')
                })
            }
        }
  }
</script>