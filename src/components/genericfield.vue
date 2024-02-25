<template>

<form @submit.prevent="submitForm">

   <main class="flex flex-row flex-wrap">
    
    <div class="w-1/5 "></div>

    
    <div class="w-3/5 bg-white rounded shadow">
      <v-card primary-title class="justify-center" >
             
            <v-card-title>
    <h1>  הדגרות שדות לפרויקט</h1> 
            </v-card-title>
</v-card>


      <div class="mt-4"></div>
      <div
        class="w-24 w-full block mt-4 p-4 "
      >
   
            <div class="w-24 w-full block mt-4 p-4">
            <v-card-title>
            <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="חפש" 
        single-line hide-details></v-text-field>
      </v-card-title>
               <v-data-table 
                :headers="headers"
                :items="users"
              :pagination.sync="pagination" 
                :search="search"
                class="w-24 min-w-full"
              >
         
          <template v-slot:item="props">
                <tr>
                  <td>{{ props.item.Id }}</td>
                  <td class="text-xs-right">{{ props.item.FieldName }}</td>
                  <td class="text-xs-right">{{  props.item.FieldNameInRecipientsTable }}</td>
               
                  <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click="editItem(props.item)">
                      <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                      <v-icon color="pink">delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
               
              </template>
              
            </v-data-table>
           
            </div>
            <div  class=" mt-4 p-4 ">

        <v-dialog v-model="dialog" persistent max-width="400">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary"  @click="addItem()" dark class="mb-2" v-on="on">
                    הוסף שדה
                  </v-btn>
                </template>
       <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                       
                        <v-flex xs12 sm6 md6>
                          <v-text-field    required
                            v-model="editedItem.FieldName"
                            label="שם באקסל נמענים"
                          ></v-text-field>
                        </v-flex>
                       
                     <v-flex xs12 sm8 md6>
                         <div class="text-xs-center my-1 py-1">
               שם בדו''ח
                 <div class="bg-gray-100 h-4">
                    
                 <select v-model="editedItem.FieldNameInRecipientsTable"
                          class="w-full block bg-gray-200 rounded text-gray-800" >
    <option v-for="item in optionsFields" :value="item.value"  :key="item.value">
      {{ item.name }}
    </option>
  </select> 
                       
</div></div>
                        </v-flex>
                         
                      
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click.native="close"
                      >בטל</v-btn
                    >
                    <v-btn color="blue darken-1" text @click.native="save"
                      >שמור</v-btn
                    >
                  </v-card-actions>
                </v-card>
    </v-dialog>
            </div>
           
   
      </div>

    </div>
  
   <FlashMessage></FlashMessage> 
  
  </main>
  </form>
</template>

 
<script>
export default {
  data: function() {
    return {
       search: '',
      clipped: true,
      drawer: true,
      fixed: false,
      items: [{ icon: "bubble_chart", title: "Inspire" }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "",
      dialog: false,
      headers: [
        {
          text: "מס''ד",  
          align: "center",
          value: "Id"
        },
        { text: "שם באקסל נמענים", value: "" },
        { text: "שם בדו''ח", value: "" },
       
        { text: "פעולה", value: "name", sortable: false }
      ],
      users: [{
        Id: -1,
        FieldName: "",
        FieldNameInRecipientsTable: "",
        
      }],
      editedIndex: -1,
      editedItem: {
        Id: -1,
        FieldName: "",
        FieldNameInRecipientsTable: "",
      
      },
    
      defaultItem: {
       Id: -1,
        FieldName: "",
        FieldNameInRecipientsTable: "",
      },
       optionsFields: [
          {
            value: "",
            name: ""
          }]
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "הוסף שדה" : "ערוך";
    },
  
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created: function() {
        this.users=[]

         var routeid = this.getrouteid();
    if (routeid < 0)
    return ;
      var data = {
        projectsubid: routeid
      };
       
      this.api.postData('api/GetProjectfields',data).then((res) => {
              //  debugger;
                  this.users =res.data.result
       })
      
  },
  methods: {
     getrouteid: function() {

  var routeid = this.$route.params.id;
 
   if (routeid == undefined)
   return;
  
    routeid=  parseInt(this.crypto.decrypt(routeid), 10);
    
    return routeid

  },
   getstatus(item) {
        if (item.category==3)
            return  ' מנהל' ;
            else if   (item.category==2)
            return  ' חשב' ;
             else if   (item.category==1)
            return  ' טלפוני' ;
    }, 
    populatefield(item) {

      item = item || null;
this.optionsFields = []
   var vm =this
       var arrGeneric = ["GenericInfo1", "GenericInfo2",
        "GenericInfo3", "GenericInfo4", "GenericInfo5",
        "GenericInfo6", "GenericInfo7", "GenericInfo8", 
        "GenericInfo9"]
      var idx;
 
           
                for (var i in  vm.users) {
                  var pindex = vm.users[i]
                 
                 if (item == null){
                     if (arrGeneric.includes( pindex.FieldNameInRecipientsTable)){
  
                   idx = arrGeneric.indexOf(pindex.FieldNameInRecipientsTable);
                    
                  arrGeneric.splice(idx, 1);

                 }
                 }
                 else
                 {
                 if (arrGeneric.includes( pindex.FieldNameInRecipientsTable) 
                 && pindex.FieldNameInRecipientsTable != item.FieldNameInRecipientsTable){
  
                   idx = arrGeneric.indexOf(pindex.FieldNameInRecipientsTable);
                    
                  arrGeneric.splice(idx, 1);
                 }
                }
                    
         }


                for (var index in arrGeneric) {
                    var p = arrGeneric[index]
                    vm.optionsFields.push({ 'value': p, 'name': p })  //
                }


    
    },

    addItem() {
            this.populatefield()

    },

    editItem(item) {
       
     this.populatefield(item)
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    
  deleteItem(item) {
    const index = this.users.indexOf(item);
   
var that =this
 this.$dialog
  .confirm(' ?למחוק')
  .then(function(dialog) {

  

     var data = {
        removedid : item.Id
     }

   
      
    that.api.postData('api/deleteProjectfields',data).then((res) => {
      var removed =   that.users.splice(index,1);
     that.flashMessage.show({status: 'success', title: ' ADMIN', message: 'בוצע בהצלחה'})
    })
  })
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      var that =this
      if (this.editedIndex > -1) {
        

         var data = {
         editedItem : this.editedItem
           }

       
        that.api.postData('api/updateProjectfields', this.editedItem).then((res) => {
      
   // debugger

       that.users.splice(this.editedIndex, 1, this.editedItem);

     that.flashMessage.show({status: 'success', title: ' ADMIN', message: 'בוצע בהצלחה'})

     
    })
       
      } else {

       
        var routeid = this.getrouteid();
        if (routeid < 0)
        return ;

     var data = {
       projectsubid: routeid,
       editedItem : this.editedItem
     }

         that.api.postData('api/addProjectfields',data).then((res) => {

           that.editedItem.Id = res.data.result
      
         that.flashMessage.show({status: 'success', title: ' ADMIN', message: 'בוצע בהצלחה'})

        that.users.push(that.editedItem);
    })
        
      }
      this.close();
    }
  }
};
</script>

<style>
.v-dialog__container {
    display: unset; 
}
</style>
