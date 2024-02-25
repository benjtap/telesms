<template>
<div class="bg-teal-500 h-screen font-sans">

 <div class="container mx-auto h-full flex md:flex-row flex-col  
 justify-center items-center">
 
           
<template >

       <div class="w-1/3 md:bg-indigo-100 md:w-1/2 p-8">

   <h1 class="text-teal-500  font-bold text-4xl mb-6 text-center">טלסמס</h1>

   <div class="inline-block relative w-64">
 
 <div class="mb-5 px-8 py-1">
 <select   v-model="key" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
     <option v-for="option in optionstenant" v-bind:value="option.value" >
    {{ option.text }}
  </option>
  </select>
    </div>
  <div class="mb-5 px-8 py-1">
     <button type="submit"  @click="onchangetenant" class="bg-teal-400 hover:g-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-dark hover:border-blue rounded">בחר טנט</button>
  </div>
  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
  </div>
</div>
  
  </div> 
  </template>
   
	<FlashMessage></FlashMessage>
</div>
</div>
	
</template>

<script>
import store from '../store/store';
import * as type from '../store/types';
 import { mapState, mapActions } from 'vuex';

export default {
  data () {
    return {
        key: "",
        multitenant: false,
         email : "",
         password : "",
         optionstenant:[],
         dicdata:[],
         users:[],
         mydictenant:[]

    }
  },

  created() {




 var users=  localStorage.getItem('users')
     var objusers = JSON.parse(users)

     if (objusers==null) 
     return ;


var that =this
  for (var p in objusers){

    var pindex = objusers[p]

      that.optionstenant.push({
                          text:  pindex.tenantname,
                          value:  pindex.tenantid
                        })
  }

  
                    
  },
  methods: {

  ...mapActions([
  'setCurrentView'
  ]),
    	onchangetenant: function() {
          
         var myval = this.key
        
var users=  localStorage.getItem('users')
     var objusers = JSON.parse(users)

     if (objusers==null) 
     return ;


var that =this
 var pindex
  for (var p in objusers){

     pindex = objusers[p]

     if  (pindex.tenantid==myval)
        break
  }



        var data ={
                 "userid":pindex.userid,
                  "username":pindex.username,
                  "tenantid":pindex.tenantid,
                  "is_admin":pindex.is_admin,
                  "roleid":pindex.roleid
           }
             this.api.postData ('api/Logintenant',data)
                    .then(response => {

                      localStorage.setItem('user',JSON.stringify(response.data.user))
                      localStorage.setItem('jwt',response.data.AccessToken)
                        this.$router.push('projects')
                           //this.setCurrentView('monitorsubmission')
                      var objCurrentView = {
                        page:"projects",
                          view:"projects"
                  }
                  this.setCurrentView(objCurrentView)
                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
    
    },
       
   
  }


}
</script>