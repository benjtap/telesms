<template>
  <div
    class="md:container md:mx-auto md:px-2 w-full  py-2 px-4   mt-8"
  >
   <v-dialog v-model="loading" fullscreen full-width>
  <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.5);">
    <v-layout justify-center align-center>
      <v-progress-circular
        indeterminate
        color="primary">
      </v-progress-circular>
    </v-layout>
  </v-container>
</v-dialog>
    <div class="text-center mb-4">
      <button
        type="submit"
        @click="handleSubmit"
        class="no-underline p-3 my-4 bg-white text-center text-base text-teal-500 rounded shadow"
      >
        פרויקט חדש
      </button>
    </div>

    <div class="flex flex-row flex-wrap">
      <div class="w-full">
        <!-- Task Filters -->
        <div class="px-8 py-4 my-4">
        <div class="flex justify-between items-center">
          <div></div>
        
          <div
            @click="toggleFilter"
            class="w-8 text-xs text-blue-700 font-medium cursor-pointer"
          >
            {{ filterShown ? "הסטר פילטר" : "הצג פילטר" }}
          </div>
        </div>
        <div v-if="filterShown" class="border-t-2">
       

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
        <!-- Task Filters -->

        <div class="flex flex-row flex-wrap items-start lg:-mx-2 xl:mx-0">
         
          <div
            class="bg-white rounded shadow my-4 md:mx-6 lg:mx-2 xl:mx-4 p-4 w-full
                             md:w-72 xl:w-64  cursor-pointer" v-for="(row, rowIndex) in filteredItems" :key="rowIndex"
         >
            <div class="flex justify-between items-center">
              <p class="text-xs text-gray-700 flex flex-col">
                <span
                  class="w-10 border-t-4"
                  style="border-color: rgb(66, 153, 225);"
                ></span>
                <span class="text-right text-xs">תאריך יצירה</span>
                <span class="text-right text-sm text-indigo-700 font-medium">{{row.CreationTime}}</span>
              </p>
               <button
                  class="border-gray-100 bg-red-200    text-gray-700 font-bold py-2 px-4 border-b-4 block ml-2 p-1 
                   text-center rounded-lg border border-4"    @click="deleteProject(row)"
                >
                  מחוק 
                </button>
            </div>
            <div class="text-gray-700 text-left pt-2 cursor-pointer"  @click="showProject(row)">
              <p class="font-medium text-lg overflow-hidden">
                {{row.Name}}
              </p>
            </div>
          </div>
        </div>
      </div>
    <!-- </div>
  </div> -->
</template>
<script>
  import moment from 'moment';
  import { mapState, mapActions } from 'vuex';
  export default {
  data: function() {
  return {
  loading:false,
  statuses: [],
  index: null,
  filterShown: true,
  statusFilter: null,
   nameFilter: "",
   projectitem: [{
  Id: -1,
  Name: "",
  CreationTime: ""

  }]

  }
  },
computed: {
    filteredItems() {
     
      let filtered = this.projectitem;
     

      if (this.nameFilter != null && this.nameFilter != "")
  filtered = filtered.filter(
  m => m.Name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) > -1
  );

 

  return filtered;


  }
  },


  created () {

  this.loading=true
  this.api.postData ('api/GetProjects').then((res) => {
  //debugger
  var response =res.data
  this.projectitem =[]

  let projectitems= this.projectitem

  for (var idx in res.data.items) {
  var item = res.data.items[idx]
  projectitems.push(
  {
  Id: item.Id,
  Name: item.Name,
  CreationTime:  moment(item.CreationTime).format("YYYY-MM-DD")

  })
  }
  this.loading=false
  })
  },
  methods: {
  ...mapActions([
  'setCurrentView',
  'setResourceName',
  'setfirstResourceId'

  ]),

deleteProject(row){
  var that =this
   const index = this.projectitem.indexOf(row);
 this.$dialog
  .confirm(' ?למחוק')
  .then(function(dialog) {

  

     var data = {
        removedid : row.Id
     }

   
      
    that.api.postData('api/deleteProject',data).then((res) => {
      var removed =   that.projectitem.splice(index,1);
     that.flashMessage.show({status: 'success', title: ' ADMIN', message: 'בוצע בהצלחה'})
    })
  })

},

  showProject(row){


  this.setResourceName(row.Name )
 // this.setCurrentView('project' ) 
  this.setfirstResourceId(row.Id )

  this.$router.push({ name: 'projecthome', params: { id: this.crypto.encrypt(row.Id) } })
    var objCurrentView = {
      page:$route.name,
        view:"projecthome"
}
  this.setCurrentView(objCurrentView)
  
  },

  handleSubmit(e){

  e.preventDefault()
  //this.setCurrentView('project')
  this.$router.push({ name: 'projecthome', params: { id: this.crypto.encrypt(-1) } })
  var objCurrentView = {
      page:$route.name=='project',
      view:"monitorsubmission"
}
  this.setCurrentView(objCurrentView)

  },
  selectStatusFilter (id) {
  this.statusFilter = this.statusFilter === id ? null : id
  },
  clearNameFilter() {
  this.nameFilter = null;
  },
  toggleFilter () {
  this.filterShown = ! this.filterShown
  }
  }
  }
</script>
