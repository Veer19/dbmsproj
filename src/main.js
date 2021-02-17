/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.0.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'
import firebase from 'src/firebaseInit.js'

// router setup
import routes from './routes/routes'
import vmodal from 'vue-js-modal'
Vue.use(vmodal)
import './registerServiceWorker'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.mixin({
        methods: {
            notify(msg, color) {
                this.$notifications.notify({
                    message: msg,
                    icon: 'nc-icon nc-app',
                    horizontalAlign: 'right',
                    verticalAlign: 'bottom',
                    type: color
                })
            }
        }
    })
    // configure router
const router = new VueRouter({
    routes, // short for routes: routes
    linkActiveClass: 'nav-item active',
    scrollBehavior: (to) => {
        if (to.hash) {
            return { selector: to.hash }
        } else {
            return { x: 0, y: 0 }
        }
    }
})
router.beforeEach((to, from, next) => {
        firebase.auth.onAuthStateChanged(() => {

            // get firebase current user
            const firebaseCurrentUser = firebase.auth.currentUser

            // if (
            //     to.path === "/pages/login" ||
            //     to.path === "/pages/forgot-password" ||
            //     to.path === "/pages/error-404" ||
            //     to.path === "/pages/error-500" ||
            //     to.path === "/pages/register" ||
            //     to.path === "/callback" ||
            //     to.path === "/pages/comingsoon" ||
            //     (auth.isAuthenticated() || firebaseCurrentUser)
            // ) {
            //     return next();
            // }

            // If auth required, check login. If login fails redirect to login page
            if (to.path != "/login") {
                if (!firebaseCurrentUser) {
                    router.push({ path: '/login' })
                }
            }

            return next()
                // Specify the current path as the customState parameter, meaning it
                // will be returned to the application after auth
                // auth.login({ target: to.path });

        })

    })
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    router
})