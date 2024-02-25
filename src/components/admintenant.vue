<template>
  <admint>
  
   
    <div
      class="md:container  md:mx-auto md:px-2 w-full  py-2 px-4 bg-blue-100 lg:w-4/4  mt-2"
    >
      <div class="bg-white rounded shadow p-8">
        <v-card primary-title class="justify-center">
          <v-card-title>
            <h1>ניהול לקוחות</h1>
          </v-card-title>
        </v-card>

        <div class="mt-4"></div>
        <div
          class="w-24 w-full block mt-4 p-4 rounded-lg bg-gray-100 border-2 border-indigo-300 cursor-pointer"
        >
          <div
            class="w-24 w-full block mt-4 p-4 rounded-lg  border-2 border-indigo-300 cursor-pointer"
          >
            <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="חפש"
                single-line
                hide-details
              ></v-text-field>
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
                  <td class="text-xs-right">{{ props.item.TenancyName }}</td>
                  <td class="text-xs-right">{{ props.item.Name }}</td>
                  <td class="text-xs-right">{{ props.item.SmsAPI_Username }}</td>

           

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
          <div class=" mt-4 p-4 ">
            <v-dialog v-model="dialog" persistent h-full max-width="400">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  @click="addItem()"
                  dark
                  class="mb-2"
                  v-on="on"
                >
                  הוסף לקוח
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <div class="bg-white rounded shadow py-2 mt-2">
                  <div class="flex flex-col items-center"></div>
                  <form class="px-2 pt-2" @submit.prevent="save">
                    <div class="mb-2">
                      <label
                        for="name"
                        class="block text-gray-600 text-sm font-bold mb-2"
                      >
                      שם  
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                          v-model="editedItem.Name" 
                       
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      />
                    </div>

                    <div class="mb-6">
                      <label
                        for="title"
                        class="block text-gray-600 text-sm font-bold mb-2"
                      > 
                         קוד לקוח 
                      </label>
                      <input
                        id="title"
                        type="text"
                         required
                        v-model="editedItem.TenancyName" :disabled="editedIndex > -1"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      />
                    </div>

                    
                 

                    

                    <div class="mb-6">
                      <label
                        for="title"
                        class="block text-gray-600 text-sm font-bold mb-2"
                      >
                      פולסי שם משתמש
                      </label>
                      <input
                        id="title"
                        type="text"
                        required
                                              
                        v-model="editedItem.SmsAPI_Username"
                        
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      />
                    </div>

                     <div class="mb-6" >
                      <label
                        for="title"
                        class="block text-gray-600 text-sm font-bold mb-2"
                      >
                      סיסמה
                      </label>
                      <input
                        id="title"
                        type="password"
                        required
                        v-model="editedItem.SmsAPI_Password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      />
                    </div>

                    <div class="mb-6">
                      <label
                        for="title"
                        class="block text-gray-600 text-sm font-bold mb-2"
                      >
                      API שם משתמש
                      </label>
                      <input
                        id="title"
                        type="text"
                        required
                                              
                        v-model="editedItem.TeleallAPI_Username"
                        
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      />
                    </div>

                     <div class="mb-6" >
                      <label
                        for="title"
                        class="block text-gray-600 text-sm font-bold mb-2"
                      >
                   API   סיסמה
                      </label>
                      <input
                        id="title"
                        type="password"
                        required
                        v-model="editedItem.TeleallAPI_Password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      />
                    </div>
          
                    
                    <div class="mt-8">

                     <v-btn  text @click.native="close"
                      
                        class="bg-teal-500 hover:bg-teal-600 text-white font-bold p-4 m-4 rounded shadow hover:shadow-lg"
                      >
                        בטל
                      </v-btn>
                      
                       <v-btn  type="submit"
                        class="bg-teal-500 hover:bg-teal-600 text-white font-bold p-4 rounded shadow hover:shadow-lg" 
                        text
                    >שמור</v-btn
                  >
                  
                      <div></div>
                    </div>
                  </form>
                </div>
                
              </v-card>
            </v-dialog>
          </div>
        </div>
      </div>
 <!-- @click.native="save" -->
      <FlashMessage></FlashMessage>
    </div>

  </admint>
</template>

<script>
export default {
 
  data: function() {
    return {
      search: "",
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
        { text: "קוד לקוח", value: "TenancyName" },
        { text: "שם לקוח", value: "Name" },
        { text: "שם משתמש  פלסי", value: "SmsAPI_Username" },
     
        { text: "פעולה", value: "", sortable: false }
      ],
      optionsTenant: [
          {
            value: "",
            name: ""
          }],


      users: [
        {
          Id: -1,
          TenancyName: "",
          Name: "",
          SmsAPI_Username: "",
          SmsAPI_Password:"",
           TeleallAPI_Username: "",
          TeleallAPI_Password:"",
          
        }
      ],
      editedIndex: -1,
      editedItem: {
        Id: -1,
          TenancyName: "",
          Name: "",
          SmsAPI_Username: "",
          SmsAPI_Password:"",
          TeleallAPI_Username: "",
          TeleallAPI_Password:""
      },

      defaultItem: {
        Id: -1,
         Id: -1,
          TenancyName: "",
          Name: "",
          SmsAPI_Username: "",
          SmsAPI_Password:"",
          TeleallAPI_Username: "",
          TeleallAPI_Password:""
      },
    lstAllTenants :[]
     
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "הוסף לקוח" : " לקוח ערוך";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created: function() {
    this.users = [];

    this.api.postData("api/getallTenantsInfo").then(res => {
      debugger
      this.users = res.data.items;
    
    });
  },
  methods: {

 

  addItem() {
           

    },
    setname(item) {
      return item.Name + " " + item.Surname;
    },

    editItem(item) {

        
     

      this.editedIndex = this.users.indexOf(item);
     
      this.editedItem = Object.assign({}, item);

    
      
      this.dialog = true;
    },
 


    deleteItem(item) {
      const index = this.users.indexOf(item);

      var that = this;
      this.$dialog.confirm(" ?למחוק").then(function(dialog) {
        var data = {
          removedid: item.Id
        };

        that.api.postData("api/deletetenant", data).then(res => {
          var removed = that.users.splice(index, 1);
          that.flashMessage.show({
            status: "success",
            title: " ADMIN",
            message: "בוצע בהצלחה"
          });
        });
      });
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      var that = this;
      if (this.editedIndex > -1) {
       
     // debugger

       var data = {
          TenantLisInfoDto: that.editedItem
        };

        that.api
          .postData("api/updatetenant", data)
          .then(res => {
        //   debugger

            that.users.splice(that.editedIndex, 1, that.editedItem);

            that.flashMessage.show({
              status: "success",
              title: " ADMIN",
              message: "בוצע בהצלחה"
            });
          });
      } else {
       



        var data = {
            TenantLisInfoDto:  this.editedItem
        };

        that.api.postData("api/createtenant", data).then(res => {
        // debugger
         
         that.editedItem.Id = res.data.items;

          that.flashMessage.show({
            status: "success",
            title: " ADMIN",
            message: "בוצע בהצלחה"
          });

          that.users.push(that.editedItem);
        });
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
