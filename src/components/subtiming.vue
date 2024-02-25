<template>
  <div class="flex flex-row flex-wrap">
    <div class="w-1/5 p-2"></div>

    <div class="w-3/5 bg-white  shadow p-8">
  
     
      <v-card primary-title class="justify-center" >
             
            <v-card-title>
    <h1>     תזמון הפצה</h1> 
            </v-card-title>
</v-card>
      <div  class="block mt-4 p-4  bg-gray-100 ">
        <form @submit.prevent="submitForm">
          <div class="layout justify-center">
            <div class="v-card__actions">
              <div class="my-6">
                <button
                  type="submit" 
                  class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow"
                >
                  <span class="v-btn__content"> שמור </span>
                </button>
              </div>
            </div>
          </div>
           <!------------------------------------------>
          <div class="layout row wrap">
            <div class="flex md4 xs12">
              <div
                role="list"
                class="v-list transparent elevation-0 v-sheet v-sheet--tile theme--light"
              >
                <div
                  tabindex="-1"
                  avatar=""
                  role="listitem"
                  class="bg-gray-500 lighten-2  mb-1  v-list-item theme--light"
                >
                  <div >
                    <div                    
                      style="width: 200px;"
                    >
                      הרצה 
                    </div>
                    <v-list-item-sub-title
                      class="grey--text text--darken-4"
                    ></v-list-item-sub-title>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!------------------------------------------>
    <div class="w-full">
    
      <div class=" border-2 shadow rounded px-8 py-4 my-4">
        <div class="flex justify-between items-center">
          <div></div>
          <div class="text-gray-700 text-lg "></div>
          <div
             class="w-8 text-xs text-blue-700 font-medium cursor-pointer"
          >
           
          </div>
        </div>
        <div v-if="filterShown" class="border-t-2">
          <div class="border-t-2">
            <div class="pb-1 pt-2"></div>
            <div class="inline-flex rounded shadow leading-tight">
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
          
        </div>
      </div>
  
    </div>
 <div class="-mx-3 md:flex mb-2">
            <div class="w-2/5 px-3 mb-6 ">
     <div class="text-xs-center mt-2">
                 תאריך התחלה
                 <v-flex md4 xs12>
               <!-- <div style="padding: 2px;border-width:2px;
              border-style:solid;
              border-color:cyan;">  -->
             <vuejs-datepicker
            :bootstrap-styling="true" :open-date="openDate"  
               class="form-control rounded shadow leading-tight focus:outline-none focus:shadow-outline" 
                v-model="formdata.MinSendDate"
                :format="DatePickerFormat"
                           
                ></vuejs-datepicker>
               <!-- </div> -->

              </v-flex>
            </div> 
             </div> 
                <div class="w-2/5 px-3 mb-6 ">
     <div class="text-xs-center mt-2">
                 תאריך סופי
                 <v-flex md4 xs12 >
               <!-- <div style="padding: 2px;border-width:2px;
              border-style:solid;
              border-color:cyan;margin-top:2px">  -->
             <vuejs-datepicker
            :bootstrap-styling="true" :open-date="openDate1" 
               class="form-control rounded shadow leading-tight focus:outline-none focus:shadow-outline" 
                v-model="formdata.MaxSendDate"
                :value="this.default"
              
                :format="DatePickerFormat"
                :disabled-dates="disabledDates"              
                ></vuejs-datepicker>
               <!-- </div> -->

              </v-flex>
           </div>  
             </div> 


              </div>  
              


 <!------------------------------------------>
          <div class="layout row wrap">
            <div class="flex md4 xs12">
              <div
                role="list"
                class="v-list transparent elevation-0 v-sheet v-sheet--tile theme--light"
              >
                <div              
                   class="bg-gray-500 lighten-2 mt-1 mb-1  v-list-item leading-tight"
                >
                  <div>
                    <div                     
                      style="width: 200px;"
                    >
                      הגבלה זמנים ושעות 
                    </div>
                    <v-list-item-sub-title
                      class="grey--text text--darken-4 leading-tight"
                    ></v-list-item-sub-title>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <!------------------------------------------>
   <div class="flex">
  <div class="flex-1 mb-2">
   יום ראשון
  </div>
  <div class="flex-1 mb-2">
   יום שני
  </div>
  <div class="flex-1 mb-2">
  יום שלישי
  </div>
  <div class="flex-1 mb-2">
   יום רביעי
  </div>
 <div class="flex-1 mb-2">
   יום חמישי
  </div>
 <div class="flex-1 mb-2">
   יום שישי
  </div>
  <div class="flex-1 mb-2">
  יום שבת
  </div>
</div>       
<div class="flex mb-4">
  <div class="flex-1  bg-grey-light px-2 h-12">
  
 <div class="bg-gray-100 h-12 ">
   <select v-model="formdata.StartMinutesDay1" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours"  :value="item.id" :key="item.id">
      {{ item.name }}
    </option>
  </select>
 </div>
  </div>
  <div class="flex-1   px-2 ">
     <div class="bg-gray-100 h-12">
        <select v-model="formdata.StartMinutesDay2" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours" :value="item.id" :key="item.id">
      {{ item.name }}
    </option>
  </select>
     </div>
  </div>
  <div class="flex-1  px-2 ">
     <div class="bg-gray-100 h-12">
        <select v-model="formdata.StartMinutesDay3" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours" :value="item.id" :key="item.id">
      {{ item.name }}
    </option>
  </select>
     </div>
  </div>
  <div class="flex-1  px-2 ">
     <div class="bg-gray-100 h-12">
        <select v-model="formdata.StartMinutesDay4" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours" :value="item.id" :key="item.id">
      {{ item.name }}
    </option>
  </select>
     </div>
  </div>
  <div class="flex-1    px-2 ">
     <div class="bg-gray-100 h-12">
        <select v-model="formdata.StartMinutesDay5" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours" :value="item.id" :key="item.id">
      {{ item.name }}
    </option>
  </select>
     </div>
  </div>
  <div class="flex-1  px-2 ">
     <div class="bg-gray-100 h-12 mb-2">
        <select v-model="formdata.StartMinutesDay6" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours" :value="item.id" :key="item.id">
      {{ item.name }}
    </option>
  </select>
     </div>
  </div>
  <div class="flex-1 px-2 ">
     <div class="bg-gray-100 h-12 mb-2">
        <select v-model="formdata.StartMinutesDay7" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours" :value="item.id" :key="item.id">
      {{ item.name }}
    </option>
  </select>
     </div>
  </div>
</div>
<div class="flex mb-4">
  <div class="flex-1  bg-grey-light px-2 h-12 mb-2">
 <div class="bg-gray-100 h-12">
    <select v-model="formdata.MaxMinutesDay1" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours" :value="item.id" :key="item.id">
      {{ item.name }}
    </option>
  </select>
 </div>
  </div>
  <div class="flex-1   px-2 mb-2">
     <div class="bg-gray-100 h-12">
        <select v-model="formdata.MaxMinutesDay2" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours" :value="item.id" :key="item.id">
      {{ item.name }}
    </option>
  </select>
     </div>
  </div>
  <div class="flex-1  px-2 mb-2">
     <div class="bg-gray-100 h-12">
        <select  v-model="formdata.MaxMinutesDay3" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours" :value="item.id" :key="item.id">
      {{ item.name }}
    </option>
  </select>
     </div>
  </div>
  <div class="flex-1  px-2 mb-2">
     <div class="bg-gray-100 h-12">
        <select v-model="formdata.MaxMinutesDay4" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours" :value="item.id" :key="item.id">
      {{ item.name }}
    </option>
  </select>
     </div>
  </div>
  <div class="flex-1    px-2 ">
     <div class="bg-gray-100 h-12">
        <select v-model="formdata.MaxMinutesDay5" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours" :value="item.id" :key="item.id">
      {{ item.name }}
    </option>
  </select>
     </div>
  </div>
  <div class="flex-1  px-2 ">
     <div class="bg-gray-100 h-12">
        <select v-model="formdata.MaxMinutesDay6" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours" :value="item.id" :key="item.id">
      {{ item.name }}
    </option>
  </select>
     </div>
  </div>
  <div class="flex-1 px-2 ">
     <div class="bg-gray-100 h-12">
        <select v-model="formdata.MaxMinutesDay7" class="w-full block bg-gray-200 rounded text-gray-800 leading-tight" >
    <option v-for="item in hours" :value="item.id"  :key="item.id">
      {{ item.name }}
    </option>
  </select>
     </div>
  </div>
</div>
        
        
       

       
        </form>
      </div>
      </div>
    <!-- </div> -->
    <FlashMessage></FlashMessage>
  </div>
  
</template>
<script>
import { mapState, mapActions } from "vuex";
 import vuejsDatepicker from 'vuejs-datepicker';
 import moment from "moment";
export default {
 components: {vuejsDatepicker},
  data: function() {
    return {
    datepicker1: '2018-10-04',
    default: '2018-10-04',
    DatePickerFormat: 'yyyy-MM-dd',
     formdata :{},
      statuses: [],
      hours :[],
     filterShown: true,
      tagActive: "",
      statusFilter: 1,
   
      
    };
  },
  mounted: function() {
    this.statuses = [];
    this.statuses.push({
      name: "הרצה מידית ללא הגבלה",
      id: 1,
      tag: "one"
    });
    this.statuses.push({
      name: "הרצה מידית עם הגבלה",
      id: 2,
      tag: "two"
    });

    this.statuses.push({
      name: "הפצה מתוזמנת",
      id: 3,
      tag: "three"
    });
  
    var i=0;
      var that =this
       for (i = 0; i <49 ; i++) {
         that.hours.push({
            id: i*30,
            name :that.getHour(i*30)
         })
        
       }  
  },
  created() {
   

  var routeid = this.getrouteid();
  if (routeid > 0) {
  var data = {
  projectsubid: routeid
  };

  var vm = this;
  this.api.postData("/api/GetProjectsub", data).then(res => {

  vm.formdata = res.data.items.results1;

  });


  }
  },

  computed: {

  },

  methods: {
  ...mapActions(["setCurrentView", "setResourceName"]),
  getrouteid: function() {
  var routeid = this.$route.params.id;


  routeid=  parseInt(this.crypto.decrypt(routeid), 10);

  return routeid

  },
  getHour : function (i) {
  var x = new Date(0, 0, 0, 0, i);

  return this.padZero(x.getHours()) + ":" + this.padZero(x.getMinutes());
  },

  padZero  : function (n)   {
  if (n < 10) {
                    return "0" + n;
                }
                return n.toString();
            },

    getClass(tag) {
      if (this.tagActive == tag)
        return "p-2 cursor-pointer bg-indigo-200 text-indigo-800 font-medium rounded-l";
      else return "p-2 cursor-pointer bg-gray-100 border-l-2";
    },
     selectStatusFilter(row) {
     
      this.statusFilter = this.statusFilter === row.id ? null : row.id;
      this.tagActive = row.tag;
  if (row.id==1)
      {
     
     var today = new Date();
   
     this.formdata.MinSendDate = today
       this.formdata.MaxSendDate =new Date(new Date().setFullYear(new Date().getFullYear() +20))

      }
       if (row.id==2)
      {
   
var today = new Date();
   var today = new Date();
     this.formdata.MinSendDate = today

     this.formdata.MaxSendDate =new Date(new Date().setMonth(new Date().getMonth()+1));
      }
        if (row.id==3)
      {
 this.formdata.MinSendDate  =null
 this.formdata.MaxSendDate  =null
      }
    },

    submitForm() {
      
         
       var routeid = this.getrouteid();
       this.formdata.projectsubid=routeid

        this.formdata.maxdate = moment(
        String(this.formdata.MaxSendDate)
      ).format("YYYY-MM-DD");
      this.formdata.mindate = moment(
        String(this.formdata.MinSendDate)
      ).format("YYYY-MM-DD");

        this.api.postData("api/updateprojectsubtiming", this.formdata).then(res => {
          this.flashMessage.show({
            status: "success",
            title: "פרויקט",
            message: "בוצע בהצלחה "
          });
          return;
        });
    
    },

   
  }
};
</script>
