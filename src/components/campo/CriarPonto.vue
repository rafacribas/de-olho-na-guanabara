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
        <v-container>         
            <h1>
                Cadastro de ponto
            </h1>
            <v-row class="pt-2">
                <v-col>
                    <v-select 
                        v-model="atividadeSelecionada"
                        outlined
                        color="blue"
                        label="Atividade"
                        :items="atividades"
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
                        :disabled='!atividadeSelecionada'
                        :items="getImpactos"
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
import axios from 'axios'
import { EventBus } from '@/event-bus';

export default {
    name: 'CriarPonto',
    computed:{
        isEdit() {
            return this.$route?.params?.id || ''
        },
        getImpactos(){
            switch (this.atividadeSelecionada) {
                case 'Demarcação de áreas de exploração e tráfego':
                    return [
                        'Retirada de acesso às áreas de pesca ou ao território pesqueiro ',
                        'Loteamentos irregulares',
                        'Alteração do regime tradicional de uso e ocupação ',
                        'Maior vulnerabilidade/expulsão devido à falta/irregularidade na demarcação de território tradicional ou por residirem em área de dominío da união (questão fundiária)',
                        'Deslocamento compulsório/expulsão das famílias para periferia ',
                        'Perda de valor turístico'
                        ]                    
                case 'Incremento do fluxo de embarcações na região':
                    return [
                        'Pesca ou caça predatória ',
                        'Alteração do regime tradicional de uso e ocupação ',
                        'Sobrepesca / diminuição da produtividade pesqueira ',
                        'Diminuição da renda dos pescadores e pescadoras ',
                        'Invasão/dano à área protegida ou unidade de conservação ambiental ',
                        'Contaminação e intoxicação por substâncias nocivas ',
                        'Perda de valor turístico'
                    ]
                case 'Levantamentos geofísicos preliminares (Batimetria, mapeamento sísmico)':
                    return [
                        'Poluição sonora',
                        'Perda da biodiversidade ',
                        'Alteração no ciclo reprodutivo da fauna '
                    ]
                case 'Alterações na dinâmica geoeconômica das áreas terrestres adjacentes':
                    return [
                        'Especulação imobiliária ',
                        'Evasão dos jovens da pesca ',
                        'Alteração do regime tradicional de uso e ocupação ',
                        'Perda de valor turístico',
                    ]
                case 'Perfuração de poços':
                    return [
                        'Contaminação e intoxicação por substâncias nocivas ',
                        'Poluição atmosférica ',
                        'Poluição de recurso hídrico',
                        'Poluição sonora',
                        'Poluição do solo ',
                        'Mudanças da hidrodinâmica do estuário '
                    ]
                case 'Instalação e operação de plataformas ou navios-plataforma':
                    return [
                        'Poluição atmosférica ',
                        'Poluição de recurso hídrico',
                        'Poluição sonora',
                        'Contaminação e intoxicação por substâncias nocivas ',
                        'Alteração no ciclo reprodutivo da fauna ',
                        'Sobrepesca / diminuição da produtividade pesqueira ',
                        'Diminuição do consumo de pescado'                        

                    ]
                case 'Obras de instalação e manutenção de infra-estrutura':
                    return [
                        'Poluição de recurso hídrico',
                        'Poluição do solo ',
                        'Poluição atmosférica ',
                        'Mudanças da hidrodinâmica do estuário',
                        'Sobrepesca / diminuição da produtividade pesqueira ',
                        'Diminuição do consumo de pescado'
                    ]
                case 'Translado constante de materiais, matéria prima e mão-de-obra':
                    return [
                        'Formação de lixões/depósitos de resíduos ',
                        'Poluição atmosférica',
                        'Poluição do solo',
                        'Contaminação e intoxicação por substâncias nocivas',
                        'Impactos sobre a segurança no trabalho ',
                        'Alteração do regime tradicional de uso e ocupação ',
                    ]
                case 'Consequências inerentes à atividade industrial elevada e contínua':
                    return [
                        'Risco de acidentes operacionais',
                        'Risco de contaminação da água, ar e do solo',
                        'Impactos sobre a segurança no trabalho ',
                        'Incremento das taxas de poluição atmosférica'                        
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
            atividadeSelecionada:'',
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

            ]
        }
    },
    async mounted(){
        if(this.isEdit.length) {
            const response = await axios.get(`https://guanabara-backend.herokuapp.com/location-points/${this.isEdit}`)
            this.atividadeSelecionada = response.data.activity
            this.impactosSelecionados = response.data.impacts.split(';')
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
        async centeredLoc2(){
            let x = [];
    
            await navigator.geolocation.getCurrentPosition((data) => {
                x[0] = data.coords.longitude;
                x[1] = data.coords.latitude;        
            });
        
            return x
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
                    "activity": "${this.atividadeSelecionada}",
                    "impacts": "${this.impactosSelecionados.join(';')}"
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
                    "activity": "${this.atividadeSelecionada}",
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
                asyncActions.flyTo({
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