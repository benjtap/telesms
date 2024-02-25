<template>

<div class="flex flex-row flex-wrap">
    <div class="w-1/5 p-2"></div>

    <div class="w-3/5 bg-white  shadow p-8">
  
     
      <v-card primary-title class="justify-center" >
             
            <v-card-title>
    <h1>     קובץ נמענים הפצה</h1> 
            </v-card-title>
</v-card>
         <div      class="block bg-gray-100 "
        >

       

           <div
          class="border-t w-full h-16 flex flex-row justify-start items-center px-4"
        >
          <div class="flex flex-row">

             <button @click="GetProjectfiledestdownload"
              class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow"
                        >
              הורדת תבנית קובץ נמענים
            </button>
            </div>
        </div>

            <div
          class="border-t w-full h-16 flex flex-row justify-start items-center px-4"
        >
          <div class="flex flex-row">
                <input type='file' ref="file"  class="hidden" @input="handleInput"  />
             <button @click="submitfile" type="submit" 
              class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow  border-2 border-indigo-300 cursor-pointer"
                        >
             טען קובץ נמענים
            </button>
            </div>
        </div>

        <FlashMessage></FlashMessage>

</div>

</div>

 
 </div>
</div>
   
</template>
<script>
   import store from '../store/store'; 
  import { mapState, mapActions } from "vuex";
  // import axiosApi from 'axios'
  export default {


  data: function() {
  return {

  file: ''
  };
  },
  created() {

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
  handleInput() {

  let file =this.$refs.file.files[0];

  let fData = new FormData();
  var routeid = this.getrouteid();



  if (routeid < 0) 
        return;
     
   fData.append('file', file);
  fData.append('projectsubid',routeid);
  
        this.api.postData('api/fileupload',fData).then((res) => {

         
     const input = this.$refs.file
    input.type = 'text'
    input.type = 'file'
           if (res.data.success == false) {
                  this.flashMessage.show({status: 'error', title: 'UPLOAD MESSAGE', message: "קרה שגיאה"})
                  return;
                } 

                else if(res.data.result.ValidationErrors.length >0)
                {
              var err=    res.data.result.ValidationErrors.join();
               this.flashMessage.show({status: 'error', title: 'UPLOAD MESSAGE', message: err})
                  return;
                }
           var message=""
    if (res.data.result.SuccessCount>0  && res.data.result.ErrorsCount==0)
            
                  message=" שהועלו ס''הכ שורות " + res.data.result.SuccessCount
                
                else 
               
                  message=" שהועלו ס''הכ שורות " + res.data.result.SuccessCount + "   בשגיאה ס''הכ שורות  " + res.data.result.ErrorsCount
             
           store.dispatch('flagstatusimport',1)
           
         this.flashMessage.show({status: 'success', title: 'UPLOAD MESSAGE', message: message})
                

              

              }, (err) => {
       console.log(err)
     })


   },

   submitfile() {
    
      this.$refs.file.click()
   },
   
   GetProjectfiledestdownload() {


    var routeid = this.getrouteid();

        if (routeid < 0) 
        return;
        var data = {
        projectsubid: routeid
      };


        var responseType={
             responseType: 'blob'
         }
            this.api.postDatablob('api/GetProjectfiledestdownload',data,responseType).then((res) => {
            
            var fileURL = window.URL.createObjectURL(new Blob([res.data]));
            
            
              var fileLink = document.createElement('a');

     fileLink.href = fileURL;

     fileLink.setAttribute('download',  "template.xlsx");

     document.body.appendChild(fileLink);

   

     fileLink.click();
               
            }, (err) => {
        console.log(err)
      })

    }
    }
  }
</script>
