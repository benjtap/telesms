<template>
<div>

  <headertop  /> 

<div class="flex flex-col h-screen  font-sans ">

 <!-- <navtop  /> -->

<div class="flex-1 container mx-auto p-1" >
   <mainmenu />
<div   v-bind:style="getstyle()" 
	>

   <router-view ></router-view> 
</div>
</div>
  

   <footer class='bg-blue-200 w-full pin-b text-center border-t border-grey p-4 '>
           
        </footer>

   </div>
 
</div>
   
</template>

<script>

import headertop from '@/components/header'

//import navtop from '@/components/navtop'

import mainmenu from '@/components/mainmenu'

export default {
  name: 'maincmpt',

   
  data: () => { return {
    myData: ''

  } },
  components:{
    // 'navtop': navtop,
     'headertop': headertop,
    'mainmenu': mainmenu

   }, methods: {

     getstyle() {

   if (this.$route.name != "adminsystem" && this.$route.name != "projects"  && this.$route.name != "projecthome" && this.$route.name != "monitorsubmission") 
  return 'overflow-y:auto;overflow-x:hidden;height:auto;  max-height:78vh;	overflow-y: scroll;';

  //return 'height:auto;  max-height:78vh;	';
    else
  return '';

  }


   }
 

    
}

</script>