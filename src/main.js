// main.js

import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import server from './server/www';

//components
import App from './App.vue';
import CreateItem from './components/CreateItem.vue';
App.use(server);
//routes
const routes = [
	{
		name : 'createItem',
		path : '/',
		component : CreateItem
	}
];
const router = new VueRouter({ mode: 'history', routes : routes});
new Vue(Vue.util.extend({ router },App)).$mount('#app');