<template>
  <!-- <div
    class="container mx-auto my-4 px-4 md:px-0 w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl
     overflow-y-scroll overflow-hidden"
  > -->

  <div >
    <div
      class="text-gray-600 font-semibold text-2xl mb-4 flex items-center justify-center"
    >
     
     
    </div>


    <div   class="flex flex-row justify-around my-4 pt-4 pb-2 bg-white shadow rounded 
         text-gray-600 sticky tab-sticky-top z-20">
   
           <div  v-for="item in items"
          :key="item.link"     
        :to="item.link" v-bind:class="getClass(item.tag)" >
      
        
        <span  v-on:click="setActive(item.tag)"  
        class="hidden md:block font-regular">{{item.text}}</span>
      </div>
      
</div> 
    
  <div  style="overflow-y:auto;overflow-x:hidden;height:auto;  max-height:78vh;	overflow-y: scroll;'" >

 

        <adminusers v-if="currentView.view['users'] === 'users'"></adminusers>
     
       <admintenant v-if="currentView.view['users'] === 'tenant'"></admintenant>
     
        <monitorserver v-if="currentView.view['users'] === 'monitorservice'"></monitorserver>

  </div>
    </div>
</template>
<script>

import adminusers from '@/components/adminusers'
import admintenant from '@/components/admintenant'
import monitorserver from '@/components/monitorserver'


import { mapState, mapActions } from "vuex";
export default {
 
   components:{
    adminusers,
  admintenant,
  monitorserver
   },

  data: function() {
    return {
      dicdata: [],
         items: [
        { text:" ניהול משתמשים", tag:"users" ,icon:"stay_primary_portrait" },  //"project!!!"
       { text:" ניהול לקוחות", tag:"tenant" ,icon:"stay_primary_portrait" }, 
         { text:"מוניטור סרוויס", tag:"monitorservice" ,icon:"stay_primary_portrait" }, 
      ]
    };
  },

  created() {
    // this.dicdata["projects"] = "פרוייקט";
    // this.dicdata["report"] = "דוחות";
  },

  methods: {
    ...mapActions(["setCurrentView",""]),

 
    setActive(tag) {
     

   
      let dic_local = [];
        dic_local["users"] = tag;

        let copy = Object.assign({}, this.$store.state.currentView.view);
        delete copy["users"];

        var append = Object.assign({}, dic_local, copy);
        var objCurrentView = {
          page: tag,
          view: append,
        };
        this.setCurrentView(objCurrentView);
        //this.setCurrentView(tag);
    },
    getClass(tag) {
    //  if (this.currentView.indexOf(tag) > -1)
    

try {
   if (this.currentView.view["users"].indexOf(tag)> -1)
   return "text-teal-600   font-semibold flex-grow";
        else return "flex-grow cursor-pointer";
} catch (error) {
  
}
    
    },
    getdisabled() {
   
      if ( this.myData <0)
        return true;
     
    },
  },
 
  computed: {
    ...mapState({
      currentView: state => state.currentView,
       resourceName: state => state.resourceName
    }),

  

  
  }
};
</script>
