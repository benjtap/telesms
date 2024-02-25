<template>

<div  v-if="showHome" class="md:container md:mx-auto md:px-2 w-full  py-2 px-4 bg-blue-100  mt-1">
  <mainmenu   class="flex flex-row mb-2 py-2 px-4 justify-around   shadow md:rounded text-gray-700">
    <router-link    v-for="item in items" 
          :key="item.link"     
        :to="item.link" >
        <div  v-on:click="setActive(item.tag)"  v-bind:class="getClass(item.tag)" > <span> {{ item.text }}</span> 
        </div>  
    </router-link>  
          
</mainmenu>  
</div>

 
 
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  export default {

  data: function () {
  return {
  dicdata:[],
  tagActive: 'monitorsubmission',
  items: [
  {  text: ' הפצות פעילות', link: '/monitorsubmission', tag: 'monitorsubmission'  },
  {  text: ' פרויקט', link: '/projects' , tag: 'projects'},
  {  text: ' דוחות', link: '/report', tag: 'report' },
  ]
  }
  },

  created () {
    debugger
  this.dicdata["project"] ="פרויקט"
  this.dicdata["projects"] ="פרויקט"
  this.dicdata["report"] ="דוחות"
  this.dicdata["admin"] = "ניהול";
 
     var user=  localStorage.getItem('user')
  var obj = JSON.parse(user)
    this.is_admin= obj.m_Item2;
var tenantid=obj.m_Item1


     if ((this.is_admin)&& tenantid==2)
         this.items.push( {text: " ניהול", link: "/adminsystem", tag: "users" })

  },




  methods: {
  ...mapActions([
  'setCurrentView'
  ]),



  setActive(tag){
      this.tagActive = tag

       //var objCurrentView = {
       //     page: tag,
       //     view: tag
       // }

      let dic_local = [];
      dic_local[tag] = tag

     var append = Object.assign({}, dic_local,this.$store.state.currentView.view)
      var objCurrentView = {
          page: tag,
          view: append
      }

      
  this.setCurrentView(objCurrentView)

  },
  getClass(tag) {

  if (this.currentView.page ==tag)
  return 'flex-grow text-center text-teal-800 font-semibold border-teal-500 border-b-2 pb-2 -mb-3';
  else
  return 'flex-grow text-center cursor-pointer';

  }
  },
  computed: {


  ...mapState({
  currentView: state => state.currentView

  }),

  getClasscomp(tag) {
  //debugger
  if (this.currentView ==tag)
  return 'block flex-grow text-center text-teal-800 font-semibold border-teal-500 border-b-2 pb-2 -mb-3';
  else
  return 'block flex-grow text-center cursor-pointer';

  },
  showHome () {
    
  return ['monitorsubmission', 'projects', 'report',
  'projecthome','projectsubhome'].includes(this.currentView.page)
  },
  showSecondary () {
  //debugger
  return ['projects', 'report','project','projecthome','projectsubhome'].includes(this.currentView.page)
  },
  secondaryNameheb () {
  if (this.showSecondary) {
  return  this.dicdata[this.currentView.page]
  }
  },
  secondaryName () {
  if (this.showSecondary) {
  return  this.currentView.page

  } else if (this.showTertiary) {
  return this.currentView + 's'
  }
  },
  showTertiary () {
  return ['projects', 'report'].includes(this.currentView.page)
  }
  },


  }
</script>



