// main.js
import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

//components
import App from './App.vue';
import ShowItem from './components/ShowItems.vue';
import CreateItem from './components/CreateItem.vue';

//routes
const routes = [
	{
        path : '/',
		name : 'home',
		components : {
            default : ShowItem
        }
	},
    {
        path : '/users/create',
        name : 'createUser',
        components : {
            default : CreateItem
        }
    }
];
const router = new VueRouter({ mode: 'history', routes : routes});
const theApp = new Vue(Vue.util.extend({ router },App)).$mount('#app');