<template>
<div >
<systemnav />
<router-view />

</div>
</template>

<script>

  import systemnav from '@/components/systemnav'



  export default {
  name: 'projecthome',
  data: () => {
     return {
  myData: ''

  } },
  components:{
  'systemnav': systemnav
  },
  created () {
  
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