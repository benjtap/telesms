<template>
    
  <div 
    class="flex flex-row flex-wrap"
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
    <div class="w-1/5"></div>

    <div class="w-3/5 bg-white  shadow p-8">
     
 <v-card primary-title class="justify-center" >
             
            <v-card-title>
    <h1>     פרטי פרויקט</h1> 
            </v-card-title>
</v-card>

     
      <span
        class="block p-4 "
        ><form @submit.prevent="submitForm">
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
          <div class="-mx-3 md:flex mb-1">
            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1"
                for="grid-first-name"
              >
                שם פרויקט
              </label>
              <input
                class="bg-gray-400   block w-full bg-grey-lighter text-grey-darker 
             rounded py-2 px-2"
                id="grid-first-name"
                type="text"
                required
                v-model="formdata.Name"
              />
              <p class="text-red text-xs italic"></p>
            </div>
          </div>
          <div v-if="isdefaultparameters">
            <div class="-mx-3 md:flex mb-1">
              <div class="md:w-full px-3">
                <input
                  class="mr-2 leading-tight"
                  type="checkbox"
                  v-model="formdata.Island_telesms"
                />
                <span class="text-sm">
                  דף נחיתה טלסמס
                </span>
              </div>
            </div>

            <div class="-mx-3 md:flex">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1"
                  for="grid-first-name"
                >
                  כתובת עמוד נחיתה:
                </label>
                <input
                  v-if="formdata.Island_telesms == 0"
                  style="direction:ltr"
                  class="bg-gray-400   block w-full bg-grey-lighter text-grey-darker 
             rounded py-3 px-4 "
                  id="grid-first-name"
                  type="text"
                  v-model="formdata.LandingPageUrl"
                />
                <select
                  v-if="formdata.Island_telesms == 1"
                  v-model="formdata.LandingPageUrl"
                  class="w-full block appearance-none bg-white border border-gray-500 rounded text-gray-800 py-1 px-4 pr-8  leading-tight"
                >
                  <option selected disabled hidden value="">{{
                    "בחר דף"
                  }}</option>
                  <template v-for="option in optionsddl">
                    <option :value="option.value" class="my-2 text-lg">{{
                      option.name
                    }}</option>
                  </template>
                </select>

                <p class="text-red text-xs italic"></p>
              </div>
            </div>
            <div class="-mx-3 md:flex mb-6" >
              <div class="md:w-full px-3">
                <input
                  class="mr-2 leading-tight"
                  v-model="formdata.IsMybillsTokenRequired"
                  type="checkbox"
                />
                <span class="text-sm">
                  ההודעה תקושר לתשלום ב Mybills
                </span>
              </div>
            </div>

            <div class="-mx-3 md:flex mb-6"  v-if="formdata.IsMybillsTokenRequired == 1">
             
              <div class="md:w-full px-3 mb-1">
                 <span class="text-sm">קוד סוג תשלום טלאול</span>
                <input
                  type="text"
                  class="mr-2 leading-tight bg-white"
                  name="PayTypeTeleallCode"
                   v-model="formdata.PayTypeTeleallCode"
                />
              </div>
            </div>


            <div class="-mx-3 md:flex mb-2">
              <div class="w-3/5 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-city"
                >
                  גוף ההודעה -ברירת מחדל לכל ההפצות
                </label>
                <textarea
                  ref="smsbody"
                  v-model="formdata.SmsBody"
                  rows="7"
                  class="bg-gray-400   block w-full bg-grey-lighter text-grey-darker 
             rounded py-3 px-4 form-group-smsbody"
                  name="SmsBody"
                  id="SmsBody"
                  type="text"
                  placeholder=""
                />
              </div>
              <div class="w-2/5 px-3 mt-5 md:mb-0 ">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-city"
                >
                  לחץ על השורה להכנסת השדה
                </label>
                <div class="legend">
                  <div
                    v-for="(col, colIndex) in colArray"
                    style="float:left;margin-right:15px;"
                    :key="colIndex"
                  >
                    <div v-for="(row, rowIndex) in col" :key="rowIndex">
                      <a @click="insertSomething('[' + row + ']')" class="lnk leading-tight">
                        [{{ row }}]
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </span>
    </div>
    <FlashMessage></FlashMessage>
  </div>
</template>
<script>
import store from '../store/store';

 import { mapState, mapActions } from 'vuex';

  
  export default {

   props: ['data'], 

  data: function() {
  return {
  fields: [],
  loading:false,
  colArray: [],
  formdata: {
  Id: -1,
  Name: "",
  LandingPageUrl: "",
  TenantId: -1,
  OrgTeleallCode: "",
  PayTypeTeleallCode: "",
  IsMybillsTokenRequired: 0,
  Island_telesms: true,
  CreatorUserName: "",
  SmsBody: "",
  TeleallSourceCode: ""
  },
  routeid:-1,
  selectedlanding: -1,
  optionsddl: [],
  diclandingId: {},
  dicIdlandings: {},

  project: {},
  LandId: -1
  };
  },
  created() {
  debugger;
  this.routeid= this.getrouteid()
 
  if ( this.routeid < 0) 
  return

  var data = {
  projectid:  this.routeid
  };
  //debugger
  var that = this;
   this.loading=true
  this.api.postData("/api/GetProject", data).then(res => {

  that.formdata = res.data.items.results1;
  that.project = res.data.items.results2;
  that.populate_dict_landing_page(that);

  that.LandId = that.project.LandId;

  if (that.formdata.Island_telesms==true)
  that.formdata.LandingPageUrl = that.dicIdlandings[that.LandId];

  that.populate_ddl_landing_page(that);

  this.populate_fieldsProj(that, that.project.ProjectFields);

  this.fakeFetchData();

   that.loading=false
  });
  
  },

  computed: {

 
  isdefaultparameters() {
  
  this.routeid =  this.getrouteid() 
  return this.routeid === -1 ? false : true;
  }
  },

  methods: {
  ...mapActions(["setCurrentView", "setResourceName","setProjectAddId",'setfirstResourceId']),

    get_bvalue_from_diclanding : function (bvalue) {
               
     for (var index in this.diclandingId) {
          if (index == bvalue) {
            return this.diclandingId[index];
         }
        }
            },

 submitForm() {
  

  var routeid = this.getrouteid()

 var that=this
  if (routeid > 0) {
     this.formdata.SmsBody= this.$refs.smsbody.value;

      if (this.formdata.Island_telesms==true)
         this.formdata.LandingPageId = this.get_bvalue_from_diclanding( this.formdata.LandingPageUrl);
  this.api.postData("api/updateproject", this.formdata).then(res => {
  this.flashMessage.show({
  status: "success",
  title: "פרויקט",
  message: "בוצע בהצלחה "
  });

    

    var data ={
   id:this.formdata.Id
,
   name:this.formdata.Name
}

 that.$emit('update-proj', data)

 debugger
 
 this.setResourceName(this.formdata.Name);

  return;
  });
  } else {
  this.api.postData("api/createproject", this.formdata).then(res => {
   store.dispatch('toprojadd',res.data.items)
 
var data ={
   id:res.data.items,
   name:this.formdata.Name
}

 that.$emit('insert-proj', data)

  var routeid =this.crypto.encrypt(res.data.items)
  

  this.$router.push({  name: "projecthome",  params: { id: routeid }  });
   var location = this.$route.fullPath;


   var errorHandler;

   this.$router.replace("/").catch(errorHandler);


   this.$nextTick(() => this.$router.replace(location).catch(errorHandler));

  this.setResourceName(this.formdata.Name);
  this.setfirstResourceId(res.data.items )

  

  });
  }
  },


  getrouteid: function() {

  var routeid = this.$route.params.id;
 
   if (routeid == undefined)
   return;
  
    routeid=  parseInt(this.crypto.decrypt(routeid), 10);
    
    return routeid

  },

  populate_fieldsProj: function(vm, obj) {
  vm.fields.push("שם פרטי");
  vm.fields.push("שם משפחה");
  vm.fields.push("טלפון");
  vm.fields.push("קישור");
  var routeid = this.getrouteid();

  for (var field in obj) {

  var myfield = obj[field];

  if (myfield.ProjectId != routeid) continue;
  vm.fields.push(myfield.FieldName);
  }
  },

  populate_dict_landing_page: function(vm) {
  for (var index in vm.project.lstalllanding) {
  var p = vm.project.lstalllanding[index];

  vm.diclandingId[p.landing_page] = p.landing_pageid;
  vm.dicIdlandings[p.landing_pageid] = p.landing_page;
  }
  },

  populate_ddl_landing_page: function(vm) {
  var vm = this;
  for (var index in vm.project.lstalllanding) {
  var p = vm.project.lstalllanding[index];

  vm.optionsddl.push({ value: p.landing_page, name: p.landing_page }); //
  }
  },

  insertSomething: function(myValue) {
  //debugger
  const self = this;
  var myField = this.$refs.smsbody;
  if (document.selection) {
  myField.focus();
  sel = document.selection.createRange();
  sel.text = myValue;
  }
  // Microsoft Edge
  else if (window.navigator.userAgent.indexOf("Edge") > -1) {
  var startPos = myField.selectionStart;
  var endPos = myField.selectionEnd;

  myField.value =
  myField.value.substring(0, startPos) +
  myValue +
  myField.value.substring(endPos, myField.value.length);

  var pos = startPos + myValue.length;
  myField.focus();
  myField.setSelectionRange(pos, pos);
  }
  //MOZILLA and others
  else if (myField.selectionStart || myField.selectionStart == "0") {
  var startPos = myField.selectionStart;
  var endPos = myField.selectionEnd;
  myField.value =
  myField.value.substring(0, startPos) +
  myValue +
  myField.value.substring(endPos, myField.value.length);
  } else {
  myField.value += myValue;
  }
  },

 

  fakeFetchData() {
  var cloned = this.fields.slice();
  console.log(cloned);
  while (cloned.length > 0) {
  let chunk = cloned.splice(0, 6);
  this.colArray.push(chunk);
  }

  console.log(this.colArray);
  }
  }
  };
</script>
