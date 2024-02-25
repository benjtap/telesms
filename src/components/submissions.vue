<template>
  <div class="flex flex-row flex-wrap ">
    <v-dialog v-model="loading" fullscreen full-width>
      <v-container
        fluid
        fill-height
        style="background-color: rgba(255, 255, 255, 0.5);"
      >
        <v-layout justify-center align-center>
          <v-progress-circular indeterminate color="primary">
          </v-progress-circular>
        </v-layout>
      </v-container>
    </v-dialog>
    <div class="w-3/5 bg-white rounded shadow">
      <v-card primary-title class="justify-center">
        <v-card-title>
          <h1>רשימת הפצות</h1>
        </v-card-title>
      </v-card>
    </div>

    <div class="w-full ">
      <div class="p-2" v-show="clickableAddsub">
        <div class="text-center align-middle justify-center ">
          <button
            type="submit"
            @click="Addprojsub"
            class="no-underline p-3  bg-white text-center text-base text-teal-500 rounded shadow"
          >
            הפצה חדשה
          </button>
        </div>
      </div>
      <!-- Task Filters -->
      <div class="px-8 " v-show="clickableAddsub">
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
            <div class="pb-1 pt-2">מצבים</div>
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
                <div class="">בטווח תאריכי וולידי</div>
                <div
                  @click="clearDateFilter"
                  class="text-xs font-medium border-b border-teal-500 cursor-pointer"
                >
                  Clear
                </div>
              </div>
              <div class="flex flex-row items-center relative w-64">
                <div
                  style="padding: 2px; border-width: 2px; border-style: solid; border-color: cyan;"
                >
                  <select style="background-color:white"
                    @change="setnewcompter()"
                    v-model="dateFilter"
                    class="w-full block appearance-none  border border-gray-500 rounded text-gray-800 py-1 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="1" class="my-2 text-lg">כן</option>
                    <option value="0" class="my-2 text-lg">לא</option>
                  </select>
                </div>
              </div>
            </div>

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

              <div class="flex flex-row items-center relative w-64;">
                <div
                  style="padding: 2px; border-width: 2px; border-style: solid; border-color: cyan;"
                >
                  <input  style="background-color:white"
                    v-on:input="setnewcompter()"
                    v-model="nameFilter"
                    type="text"
                    class="w-full block border-solid sm:border-dashed md:border-dotted text-gray-800 py-1 px-4 pr-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Task Filters <div
        class="grid grid-cols-4    bg-gray-100 bg-white rounded shadow p-6 min-w-full bg-teal-100 hover:bg-teal-200"
      >-->

    <div class="flex flex-row">
      <div
        class="grid   bg-gray-100 bg-white rounded shadow p-6 min-w-full bg-teal-100 hover:bg-teal-200"
      >
        <div class="row">
          <div class="col" v-show="clickableAddsub"></div>
          <div class="col"></div>
          <div class="col font-serif text-lg text-gray-800 text-center">
            שם הפצה
          </div>
          <div class="col font-serif text-lg text-gray-800 text-center">
            סה"כ נמענים
          </div>
          <div class="col font-serif text-lg text-gray-800 text-center">
            נשלחו
          </div>
           <div class="col font-serif text-lg text-gray-800 text-center">
          מוכנים לשליחה
          </div>
          <div class="col font-serif text-lg text-gray-800 text-center">
            תאריך יצירה
          </div>
          <div class="col font-serif text-lg text-gray-800 text-center">
            פעולה
          </div>
        </div>
      
        <div>
          <div class="row-span-4 leading-none">
            <div class="col" :ref="`addsubmission`">
              <template
                v-if="$route.name == 'projectsubhome' && showSub === -1"
              >
                <projectsubnav
                  :show="showSub === -1"
                    @sub-insert="createsubProject"
                />
                <router-view name="projectsubhome" />
              </template>
            </div>
          </div>

          <template v-for="(row, index) in filteredItems">
            <div
              class="row " :ref="'${showSub}'"
              v-show="
                (showSub == row.Id && $route.name == 'projectsubhome') ||
                  $route.name == 'projecthome'
              "
            >
              <div class="col" v-show="clickableAddsub">
                <button
                  class="mb-2 v-btn v-btn--contained theme--dark v-size--default error ml-2 p-1"
                  alt="מחיקה"
                  @click="deleteProjectsub(row)"
                >
                  מחוק הפצה
                </button>
              </div>

              <div class="col">
                <div v-if="showSub != row.Id || $route.name == 'projecthome'">
                  <button
                    class="buttonplusminus"
                    @click="showProjectsub(row, index)"
                  >
                    +
                  </button>
                </div>
                <div
                  v-if="showSub == row.Id && $route.name == 'projectsubhome'"
                >
                  <button
                    class="buttonplusminus"
                    @click="
                      HideProjectsub(row, index);
                      row.hide = false;
                    "
                  >
                    -
                  </button>
                </div>
              </div>
                 
              <div class="col text-center  leading-tight">{{ row.Name }} #{{ row.Id }}</div>
              <div class="col text-center">{{ formatnumber(row.TotalRecipients ) }}</div>
              <div class="col  text-center">{{  formatnumber(row.TotalSent ) }}</div>
                 <div class="col text-center">{{  formatnumber(row.TotalRecipientstosend ) }}</div>
              <div class="col text-center">{{ row.SendStateDate }}</div>
              <div class="col ">
            
                  
                  

                  <button
                    class="mb-2 v-btn v-btn--contained theme--dark v-size--default primary m-2 p-1"
                    v-if="row.SendState == 0 || row.SendState == 1"
                    @click="sendProjectsub(row)"
                  >
                    <i class="glyphicon glyphicon-play"></i> התחלת הפצה
                  </button>

                  <button
                    class="mb-2 v-btn v-btn--contained theme--dark v-size--default primary m-2 p-1"
                    v-if="row.SendState == 4 || row.SendState == 5"
                    @click="sendProjectsub(row)"
                  >
                    <i class="glyphicon glyphicon-play"></i> המשך הפצה
                  </button>

                  <button
                    class="mb-2 v-btn v-btn--contained theme--dark v-size--default normal m-2 p-1"
                    v-if="row.SendState == 2 || row.SendState == 3"
                    alt="עצירה זמנית עם אפשרות להמשך"
                    @click="pauseProjectsub(row)"
                  >
                    עצירת הפצה
                  </button>

                  <button
                    class="mb-2 v-btn v-btn--contained theme--dark v-size--default normal m-2 p-1"
                    v-if="
                      row.SendState == 2 ||
                        row.SendState == 3 ||
                        row.SendState == 4
                    "
                    alt="ביטול ללא אפשרות המשך"
                    @click="cancelProjectsub(row)"
                  >
                    ביטול הפצה
                  </button>
           
              </div>
            </div>

        

            <div class="row-span-4" v-show="
                (showSub == row.Id && $route.name == 'projectsubhome') ||
                  $route.name == 'projecthome'
              ">
              <div class="col" >
                <template
                  v-if="showSub == row.Id && $route.name == 'projectsubhome'"
                >
                  <projectsubnav
                    :show="showSub === row.Id"
                    @sub-update="updatesubProject"
                  />
                  <router-view name="projectsubhome" />
                </template>
              </div>
            </div>
          </template>
      
        </div>
            <div class="row">
            <div class=" card-footer m-6 ">
              <ul class="flex list-reset w-auto font-sans">
                <li>
                  <button
                    class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow"
                    @click="prevPage"
                    :disabled="pageNumber == 0"
                  >
                    קדם
                  </button>
                </li>
                <li>
                  <button
                    class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow"
                    @click="nextPage"
                    :disabled="pageNumber >= pageCount - 1"
                  >
                    הבא
                  </button>
                </li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/store";
import VueRouter from "vue-router";
import projectsubnav from "@/components/projectsubnav";
import moment from "moment";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    projectsubnav: projectsubnav,
  },
  data: function() {
    return {
       interval: null,
      totalitems: 0,
      size: {
        type: Number,
        required: false,
        default: 10,
      },
      pageOfItems: [],
      pageNumber: 0,
      showSub: null,
      loading: false,
      tagActive: "ApprovedForSend",
      statuses: [],
      index: null,
      filterShown: true,
      statusFilter: 2,
      nameFilter: "",
      dateFilter: "1",

      activityitem: [
        {
          Id: -1,
          Name: "",
          ProjectName: "",
          ProjectId: -1,
          TotalRecipients: 0,
          TotalSent: 0,
          TotalRecipientstosend:0,
          MinSendDate: "",
          MaxSendDate: "",
          SendStateDate: "",
          SendState: -1,
        },
      ],
    };
  },
    beforeDestroy: function(){
clearInterval(this.interval);
},
  created() {
    this.loaddataforcreated();

      this.statuses = [];
    this.statuses.push({
      name:"בפעילות",
      id: 2,
      tag: "ApprovedForSend",
    });
    this.statuses.push({
      name: "הפצה התווספה",
      id: 0,
      tag: "Added",
    });

    this.statuses.push({
      name: "הפצה הסתיימה",
      id: 5,
      tag: "SendEnded",
    });
    this.statuses.push({
      name: "הפצה בוטלה",
      id: 6,
      tag: "SendCanceled",
    });
   
    this.statuses.push({
      name: "עצרה הפצה",
      id: 4,
      tag: "SendPaused",
    });

           if (this.interval==null)
this.interval = setInterval(function () {
   this.getApi();
   }.bind(this), 10000); 

  },
 
mounted() {

     
try {
  

   this.$watch(
    	() => {
          var prow =   this.$refs
         this.$nextTick(() => {
              window.scrollTo({
                top: prow["${showSub}"][0].offsetTop - 440,
                left: 0,
                behavior: "smooth",
              });
            });
    	},
      (val) => {
        
       
      }
    )
} catch (error) {
  
}
    
     
   
  

},
  watch: {
    statusimport(newValue, oldValue) {
     
      if (newValue == 1) {
        this.loaddataforadded();
        store.dispatch("flagstatusimport", -1);
        
      }
    },
    $route(to, from) {
     
   if(to.name=="projecthome" && from.name=="projectsubhome"){

     this.showSub=-1
     if(this.statusFilter==0 && this.tagActive!="Added")
     this.statusFilter=2
   }



   }
  },
  computed: {
    ...mapState(["statusimport"]),

    pageCount() {
      let l = this.totalitems,
        s = 10;
      return Math.ceil(l / s);
    },
    clickableAddsub() {
      if (this.$route.name == "projecthome") return true;
    },

    filteredItems() {
       
      let filtered = this.activityitem;

      if (this.showSub>0)
       return filtered;
     
      if (this.$store.state.projsubid != -1 && this.activityitem.length > 0) {
        if (this.activityitem[0].Id > 0) {
          this.showSub = this.$store.state.projsubid;

       
          store.dispatch("toprojsubadd", -1);
           return filtered;
        }
      } else
       {
        if (this.statusFilter != null){
          if (this.statusFilter==2||  this.statusFilter==3)
       filtered = filtered.filter((m) => (m.SendState === 2|| m.SendState === 3));



       else


        filtered = filtered.filter((m) => m.SendState === this.statusFilter);


        }
         
        if (this.nameFilter != null && this.nameFilter != "")
          filtered = filtered.filter(
            (m) =>
              m.Name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) > -1
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

        this.totalitems = filtered.length;

        return filtered.slice(start, end);
      }
    },
  },

  methods: {
    ...mapActions(["setCurrentView", "setsecResourceName", "setsecResourceId"]),

    getApi : function(){

      

      

       var routeid = -1;

      if (this.$route.name == "projecthome") routeid = this.getrouteid();
      else if (this.$route.name == "projectsubhome") {
        routeid = this.$store.state.firstresourceId;
      }

    

      var data = {
        projectid: routeid
        };
         let activityitems = this.activityitem;
      
      this.api.postData("api/GetSubmissionsactivestatistics", data).then((res) => {

        let dicstats=res.data.items
  
 
        for (var index in activityitems) {

            var editedIndex=-1;

                var editedItem;

        var element = activityitems[index];

        if (element.ProjectId !=routeid)
        continue;
  
       if (element.SendState!=0 && element.SendState!=2 && element.SendState!=3)
         continue;
      
        editedIndex= index
          editedItem = Object.assign({}, element);

          var TotalRecipients
           var TotalRecipientstosend 
           var TotalSent

          try {
            TotalRecipients = dicstats[editedItem.Id].TotalRecipients
             TotalRecipientstosend = dicstats[editedItem.Id].TotalRecipientstosend
              TotalSent = dicstats[editedItem.Id].TotalSent
          } catch (error) {
            
          }
         
          editedItem.TotalRecipients=TotalRecipients
          editedItem.TotalRecipientstosend=TotalRecipientstosend
          editedItem.TotalSent=TotalSent
         

 

            activityitems.splice(editedIndex, 1, editedItem);
        }

         });



    },
    formatnumber(value) {

  if (value<0)
  return 0;
  else
  return value;

    },

   createsubProject(value) {
    

    this.activityitem.push( {
          Id: value.id,
          Name: value.name
         });

   },
    updatesubProject(value) {


     var editedIndex=-1;
     var  editedItem
        for (var index in this.activityitem) {
        var element = this.activityitem[index];

        if (element.Id !=value.id)
        continue;

         

        editedIndex= index
          editedItem = Object.assign({}, element);
          editedItem.Name=value.name
        }

   
     

       this.activityitem.splice(editedIndex, 1, editedItem);


  
},

   loaddataforadded : function() {
      var that = this;
      ;
      var routeid = -1;

      if (this.$route.name == "projecthome") routeid = this.getrouteid();
      else if (this.$route.name == "projectsubhome") {
        routeid = this.$store.state.firstresourceId;
      }

     let activityitems = this.activityitem;

      var data = {
        projectid: routeid,
      };
      this.loading = true;
      this.api.postData("api/GetProjectSubmissionsstatforpjadded", data).then((res) => {
       
        let dicstats=res.data.items
  
 
        for (var index in activityitems) {

            var editedIndex=-1;

                var editedItem;

        var element = activityitems[index];

        debugger

        if (element.SendState==0||element.SendState==2||element.SendState==3)
         continue;

        if (element.ProjectId !=routeid)
        continue;

      
        editedIndex= index
          editedItem = Object.assign({}, element);

          var TotalRecipients
          try {
            TotalRecipients = dicstats[editedItem.Id]
          } catch (error) {
            
          }
         
          editedItem.TotalRecipients=TotalRecipients

            activityitems.splice(editedIndex, 1, editedItem);
        }

   
        this.loading = false;
      });
    },

    loaddataforcreated: function() {
      var that = this;

   

      var routeid = -1;
      if (this.$store.state.projsubid == -1) routeid = this.getrouteid();
      else {
        routeid = this.$store.state.projid;
        store.dispatch("toprojadd", -1);
        that.statusFilter = 0;
      }

      var data = {
        projectid: routeid,
      };
      this.loading = true;
      this.api.postData("api/GetProjectSubmissionsforpj", data).then((res) => {

        var response = res.data;

        that.activityitem = [];

        let activityitems = that.activityitem;

        for (var idx in res.data.items) {
          var item = res.data.items[idx];

          activityitems.push({
            Id: item.Id,
            Name: item.Name,
            ProjectName: item.ProjectName,
            ProjectId: item.ProjectId,
            TotalRecipients: item.TotalRecipients,
           TotalRecipientstosend:item.TotalRecipientstosend, 
            TotalSent: item.TotalSent,
            MinSendDate: item.MinSendDate,
            MaxSendDate: item.MaxSendDate,
            SendStateDate: that.formatedate(
              moment(item.CreationTime).format("YYYY-MM-DD"),
              item.SendStateDate
            ),
            SendState: item.SendState,
          });
        }
        that.loading = false;
      });
    },

    Addprojsub: function() {
     
      let dic_local = [];
      dic_local["projectsubhome"] = "projectsub";
      let copy = Object.assign({}, this.$store.state.currentView.view);

      delete copy["projectsubhome"];

      var append = Object.assign({}, dic_local, copy);
      var objCurrentView = {
        page: "projectsubhome",
        view: append,
      };

      this.setCurrentView(objCurrentView);

      this.showSub = -1;

      this.$nextTick(() =>
        this.$router.push({
          name: "projectsubhome",
          params: { id: this.crypto.encrypt(-1) },
        })
      );

      try {
        var row = this.$refs;
        var prow = row.addsubmission;

        this.$nextTick(() => {
          window.scrollTo({
            top: prow.offsetTop + 30,
            left: 0,
            behavior: "smooth",
          });
        });
      } catch (error) {}
    },

    showProjectsub(row, index) {
     
 
      var routeid = this.getrouteid();
      this.setsecResourceName(row.Name);
      this.setsecResourceId(routeid);

      this.$router.push({
        name: "projectsubhome",
        params: { id: this.crypto.encrypt(row.Id) },
      });

      let dic_local = [];
      dic_local["projectsubhome"] = "subtiming";

      let copy = Object.assign({}, this.$store.state.currentView.view);
      delete copy["projectsubhome"];

      var append = Object.assign({}, dic_local, copy);

      var objCurrentView = {
        page: "projectsubhome",
        view: append,
      };

      this.setCurrentView(objCurrentView);

      this.showSub = row.Id;

    
    },

    formatedate(mydate, SendStateDate) {
      if (mydate == "Invalid date") return SendStateDate;
      // .format("DD/MM/YYYY")
      else return mydate;
    },

    HideProjectsub(row, index) {
     debugger
     this.showSub=-1
     if (this.$route.fullPath.includes("projecthome") == false)
     {

       var routeid =this.crypto.encrypt(this.$store.state.firstresourceId)
  

  this.$router.push({  name: "projecthome",  params: { id: routeid }  });
     }
       // this.$router.push({ name: "projecthome" });

      let dic_local = [];
      dic_local["projecthome"] = "projecthome";

      var append = Object.assign(
        {},
        dic_local,
        this.$store.state.currentView.view
      );
      var objCurrentView = {
        page: "projecthome",
        view: append,
      };

      this.setCurrentView(objCurrentView);
     
    },

    setnewcompter() {
      this.pageNumber = 0;
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },

    deleteProjectsub(row) {
      var that = this;
      const index = this.activityitem.indexOf(row);
      this.$dialog.confirm(" ?למחוק").then(function(dialog) {
        var data = {
          removedid: row.Id,
        };

        that.api.postData("api/deleteProjectsub", data).then((res) => {
          var removed = that.activityitem.splice(index, 1);
          that.flashMessage.show({
            status: "success",
            title: " ADMIN",
            message: "בוצע בהצלחה",
          });
        });
      });
    },

    cancelProjectsub(row) {
      const index = this.activityitem.indexOf(row);
      var that = this;
      this.$dialog.confirm(" ?לבטל").then(function(dialog) {
        var data = {
          projectsubid: row.Id,
        };

        that.api.postData("api/cancelsub", data).then((res) => {
          row.SendState = 6;
          that.activityitem.splice(index, 1, row);
          that.flashMessage.show({
            status: "success",
            title: " ADMIN",
            message: "בוצע בהצלחה",
          });
        });
      });
    },

    sendProjectsub(row) {
      const index = this.activityitem.indexOf(row);
      var that = this;
      var data = {
        projectsubid: row.Id,
      };

      that.api.postData("api/SendSubmission", data).then((res) => {
        row.SendState = 2;
       // that.statusFilter = 2;
        that.activityitem.splice(index, 1, row);
        that.flashMessage.show({
          status: "success",
          title: " ADMIN",
          message: "בוצע בהצלחה",
        });
          
    
      });
    },
    pauseProjectsub(row) {
      const index = this.activityitem.indexOf(row);
      var that = this;
      var data = {
        projectsubid: row.Id,
      };

      that.api.postData("api/PauseSubmission", data).then((res) => {
        row.SendState = 4;
        that.activityitem.splice(index, 1, row);
        that.flashMessage.show({
          status: "success",
          title: " ADMIN",
          message: "בוצע בהצלחה",
        });
      });
    },

    getrouteid: function() {
      var routeid = this.$route.params.id;

      routeid = parseInt(this.crypto.decrypt(routeid), 10);

      return routeid;
    },

    getClass(tag) {
      if (this.tagActive == tag)
        return "p-2 cursor-pointer bg-indigo-200 text-indigo-800 font-medium rounded-l";
      else return "p-2 cursor-pointer bg-gray-100 border-l-2";
    },
    selectStatusFilter(row) {
      // debugger;
      this.pageNumber = 0;
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
    },
  },
};

// Added = 0,
// NotApprovedForSend = 1,
// ApprovedForSend = 2,
// SendStarted = 3,
// SendPaused = 4,
// SendEnded = 5,
// SendCanceled = 6
</script>
