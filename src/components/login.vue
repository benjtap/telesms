<template>
<div class="bg-teal-500 h-screen font-sans">

 <div class="container mx-auto h-full flex md:flex-row flex-col  
 justify-center items-center">
 
           
<template v-if="multitenant==true">

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
   <template v-if="multitenant==false">
       <div class="w-1/3 md:bg-indigo-100 md:w-1/2 p-8">

   <h1 class="text-teal-500  font-bold text-4xl mb-6 text-center">טלסמס</h1>
    <form>
    
      <p class="py-4">
        <input id="email" aria-label="email" v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800" type="text" name="email" placeholder="שם משתמש"  autofocus>
        <span class="text-red-400 block pt-2" ></span>
      </p>
      <p class="py-4">
        <input id="password" aria-label="password"  v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800" type="password" name="password" placeholder="סיסמה">
      </p>
     
      <p class="py-4">
        <button type="submit" @click="handleSubmit"
         class="bg-teal-500 hover:bg-teal-600 text-white text-xl font-medium py-2 px-4 rounded">כניסה</button>
      </p>
      
    </form>
    
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
         users:[]

    }
  },
  methods: {

  ...mapActions([
  'setCurrentView'
  ]),
    	onchangetenant: function() {

        debugger
          
         var myval = this.key

         if (myval==""){

              this.flashMessage.show({status: 'error', title: 'LOGIN MESSAGE', message: "אנא בחר לקוח"})
                  return;
         }
        var mySplits = myval.split("^^:^^"); 

        var data ={
                 "userid":mySplits[0],
                  "username":mySplits[1],
                  "tenantid":mySplits[4],
                  "is_admin":mySplits[2],
                  "roleid":mySplits[3]
           }
             this.api.postData ('api/Logintenant',data)
                    .then(response => {

                      localStorage.setItem('user',JSON.stringify(response.data.user))
                      localStorage.setItem('jwt',response.data.AccessToken)
                        this.$router.push('projects')
                     
                        let dic_local = [];
                        dic_local["projects"] = "projects"

                       var append = Object.assign({}, dic_local,this.$store.state.currentView.view)
                        var objCurrentView = {
                            page: "projects",
                            view: append
                        }
                            this.setCurrentView(objCurrentView)

                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
    
    },
       
    handleSubmit(e){
              localStorage.clear();
                e.preventDefault()
                if (this.password.length > 0 && this.email.length  > 0) {

                  var data ={
                        user: this.email,
                        password: this.password
                    }
                    this.api.postData ('api/login',data)
                    .then(response => {

                    //debugger;
               if (response.error == true) {
                   this.flashMessage.show({status: 'error', title: 'LOGIN MESSAGE', message: result.message})
                  return;
                } 
               if (response.data.is_authenticate==false){
                  this.flashMessage.show({status: 'error', title: 'LOGIN MESSAGE', message: 'יוזר או סיסמה לא נכונים'})
                    return;
                }

              
                    if (response.data.AccessToken == null){
                  this.flashMessage.show({status: 'error', title: 'LOGIN MESSAGE', message: 'טוקן רק '})
                    return;
                      }
                        if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                              return;
                           }
                          
                        store.dispatch({
                        type: type.Tologin
                        // log: false
                         })
                      
                  
                  

                     //
                
               if (response.data.user.length >1){
               
                // 
                 localStorage.setItem('jwt',response.data.AccessToken)
                     this.multitenant =true

                  var that = this 
                    that.optionstenant=[]
               that.users=[]

                  for(var index in response.data.user){
                      var pindex =  response.data.user[index]

                       var data ={
                           "username":response.data.username ,  
                             "userid":pindex.m_Item3,
                               "tenantname":pindex.m_Item4,
                               "tenantid":pindex.m_Item1,
                               "is_admin":pindex.m_Item2,
                               "roleid":pindex.m_Item5
                     }

                      that.users.push(data)

                var myvalue =pindex.m_Item3+"^^:^^"+ this.email+"^^:^^"+pindex.m_Item2+"^^:^^"+pindex.m_Item5+"^^:^^"+pindex.m_Item1
                    
                  var obj = {
                          text: pindex.m_Item4,
                          value: myvalue
                        }
 

                 if( that.optionstenant.includes(obj) ==false){

 that.optionstenant.push(obj)
                    
                    var uid = pindex.m_Item3

                    

                    var pitem = {
                               "username":response.data.username ,  
                               "userid":pindex.m_Item3,
                               "tenantname":pindex.m_Item4,
                               "tenantid":pindex.m_Item1,
                               "is_admin":pindex.m_Item2,
                               "roleid":pindex.m_Item5
         
                        }
                  
                    that.dicdata[uid] =pitem

                   
                 }
                  
                 
              
                      }

                     localStorage.setItem('users',JSON.stringify(that.users))
                   }
                   else
                   {
                     localStorage.setItem('user',JSON.stringify(response.data.user))
                      localStorage.setItem('jwt',response.data.AccessToken)
                   this.$router.push('projects')
                   let dic_local = [];
                   dic_local["projects"] = "projects"

                  var append = Object.assign({}, dic_local,this.$store.state.currentView.view)
                   var objCurrentView = {
                       page: "projects",
                       view: append
                   }


                   this.setCurrentView(objCurrentView)
                   }

                    })
                    .catch(function (error) {
                      
                    });
                }
            }
  }


}
</script>