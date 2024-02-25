

  <template>
   <v-app v-bind:style="{ background: $vuetify.theme.themes.dark.background}"> 
  <div>
   
     <template  v-if="!logged">
       	
     <router-view />
    </template>
    <template  v-if="logged">
      
        <router-view />
   </template> 

       </div>
  </v-app> 
    </template>
     

<script>


import { mapState } from 'vuex';


  export default {
  
    
    mounted () {
      this.logged=this.$store.state.loggedIn
    },
    computed: mapState(['loggedIn']),
   
    data () {
      return {
       
      
        logged:true,
      
    }},
    created () {
        
   

     
    }

    }
   
  
   
    
   
  
</script>


 <!-- <style src="./assets/main.css"/> -->


<style>

.theme--light.v-application{

  background:#c3dafe !important;
}

  .v-text-field label {
    font-size: 1.3em;
    right:0px  !important;
    left: auto  !important; 
    position: absolute  !important;
  }

   .v-select label {
    font-size: 1.2em;
    right:0px  !important;
    left: auto  !important; 
    position: absolute  !important;
  }
.basil {
background-color: #FFFBE6 !important;
}
.basil--text {
color: #356859 !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  direction:rtl;
}


html,
body{
overflow-y:hidden !important;
 
}
::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #bdbdbd;
  border-radius: 10px;
}

.card__title{
  direction: rtl !important;
  text-align: right !important;
}

.list__tile__content{
  text-align: right !important;
}

.list__tile__title{
  text-align: right !important;
}
.input-group.input-group--editable label,
.input-group.input-group--overflow label,
.input-group.input-group--segmented label {
  left: initial !important;
  right: 16px!important;
}
.input-group.input-group--selection-controls label{
  left: initial !important;
  right: 32px !important;
  text-align: right !important;
}

.input-group.input-group--selection-controls .icon--selection-control{
  left: initial !important;
  right: 0 !important;
}

.input-group--text-field label{
  left: initial;
  right: 0;
  text-align: right;
  transform-origin: top right;
}

.breadcrumbs__divider{
  transform: scaleX(-1);
}

.toolbar__content>:not(.btn):not(.menu):first-child:not(:only-child),
.toolbar__extension>:not(.btn):not(.menu):first-child:not(:only-child){
  margin-left: initial;
  margin-right: 16px;
}

.input-group.input-group--selection-controls.switch label{
  padding-left: initial;
  padding-right: 14px;
}

.input-group--text-field .input-group__counter{
  margin-left: initial;
  margin-right: auto;
}

.input-group--text-field.input-group--prepend-icon label{
  left: initial;
  right: 40px;
}

.input-group--text-field.input-group--prepend-icon .input-group__prepend-icon{
  justify-content: flex-end;
}

.input-group--text-field.input-group--prepend-icon .input-group__details{
  margin-right: auto !important;
  margin-left: initial !important;
}

.alert__icon{
  margin-right: initial !important;
  margin-left: 16px !important;
}

table.table thead th,
.text-xs-left{
  text-align: right !important;
}

.chip .avatar{
  margin-left: 8px !important;
  margin-right: -12px !important;
}

.datatable__actions__range-controls .icon,
.options__navigation .icon{
  transform: scaleX(-1)
}


.ltr, .ltr-input input{
  text-align: left !important;
  direction: ltr !important;
}

.mirror-icon {
  transform: scaleX(-1) 
}

.input-group.input-group--solo label{
  padding-right: 16px !important;
  padding-left: initial !important;
}

.input-group--text-field.input-group--textarea:not(.input-group--full-width) label{
  left: initial !important;
  right: 15px !important;
}

.input-group--text-field.input-group--textarea:not(.input-group--full-width) .input-group__input{
  padding: 30px 13px 0  0 !important;
}

.progress-linear__bar{
  direction: ltr !important;
}

.toolbar__title{
  margin-right: 16px !important;
  margin-left: initial !important;
}
</style>

