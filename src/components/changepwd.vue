<template>
  
  <changepd    
    class="flex flex-row flex-wrap m-4"
  >
    <div class="w-1/5 p-2"></div>

    <div class="w-3/5 bg-white rounded shadow p-8">
      <div class="text-xl">
    שינוי סיסמה
      </div>
      <div class="mt-4"></div>
      <span
        class="block mt-4 p-4 rounded-lg bg-gray-100 border-2 border-indigo-300 cursor-pointer"
        ><form @submit.prevent="submitForm">
          <div class="layout justify-center">
            <div class="v-card__actions">
              <div class="m-4">
                <button
                  type="submit"
                  class="v-btn v-btn--contained theme--light v-size--default bg-blue-200"
                >
                  <span class="v-btn__content"> שמור </span>
                </button>
              </div>
              <div class="m-4">
                <button
                  type="button"
                  class="v-btn v-btn--contained theme--light v-size--default bg-blue-200"
               @click="cancel" >
                  <span class="v-btn__content"> בטל </span>
                </button>
              </div>
            </div>
          </div>
          <div class="-mx-3 md:flex mb-1">
            <div class="md:w-1/2 px-3 mb-2 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
              >
                שם משתמש
              </label>
              <input
                class="bg-gray-400   block w-full bg-grey-lighter text-grey-darker 
             rounded py-2 px-2"
                id="grid-first-name"
                type="text"
                readonly
                v-model="myusername"
               
              />
              <p class="text-red text-xs italic"></p>
            </div>
          </div>
        
           <div class="-mx-3 md:flex mb-1">
            <div class="md:w-1/2 px-3 mb-2 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
              >
                הזן סיסמה חדש
              </label>
              <input
                class="bg-gray-400   block w-full bg-grey-lighter text-grey-darker 
             rounded py-2 px-2"
                id="grid-first-name"
                type="password"
                required
                v-model="formdata.pwd"
              />
              <p class="text-red text-xs italic"></p>
            </div>
          </div>
           
              <div class="-mx-3 md:flex mb-1">
            <div class="md:w-1/2 px-3 mb-2 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-first-name"
              >
                אשר סיסמה חדש
              </label>
              <input
                class="bg-gray-400   block w-full bg-grey-lighter text-grey-darker 
             rounded py-2 px-2"
                id="grid-first-name"
                type="password"
                required
                v-model="formdata.repwd"
              />
              <p class="text-red text-xs italic"></p>
            </div>
          </div>
           

          
          
        </form>
      </span>
    </div>
    <FlashMessage></FlashMessage>
  </changepd>
</template>
<script>
  import { mapState, mapActions } from "vuex";
  export default {
 
  data: function() {
  return {
  myusername :"",
  myuserid :-1,
  formdata: {
   },
  
  };
  },
  mounted() {
  //debugger;
 var user=  localStorage.getItem('user')
            var obj = JSON.parse(user)

            if (obj.length >0){
        this.myusername= obj[0].m_Item4;
        this.myuserid= obj[0].m_Item3;
            }
           
             else{
        this.myusername= obj.m_Item4;
    this.myuserid= obj.m_Item3;
             }
             
  },


  methods: {

    ...mapActions([
  'setCurrentView'
  ]),
  cancel() {
this.$router.push('projects')
var objCurrentView = {
    page:"projects",
    view:"projects"
}
 this.setCurrentView(objCurrentView)
  },

 submitForm() {

this.formdata.id =  this.myuserid


if (this.formdata.pwd != this.formdata.repwd) {
        this.flashMessage.show({
          status: "error",
          title: " REPORT",
          message: "אנא אשר סיסמה שוב"
        });

        return;
      }
 
  var that=this
  this.api.postData("api/changepwd", this.formdata).then(res => {
  this.flashMessage.show({
  status: "success",
  title: "שינוי סיסמה",
  message: "בוצע בהצלחה "
  });
that.$router.push('monitorsubmission')
   // this.setCurrentView('monitorsubmission')
   var objCurrentView = {
      page:"monitorsubmission",
       view:"monitorsubmission"
}
 this.setCurrentView(objCurrentView)
  });
  
  },

  }
  };
</script>
