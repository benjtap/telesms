<template>
  <div
    class="md:container w-full  bg-blue-100"  v-bind:style="getstylesub()"
  >
    <v-dialog v-model="loading" fullscreen full-width>
      <v-container
        fluid
        fill-height
       
      >
       <!-- style="background-color: rgba(255, 255, 255, 0.5);" -->
        <v-layout justify-center align-center>
          <v-progress-circular indeterminate color="primary">
          </v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog>
    <div class="text-center" v-show="clickableAddproject">
      <button
        type="submit"
     
        @click="Addproject"
        class="no-underline p-3 my-4 bg-white text-center text-base text-teal-500 rounded shadow"
      >
        פרויקט חדש
      </button>
    </div>

    <div class="flex flex-row flex-wrap">
      <div class="w-full">
        <!-- Task Filters -->
        <div class="px-8">
          <div class="flex justify-between items-center">
            <div></div>

            <div
              @click="toggleFilter"
              class="w-8 text-xs text-blue-700 font-medium cursor-pointer"
            >
              {{ filterShown ? "הסטר פילטר" : "הצג פילטר" }}
            </div>
          </div>
          <div v-if="filterShown && $route.name =='projects'" class="border-t-2">
            <div class="p-4">
              <div class="pb-1 flex justify-between items-center">
                <div class="">שם פרויקט</div>
                <div
                  @click="clearNameFilter"
                  class="text-xs font-medium border-b border-teal-500 cursor-pointer"
                >
                  Clear
                </div>
              </div>
              <div class="flex flex-row items-center relative w-64">
                <input
                  v-model="nameFilter"
                  type="text"
                  class="w-full block appearance-none bg-white border border-gray-500 rounded text-gray-800 py-1 px-4 pr-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Task Filters   <div class="grid grid-cols-4  table-auto   min-w-full bg-white" v-bind:style="getstyle()"  > -->

    <div class="flex flex-row">
      <div class="grid  table-auto   min-w-full bg-white" v-bind:style="getstyle()"  >
        <div class="row">
          <div class="col"></div>
          <div class="col font-serif text-lg text-gray-800 text-center">שם פרוייקט</div>
          <div class="col font-serif text-lg text-gray-800 text-center">תאריך יצירה</div>
          <div class="col font-serif text-lg text-gray-800 text-center">פעולה</div>
        </div>
 <!--   -->
          <div >
        <div class="row-span-4 leading-3"  v-if="(showProj==-1 && 
           ($route.name=='projecthome'||$route.name=='projectsubhome')) || $route.name=='projects'
           " >
            <div class="col" :ref="`addproject`">
             
              <template  v-if=" ($route.name=='projecthome'||$route.name=='projectsubhome') && showProj === -1"> 
                <projectnav :show="showProj === -1"   @proj-insert="createProject"    />
            
                 <router-view  name="projecthome"/>

            </template> 
            </div>
            </div>

         <!-- :ref="`card-${row.Id}`"   :index="index"-->
        <template  v-for="(row, index) in filteredItems">
          <div class="row"   :ref="'${showProj}'" v-show="(showProj==row.Id && 
           ($route.name=='projecthome'||$route.name=='projectsubhome')) || $route.name=='projects'
           ">
            
          
            <div class="col">


              <div v-if="showProj!=row.Id  || $route.name=='projects'">
                <button
                  class="buttonplusminus"
                  @click="
                    showProject(row, index);"
                >
                  +
                </button>
              </div>
              <div v-if="showProj==row.Id &&  ($route.name=='projecthome'||$route.name=='projectsubhome') ">
                <button
                  class="buttonplusminus"
                  @click="
                    HideProject(row, index);
                    row.hide = false;
                  "
                >
                  -
                </button>
              </div>
            </div>

            <div class="col" >{{ row.Name }}</div>
            <div class="col">{{ row.CreationTime }}</div>
            <div class="col" v-show="clickableAddproject">
              <button
                type="button"  
                class="mb-2 v-btn v-btn--contained theme--dark v-size--default error" @click="deleteProject(row)"
              >
                <span class="v-btn__content"  >
                  מחק
                </span>
              </button>
            </div>
          </div>

       
           <div class="row-span-4 leading-3" v-show="(showProj==row.Id && 
           ($route.name=='projecthome'||$route.name=='projectsubhome')) || $route.name=='projects'
           ">  
               <div class="col" >
             
              <template  v-if="showProj==row.Id &&  ($route.name=='projecthome'||$route.name=='projectsubhome')">
                <projectnav :show="showProj === row.Id"  @proj-update="updateProject"/>
                <router-view  name="projecthome"/>
              </template>

            
            </div>
          </div> 
        </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../store/store';
import projectnav from "@/components/projectnav";
import moment from "moment";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    projectnav: projectnav,
  },
  data: function() {
    return {
      showProj: null,
     
      loading: false,
      statuses: [],
      index: null,
      filterShown: true,
      statusFilter: null,
      nameFilter: "",
      projectitem: [
        {
          Id: -1,
          Name: "",
          CreationTime: "",
        },
      ],
    };
  },

  computed: {

    clickableAddproject() {
              
        
     if (this.$route.name=="projects")
       return true;
    },
    filteredItems() {
      let filtered = this.projectitem;

      if (this.nameFilter != null && this.nameFilter != "")
        filtered = filtered.filter(
          (m) =>
            m.Name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) > -1
        );

      return filtered;
    },
   
  },



mounted() {
  

 
  

},
  created() {
    var that = this
    this.loading = true;
    this.api.postData("api/GetProjects").then((res) => {
     
      var response = res.data;
      this.projectitem = [];

      let projectitems = this.projectitem;

      for (var idx in res.data.items) {
        var item = res.data.items[idx];
        projectitems.push({
          Id: item.Id,
          Name: item.Name,
          CreationTime: moment(item.CreationTime).format("YYYY-MM-DD"),
        });
      }
      this.loading = false;
      
 
          if (that.$store.state.projid !=-1)
     {
       that.showProj=this.$store.state.projid
  
        if (that.$store.state.projsubid ==-1) // Go to PROJECT
        {
               store.dispatch('toprojadd',-1)
        }
       
       

 let dic_local = [];
     
          dic_local["projecthome"] = "submissions"
         let copy = Object.assign({}, this.$store.state.currentView.view)

        delete copy["projecthome"]

       var append = Object.assign({}, dic_local,copy)
        var objCurrentView = {
            page: "projecthome",
            view: append
        }

        this.setCurrentView(objCurrentView)
  
    
      }
      
     });

  },
  

  methods: {
   
    ...mapActions(["setCurrentView", "setResourceName", "setfirstResourceId","setaddedidProject"]),

     getstyle() {

   if (this.$route.name !="projects" ) 
  //return 'overflow-y:auto;overflow-x:hidden;height:auto;  max-height:78vh;	overflow-y: scroll;';

  return '';
    else
  return 'height:calc(55vh - 45px);overflow-y: scroll;overflow-y:auto;overflow-x:hidden;';

  },
getstylesub() {

   if (this.$route.name !="projecthome" ) 
  //return 'overflow-y:auto;overflow-x:hidden;height:auto;  max-height:78vh;	overflow-y: scroll;';

  return '';
    else
  return  'height:calc(85vh - 45px);overflow-y: scroll;overflow-y:auto;overflow-x:hidden;';
 

  },

updateProject(value) {


     var editedIndex=-1;
     var  editedItem
        for (var index in this.projectitem) {
        var element = this.projectitem[index];

        if (element.Id !=value.id)
        continue;
        editedIndex= index
          editedItem = Object.assign({}, element);
          editedItem.Name=value.name
        }

   
     

       this.projectitem.splice(editedIndex, 1, editedItem);


  
},

createProject (value) {

this.projectitem.push( {
          Id: value.id,
          Name: value.name,
          CreationTime: new Date().toLocaleString()
        });

        this.showProj  = value.id

  
},
   Addproject(e) {
      e.preventDefault();
    
    
        let dic_local = [];
 

       dic_local["projecthome"] = "projectdefinition"
         let copy = Object.assign({}, this.$store.state.currentView.view)

        delete copy["projecthome"]

       var append = Object.assign({}, dic_local,copy)
        var objCurrentView = {
            page: "projecthome",
            view: append
        }

    
        this.setCurrentView(objCurrentView)

             this.showProj  = -1;
     

        

      this.$nextTick(() => 
       this.$router.push({
        name: "projecthome",
        params: { id: this.crypto.encrypt(-1) },
      }) 
      )
    

try {
     
       var row= this.$refs
     var prow=  row.addsubmission

      this.$nextTick(() => {
          window.scrollTo({
              top: prow.offsetTop-380 ,
              left: 0,
              behavior: 'smooth'
          });
        });
    
} catch (error) {
  
}
    },


    deleteProject(row) {
      var that = this;
      const index = this.projectitem.indexOf(row);
      this.$dialog.confirm(" ?למחוק").then(function(dialog) {
        var data = {
          removedid: row.Id,
        };

        that.api.postData("api/deleteProject", data).then((res) => {
          var removed = that.projectitem.splice(index, 1);
          that.flashMessage.show({
            status: "success",
            title: " ADMIN",
            message: "בוצע בהצלחה",
          });
   
        });
      });
    },
    HideProject(row, index) {
     

      if (this.$route.name !="projects" )
        this.$router.push({ name: "projects" });
    
        

        let dic_local = [];
        dic_local["projects"] = "projects"

       var append = Object.assign({}, dic_local,this.$store.state.currentView.view)
        var objCurrentView = {
            page: "projects",
            view: append
        }

       this.setCurrentView(objCurrentView)
    },
    showProject(row, index) {
   

      this.setResourceName(row.Name);
     
      this.setfirstResourceId(row.Id);

      this.$router.push({
        name: "projecthome",
        params: { id: this.crypto.encrypt(row.Id) },
      });
      
        let dic_local = [];
     
          dic_local["projecthome"] = "submissions"
         let copy = Object.assign({}, this.$store.state.currentView.view)

        delete copy["projecthome"]

       var append = Object.assign({}, dic_local,copy)
        var objCurrentView = {
            page: "projecthome",
            view: append
        }

        this.setCurrentView(objCurrentView)

      this.showProj = row.Id;

         

    },
    getrouteid: function() {
      var routeid = this.$route.params.id;

      routeid = parseInt(this.crypto.decrypt(routeid), 10);

      return routeid;
    },


   
    selectStatusFilter(id) {
      this.statusFilter = this.statusFilter === id ? null : id;
    },
    clearNameFilter() {
      this.nameFilter = null;
    },
    toggleFilter() {
      this.filterShown = !this.filterShown;
    },
  },
};
</script>
<style>
.buttonplusminus {
  color: #ecf0f1;
  background: #8b8d8e;
  width: 25px;
  height: 25px;
  border: 0;
  font-size: 1.2em;
  position: relative;
}
</style>
