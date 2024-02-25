  <template>
  
<div class="bg-teal-200 flex flex-row justify-between h-12 md:px-4 shadow sticky top-0 z-50">
    
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
    <span class="font-semibold text-xl tracking-tight">טלסמס</span>
 

 
  </div>
  <div class="flex items-center   flex-shrink-0 "> 
     <navtop  />
  </div>
   <div class="md:flex">
           <div class="flex flex-row border-l h-full">
               <div class="px-4 self-center">
                 <div id="notification" class="text-teal-400  text-base no-underline cursor-pointer">
                    <v-menu  transition="v-slide-y-transition">
               <template v-slot:activator="{ on: { click } }">
               <v-btn  icon light v-on:click="click">
                     <v-icon>more_vert</v-icon>
                </v-btn>
                
                  
                </template>
                <v-list>
                  <v-list-item v-for="item in userMenus" :key="item.title" value="true" :to="item.link" router>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
                 </div>
               </div>
                <div class="px-4 border-l flex items-center cursor-pointer p-4">
                    <div id="profile-dropdown"    class="flex flex-row items-center">
                        <span class="text-gray-800 text-base no-underline hidden md:block">
                        {{myuser}}
                        </span>
                         <span class="text-gray-800 text-base m-4 no-underline hidden md:block">
                        {{mytenant}}
                        </span>
                        </div> 
                </div>
           </div>
       </div> 
  
   </div>


  </template>
  <script>

import navtop from '@/components/navtop'
export default {
 components:{
   'navtop': navtop
 },

  data: function() {
  return {
     "myuser":"",
     "mytenant":"",
      "mydictenant":[],
      "userMenus": [
          {
            icon: "bubble_chart",
            title: "Logout",
            link: "/logout"
          },
          {
            icon: "bubble_chart",
            title: "שנה סיסמה",
            link: "/changepwd"
          }
          
          ],
            "dialog": false,
        "mini": false,
        "dialogText": "",
        "dialogTitle": "",
        
        "isRootComponent": true,
        // clipped: false,
        
        "fixed": false,
        "titlename" :"",
       "miniVariant": false,
        "right": true,
        "rightDrawer": false,
         
    }
  },

   mounted: function() {
       
  this.mydictenant[1]="תל אביב";
  this.mydictenant[2]="ניהול מערכת";
  this.mydictenant[12]="עמידר";
  this.mydictenant[20]="ראשון לציון";
  this.mydictenant[23]="חבר";
  this.mydictenant[28]="משרד הכלכלה";
  this.mydictenant[29]="IVR";
  this.mydictenant[40]= "רישוי";
  this.mydictenant[41]= "חלמיש";
   this.mydictenant[42]="עמיגור";

      var user=  localStorage.getItem('user')
            var obj = JSON.parse(user)

            var tenantid

            if (obj.length >0){
             this.myuser= obj[0].m_Item4;
             this.mytenant= this.mydictenant[obj[0].m_Item1];
             tenantid=obj[0].m_Item1
            }
           
             else{
                 this.myuser= obj.m_Item4;
                  this.mytenant= this.mydictenant[obj.m_Item1];
                  tenantid=obj.m_Item1
             }
            

      var users=  localStorage.getItem('users')
     var objusers = JSON.parse(users)
     if (objusers!=null) 
     {
  if (this.userMenus.length <3)
              this.userMenus.push({
            icon: "bubble_chart",
            title: "שנה לקוח",
            link: "/changetenant"
          }) 
     }
   



          
   }
  }
</script>

<style>
.v-dialog__container {
    display: unset; 
}
</style>

  