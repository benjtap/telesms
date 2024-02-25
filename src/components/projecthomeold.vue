<template>
<div >
<projectnav :myData='myData' />
<router-view />

</div>
</template>

<script>

  import projectnav from '@/components/projectnav'



  export default {
  name: 'projecthome',
  data: () => { return {
  myData: ''

  } },
  components:{
  'projectnav': projectnav
  },
  created () {
  this.myData= this.getrouteid();
  },
  methods: {
  getrouteid: function() {
  var routeid = this.$route.params.id;


  routeid=  parseInt(this.crypto.decrypt(routeid), 10);

  return routeid

  }
  }
  }

</script>