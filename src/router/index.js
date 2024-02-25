import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/components/login";
import logout from "@/components/logout";
import changepwd from "@/components/changepwd";

import changetenant from "@/components/changetenant";
import maincmpt from "@/components/Maincmpt.vue";
import monitorsubmission from "@/components/monitorsubmission";
import projects from "@/components/projects";
import report from "@/components/report";
import submissions from "@/components/submissions";

import projectnav from "@/components/projectnav";

import projectsubnav from '@/components/projectsubnav'



import systemhome from "@/components/systemhome";
Vue.use(VueRouter);




const router = new VueRouter({
  routes: [
    {
      name: "home",
      path: "/",
      redirect: "/projects",
    },
    {
      name: "changetenant",
      path: "/changetenant",
      component: changetenant,
    },
    {
      name: "changepwd",
      path: "/changepwd",
      component: changepwd,
    },
    {
      name: "logout",
      path: "/logout",
      component: logout,
    },
    {
      name: "login",
      path: "/login",
      component: login,
    },
    {
      name: "mainadmin",
      path: "/mainadmin",
      component: maincmpt,
      children: [
        {
          name: "monitorsubmission",
          path: "/monitorsubmission",
          component: monitorsubmission,
        },
        {
          name: "projects",
          path: "/projects",
          component: projects,
          


         
          children: [
          
            {
              path: "/projecthome/:id",
              name: "projecthome",
              component:  projectnav,
              children: [
          
                {
                  path: "/projectsubhome/:id",
                  name: "projectsubhome",
                  component:  projectsubnav,
                  
                 }
                ],
            
              
             } ,
            
            
            
          
             
          ] // end projects
        },
      
        
      
        {
          name: "report",
          path: "/report",
          component: report,
        },
        {
          name: "adminsystem",
          path: "/adminsystem",
          component: systemhome,
        },
      ]  // end main
      
      ,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (to.path == "/" && !user) next("/login");
  else next();
});

export default router;
