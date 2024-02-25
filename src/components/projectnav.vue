<template>
  <div >   
     <!--     <div
      id="container" style="background: rgb(34,193,195);
background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(215,242,171,1) 100%);"
      class="container mx-auto my-4 px-4 md:px-0 w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl
  overflow-y-scroll overflow-hidden h-full"
    >   -->
    <div
      id="container" 
      class="container mx-auto my-4 px-4 md:px-0 w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl bg-teal-400 bg-opacity-50
   h-full"
    >
      <div
        class="text-gray-600 font-semibold text-2xl mb-4 flex items-center justify-center"
      >
        <div class="flex justify-center items-center">
          {{ setsatus }}
        </div>                                                                                                                                                   
      </div>

      <div
        id="menuproject"
        class="flex flex-row justify-around my-4 pt-4 pb-2 bg-white shadow rounded 
         text-gray-600 sticky  z-20"
      >
        <div
          v-for="item in items"
          :key="item.link"
          :to="item.link"
          v-bind:class="getClass(item.tag)"
        >
            <span
            v-on:click="setActive(item.tag)"
            
              v-show="getdisabled(item.tag)"
            class="hidden md:block font-regular"
            >{{ item.text }}</span
          >
        </div>
      </div>

      <projectdefinition
        v-if="currentView.view['projecthome'] === 'projectdefinition'"  @insert-proj="createProject"  @update-proj="updateProject"
      ></projectdefinition>
      <submissions v-if="currentView.view['projecthome'] === 'submissions'">
      </submissions>

      <genericfield
        v-if="currentView.view['projecthome'] === 'generic'"
      ></genericfield>
      <permissionpj
        v-if="currentView.view['projecthome'] === 'permissionpj'"
      ></permissionpj>
    </div>
  </div>
</template>
<script>
import submissions from "@/components/submissions";
import projectdefinition from "@/components/projectdefinition";
import genericfield from "@/components/genericfield";
import permissionpj from "@/components/permissionpj";
import projectsubhome from "@/components/projectsubhome";

import { mapState, mapActions } from "vuex";
export default {
  name: "projectnav",
  props: ["show","data"],

  components: {
    submissions: submissions,
    projectdefinition: projectdefinition,
    genericfield: genericfield,
    permissionpj: permissionpj,
    projectsubhome: projectsubhome,
  },

  data: function() {
    return {
      addproject:true,
      dicdata: [],
      tagActive: "project",
      items: [
        { text: " פרטי פרויקט", tag: "projectdefinition" },
        { text: " הפצות", tag: "submissions" },
        { text: " הדגרות שדות", tag: "generic" },
        { text: " הרשאות", tag: "permissionpj" },
      ],
    };
  },
  mounted() {},

  created() {
    this.dicdata["projects"] = "פרוייקט";
    this.dicdata["report"] = "דוחות";
  },

  methods: {
    ...mapActions(["setCurrentView", ""]),

    updateProject(value) {


var data ={
   id:value.id,
   name:value.name
}

 this.$emit('proj-update', data)
  
},


createProject (value) {

    debugger

    var data ={
   id:value.id,
   name:value.name
}

 this.$emit('proj-insert', data)
    },


   getdisabled(tag) {
    
      var routeid = this.getrouteid();
      if (routeid < 0 && tag !="projectdefinition") return false;
      else if   (this.$route.name != "projecthome") return false;
      else return true
    },


   
    getrouteid: function() {
      var routeid = this.$route.params.id;

      if (routeid == undefined) return;

      routeid = parseInt(this.crypto.decrypt(routeid), 10);

      return routeid;
    },
    setActive(tag) {
      if (this.$route.name != "projecthome") {
        var routeid = this.$store.state.firstresourceId;
        this.$router.push({
          name: "projecthome",
          params: { id: this.crypto.encrypt(routeid) },
        });

        let dic_local = [];
        dic_local["projecthome"] = "submissions";

        var append = Object.assign(
          {},
          dic_local,
          this.$store.state.currentView.view
        );
        var objCurrentView = {
          page: "projecthome",
          view: append,
        };

        this.setCurrentView(objCurrentView);
      } else {
        this.tagActive = tag;
        let dic_local = [];
        dic_local["projecthome"] = tag;

        let copy = Object.assign({}, this.$store.state.currentView.view);
        delete copy["projecthome"];

        var append = Object.assign({}, dic_local, copy);
        var objCurrentView = {
          page: "projecthome",
          view: append,
        };
        this.setCurrentView(objCurrentView);
      }
    },
    getClass(tag) {
      try {
        if (this.currentView.view["projecthome"].indexOf(tag) > -1)
        return "text-xl font-normal leading-normal  text-teal-600   font-semibold flex-grow";
        else return "flex-grow cursor-pointer";
      } catch (error) {}
    },
  },

  computed: {
    ...mapState({
      currentView: (state) => state.currentView,
      resourceName: (state) => state.resourceName,
    }),

   
    setsatus() {
      var routeid = this.getrouteid();
      if ((routeid < 0)&& (this.$route.name == "projecthome") ) return "פרויקט חדש";
      else return " פרויקט " + this.resourceName;
    },
  },
};
</script>
