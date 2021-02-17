import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin Pages
import CreateDoctor from 'src/pages/Admin/CreateDoctor.vue'
import ListDoctor from 'src/pages/Admin/ListDoctor.vue'
// Doctor pages
import Login from 'src/pages/Login/Login.vue'
import CreatePatient from 'src/pages/Doctor/CreatePatient.vue'
import ListPatients from 'src/pages/Doctor/ListPatients.vue'
import ViewPatient from 'src/pages/Doctor/ViewPatient.vue'
import AddDiag from 'src/pages/Doctor/AddDiag.vue'

import ListAppointments from 'src/pages/Appointments/ListAppointments.vue'
import CreateAppointments from 'src/pages/Appointments/CreateAppointments.vue'

import MedHistory from 'src/pages/Patient/History.vue'
import Profile from 'src/pages/Patient/Profile.vue'

const routes = [{
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/',
        component: DashboardLayout,
        children: [{
                path: 'doctors',
                name: 'List Doctor',
                component: ListDoctor
            }, {
                path: 'createDoctor',
                name: 'Create Doctor',
                component: CreateDoctor
            }, {
                path: 'createPatient',
                name: 'Create Patient',
                component: CreatePatient
            },
            {
                path: 'patients',
                name: 'List Patients',
                component: ListPatients
            },
            {
                path: 'patients/:id',
                name: 'View Patient',
                component: ViewPatient
            },
            {
                path: 'patients/:id/addDiag',
                name: 'Add Diagnosis',
                component: AddDiag
            },
            {
                path: 'appointments',
                name: 'List Appointments',
                component: ListAppointments
            },
            {
                path: 'appointments/new',
                name: 'Create Appointments',
                component: CreateAppointments
            },
            {
                path: 'history',
                name: 'Medical History',
                component: MedHistory
            },
            {
                path: 'profile',
                name: 'Profile',
                component: Profile
            },
        ]
    },
    { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes