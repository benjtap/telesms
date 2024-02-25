<template>
  <adminuser>
  
   
    <div
      class="md:container  md:mx-auto md:px-2 w-full  py-2 px-4 bg-blue-100 lg:w-4/4  mt-2"
    >
      <div class="bg-white rounded shadow p-8">
        <v-card primary-title class="justify-center">
          <v-card-title>
            <h1>ניהול משתמשים</h1>
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
                  <td class="text-xs-right">{{ props.item.Tenantname }}</td>
                  <td class="text-xs-right">{{ props.item.UserName }}</td>
                  <td class="text-xs-right">{{ props.item.EmailAddress }}</td>

                  <td class="text-xs-right">{{ setname(props.item) }}</td>

                  <td class="justify-center layout px-0">
                    <v-btn icon class="mx-0" @click="editItem(props.item)">
                      <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                      <v-icon color="pink">delete</v-icon>
                    </v-btn>
                    <v-btn text class="my-3" @click="resetpwd(props.item)">
                     
                       סיסמה אפס
                     
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
                  הוסף משתמש
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
                      שם משפחה 
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        v-model="editedItem.Surname"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      />
                    </div>

                    <div class="mb-6">
                      <label
                        for="title"
                        class="block text-gray-600 text-sm font-bold mb-2"
                      >
                         שם פרטי 
                      </label>
                      <input
                        id="title"
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
                        אימייל
                      </label>
                      <input
                        id="title"
                        type="text"
                        style="direction:ltr"
                         required
                          v-model="editedItem.EmailAddress"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      />
                    </div>

                    <div class="mb-6">
                      <label
                        for="timezone"
                        class="block text-gray-600 text-sm font-bold mb-2"
                      >
                        לקוח
                      </label>
                       <div class="text-xs-center my-1 py-1" >
                        <select  required
                          id="weekstart"   v-model="editedItem.TenantId" :disabled="editedIndex > -1"
                          class="shadow appearance-none border rounded w-full px-3 py-2 text-gray-700 bg-gray-200">
                        
                        <option v-for="item in optionsTenant" :value="item.value"  :key="item.value">
                        {{ item.name }}
                      </option>
                       </select>
                        
                        <div  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            class="fill-current h-4 w-4"
                          >
                            <path
                              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div class="mb-6">
                      <label
                        for="title"
                        class="block text-gray-600 text-sm font-bold mb-2"
                      >
                       שם משתמש
                      </label>
                      <input
                        id="title"
                        type="text"
                        required
                         :disabled="editedIndex > -1"
                        
                        v-model="editedItem.UserName"
                        
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      />
                    </div>

                     <div class="mb-6" v-if="editedIndex == -1">
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
                        v-model="editedItem.pwd"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      />
                    </div>
          <div class="mb-6">
                     <input
                class="mr-2 leading-tight"
             v-model="editedItem.is_admin"
                type="checkbox"
              />
              <span class="text-sm">
               מנהל
              </span>
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

  </adminuser>
</template>

<script>
export default {
  props: {
    activeTab: {
      required: true,
      type: String
    }
  },
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
        { text: "שם לקוח", value: "Name" },
        { text: "שם יוזר", value: "UserName" },
        { text: "אימייל", value: "EmailAddress" },
        { text: "שם", value: "Surname" },
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
          Tenantname: "",
          UserName: "",
          EmailAddress: "",
          Name: "",
          Surname: "",
          TenantId:-1,
           is_admin:0
        }
      ],
      editedIndex: -1,
      editedItem: {
        Id: -1,
        Tenantname: "",
        UserName: "",
        EmailAddress: "",
        Name: "",
        Surname: "",
        TenantId:-1,
         is_admin:0,
         pwd:""
      },

      defaultItem: {
        Id: -1,
        Tenantname: "",
        UserName: "",
        EmailAddress: "",
        Name: "",
        Surname: "",
        TenantId:-1,
        is_admin:0, 
        pwd:""
      },
    lstAllTenants :[]
     
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "הוסף משתמש" : " משתמש ערוך";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created: function() {
    this.users = [];

    this.api.postData("api/getallUsersInfo").then(res => {
    //  debugger
      this.users = res.data.items.items;
      this.lstAllTenants = res.data.items.lstAllTenants;
    });
  },
  methods: {

 populateTenant(item) {

      item = item || null;
      this.optionsTenant = []
        var vm =this
    
             for (var index in vm.lstAllTenants) {
                    var p =  vm.lstAllTenants[index]
                    vm.optionsTenant.push({ 'value': p.Id, 'name': p.Name })  //
                }


    
    },

  addItem() {
            this.populateTenant()

    },
    setname(item) {
      return item.Name + " " + item.Surname;
    },

    editItem(item) {

         this.populateTenant();
     

      this.editedIndex = this.users.indexOf(item);
     
      this.editedItem = Object.assign({}, item);

    
      
      this.dialog = true;
    },
  resetpwd(item) {
      const index = this.users.indexOf(item);

      var that = this;
      this.$dialog.confirm(" ?לאפס סיסמה").then(function(dialog) {
        var data = {
          removedid: item.Id,
         
        };

        that.api.postData("api/resetpwd", data).then(res => {
         
          that.flashMessage.show({
            status: "success",
            title: " ADMIN",
            message: "בוצע בהצלחה"
          });
        });
      });
    },


    deleteItem(item) {
      const index = this.users.indexOf(item);

      var that = this;
      this.$dialog.confirm(" ?למחוק").then(function(dialog) {
        var data = {
          removedid: item.Id
        };

        that.api.postData("api/deleteuser", data).then(res => {
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
       
      

       var data = {
          updateuser: that.editedItem
        };

        that.api
          .postData("api/updatuser", data)
          .then(res => {
         //  debugger

            that.users.splice(that.editedIndex, 1, that.editedItem);

            that.flashMessage.show({
              status: "success",
              title: " ADMIN",
              message: "בוצע בהצלחה"
            });
          });
      } else {
       


let adduser =  this.editedItem
        var data = {
            adduser: adduser
        };

        that.api.postData("api/createuser", data).then(res => {
     //    debugger
         
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
