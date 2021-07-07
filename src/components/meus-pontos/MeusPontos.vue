<template>
  <v-container>
      <v-row >
        <v-col
            @click="edit(marker.id)"
            style="cursor: pointer"
            v-for="(marker,index) in locationPoints"
            :key="index" 
            :cols="12"
            :sm="8"
            :md="6"
            :lg="4"
        >
            <v-card
                height="100%"
                outlined
                flat
            >
                <h2  class="text-center pb-2">{{marker.activity}}</h2>                        
                <img class="mb-3" style="width:100%; max-height: 220px" v-if="marker.img" :src="marker.img" alt="">   
                <v-list>
                    <v-list-item class="ml-n4 mr-n4 mt-n12 mb-n8"  three-line v-for="(impact, index) in marker.impacts"
                            :key="index">

                        <v-list-item-content >
                            <v-list-item-subtitle>
                                {{impact}}
                            </v-list-item-subtitle>
                        </v-list-item-content>   
                        
                    </v-list-item>
                </v-list>
                <span class="text--disabled " style="float:right">
                        Criado em: <b> {{new Date(marker.createdAt).toLocaleDateString()}}</b>
                    </span>
            </v-card>
        </v-col>  
        </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: 'MeusPontos',
    data(){
        return {
            locationPoints: []
        }
    },
    methods:{    
        edit(id){
            this.$router.push(`/add/${id}`)
        },
    },
    async mounted() {
        const response = await axios.get('https://guanabara-backend.herokuapp.com/location-points')
        this.locationPoints = this.markers = response.data.map(item =>{
            let obj = {
                'id': item.id,
                'coord': [item.lng,item.lat],
                'createdAt': item.createdAt,
                'img': item.photo[0]?.formats?.thumbnail?.url || 'https://lh3.googleusercontent.com/proxy/IANwU9HZ1o22gAN5yYWcsKOJDdnCNj8w3GGZvxn34h8OMYB7-0ub0m-OFSfyjqP-9mhl_MQ-uSSANsxnkYQ6rvrNPhVmMUQ-RMN9UO-cIUNEy5jlgchQeQvn8uwcmc4b73mjzDxeq6GqeIDcJbV6bNxpk9XPNdfLdwKTIw',
                'activity' : item.activity,
                'impacts': item.impacts.split(';')
            }
            return obj
        })
    }
}
</script>

<style>

</style>