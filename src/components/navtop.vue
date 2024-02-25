<template>
  <nav>
    <div class="md:container  flex justify-center">
       <!-- md:mx-auto md:px-4 mt-4 -->
      <div
        class="bg-blue-100  shadow rounded flex justify-center flex-grow-0 px-4 py-1 text-sm"
      >
      
        <div
          @click="setActiveViewprimaire('monitorsubmission')"
          class="text-gray-700 hover:text-blue-700 cursor-pointer"
        >
          בית
        </div>
        <div v-if="showSecondary || showTertiary" class="flex">
      
         
         <div class="pl-2"><img width="20px" src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNMjYuMDI1IDE0LjQ5NmwtMTQuMjg2LS4wMDEgNi4zNjYtNi4zNjZMMTUuOTc5IDYgNS45NzUgMTYuMDAzIDE1Ljk3MSAyNmwyLjEyOS0yLjEyOS02LjM2Ny02LjM2NmgxNC4yOXoiLz48L3N2Zz4='/></div> 
          <div
            @click="setActiveViewsecond(secondaryName)"
            class="text-gray-700 hover:text-blue-700 cursor-pointer pl-2"
          >
            {{ secondaryNameheb }}
          </div>
        </div>
         <div v-if="showTertiary" class="flex">
        <div class="pl-2"><img width="20px" src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNMjYuMDI1IDE0LjQ5NmwtMTQuMjg2LS4wMDEgNi4zNjYtNi4zNjZMMTUuOTc5IDYgNS45NzUgMTYuMDAzIDE1Ljk3MSAyNmwyLjEyOS0yLjEyOS02LjM2Ny02LjM2NmgxNC4yOXoiLz48L3N2Zz4='/></div>
         <div
            @click="setActiveViewternaire(secondaryName)"
            class="text-gray-700 hover:text-blue-700 cursor-pointer pl-2"
          >
            {{ resourceName  }}
          </div>
      </div>

       <div v-if="showQuaternaire" class="flex">
        <div class="pl-2"><img width="20px" src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNMjYuMDI1IDE0LjQ5NmwtMTQuMjg2LS4wMDEgNi4zNjYtNi4zNjZMMTUuOTc5IDYgNS45NzUgMTYuMDAzIDE1Ljk3MSAyNmwyLjEyOS0yLjEyOS02LjM2Ny02LjM2NmgxNC4yOXoiLz48L3N2Zz4='/></div>
         <div
            
            class="text-gray-700 hover:text-blue-700 cursor-pointer pl-2"
          >
            {{ secresourceName  }}
          </div>
      </div>

      </div>
    </div>
  </nav>
</template>
<script>
  import { mapState, mapActions } from "vuex";
  export default {
  data: function() {
  return {
  is_admin:false,
  dicdata: [],
  tagActive: "activesub",
 
  };
  },

  created() {
  this.dicdata["project"] = "פרויקט";
  this.dicdata["projects"] = "פרויקט";
  this.dicdata["report"] = "דוחות";
  this.dicdata["users"] = "ניהול";
  this.dicdata["tenant"] = "ניהול";
  this.dicdata["monitorservice"] = "ניהול";


  },

  mounted() {
  


  },

  methods: {
  ...mapActions(["setCurrentView"]),
  getrouteid: function() {

  var routeid = this.$route.params.id;

  if (routeid == undefined)
  return;

  routeid=  parseInt(this.crypto.decrypt(routeid), 10);

  return routeid

  },
  setActiveViewprimaire(view) {
   

  this.tagActive = view;

      this.$router.push({ name: view });
      

    
      let dic_local = [];
      dic_local[view] = view

     var append = Object.assign({}, dic_local,this.$store.state.currentView.view)
      var objCurrentView = {
          page: view,
          view: append
      }

      this.setCurrentView(objCurrentView)
  },

  setActiveViewsecond(view) {

  var routename =this.$route.name
  if ((["projecthome"].includes( routename ))|| (["projectsubhome"].includes( routename )))
  view="projects"

 

  if (["adminsystem"].includes( routename  )){
      view = "users"

      let dic_local = [];
      dic_local[view] = view

     var append = Object.assign({}, dic_local,this.$store.state.currentView.view)
      var objCurrentView = {
          page: view,
          view: append
      }

      this.setCurrentView(objCurrentView);

  this.tagActive = view

  return
  }
    
      let dic_local = [];
      dic_local[view] = view

     var append = Object.assign({}, dic_local,this.$store.state.currentView.view)
      var objCurrentView = {
          page: view,
          view: append
      }

      this.setCurrentView(objCurrentView);

  this.tagActive = view;

  this.$router.push({ name: view });
  },
  setActiveViewternaire(view) {

  var routename =this.$route.name
  var routeid =this.getrouteid()
   var firstresourceId=this.$store.state.firstresourceId
   
  if ((["projecthome"].includes( routename ) &&  routeid >0) ){
  this.$router.push({ name: 'projecthome', params: { id:this.crypto.encrypt(routeid) } })
      view = "project"

    
      let dic_local = [];
      dic_local[view] = view

     var append = Object.assign({}, dic_local,this.$store.state.currentView.view)
      var objCurrentView = {
          page: view,
          view: append
      }
      this.setCurrentView(objCurrentView);

  this.tagActive = view;
  }


  else if (["projectsubhome"].includes( routename )  &&  firstresourceId >0){  //case monitor


  this.$router.push({ name: 'projecthome', params: { id:this.crypto.encrypt(firstresourceId) } })
  view="project"

      let dic_local = [];
      dic_local[view] = view

     var append = Object.assign({}, dic_local,this.$store.state.currentView.view)
      var objCurrentView = {
          page: view,
          view: append
      }
      this.setCurrentView(objCurrentView)
  this.tagActive = view;
  }

  
  else if (["projectsubhome"].includes( routename )  &&  this.secresourceId >0){


  this.$router.push({ name: 'projecthome', params: { id:this.crypto.encrypt(this.secresourceId) } })
  view="project"


      let dic_local = [];
      dic_local["projects"] = "projects"

      var append = Object.assign({}, dic_local, objCurrentView.view)
      var objCurrentView = {
          page: "projects",
          view: append
      }
      this.setCurrentView(objCurrentView)

  this.tagActive = view;
  }

  


  },


  setActive(tag) {
      this.tagActive = tag;
      let dic_local = [];
      dic_local[view] = view

     var append = Object.assign({}, dic_local,this.$store.state.currentView.view)
      var objCurrentView = {
          page: view,
          view: append
      }
      this.setCurrentView(objCurrentView);
  },
  getClass(tag) {
  if (this.tagActive == tag)
  return "flex-grow text-center text-teal-800 font-semibold border-teal-500 border-b-2 pb-2 -mb-3";
  else return "flex-grow text-center cursor-pointer";
  }
  },
  computed: {
  ...mapState({
  currentView: state => state.currentView,
  resourceName: state => state.resourceName,
  secresourceName: state => state.secresourceName,
  secresourceId: state => state.secresourceId,

  
  }),
  showHome() {
  return ["monitorsubmission", "projects", "report"].includes(
  this.currentView
  );
  },

  showSecondary() {
 
  var routename =this.$route.name

  if ( ["projects", "report","users"].includes(this.currentView.page  ) || ["projecthome"].includes( routename  )
  || ["projectsubhome"].includes( routename  )|| ["adminsystem"].includes( routename  ))
  return true
  else
  return false

  },
  secondaryNameheb() {
  if (this.showSecondary) {

  //debugger
  var routename =this.$route.name
  if (["projecthome"].includes( routename ) || ["projectsubhome"].includes( routename  ))
  return this.dicdata["projects"];
  else
  return this.dicdata[this.currentView.page];
  }
  },
  secondaryName() {
  if (this.showSecondary) {
  return this.currentView.page;
  } else if (this.showTertiary) {
  return this.currentView + "s";
  }
  else if (this.showQuaternaire) {
  return this.currentView + "s";
  }
  },

  showTertiary() {
  var routename =this.$route.name
  var routeid =this.getrouteid()
  if ((["projecthome"].includes( routename ) &&  routeid >0) || (["projectsubhome"].includes( routename )))
          return true
    
    },
     showQuaternaire() {
      var routename =this.$route.name
      var routeid =this.getrouteid()
     if ((["projectsubhome"].includes( routename ) &&  routeid >0) )
          return true
    
    }
  }
};
</script>


