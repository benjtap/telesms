<template>
<div>
<projectsubnav  />
 <router-view name="projectsubhome" />

</div>
</template>

<script>

  import projectsubnav from '@/components/projectsubnav'



  export default {
  name: 'projectsubhome',
  data: () => { return {
  myData: ''

  } },
  components:{
  'projectsubnav': projectsubnav
  },
  created () {
  this.myData= this.getrouteid();
  },
  methods: {
  getrouteid: function() {
  var routeid = this.$route.params.id;


  routeid=  parseInt(this.crypto.decrypt(routeid), 10);

  return routeid

  }}
  }

</script>