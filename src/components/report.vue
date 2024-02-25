<template>
 <main>
  <!-- <form enctype="multipart/form-data"> -->
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

    <div
      class="md:container md:mx-auto md:px-2 w-full  py-2 px-4 bg-blue-100 lg:w-3/4  mt-1"
    >
      <div class="w-4/5 bg-white rounded shadow p-8">
        <div class="text-xl">
          דוחות
        </div>
        <div class="mt-4"></div>
        <div
          class="block mt-4 p-4 rounded-lg bg-gray-100 border-2 border-indigo-300 cursor-pointer"
        >
          <div class="layout justify-center">
            <div class="v-card__actions">
              <div class="my-6">
                <!-- <button
                  @click="Getreportdownload"
                  type="button"
                  class="cursor-pointer border-gray-100 bg-red-200    text-gray-700 font-bold py-2 px-4 border-b-4 block ml-2 p-1 
                   text-center rounded-lg border border-4"
                >
                  הפקת דוח
                </button> -->
                <button @click="Getreportdownload"
                  type="button" class="bg-grey-lightest border font-bold py-2 px-4 rounded ml-4 shadow">
   הפקת דוח
</button>
              </div>
            </div>
          </div>

          <div class="w-full">
            <div
              class="border-indigo-300 border-2 shadow rounded px-8 py-4 my-4"
            >
              <div class="flex justify-between items-center">
                <div></div>
                <div class="text-gray-700 text-lg "></div>
                <div
                  class="w-8 text-xs text-blue-700 font-medium cursor-pointer"
                ></div>
              </div>
              <div v-if="filterShown" class="border-t-2">
                <div class="border-t-2">
                  <div class="pb-1 pt-2"></div>
                  <div class="inline-flex rounded shadow">
                    <div
                      v-for="(row, rowIndex) in statuses"
                      :key="rowIndex"
                      @click="selectStatusFilter(row)"
                      v-bind:class="getClass(row.tag)"
                    >
                      {{ row.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="statusFilter == 1" class="-mx-3 md:flex mb-2">
            <div class="w-2/5 px-3 mb-6 md:mb-0">
              <div class="text-xs-center">
                (ניתן להקליד לסינון) בחר פרויקט

                <dynamic-select
                  :options="ddlprojects"
                  option-value="id"
                  option-text="name"
                  v-model="project"
                  placeholder="בחר פרויקט"
                >
                </dynamic-select>
              </div>
            </div>
          </div>

          <div v-if="statusFilter == 2" class="-mx-3 md:flex mb-2">
            <div class="w-2/5 px-3 mb-6 md:mb-0">
              <div class="text-xs-center">
                (ניתן להקליד לסינון) בחר פרויקט

                <dynamic-select
                  :options="ddlprojects"
                  option-value="id"
                  option-text="name"
                  @input="setsubmissionddl1"
                  v-model="project"
                  placeholder="בחר פרויקט"
                >
                </dynamic-select>
              </div>
            </div>

            <div class="w-2/5 px-3 mb-6 md:mb-0">
              <div class="text-xs-center">
               (ניתן להקליד לסינון) בחר הפצה


                <dynamic-select
                  :options="ddlprojectsubs"
                  option-value="id"
                  option-text="name"
                  v-model="projectsub"
                  placeholder="בחר הפצה"
                >
                </dynamic-select>
              </div>
            </div>
          </div>

      

          <div class="-mx-3 md:flex mb-2">
            <div class="w-2/5 px-3 mb-6 md:mb-0">
              <div class="text-xs-center">
                תאריך התחלה
                <v-flex md4 xs12>
                  <div
                    style="padding: 2px;border-width:2px;
              border-style:solid;
              border-color:cyan;"
                  >
                    <vuejs-datepicker
                      :bootstrap-styling="true"
                      :open-date="openDate"
                      class="form-control"
                      :class="{
                        'bg-cyan': bootstrapStyling,
                        'bg-white': !bootstrapStyling
                      }"
                      v-model="reportFilter.mindate"
                      :format="DatePickerFormat"
                    ></vuejs-datepicker>
                  </div>
                </v-flex>
              </div>
            </div>
            <div class="w-2/5 px-3 mb-6 md:mb-0">
              <div class="text-xs-center">
                תאריך סופי
                <v-flex md4 xs12>
                  <div
                    style="padding: 2px;border-width:2px;
              border-style:solid;
              border-color:cyan;"
                  >
                    <vuejs-datepicker
                      :bootstrap-styling="true"
                      :open-date="openDate1"
                      class="form-control"
                      :class="{
                        'bg-cyan': bootstrapStyling,
                        'bg-white': !bootstrapStyling
                      }"
                      v-model="reportFilter.maxdate"
                      :value="this.default"
                      :format="DatePickerFormat"
                      :disabled-dates="disabledDates"
                    ></vuejs-datepicker>
                  </div>
                </v-flex>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FlashMessage></FlashMessage>
    </div>
    </main>
  <!-- </form> -->
</template>
<script>
import DynamicSelect from "vue-dynamic-select";
import { mapState, mapActions } from "vuex";
import vuejsDatepicker from "vuejs-datepicker";
import moment from "moment";
export default {
  components: { vuejsDatepicker, DynamicSelect },
  data: function() {
    return {
      loading:false,
     datepicker1: "2018-10-04",
      default: "2018-10-04",
      DatePickerFormat: "yyyy-MM-dd",
      project: {},
      projectsub: {},
      statuses: [],
      reportFilter: {
        //  projectid:-1,
        //  projectsubid:-1,
        mindate: "",
        maxdate: "",
        typereport: -1
      },
      filterShown: true,
      tagActive: "",
      statusFilter: 1,
      ddlprojects: [],
      ddlprojectsubs: []
    };
  },
  mounted: function() {
    this.statuses = [];
    this.statuses.push({
      name: "דוח לפי פרויקט",
      id: 1,
      tag: "one"
    });
    this.statuses.push({
      name: "דוח לפי הפצה",
      id: 2,
      tag: "two"
    });

     this.statuses.push({
      name: "דוח לפי לקוח",
      id: 3,
      tag: "three"
    });


    this.statusFilter = 1;
    this.tagActive = "one";
  },
  created() {
 

    var vm = this;

    vm.ddlprojects = [];
    this.api.postData("/api/GetProjects").then(res => {
      let Project = res.data.items;

      for (var index in Project) {
        var pindex = Project[index];

        vm.ddlprojects.push({
          id: pindex.Id,
          name: pindex.Name
        });
      }
    });
  },

  computed: {},

  methods: {
    ...mapActions(["setCurrentView", "setResourceName"]),

    Getreportdownload() {
  

      this.reportFilter.typereport = this.statusFilter;

     if( (this.reportFilter.typereport == 1) || (this.reportFilter.typereport == 2))
        this.reportFilter.projectid = this.project.id;

    if( this.reportFilter.typereport == 2)
      this.reportFilter.projectsubid = this.projectsub.id;

      if ((this.reportFilter.mindate == "Invalid date") || (this.reportFilter.mindate == "")){
        this.flashMessage.show({
          status: "error",
          title: " REPORT",
          message: "יש להזין תאריך התחלה "
        });

        return;
      }
      debugger

      if ((this.reportFilter.maxdate == "Invalid date") || (this.reportFilter.maxdate == "")) {
        this.flashMessage.show({
          status: "error",
          title: " REPORT",
          message: "יש להזין תאריך סיום"
        });

        return;
      }

      if (this.reportFilter.mindate > this.reportFilter.maxdate) {
        this.flashMessage.show({
          status: "error",
          title: " REPORT",
          message: "יש להזין תאריך סיום אחר תאריך התחלה"
        });

        return;
      }

      if (
        this.reportFilter.typereport == 1 &&
        this.reportFilter.projectid == undefined
      ) {
        this.flashMessage.show({
          status: "error",
          title: " REPORT",
          message: "יש לבחור פרויקט"
        });

        return;
      }

      if (
        this.reportFilter.typereport == 2 &&
        this.reportFilter.projectsubid == undefined
      ) {
        this.flashMessage.show({
          status: "error",
          title: " REPORT",
          message: "יש לבחור הפצה"
        });

        return;
      }

      this.reportFilter.maxdate = moment(
        String(this.reportFilter.maxdate)
      ).format("YYYY-MM-DD");
      this.reportFilter.mindate = moment(
        String(this.reportFilter.mindate)
      ).format("YYYY-MM-DD");

      var data = {
        reportFilter: this.reportFilter
      };

      var responseType = {
        responseType: "blob"
      };

      this.loading = true
      this.api.postDatablob("api/Getreportdownload", data, responseType).then(
        res => {
           this.loading = false

          var fileURL = window.URL.createObjectURL(new Blob([res.data]));

          var fileLink = document.createElement("a");

          fileLink.href = fileURL;

          fileLink.setAttribute("download", "report.xlsx");

          document.body.appendChild(fileLink);

          fileLink.click();
        },
        err => {
          console.log(err);
        }
      );
    },

    setsubmissionddl1() {
     
      var data = {
        projectid: this.project.id
      };

      var vm = this;
      vm.ddlprojectsubs = [];
     // this.projectsub = null;
      this.api.postData("/api/GetProjectsubmissionall", data).then(res => {
        //debugger
        let Project = res.data.items;

        for (var index in Project) {
          var pindex = Project[index];
          vm.ddlprojectsubs.push({
            id: pindex.Id,
            name: pindex.Name
          });
        }
      });
    },

    getClass(tag) {
      if (this.tagActive == tag)
        return "p-2 cursor-pointer bg-indigo-200 text-indigo-800 font-medium rounded-l";
      else return "p-2 cursor-pointer bg-gray-100 border-l-2";
    },
    selectStatusFilter(row) {
      this.project = null;
      this.projectsub = null;
      this.statusFilter = this.statusFilter === row.id ? null : row.id;
      this.tagActive = row.tag;
    }
  }
};
</script>
<style>
.vue-dynamic-select {
  width: 260px !important;
}
</style>
