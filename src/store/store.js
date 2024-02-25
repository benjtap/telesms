import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loggedIn: false,
    projid: -1,
    projsubid: -1,
    statusimport: -1,
    currentView:{
      page:"projects",
      view:[]

    } ,
    resourceName: '',
    secresourceName: '',
    secresourceId: -1,
    firstresourceId: -1,
   
  },
  mutations: {
    tologin (state, payload){
      return state.loggedIn = true;
    },
    toprojadd (state, payload){
      return state.projid = payload;
    },
    toprojsubadd (state, payload){
      return state.projsubid = payload;
    },
    flagstatusimport (state, payload){
      return state.statusimport = payload;
    },
    
    setCurrentView (state, view) {
      state.currentView = view
    },
    setResourceName (state, name) {
      state.resourceName = name
    },
  
    setsecResourceName (state, name) {
      state.secresourceName = name
    },
    setsecResourceId (state, id) {
      state.secresourceId = id
    },
    setfirstResourceId(state, id) {
      state.firstresourceId = id
    },
  
   
  },
    actions: {
        tologin (context, payload) {
      context.commit('tologin', payload)
    },
    toprojadd (context, payload) {
      context.commit('toprojadd', payload)
    },
    toprojsubadd (context, payload) {
      context.commit('toprojsubadd', payload)
    },
    flagstatusimport (context, payload) {
      context.commit('flagstatusimport', payload)
    },
     
    setCurrentView ({ commit }, view) {
      commit('setCurrentView', view)
    },
    setResourceName ({ commit }, name) {
      commit('setResourceName',name)
    },
    setsecResourceName ({ commit }, name) {
      commit('setsecResourceName',name)
    },
   
   
    setfirstResourceId ({ commit }, id) {
      commit('setfirstResourceId',id)
    },
    setsecResourceId ({ commit }, id) {
      commit('setsecResourceId',id)
    },
   
  }
})
export default store;