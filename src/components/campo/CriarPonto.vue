<template>
  <v-container style="height:100%" fluid>
        <v-snackbar
            color="green"
            top
            v-model="snackbar"
            :timeout="timeout"
            content-class="text--center"
            >
            <span class="d-flex justify-center">
            {{ text }}
            </span>
        </v-snackbar>        
        <v-container class="snapshot-mapa pa-0">
            <MglMap class="mapa" :accessToken="accessToken" :mapStyle="mapStyle" :zoom="zoom"  @load="onMapLoad" >                      
                <MglMarker :coordinates="coordinatesMarker" color="blue" />
            </MglMap>
        </v-container>    
        <v-container>         
            <v-row>
                <v-col>
                    <v-select 
                        v-model="categoriaSelecionada"
                        outlined                        
                        color="blue"
                        no-data-text="Nenhuma categoria cadastrada"
                        label="Categoria"
                        :items="categorias"
                        hide-details
                    />
                </v-col>
            </v-row>
            <v-row class="pt-2">
                <v-col>
                    <v-select
                        :disabled="!categoriaSelecionada"
                        v-model="elementoSelecionado"
                        outlined
                        color="blue"
                        label="Elementos"
                        :items="getElementos"
                        hide-details
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-select 
                        v-model="impactosSelecionados"
                        outlined
                        multiple
                        color="blue"
                        label="Impactos"
                        :disabled='!elementoSelecionado'
                        :items="impactos"
                        hide-details
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                   
                    <v-file-input
                        v-model="file"
                        multiple
                        truncate-length="15"
                        chips
                        outlined
                        hide-details
                        label="Foto"
                        :clearable="false"
                        capture="user"
                        accept="image/*"
                        append-icon="mdi-camera"
                        prepend-icon=""
                        >                        
                           <template v-slot:selection="{ index, text }">
                                <v-chip                               
                                close
                                @click:close="deleteChip(index)"
                                >
                                {{ text }}
                                </v-chip>
                            </template>
                        </v-file-input>
                </v-col>
                <v-col cols="12" justify="center">
                    <v-btn  :loading="isLoading" :disabled="isLoading" @click="isEdit.length ? update() : create()" color="primary" x-large style="width: 100%">
                        <span style="color: white">
                            {{ isEdit ? 'ATUALIZAR' : 'CADASTRAR' }}
                        </span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
  </v-container>
</template>

<script>
import { MglMap, MglMarker } from "vue-mapbox";
import axios from 'axios'
import { EventBus } from '@/event-bus';

export default {
    name: 'CriarPonto',
    components: {
        MglMap,
        MglMarker    
    },        
    computed:{
        isEdit() {
            return this.$route?.params?.id || ''
        },
        getElementos(){
            switch (this.categoriaSelecionada) {
                case 'Áreas de Fundeio':
                    return [
                        'Embarcações de grande porte',
                        'Rebocadores',
                        'Embarcações e carcaçasabandonadas ou naufragadas'                      
                        ]                    
                case 'Rotas de Embarcações de Grande Porte':
                    return [
                        'Boias de Sinalização e demarcação de rotas',
                        'Placas e postes de sinalização e informativos',
                        'Atividade de dragagem'
                    ]
                case 'Estruturas de apoio':
                    return [
                        'Estaleiro',
                        'Dutos (oleodutos, gasodutos)',
                        'Terminal Aquaviário de Gás e Petróleo',
                        'Plataforma ou Píer',
                        'Refinarias',
                        'Instalação Portuária',
                        'Empresas de derivados do Petróleo',
                        'Frente de obras/manutenção'
                    ]
                case 'Outro':
                    return [
                        ''
                    ]                                                                 
                default:
                    return ['erro','erro']    
            }
        },
        centeredLoc(){
            let x = [];
    
            navigator.geolocation.getCurrentPosition((data) => {
                x[0] = data.coords.longitude;
                x[1] = data.coords.latitude;        
            });
        
            return x
        }
    },
    data(){
        return {
            categoriaSelecionada: '',
            elementoSelecionado: '',
            impactosSelecionados:[],
            accessToken: 'pk.eyJ1IjoiaGVucmlxdWUtbm9mdiIsImEiOiJja282YnM5MmswajFiMnBxbzkxNmNoeWR6In0.prYdkvzL5DuxvRKEYydGiQ',
            mapStyle: 'mapbox://styles/mapbox/outdoors-v11',
            center: [-43.12725,-22.81692],
            zoom: 5,
            file: [],
            coordinatesMarker: [-43.12725, -22.81692],
            snackbar: false,
            text: 'Ponto cadastrado com sucesso!',
            timeout: 2000,
            isLoading: false,
            categorias: [
                'Áreas de Fundeio',
                'Rotas de Embarcações de Grande Porte',
                'Estruturas de apoio'
            ],
            atividades:[
                'Demarcação de áreas de exploração e tráfego',
                'Incremento do fluxo de embarcações na região',
                'Levantamentos geofísicos preliminares',
                'Alterações na dinâmica geoeconômica das áreas terrestres adjacentes',
                'Perfuração de poços',
                'Instalação e operação de plataformas ou navios-plataforma',
                'Obras de instalação e manutenção de infra-estrutura',
                'Translado constante de materiais, matéria prima e mão-de-obra',
                'Consequências inerentes à atividade industrial elevada e contínua'

            ],
            impactos: [
                'Apropriação e ocupação do espaço marítimo',
                'Alteração da dinâmica dos ecossistemas terrestres',
                'Desapropriações e realocação das populações',
                'Restrição de acesso aos pesqueiros tradicionais',
                'Alterações das características das comunidades tradicionais',
                'Riscos de desastres ambientais',
                'Riscos à saúde das populações',
                'Perda da biodiversidade',
                'Mudança na hidrodinâmica do estuário',
                'Emissão sonora sobre o meio biótico',
                'Supressão vegetal',
                'Alteração na qualidade da água',
                'Alteração na qualidade do sedimento',
                'Aumento na turbidez na massa d’água',
                'Alteração da qualidade sonora',
                'Erosão e assoreamento',
                'Despejo de efluentes',
                'Poluição luminosa',
                'Poluição do ar',
                'Criogênica de temperatura'
            ]
        }
    },
    async mounted(){
        if(this.isEdit.length) {
            const response = await axios.get(`https://guanabara-backend.herokuapp.com/location-points/${this.isEdit}`)
            this.elementoSelecionado = response.data.elements
            this.impactosSelecionados = response.data.impacts.split(';')
            this.categoriaSelecionada = response.data.categories
            this.file = response.photo[0]?.formats?.thumbnail?.url || null
        }
        EventBus.$on('ponto-campo', this.criarMarker)
    },
    watch: {
        file(newV, oldV) {
            if(newV[0]?.name !== oldV[0]?.name && oldV.length)
                this.file.push(...oldV)

        }
    },
    methods:{
        deleteChip(index){
            this.file.splice(index, 1)
        },       
        criarMarker(coord){
            this.coordinatesMarker = coord
        },
        create(){         
            this.isLoading = true;
            const formData = new FormData();
            let lng;
            let lat;
            navigator.geolocation.getCurrentPosition(async (data) => {
                lng = data.coords.longitude;
                lat = data.coords.latitude; 

                formData.append(
                    "data",
                    `{ "lat": "${lat}",
                    "lng": "${lng}",
                    "categories": "${this.categoriaSelecionada}",
                    "impacts": "${this.impactosSelecionados.join(';')}",
                    "elements": "${this.elementoSelecionado}"
                    }`);
                
                this.file.forEach(f => {
                    formData.append("files.photo", f);
                });
                await axios.post("https://guanabara-backend.herokuapp.com/location-points", formData).then(res => {
                    console.log(res);
                    console.log(res.data);
                });       

                this.isLoading = false
                this.snackbar = true;
                setTimeout(()=>this.$router.push('/app'), 1500)
            });
        },
        update(){         
            this.isLoading = true;
            const formData = new FormData();
            let lng;
            let lat;
            navigator.geolocation.getCurrentPosition(async (data) => {
                lng = data.coords.longitude;
                lat = data.coords.latitude; 

                formData.append(
                    "data",
                    `{ "lat": "${lat}",
                    "lng": "${lng}",
                    "elements": "${this.elementoSelecionado}",
                    "categories": "${this.categoriaSelecionada}",
                    "impacts": "${this.impactosSelecionados.join(';')}"
                    }`);
                formData.append("files.photo", this.file);

                await axios.post("https://guanabara-backend.herokuapp.com/location-points", formData).then(res => {
                    console.log(res);
                    console.log(res.data);
                });       

                this.isLoading = false
                this.snackbar = true;
                setTimeout(()=>this.$router.push('/'), 1500)
            });
        },            
        async onMapLoad(event) {          
            const asyncActions = event.component.actions;
            navigator.geolocation.getCurrentPosition((data) => {
                this.coordinatesMarker = [data.coords.longitude, data.coords.latitude]
                asyncActions.easeTo({
                    center: [data.coords.longitude, data.coords.latitude],
                    zoom: 13,
                    speed: 1
                }) 
            })
        }

    },

}
</script>

<style scoped>.v-text-field--:not(.v-text-field--single-line) input{
    margin-top:0px !important;
}
.snapshot-mapa{
    height:50%
}
</style>