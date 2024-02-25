<template>


        <div class="flex flex-row flex-wrap">

 <div class="w-1/5 p-2"></div>
    <div class="w-3/5 bg-white  shadow p-8">
  
     
      <v-card primary-title class="justify-center" >
             
            <v-card-title>
    <h1>     פרטי הפצה</h1> 
            </v-card-title>
</v-card>
      <div  class="block mt-4 p-8  bg-gray-100 ">
      <span
        class="block  rounded-lg bg-gray-100 "
        ><form @submit.prevent="submitForm">
          <div class="layout justify-center">
            <div class="v-card__actions">
              <div class="my-1">
                <button
                  type="submit"
                  class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow"
                >
                  <span class="v-btn__content"> שמור </span>
                </button>
              </div>
            </div>
          </div>
         <!-- <div class="block mt-4 p-4  bg-gray-100 "> -->
            <!-- <div class="md:w-2/3 px-3 mb-2 md:mb-0"> -->
            <div class="-mx-3 md:flex mb-1">
              <!-- <div class="-mx-3 md:flex mb-1"> -->
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
              >
                שם הפצה
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
           <!-- </div> -->
           <div v-if="isdefaultparameters">
          <div class="-mx-3 md:flex mb-1">

            <div class="text-xs-center">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
              >
               תאריך התחלה
              </label>
              <div class="-mx-3 px-3 md:flex mb-6">
                <div class="w-full px-3 mb-6">
                  <div
                    class="block rounded-t overflow-hidden bg-white text-center w-24"
                  >
                    <div class="bg-teal-500 text-white py-1">
                      {{MinSendDatestr.month}} 
                    </div>
                    <div class="pt-1 border-l border-r">
                      <span class="text-4xl font-bold">{{MinSendDatestr.day}}</span>
                    </div>
                    <div
                      class="pb-2 px-2 border-l border-r border-b rounded-b flex justify-between"
                    >
                      <span class="text-xs font-bold"> {{MinSendDatestr.dayofweek}} </span>
                      <span class="text-xs font-bold">{{MinSendDatestr.year}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-xs-center md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
              >
                תאריך סופי
              </label>
              <div class="-mx-3 md:flex mb-1">
                <div class="w-full px-3 mb-1">
                  <div
                    class="block rounded-t overflow-hidden bg-white text-center w-24"
                  >
                    <div class="bg-teal-500 text-white py-1">
                     {{MaxSendDatestr.month}}  
                    </div>
                    <div class="pt-1 border-l border-r">
                      <span class="text-4xl font-bold">{{MaxSendDatestr.day}}</span>
                    </div>
                    <div
                      class="pb-2 px-2 border-l border-r border-b rounded-b flex justify-between"
                    >
                      <span class="text-xs font-bold">{{MaxSendDatestr.dayofweek}}</span>
                      <span class="text-xs font-bold">{{MaxSendDatestr.year}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div class="-mx-3 md:flex mb-1">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
              >
                כמות SMS מקסימלית בכל 10 דקות
              </label>

              <select
                v-model="formdata.MaxSmsInPeriod" required
                class="w-full block appearance-none bg-white border border-gray-500 rounded text-gray-800 py-1 px-4 pr-8"
              >
                <option selected disabled hidden value=""></option>
                <template v-for="option in optionsMaxSmsInPeriod">
                  <option :value="option.value" class="my-2 text-lg">{{
                    option.name
                  }}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="-mx-3 md:flex mb-1">
            <div class="md:w-1/2 px-3 mb-2 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
              >
                שם/מספר השולח
              </label>
              <input
                class="bg-gray-400   block bg-grey-lighter text-grey-darker 
             rounded py-2 px-2"
                id="grid-first-name"
                type="text"
                required
                 v-model="formdata.SenderName"
              />
              <p class="text-red text-xs italic"> לא יותר מ11 תווים - לא להכניס עברית</p>
            </div>
          </div>
          <div class="-mx-3 md:flex mb-6">
            <div class="w-1/2 px-3">
              <input
                class="mr-2 leading-tight"
                v-model="formdata.IsTest"
                type="checkbox"
              />
              <span class="text-sm">
                הפצה זו מיועדת לבדיקה
              </span>
            </div>

            <div class="w-1/2  px-3">
              <input
                class="mr-2 leading-tight"
                v-model="formdata.IsContinuous"
                type="checkbox"
              />
              <span class="text-sm">
                הפצה מתמשכת
              </span>
            </div>
          </div>

          <div class="-mx-3 md:flex mb-2">
            <div class="w-3/5 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-city"
              >
                גוף ההודעה
              </label>
              <textarea style="min-width: 43vh;"
                ref="smsbody"
                v-model="formdata.SmsBody"
                rows="7"
                class="bg-gray-400   block w-full bg-grey-lighter text-grey-darker 
             rounded py-3 px-4 form-group-smsbody leading-tight"
                name="SmsBody"
                id="SmsBody"
                type="text"
              
                placeholder=""
              />
            </div>
            <div class="w-2/5 px-3 m-6 ">
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
        </form>
      </span>
    </div>
     </div>
    <!-- </div> -->
    <FlashMessage></FlashMessage>
  </div>
</template>
<script>
import store from '../store/store';
  import { mapState, mapActions } from "vuex";
  export default {

 props: ['data'],
  data: function() {
  return {
  SmsBodyProject  :"",
  projectid :-1, 
  fields: [],
  colArray: [],
  formdata: {
  Id: -1,
  Name: "",
  SenderName: "",
  TenantId: -1,
  MaxSmsInPeriod: "",
  IsContinuous: false,
  IsTest: false,
  CreatorUserName: "",
  SmsBody: "",
  ProjectId: -1,
  ProjectsubId: -1
  },
  selectedlanding: -1,
  optionsMaxSmsInPeriod: [],
  diclandingId: {},
  dicIdlandings: {},
  MinSendDatestr :{},
  MaxSendDatestr:{},
  project: {},
  LandId: -1
  };
  },
   created() {

 
  var vm = this;
  var routeid = this.getrouteid();
  if (routeid > 0) {
  var data = {
  projectsubid: routeid
  };

  this.api.postData("/api/GetProjectsub", data).then(res => {
  vm.formdata = res.data.items.results1;
  vm.project = res.data.items.results2;

  try {

  var arrMinSendDatestr = res.data.items.results1.MinSendDatestr.split(';')
  var arrMaxSendDatestr = res.data.items.results1.MaxSendDatestr.split(';')



  vm.MinSendDatestr.month = arrMinSendDatestr[0]
  vm.MinSendDatestr.day = arrMinSendDatestr[1]
  vm.MinSendDatestr.year = arrMinSendDatestr[2]
  vm.MinSendDatestr.dayofweek = arrMinSendDatestr[3]

  vm.MaxSendDatestr.month = arrMaxSendDatestr[0]
  vm.MaxSendDatestr.day = arrMaxSendDatestr[1]
  vm.MaxSendDatestr.year = arrMaxSendDatestr[2]
  vm.MaxSendDatestr.dayofweek = arrMaxSendDatestr[3]
  }
  catch(err) {
  alert(err)
  }



  this.populate_fieldsProj(vm, vm.project.ProjectFields);

  this.fakeFetchData();
    this.populateoptionPeriod()
  });
  }
  else
  {


  this.projectid =this.$store.state.firstresourceId
  var data = {
  projectid:  this.projectid
   };

   this.api.postData("/api/GetProjectcreatesub", data).then(res => {
     vm.project = res.data.items.results2;

  this.populate_fieldsProj(vm, vm.project.ProjectFields);

  this.fakeFetchData();
    this.populateoptionPeriod()

     });
  }
  },

  computed: {

...mapState({
    secresourceId: state => state.secresourceId
  }),
  isdefaultparameters() {
  var routeid = this.getrouteid();
  return routeid === -1 ? false : true;
  }
  },

  methods: {
  ...mapActions(["setCurrentView", "setResourceName","setsecResourceName",""]),
  submitForm() {
    
    var that =this
    var routeid = this.getrouteid();
    this.formdata.SmsBody= this.$refs.smsbody.value;
    this.formdata.ProjectId=this.projectid
    this.formdata.ProjectsubId=routeid
  var routeid = this.getrouteid();

  var projid=this.projectid
  if (routeid > 0) {
  this.api.postData("api/updateprojectsub", this.formdata).then(res => {
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

 that.$emit('update-sub', data)


  this.setsecResourceName(this.formdata.Name);

  return;
  });
  } else {
   

if ((this.project.SmsBodyProject==null) && (this.formdata.SmsBody=="")){
this.flashMessage.show({status: 'error', title: ' MESSAGE', message: 'אנא הכנס תוכן'})
  return;
}

if(this.formdata.ProjectId==-1){

   var firstresourceId=this.$store.state.firstresourceId
 this.formdata.ProjectId=firstresourceId
}
  
 

  this.api.postData("api/createsubproject", this.formdata).then(res => {

    
  this.flashMessage.show({status: 'success', title: ' MESSAGE', message: 'בוצע בהצלחה'})
  
var data ={
   id:res.data.items.Item1,
   name:this.formdata.Name
}

 that.$emit('insert-sub', data)

  var routeid =this.crypto.encrypt(res.data.items.Item1)
try {
   store.dispatch('toprojsubadd',res.data.items.Item1)
   store.dispatch('toprojadd',projid)

} catch (error) {
  
}
 
  this.$router.push({
  name: "projectsubhome",
  params: { id: routeid }
  });
  var location = this.$route.fullPath;

  this.$router.replace("/");

  this.formdata.SmsBody=res.data.items.Item2

  this.$nextTick(() => this.$router.replace(location));

  this.setsecResourceName(this.formdata.Name);

  
  });
  }
  },


  getrouteid: function() {
  var routeid = this.$route.params.id;


  routeid=  parseInt(this.crypto.decrypt(routeid), 10);

  return routeid

  },
  populate_fieldsProj: function(vm, obj) {
  vm.fields.push("שם פרטי");
  vm.fields.push("שם משפחה");
  vm.fields.push("טלפון");
  vm.fields.push("קישור");


  for (var field in obj) {
 
  var myfield = obj[field];


  vm.fields.push(myfield.FieldName);
  }
  },

  populateoptionPeriod : function(){
     var vm = this;
  vm.optionsMaxSmsInPeriod.push({
  name: "1",
  value: 1
  });

  vm.optionsMaxSmsInPeriod.push({
  name: "5",
  value: 5
  });
  vm.optionsMaxSmsInPeriod.push({
  name: "10",
  value: 10
  });

  vm.optionsMaxSmsInPeriod.push({
  name: "25",
  value: 25
  });

  vm.optionsMaxSmsInPeriod.push({
  name: "50",
  value: 50
  });
  vm.optionsMaxSmsInPeriod.push({
  name: "100",
  value: 100
  });
  vm.optionsMaxSmsInPeriod.push({
  name: "200",
  value: 200
  });
  vm.optionsMaxSmsInPeriod.push({
  name: "300",
  value: 300
  });
  vm.optionsMaxSmsInPeriod.push({
  name: "400",
  value: 400
  });
  vm.optionsMaxSmsInPeriod.push({
  name: "500",
  value: 500
  });
  vm.optionsMaxSmsInPeriod.push({
  name: "750",
  value: 750
  });
  vm.optionsMaxSmsInPeriod.push({
  name: "1000",
  value: 1000
  });
  vm.optionsMaxSmsInPeriod.push({
  name: "בלי הגבלה",
  value: 0
  });

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
