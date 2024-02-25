<template>
  <div
    class="md:container  md:mx-auto md:px-2 w-full  py-2 px-4 bg-blue-100 lg:w-4/4  mt-2"
  >
    <div class="bg-white rounded shadow p-8">
      <v-card primary-title class="justify-center">
        <v-card-title>
          <h1>רשימת נמענים הפצה</h1>
        </v-card-title>
      </v-card>

      <div class="mt-4"></div>
      <div
        class="w-24 w-full block mt-4 p-4 rounded-lg bg-gray-100 "
      >
        <div
          class="w-24 w-full block mt-4 p-4 rounded-lg "
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
          <!-- <v-card> -->
          <v-card-title>
            <v-spacer></v-spacer>

            <v-btn
              class="brown lighten-1"
              fab
              small
              dark
              @click.native="handleInput()"
            >
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn
              class="indigo lighten-1"
              fab
              small
              dark
              @click.native="resetform()"
            >
              <v-icon>refresh</v-icon>
            </v-btn>
          </v-card-title>
          <!-- </v-card> -->
          <div class="my-6 p-2">
            <v-data-table
              :headers="headers"
              :items="users"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              @page-count="pageCount = $event"
              :loading="loading"
              class="w-24 min-w-full"
            >
              <template v-slot:item="props">
                <tr>
                  <td class="text-xs-right">{{ props.item.strPriority }}</td>
                  <td>{{ props.item.mongoref }}</td>
                  <td class="text-xs-right">{{ props.item.Name }}</td>
                  <td class="text-xs-right">{{ props.item.CellNumber }}</td>
                  <td class="text-xs-right">{{ props.item.ShortUrl }}</td>
                  <td class="text-xs-right">
                    {{ props.item.LastSmsSendDate }}
                  </td>
                </tr>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>

      <FlashMessage></FlashMessage>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data: function() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 50,
      options: {},
      totalItems: 0,
      loading: false,
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
        { text: "סטטוס", align: "center", value: "priority" },
        {
          text: "מס''ד",
          align: "center",
          value: "name",
        },
        { text: "שם", value: "" },
        { text: "נייד", value: "" },
        { text: "תוכן", value: "" },
        { text: "תאריך שליחה", value: "" },
      ],
      users: [],
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  computed: {
    THIS_VALUE_COMPUTED() {
      if (priority == -2) return "מוכן לשליחה";
      else if (priority == -1) return "לא התקבל";
      else if (priority == 0) return " התקבל";

      return " ";
    },
  },

  mounted() {
    this.users = [];
    this.getDataFromApi().then((data) => {
      this.users = data.items;
      this.totalItems = data.total;
    });
  },
    beforeDestroy: function(){
      debugger
    this.api.cancelation()
},
  methods: {
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, itemsPerPage } = this.options;

        var routeid = this.getrouteid();
        if (routeid < 0) return;
        var data = {
          projectsubid: routeid,
        };
        this.api
          .postData("api/GetProjectSubmissionRecipients", data)
          .then((res) => {
            let items = res.data.result.Items;
            const total = items.length;

            if (itemsPerPage > 0) {
              items = items.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
              );
            }

            setTimeout(() => {
              this.loading = false;
              resolve({
                items,
                total,
              });
            }, 1000);
          });
      });
    },

    searchDataFromApi() {
      this.page = 1;
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, itemsPerPage } = this.options;

        var routeid = this.getrouteid();
        if (routeid < 0) return;
        var data = {
          projectsubid: routeid,
          search: this.search,
        };
        this.api
          .postData("api/searchProjectSubmissionRecipients", data)
          .then((res) => {
            let items = res.data.result.Items;
            const total = items.length;

            if (itemsPerPage > 0) {
              items = items.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
              );
            }

            setTimeout(() => {
              this.loading = false;
              resolve({
                items,
                total,
              });
            }, 1000);
          });
      });
    },

    getrouteid: function() {
      var routeid = this.$route.params.id;

      routeid = parseInt(this.crypto.decrypt(routeid), 10);

      return routeid;
    },

    resetform: function() {
      this.search = "";

      this.users = [];
      this.getDataFromApi().then((data) => {
        this.users = data.items;
        this.totalItems = data.total;
      });
    },

    handleInput: function() {
      this.users = [];
      this.searchDataFromApi().then((data) => {
        this.users = data.items;
        this.totalItems = data.total;
      });
    },
  },
};
</script>

<style></style>
