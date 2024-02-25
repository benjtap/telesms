<template>
 <div  v-if="show"
 style="background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(127,218,232,0.3956933115042892) 0%, rgba(0,212,255,1) 100%);"
    class="container mx-auto my-4 px-4 md:px-0 w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl
    overflow-y-scroll overflow-hidden h-full  "  >

    
  
     <div>
    <div
      class="text-gray-600 font-semibold text-2xl mb-4 flex items-center justify-center"
    >
      <div class="flex justify-center items-center">
      {{setsatus}} 
      </div>
     
    </div>


    <div   class="flex flex-row justify-around my-4 pt-4 pb-2  shadow rounded 
         text-gray-600 sticky tab-sticky-top z-20">
   
           <div  v-for="item in items"
          :key="item.link"     
        :to="item.link" v-bind:class="getClass(item.tag)"   v-show="getdisabled(item.tag)" >
      
        <span  v-on:click="setActive(item.tag)"
         class="hidden md:block font-regular">{{item.text}}</span>
      </div>
      
</div> 
   </div> 

   
      <subdefinition v-if="currentView.view['projectsubhome'] === 'projectsub'"  @insert-sub="createsubProject"  @update-sub="updatesubProject"></subdefinition>
       <subtiming v-if="currentView.view['projectsubhome'] === 'subtiming' "></subtiming>
        <subdestinataire v-if="currentView.view['projectsubhome'] === 'subdestinataire' "></subdestinataire>
        <sublistdestinataire v-if="currentView.view['projectsubhome']=== 'sublistdestinataire'"></sublistdestinataire>
       </div>

</template>
<script>

import subdefinition from '@/components/subdefinition'
import subtiming from '@/components/subtiming' 
import subdestinataire from '@/components/subdestinataire'
import sublistdestinataire from '@/components/sublistdestinataire' 

import { mapState, mapActions } from "vuex";
export default {
  props: ['show', 'data'],
   components:{
   
    'subdefinition': subdefinition,
    'subtiming': subtiming,
    'subdestinataire': subdestinataire,
    'sublistdestinataire': sublistdestinataire

   },

  data: function() {
    return {
      index: -10,
      dicdata: [],
      tagActive: "projectsub",
      items: [
        { text:" פרטי הפצה", tag: "projectsub" },
         { text:" תזמון הפצה", tag: "subtiming"},
         { text:" קובץ נמענים הפצה", tag: "subdestinataire" },
        { text:" רשימת נמענים הפצה", tag: "sublistdestinataire" },
      ]
    };
  },

  created() {
  
    this.dicdata["projects"] = "פרוייקט";
    this.dicdata["report"] = "דוחות";

  
  },

  methods: {
    ...mapActions(["setCurrentView"]),

    updatesubProject(value) {
debugger

var data ={
   id:value.id,
   name:value.name
}

 this.$emit('sub-update', data)
  
},


createsubProject (value) {

    debugger

    var data ={
   id:value.id,
   name:value.name
}

 this.$emit('sub-insert', data)
    },

     getrouteid: function() {

  var routeid = this.$route.params.id;
 
   if (routeid == undefined)
   return;
  
    routeid=  parseInt(this.crypto.decrypt(routeid), 10);
    
    return routeid

  }
  ,
 getdisabled(tag) {
      
      var routeid = this.getrouteid();
      if (routeid < 0 && tag !="projectsub") return false;
      else
      return true
    },
  

    setActive(tag) {
      this.tagActive = tag;
     
         let dic_local = [];
        dic_local["projectsubhome"] = tag

         let copy = Object.assign({}, this.$store.state.currentView.view)
        delete copy["projectsubhome"]

       var append = Object.assign({}, dic_local,copy)
        var objCurrentView = {
            page: "projectsubhome",
            view: append
        }
      this.setCurrentView(objCurrentView)
    },
    getClassold(tag) {
try {
    if (this.currentView.view["projectsubhome"].indexOf(tag) > -1)
    
        return "text-teal-600   font-semibold flex-grow";
      else return "flex-grow cursor-pointer";
} catch (error) {
  
}
   
    },
        getClass(tag) {
try {
    if (this.currentView.view["projectsubhome"].indexOf(tag) > -1)
    
        return "text-xl font-normal leading-normal  text-gray-900  font-semibold flex-grow";
      else return "flex-grow cursor-pointer text-gray-900";
} catch (error) {
  
}
   
    }
    
  },
 
  computed: {
    ...mapState({
      currentView: state => state.currentView,
       secresourceName: state => state.secresourceName
    }),

    setsatus() {
   var routeid = this.getrouteid();
      if (routeid<0)
        return "הפצה חדשה";
        else
        return  " הפצה " + this.secresourceName 

      
    }
    

    
  }
};
</script>
