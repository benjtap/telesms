<template>
   <monitorserver>
  
   
    <div
      class="md:container  md:mx-auto md:px-2 w-full  py-2 px-4 bg-blue-100 lg:w-4/4  mt-2"
    >
      <div class="bg-white rounded shadow p-8">

             <v-card primary-title class="justify-center">
          <v-card-title>
            <h1>  מוניטור סרוויס</h1>
          </v-card-title>
        </v-card>
        <v-card>

    
      <!-- <v-app> -->
      <v-data-table :headers="headers" :items="monitor" >
       <template v-slot:item="props">
       
          <tr style="cursor: pointer">
          <td>
            <div class="body-2" style="textAlign: center">
              {{props.item.servername}}
            </div>
           
           
          </td>
          <td>
            <div class="body-2" style="textAlign: right">
              {{props.item.servicename}}<br/>
              
            </div>
          </td>
            <td>
            <div class="body-2" style="textAlign: right">
              
              <v-icon v-if="props.item.statusup" color="green darken-2">check_circle</v-icon>
              <v-icon v-else color="red lighten-1">block</v-icon>
            </div>
          </td>
          </tr>
        </template>

     

      </v-data-table>
     <!--  </v-app> -->

    </v-card>
     </div></div>
   </monitorserver>
 


</template>

<script>
export default {
  
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'שרת',
          align: 'center',
          sortable: false,
          value: 'servername'
        },
      
        { text: 'שם של הסרוויס', value: 'servicename',align: 'right' },
        { text: 'סטטוס', value: 'statusup',align: 'right' }
        
      ],
     monitor: [
        {
          value: false,
          servername: '',
          statusup:true,
         
          servicename: ''
        
        }
   
      ]
    }
  },
 
   
    created () {
       debugger

        console.log(1)
         this.monitor= []
       this.api.postData ('api/getstatusserver').then((res) => {

           console.log(res)
        this.items = res.data.items
      
        let monitors= this.monitor

        this.items.forEach((item) => {
      
     
       monitors.push(
         {
            servername: item.servername ,
            statusup:item.statusup,
            servicename: item.servicename
          
           })
        })


        
        
      }, (err) => {
        console.log(err)
      })
  }
  }
  
    </script>