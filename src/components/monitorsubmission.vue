<template>
  <!-- <div
    class="md:container md:mx-auto md:px-2 w-full  py-2 px-4 bg-blue-100 lg:w-3/4  mt-8"
  > -->
   <div
    class="md:container w-full  bg-blue-100"
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
    <!-- Task Filters -->
   <div class="w-full">
    
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
          <div class="border-t-2">
            <!-- <div class="pb-1 pt-2">מצבים</div> -->
            <div class="inline-flex rounded shadow">
              <div
                v-for="(row, rowIndex) in statuses"
                :key="rowIndex"
                @click="selectStatusFilter(row)"
                v-bind:class="getClass(row.tag)"
              >
                {{ row.name }}
              </div>
            </div>
          </div>
          <div class="flex flex-row flex-wrap text-gray-700">
           

            <div class="p-4">
              <div class="pb-1 flex justify-between items-center">
                <div class="">שם הפצה</div>
                <div  
                  @click="clearNameFilter"
                  class="text-xs font-medium border-b border-teal-500 cursor-pointer"
                >
                  Clear
                </div>
              </div>
              <div class="flex flex-row items-center relative w-64">
                <input  v-on:input="setnewcompter()"
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
    <div class="bg-white rounded shadow p-8" style='height:calc(55vh - 45px);overflow-y: scroll;overflow-y:auto;overflow-x:hidden;'> 
      <div class="text-xl">
       הפצות פעילות
      </div>
      <div class="mt-4"></div>
      <span
        class="block mt-4 p-4 rounded-lg bg-gray-100 border-2 border-indigo-300 cursor-pointer"
      >
        <div class="py-4">
          <!-- -->
          <div class=" card-footer pb-3 pt-3">

  <ul class="flex list-reset border border-grey-light rounded w-auto font-sans">
  <li>
      <button class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow" @click="prevPage" :disabled="pageNumber==0">
    קדם
  </button>
  </li>
  <li> <button class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow" @click="nextPage" :disabled="pageNumber >= pageCount -1">
    הבא
  </button></li>
</ul>
      </div>
          <div 
            class="-mx-3 md:flex  bg-white rounded shadow px-4 py-2 my-4" 
            v-for="(row, rowIndex) in filteredItems"
            :key="rowIndex"
          >
            <div class="w-3/5">
              <div class=" text-xs text-indigo-700 ">
                <span class="text-gray-700">עדכון אחרון:</span>
                {{  row.SendStateDate }}  
              </div>
              <div class="text-2xl" @click="showProject(row)" >שם פרויקט:{{ row.ProjectName }}</div>
              <div class="text-xl"  @click="showProjectsub(row)"  >שם הפצה: {{ row.Name }} #{{ row.Id }}</div>
              <div class="text-xl">
                {{ getstatus(row) }}
              </div>
              <div class="flex">
                <div class="py-2 text-gray-700">
                  <label class="block m-1 p-1">סה"כ נמענים</label>
                  <div
                    class="block ml-2 p-1 rounded-lg  text-center border-2 border-indigo-300"
                  >
                    {{ row.TotalRecipients }}
                  </div>
                </div>
                <div class="py-2 text-gray-700">
                  <label class="block ml-1 p-1">נשלחו</label>
                  <div
                    class="block ml-2 p-1 rounded-lg  text-center border-2 border-indigo-300"
                  >
                    {{ row.TotalSent }}
                  </div>
                </div>
              </div>
            </div>
           <div class="w-2/5">
              <div class="inline-flex">
            <span
              class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow"
              v-if="row.SendState == 5"
              >ההפצה הסתיימה</span
            >
            <span
              class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow"
              v-if="row.SendState == 6"  
              >ההפצה בוטלה</span
            >

            <!-- ng-click="vm.Send(submission)" -->
            <button
              class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow"
              v-if="row.SendState == 0 || row.SendState == 1" @click="sendProjectsub(row)"
            >
              <i class="glyphicon glyphicon-play"></i> התחלת הפצה
            </button>
            <!-- ng-click="vm.Send(submission)" -->
            <button
              class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow"
              v-if="row.SendState == 4 || row.SendState == 5" @click="sendProjectsub(row)"
            >
              <i class="glyphicon glyphicon-play"></i> המשך הפצה
            </button>
            <!-- ng-click="vm.PauseSend(submission)" -->
            <button
              class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow"
              v-if="row.SendState == 2 || row.SendState == 3"
              alt="עצירה זמנית עם אפשרות להמשך" @click="pauseProjectsub(row)"
            >
               עצירת הפצה
            </button>
            <!-- ng-click="vm.CancelSend(submission)" -->
            <button
              class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow"
              v-if="
                row.SendState == 2 || row.SendState == 3 || row.SendState == 4
              "
              alt="ביטול ללא אפשרות המשך"  @click="cancelProjectsub(row)"
            >
              ביטול הפצה
            </button>
          
          </div>
             </div>
           
          </div>
        </div>
      </span>
    </div>

  </div>
  
</template>

<script>
import store from '../store/store';
import moment from "moment";
import { mapState, mapActions } from 'vuex';
export default {
  // Added = 0,
  // NotApprovedForSend = 1,
  // ApprovedForSend = 2,
  // SendStarted = 3,
  // SendPaused = 4,
  // SendEnded = 5,
  // SendCanceled = 6  nameFilter

  data: () => ({
    totalitems:0,
    size:{
      type:Number,
      required:false,
      default: 10
    },
    pageNumber:0,
   loading:false,
      interval: null,
     tagActive: "ApprovedForSend",
      statuses: [],
      index: null,
      filterShown: true,
      statusFilter: 2,
      nameFilter: "",
      dateFilter: 1,
    pageOfItems: [],
    activityitem: [
      {
        Id: -1,
        Name: "",
        ProjectName: "",
        ProjectId: -1,
        TotalRecipients: 0,
        TotalSent: 0,
        MinSendDate: "",
        MaxSendDate: "",
        SendStateDate: "",
        SendState: -1
      }
    ]
  }),
   beforeDestroy: function(){
clearInterval(this.interval);
},
  mounted: function() {
    this.statuses = [];

    
  },
  computed: {
  pageCount(){
      let l = this.totalitems,
          s = 10;
      return Math.ceil(l/s);
},

    filteredItems() {
      
     
     let filtered = this.activityitem;


      if (this.statusFilter != null){
          if (this.statusFilter==2||  this.statusFilter==3)
       filtered = filtered.filter((m) => (m.SendState === 2|| m.SendState === 3));
       }

      if (this.nameFilter != null && this.nameFilter != "")
       filtered = filtered.filter(
          m => m.Name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) > -1
        );

         if (this.dateFilter != null) {

            var dt =new Date();
        dt= dt.setHours( dt.getHours() + 2 );
          if (this.dateFilter == 1)
            filtered = filtered.filter(
              (m) =>
                !(
                  moment(dt).isBefore(m.MinSendDate) ||
                  moment(Date.now()).isAfter(m.MaxSendDate)
                )
            );
          else
            filtered = filtered.filter(
              (m) =>
                moment(dt).isBefore(m.MinSendDate) ||
                moment(Date.now()).isAfter(m.MaxSendDate)
            );
        }


      
     const start = this.pageNumber * 10,
          end = start + 10;

          this.totalitems=filtered.length;

       return    filtered.slice(start, end);
      

   
    }
  },
  created() {
     this.loading=true
     this.getApi();

   if (this.interval==null)
this.interval = setInterval(function () {
   this.getApi();
   }.bind(this), 10000); 

  },


      methods: {
  ...mapActions([
  'setCurrentView',
  'setResourceName',
  'setfirstResourceId',
  'setsecResourceName',
  'setsecResourceId'

  ]),
    
  getApi : function(){
     this.loading=true
        this.api.postData("api/GetProjectSubmissions").then(res => {
   
      var response = res.data;

      this.activityitem = [];

      let activityitems = this.activityitem;

      for (var idx in res.data.items) {
        var item = res.data.items[idx];
        activityitems.push({
          Id: item.Id,
          Name: item.Name,
          ProjectName: item.ProjectName,
          ProjectId: item.ProjectId,
          TotalRecipients: item.TotalRecipients,
          TotalSent: item.TotalSent,
          MinSendDate: item.MinSendDate,
          MaxSendDate: item.MaxSendDate,
          SendStateDate: moment(item.SendStateDate).format("YYYY-MM-DD"),
          SendState:  item.SendState 
        });
      }
        this.loading=false
    });
  },

showProjectsub(row){
  this.setResourceName(row.ProjectName )
  this.setfirstResourceId(row.ProjectId )
  this.setsecResourceName(row.Name )
  this.setsecResourceId(row.Id )



    this.$router.push({ name: 'projectsubhome', params: { id: this.crypto.encrypt(row.Id) } })

   store.dispatch('toprojsubadd',row.Id)
   store.dispatch('toprojadd',row.ProjectId)

    let dic_local = [];
    dic_local['projectsubhome'] = "projectsub"

   var append = Object.assign({}, dic_local,this.$store.state.currentView.view)
    var objCurrentView = {
        page: 'projectsubhome',
        view: append
    }


    this.setCurrentView(objCurrentView)
  
  },


   showProject(row){

  
  this.setResourceName(row.ProjectName )

  this.setfirstResourceId(row.ProjectId )

       this.$router.push({ name: 'projecthome', params: { id: this.crypto.encrypt(row.ProjectId) } })

    store.dispatch('toprojadd',row.ProjectId)
       let dic_local = [];
       dic_local["project"] = "project"

      var append = Object.assign({}, dic_local,this.$store.state.currentView.view)
       var objCurrentView = {
           page: "project",
           view: append
       }

       this.setCurrentView(objCurrentView)
  
  },



   cancelProjectsub(row){ 
  const index = this.activityitem.indexOf(row);
  var that =this
  this.$dialog
  .confirm(' ?לבטל')
  .then(function(dialog) {
     
     var data = {
        projectsubid : row.Id
     }
  
      
    that.api.postData('api/cancelsub',data).then((res) => {
       row.SendState = 6
       that.activityitem.splice(index, 1, row);
     that.flashMessage.show({status: 'success', title: ' ADMIN', message: 'בוצע בהצלחה'})
    })
  })

   

},

sendProjectsub(row){
   const index = this.activityitem.indexOf(row);
  var that =this
 var data = {
        projectsubid : row.Id
     }

       that.api.postData('api/SendSubmission',data).then((res) => {
     
      row.SendState = 2
       that.activityitem.splice(index, 1, row);
     that.flashMessage.show({status: 'success', title: ' ADMIN', message: 'בוצע בהצלחה'})
    })

},
pauseProjectsub(row){
   const index = this.activityitem.indexOf(row);
  var that =this
 var data = {
        projectsubid : row.Id
     }

       that.api.postData('api/PauseSubmission',data).then((res) => {
     row.SendState = 4
       that.activityitem.splice(index, 1, row);
     that.flashMessage.show({status: 'success', title: ' ADMIN', message: 'בוצע בהצלחה'})
    })

},


     setnewcompter(){
      this.pageNumber=0
     },
       nextPage(){
         this.pageNumber++;
      },
      prevPage(){
        this.pageNumber--;
      },
    getClass(tag) {
      if (this.tagActive == tag)
        return "p-2 cursor-pointer bg-indigo-200 text-indigo-800 font-medium rounded-l";
      else return "p-2 cursor-pointer bg-gray-100 border-l-2";
    },
    selectStatusFilter(row) {
      this.pageNumber=0
      this.statusFilter = this.statusFilter === row.id ? null : row.id;
      this.tagActive = row.tag;
    },

    clearDateFilter() {
      this.dateFilter = null;
    },

    clearNameFilter() {
      this.nameFilter = null;
    },
    toggleFilter() {
      this.filterShown = !this.filterShown;
    },

    getstatus(item) {
      if (item.SendState == 2) {
        if (
          !(
            moment(Date.now()).isBefore(item.MinSendDate) ||
            moment(Date.now()).isAfter(item.MaxSendDate)
          )
        )
          return "מתמשכת";
        else
          return (
            "min= " +
            moment(item.MinSendDate).format("YYYY-MM-DD") +
            " , max= " +
            moment(item.MaxSendDate).format("YYYY-MM-DD") +
            " מתמשכת - לא בתוקף"
          );
      }
    }
  }
};

</script>

<style>
.v-dialog__container {
    display: unset; 
}
 
</style>