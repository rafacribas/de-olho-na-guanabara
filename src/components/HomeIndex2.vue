:<template>
  <v-container class="pa-0" fluid style="height:100%">
    <router-view style="height: 100%" />
    <v-dialog v-model="opentestekey" max-width="400">
      <v-card class="mx-auto" max-width="400" style="padding-top:5px">
        <!-- transformar em componente -->
        <v-img
          class="white--text align-end rotate-img"
          height="300px"
          contain
          :lazy-src="getDialogPhoto"
          :src="getDialogPhoto"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="blue"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-card-subtitle class="pb-0">
          <v-card-title>{{ dialogContent.categorie }}</v-card-title>
          <v-list dense>
            <v-subheader
              >Elemento<span v-if="dialogContent.elements.length > 1"
                >s</span
              ></v-subheader
            >
            <v-list-item v-for="(item, i) in dialogContent.elements" :key="i">
              {{ item }}
            </v-list-item>
          </v-list>
        </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-subtitle class="pb-0">
          <v-list dense>
            <v-subheader>Impactos</v-subheader>
            <v-list-item v-for="(impact, i) in dialogContent.impacts" :key="i">
              {{ impact }}
            </v-list-item>
          </v-list>
        </v-card-subtitle>
        <v-card-actions>
          <div
            class="text--subtitle"
            style="font-size: 12px; color: rgba(0, 0, 0, 0.8)"
          >
            Registrado em {{dialogContent.createdAt}} por Alexandre
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="style-container">
      <!-- <v-btn large @click="changeStyle()" icon>
        <v-icon :color="isSatellite ? 'blue' : ''"
          >mdi-satellite-variant</v-icon
        >
      </v-btn> -->
      <br />
    </div>
    <div
      class="layers-container hidden-sm-and-down"
      style="z-index: 2; max-width: 30vw; width: 25vw;max-height:100vh"
    >
     <div>
      <!-- <v-btn block style="margin-bottom:8px" rounded label="selecionar todos" color="primary" @click="selectAll()">selecionar todos</v-btn>
      <v-btn block rounded label="selecionar todos" color="error" @click="unselectAll()">deselecionar todos</v-btn> -->
      </div> 
      <v-list-item class="pl-6" v-for="(layer, index) in layers" :key="index">
        <v-checkbox
          @click="mapShow(layer.value)"
          v-model="layer.visibility"
          :label="layer.name"
          hide-details
        >
        </v-checkbox>
      </v-list-item>

      <v-expansion-panels  multiple flat>
        <!-- PAINEL 1 -->
        <v-expansion-panel flat hover inset tile>

          <v-expansion-panel-header flat>
            <v-flex xs9>

              <v-checkbox
                hide-details
                v-model="checkbox2"
                @click.native="check($event)"
                label="Rotas de Embarcações de Grande Porte"
              />
            </v-flex>
          </v-expansion-panel-header>

          <v-expansion-panel-content flat class="pa-0 ma-0">

            <v-expansion-panel  flat hover inset tile class="max-expand">
              <!-- LISTA DE CATEGORIAS -->
              <v-expansion-panel-header class="sticky" @click="mostrarFeature">
                <v-checkbox
                  hide-details
                  v-model="checkbox3"
                  label="Boias de Sinalização e demarcação de rotas"
                />
              </v-expansion-panel-header>
              <!-- PONTOS ESPECIFICOS -->
              <v-expansion-panel-content class="ml-6" v-for="(embarcacao, index) in testeReativBoia" :key="index">
                <div @click="openInfoBox(embarcacao, true)" class="py-2 feature-div" > • {{embarcacao.geometry.coordinates}}</div>
                <!-- <v-checkbox
                  @change="changeFeatureVisibility(embarcacao)"
                  @click="openInfoBox(embarcacao)"
                  hide-details
                  :v-model="embarcacao.key"                  
                  :label="index.toString()"
                />              -->
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel flat hover inset tile class="max-expand">
              <v-expansion-panel-header class="sticky" @click="mostrarFeature">
                <v-checkbox
                  hide-details
                  v-model="checkbox4"
                  label="Placas e postes de sinalização e informativos"
                />
              </v-expansion-panel-header>
                <v-expansion-panel-content class="ml-6" v-for="(placa, index) in reativPlacas" :key="index">
                <div @click="openInfoBox(placa, true)" class="py-2 feature-div" > • {{placa.geometry.coordinates}}</div>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel flat hover inset tile class="max-expand">
              <v-expansion-panel-header class="sticky" @click="mostrarFeature">
                <v-checkbox
                  v-model="checkbox5"
                  label="Atividade de dragagem"
                />
              </v-expansion-panel-header>
              <v-expansion-panel-content class="ml-6" v-for="(dragagem, index) in reativDragagem" :key="index">
                <div @click="openInfoBox(dragagem, true)" class="py-2 feature-div" > • {{dragagem.geometry.coordinates}}</div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- PAINEL 2 -->
        <v-expansion-panel flat hover inset tile>

          <v-expansion-panel-header flat>
            <v-checkbox
              hide-details
              @click.native="check($event)"
              v-model="checkbox30"
              label="Áreas de Fundeio"
            />
          </v-expansion-panel-header>

          <v-expansion-panel-content flat class="pa-0 ma-0">

            <v-expansion-panel flat hover inset tile class="max-expand">

              <v-expansion-panel-header class="sticky" @click="mostrarFeature">
                <v-checkbox
                  hide-details
                  v-model="checkbox21"
                  label="Embarcações de grande porte"
                />
              </v-expansion-panel-header>

              <v-expansion-panel-content class="ml-6" v-for="(obj, index) in reativEmbarcacoesGrande" :key="index">
                <div @click="openInfoBox(obj, true)" class="py-2 feature-div" > • {{obj.geometry.coordinates}}</div>
              </v-expansion-panel-content>

            </v-expansion-panel>

            <v-expansion-panel flat hover inset tile class="max-expand">
              <v-expansion-panel-header class="sticky" @click="mostrarFeature">
                <v-checkbox
                  hide-details
                  v-model="checkbox22"
                  label="Rebocadores"
                />
              </v-expansion-panel-header>
              <v-expansion-panel-content class="ml-6" v-for="(obj, index) in reativRebocador" :key="index">
                <div @click="openInfoBox(obj, true)" class="py-2 feature-div" > • {{obj.geometry.coordinates}}</div>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel flat hover inset tile class="max-expand">
              <v-expansion-panel-header class="sticky" @click="mostrarFeature">
                <v-checkbox
                  v-model="checkbox23"
                  label="Embarcações e carcaças abandonadas ou naufragadas"
                />
              </v-expansion-panel-header>
              <v-expansion-panel-content class="ml-6" v-for="(obj, index) in reativNaufragio" :key="index">
                <div @click="openInfoBox(obj, true)" class="py-2 feature-div" > • {{obj.geometry.coordinates}}</div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panel-content>
        </v-expansion-panel>


<!-- PAINEL 3 -->
        <v-expansion-panel flat hover inset tile>
          <v-expansion-panel-header flat>
            <v-checkbox
              hide-details
              @click.native="check($event)"
              v-model="checkbox20"
              label="Estruturas de apoio, provenientes da Indústria Petrolífera"
            />
          </v-expansion-panel-header>
        

          <v-expansion-panel-content flat class="pa-0 ma-0">

            <v-expansion-panel flat hover inset tile class="max-expand">

              <v-expansion-panel-header class="sticky" @click="mostrarFeature">
                <v-checkbox
                  hide-details
                  v-model="checkbox31"
                  label="Estaleiro"
                />
              </v-expansion-panel-header>

              <v-expansion-panel-content class="ml-6" v-for="(obj, index) in reativEstaleiro" :key="index">
                <div @click="openInfoBox(obj, true)" class="py-2 feature-div" > • {{obj.geometry.coordinates}}</div>
              </v-expansion-panel-content>

            </v-expansion-panel>

            <v-expansion-panel flat hover inset tile class="max-expand">
              <v-expansion-panel-header class="sticky" @click="mostrarFeature">
                <v-checkbox
                  hide-details
                  v-model="checkbox32"
                  label="Dutos (oleodutos, gasodutos)"
                />
              </v-expansion-panel-header>
              <v-expansion-panel-content class="ml-6" v-for="(obj, index) in reativDutos" :key="index">
                <div @click="openInfoBox(obj, true)" class="py-2 feature-div" > • {{obj.geometry.coordinates}}</div>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel flat hover inset tile class="max-expand">
              <v-expansion-panel-header class="sticky" @click="mostrarFeature">
                <v-checkbox
                  v-model="checkbox33 "
                  label="Terminal Aquaviário de Gás e Petróleo"
                />
              </v-expansion-panel-header>
              <v-expansion-panel-content class="ml-6" v-for="(obj, index) in reativTerminal" :key="index">
                <div @click="openInfoBox(obj, true)" class="py-2 feature-div" > • {{obj.geometry.coordinates}}</div>
              </v-expansion-panel-content>
            </v-expansion-panel>


            <v-expansion-panel flat hover inset tile class="max-expand">
              <v-expansion-panel-header class="sticky" @click="mostrarFeature">
                <v-checkbox
                  v-model="checkbox34"
                  label="Plataforma ou Píer"
                />
              </v-expansion-panel-header>
              <v-expansion-panel-content class="ml-6" v-for="(obj, index) in reativPlataforma" :key="index">
                <div @click="openInfoBox(obj, true)" class="py-2 feature-div" > • {{obj.geometry.coordinates}}</div>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel flat hover inset tile class="max-expand">
              <v-expansion-panel-header class="sticky" @click="mostrarFeature">
                <v-checkbox
                  v-model="checkbox35"
                  label="Refinarias"
                />
              </v-expansion-panel-header>
              <v-expansion-panel-content class="ml-6" v-for="(obj, index) in reativRefinaria" :key="index">
                <div @click="openInfoBox(obj, true)" class="py-2 feature-div" > • {{obj.geometry.coordinates}}</div>
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      
      <v-list-item class="pl-6" v-for="(layer, index) in poligonos" :key="index">
        <v-checkbox
          @click="mapShow(layer.value)"
          v-model="layer.visibility"
          :label="layer.name"
          hide-details
        >
        </v-checkbox>
      </v-list-item>
    </div>
    <div>
      <!-- <div class="layers-container hidden-sm-and-down" style="z-index: 2">
        <v-list rounded class="mb-4">
          <div class="text-subtitle-1">Dados</div>
          <v-list-item v-for="(layer, index) in layers" :key="index">
            <v-checkbox
              @click="mapShow(layer.value)"
              v-model="layer.visibility"
              :label="layer.name"
              hide-details
            >
            </v-checkbox>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list rounded class="mb-4">
          <div class="text-subtitle-1">Passivos</div>
          <v-list-item v-for="(layer, index) in passivos" :key="index">px
            <v-checkbox
              @click="mapShow(layer.value)"
              v-model="layer.visibility"
              :label="layer.name"
              hide-details
            >
            </v-checkbox>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list rounded class="mb-4">
          <div class="text-subtitle-1">Poligonos</div>
          <v-list-item v-for="(layer, index) in poligonos" :key="index">
            <v-checkbox
              @click="mapShow(layer.value)"
              v-model="layer.visibility"
              :label="layer.name"
              hide-details
            >
            </v-checkbox>
          </v-list-item>
        </v-list>
      </div> -->
      <v-dialog v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            large
            rounded
            class="hidden-md-and-up legend-container"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list rounded class="mb-4">
            <div class="text-subtitle-1">Dados</div>
            <v-list-item v-for="(layer, index) in layers" :key="index">
              <v-checkbox
                @click="mapShow(layer.value)"
                v-model="layer.visibility"
                :label="layer.name"
                hide-details
              >
              </v-checkbox>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list rounded class="mb-4">
            <div class="text-subtitle-1">Passivos</div>
            <v-list-item v-for="(layer, index) in passivos" :key="index">
              <v-checkbox
                @click="mapShow(layer.value)"
                v-model="layer.visibility"
                :label="layer.name"
                hide-details
              >
              </v-checkbox>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list rounded class="mb-4">
            <div class="text-subtitle-1">Poligonos</div>
            <v-list-item v-for="(layer, index) in poligonos" :key="index">
              <v-checkbox
                @click="mapShow(layer.value)"
                v-model="layer.visibility"
                :label="layer.name"
                hide-details
              >
              </v-checkbox>
            </v-list-item>
          </v-list>
          <v-card-actions class="d-flex justify-end">
            <v-btn text @click="dialog = false"> Fechar </v-btn></v-card-actions
          >
        </v-card>
      </v-dialog>
    </div>
    <MglMap
      @click="opentestekey = false"
      @load="onMapLoaded"
      class="mapa"
      :accessToken="accessToken"
      logoPosition="bottom-right"
      :mapStyle="mapStyle"
      :center="center"
      :zoom="zoom"
    >
      <!-- <MglMarker v-for="marker in markers" :key="marker.index" :coordinates="marker.coord" color="blue">
                    <MglPopup :coordinates="marker.coord">
                    <div>
                        <h3>{{marker.categories}}</h3>
                        <div v-if="marker.elements" class="d-flex justify-center">                        
                            <h5 v-for="(element, index) in marker.elements" :key="element + index">{{element}}</h5>
                        </div>
                        <v-carousel
                            cycle
                            v-if="marker.img.length > 1"
                            height="200"
                            hide-delimiter-background
                        >
                            <v-carousel-item
                                v-for="(slide, i) in marker.img"
                                :key="i"
                                :src="slide"
                            />
                        </v-carousel>
                        <v-img v-else :src="marker.img[0]"></v-img>
                        <ul>
                            <li v-for="(impact, index) in marker.impacts" :key="impact + index">{{impact}}</li>
                        </ul>  
                    </div>
                </MglPopup>
            </MglMarker> -->
    </MglMap>
  </v-container>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/no-unused-vars */
import estaleiros from "../assets/estaleiros.geojson";
import pescadores from "../assets/pescadores.geojson";
import ilhas from "../assets/ilhas.geojson";
import entidades from "../assets/entidades.geojson";
import refinarias from "../assets/refinarias.geojson";
import blocosExploratorios from "../assets/blocos_exploratorios.geojson";
import baciaHidrografica from "../assets/bacia_hidrografica.geojson";
import baciaSedimentar from "../assets/bacia_sedimentar.geojson";
import camposProducao from "../assets/campos_producao.geojson";
import municipios from "../assets/municipios.geojson";
import unidades from "../assets/unidades.geojson";

import { MglMap, MglMarker, MglPopup, MglGeojsonLayer } from "vue-mapbox";
import Mapbox from "mapbox-gl";
import axios from "axios";


import refinariaIcon from "../assets/refinery.png";
import noImage from "../assets/noimage.png"
import pescadoresIcon from "../assets/fishing-net.png";
import island from "../assets/island.png";
import entidadesIcon from "../assets/hands.png";
import shipyard from "../assets/shipyard.png";
import mapMarker from "../assets/map-marker.png";
import GeoJSON from "geojson";
import polylabel from "polylabel";

let map = null;

export default {
  name: "HomeIndex2",
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglGeojsonLayer,
  },
  computed: {
    getDialogPhoto() {
      if (this.dialogContent.photos == "[]")
        return this.noImage;
      return this.dialogContent.photos;
    },
    isSatellite() {
      return this.mapStyle == this.styleSatellite ? true : false;
    },
  },
  data() {
    return {
      noImage: noImage,
      asyncActions: null,
      painel1: [0,1,2,3,4,5,6],
      testeRatividadeArea: [],
      testeReativBoia: [],
      reativPlacas: [],
      reativDragagem: [],
      reativEmbarcacoesGrande: [],
      reativRebocador: [],
      reativNaufragio: [],
      reativEstaleiro: [],
      reativDutos: [],
      reativTerminal: [],
      reativPlataforma: [],
      reativRefinaria: [],
      reativInstalacao: [],
      reativEmpresaPetroleo: [],
      reativObra: [],
      checkbox: true,
      checkbox2: true,
      checkbox3: true,
      checkbox4: true,
      checkbox5: true,
      checkbox6: true,
      checkbox7: true,
      checkbox20: true,
      checkbox21: true,
      checkbox22: true,
      checkbox23: true,
      checkbox30: true,
      checkbox31: true,
      checkbox32: true,
      checkbox33: true,
      checkbox34: true,
      checkbox35: true,
      checkbox36: true,
      checkbox37: true,
      checkbox38: true,
      checkbox39: true,
      checkbox40: true,
      radioGroup: 1,
      switch1: true,
      shouldResponseLoad: {
        map: false,
        fetch: false,
      },
      dialog: false,
      layers2: [
        {
          name: "Áreas de Fundeio",
          value: "areasFundeio",
          visibility: true,
        },
        {
          name: "Rotas de Embarcações de Grande Porte",
          value: "rotas",
          visibility: true,
        },
        {
          name: "Estruturas de apoio, provenientes da Indústria Petrolífera",
          value: "estruturas",
          visibility: true,
        },
      ],
      layers: [
        {
          name: "Pescadores",
          value: "markers2",
          visibility: true,
        },
        {
          name: "Ilhas",
          value: "markers3",
          visibility: true,
        },
        {
          name: "Entidades",
          value: "entidades",
          visibility: true,
        },
        {
          name: "Estaleiros",
          value: "estaleiros",
          visibility: true,
        },
        {
          name: "Refinarias",
          value: "refinarias",
          visibility: true,
        },
      ],
      passivos: [
        {
          name: "Rotas de embarcação",
          value: "markers",
          visibility: true,
        },
        {
          name: "Áreas de fundeio",
          value: "areas-marker",
          visibility: true,
        },
        {
          name: "Estruturas de apoio",
          value: "estruturas",
          visibility: true,
        },
      ],
      poligonos: [
        {
          name: "Unidades de conservação",
          value: "unidades",
          visibility: true,
        },
        {
          name: "Campos de produção",
          value: "campos",
          visibility: true,
        },
        {
          name: "Blocos exploratórios",
          value: "blocos",
          visibility: true,
        },
        {
          name: "Bacia hidrográfica",
          value: "bacia-line",
          visibility: false,
        },
        {
          name: "Bacia sedimentar",
          value: "bacia-sedimentar-line",
          visibility: false,
        },
        {
          name: "Municipios",
          value: "municipios",
          visibility: true,
        },
      ],
      estaleiros: estaleiros,
      pescadores: pescadores,
      ilhas: ilhas,
      entidades: entidades,
      refinarias: refinarias,
      blocosExploratorios: blocosExploratorios,
      baciaHidrografica: baciaHidrografica,
      baciaSedimentar: baciaSedimentar,
      camposProducao: camposProducao,
      municipios: municipios,
      unidades: unidades,
      responseData: null,
      opentestekey: false,
      opentestecontent: "",
      dialogContent: {
        elements: [],
      },
      accessToken:
        "pk.eyJ1IjoiZGVvbGhvbmFiYWlhIiwiYSI6ImNrd202Njl6ZjA4dnYycnBqcnVseGRwdGIifQ.eBIRx2mq5aazdWvHwXEc2A",
      mapStyle: "mapbox://styles/deolhonabaia/ckz63btci000w14nn74e59vnz",
      styleOutdoors: "mapbox://styles/deolhonabaia/ckz63btci000w14nn74e59vnz",
      styleSatellite: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [-43.12725, -22.81692],
      zoom: 12,
      markers: [],
      coordCampo: [],
    };
  },
  methods: {
    unselectAll(){
      this.layers.forEach(x => {x.visibility = false})
      this.poligonos.forEach(x => {x.visibility = false})
      this.passivos.forEach(x => {x.visibility = false})
    },
    selectAll(){
      this.layers.forEach(x => {x.visibility = true})
      this.poligonos.forEach(x => {x.visibility = true})
      this.passivos.forEach(x => {x.visibility = true})
    },
    paint(){
      console.log()
    },
    check: function(e) {
      e.cancelBubble = true;
    },
    changeFeatureVisibility(feature){
      map.setFeatureState(
            { source: "rotas", id: 3 },
            { hover: feature.key }
          );
    },
    loadResponseLayerData(){      
      const features = map.querySourceFeatures('rotas', {
        sourceLayer: 'markers'
      });

      const featuresArea = map.querySourceFeatures('areas-source', {
        sourceLayer: 'areas-marker'
      });

      const featuresEstrutura = map.querySourceFeatures('estruturas', {
        sourceLayer: 'estruturas'
      });

      this.testeReativBoia = features.filter((feat) => feat.properties.elements == 'Boias de Sinalização e demarcação de rotas')
      this.reativPlacas = features.filter((feat) => feat.properties.elements == 'Placas e postes de sinalização e informativos')
      this.reativDragagem = features.filter((feat) => feat.properties.elements == 'Atividade de dragagem')

      this.reativEmbarcacoesGrande = featuresArea.filter((feat) => feat.properties.elements == 'Embarcações de grande porte')
      this.reativRebocador = featuresArea.filter((feat) => feat.properties.elements == 'Rebocadores')
      this.reativNaufragio = featuresArea.filter((feat) => feat.properties.elements == 'Embarcações e carcaças abandonadas ou naufragadas')

      this.reativEstaleiro = featuresEstrutura.filter((feat) => feat.properties.elements == 'Estaleiro')
      this.reativDutos = featuresEstrutura.filter((feat) => feat.properties.elements == 'Dutos (oleodutos, gasodutos)')
      this.reativTerminal = featuresEstrutura.filter((feat) => feat.properties.elements == 'Terminal Aquaviário de Gás e Petróleo')
      this.reativPlataforma = featuresEstrutura.filter((feat) => feat.properties.elements == 'Plataforma ou Píer')
      this.reativRefinaria = featuresEstrutura.filter((feat) => feat.properties.elements == 'Refinarias')
      this.reativInstalacao = featuresEstrutura.filter((feat) => feat.properties.elements == 'Instalação Portuária')
      this.reativEmpresaPetroleo = featuresEstrutura.filter((feat) => feat.properties.elements == 'Empresas de derivados do Petróleo')
      this.reativObra = featuresEstrutura.filter((feat) => feat.properties.elements == 'Frente de obras/manutenção')
    },
    tirarFeature(){
          map.setFeatureState(
            { source: "rotas", id: 3 },
            { hover: false }
          );
    },
    mostrarFeature() {
      console.log(`mostrar feature`, map)  
      map.setFeatureState(
        { source: "rotas", id: 3 },
        { hover: true }
      );

    },
    mapShow(layerId) {
      const visibility = map.getLayoutProperty(layerId, "visibility");
      const isFill = map.getLayer(layerId).type;
      let state = null;
      state = visibility == "visible" ? "none" : "visible";
      map.setLayoutProperty(layerId, "visibility", state);
      if (isFill == "fill") {
        map.setLayoutProperty(`${layerId}-line`, "visibility", state);
      }
    },
    openInfoBox(feature, isPanel) {
      if (isPanel){
        this.asyncActions.easeTo({
          center: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
          zoom: 13,
          speed: 1
        }) 
      }
      this.dialogContent = {
        photos: feature.properties.photo,
        createdAt: new Date(feature.properties.createdAt).toLocaleDateString('pt-BR', {year: 'numeric', month: '2-digit', day: '2-digit'}),
        impacts: feature.properties.impacts.split(";"),
        categorie: feature.properties.categories,
        elements: feature.properties.elements.split(";"),
      };
      this.opentestekey = true;
    },
    onMapLoaded(event) {
      map = event.map;
      this.loadData();
      this.loadEvents();      
      this.shouldResponseLoad.map = true;
      this.asyncActions = event.component.actions;
    },
   loadResponseData() {
      let geoJsonMarcadoresRotas = {
        type: "geojson",
        data: GeoJSON.parse(
          this.responseData.filter(
            (x) => x.categories == "Rotas de Embarcações de Grande Porte"
          ),
          { Point: ["lat", "lng"] }
        ),
      };


      // insere ID em cada elemento do geojson de rotas
      let count = 0;
      geoJsonMarcadoresRotas.data.features.forEach((feature) => {
        feature.id = count;
        feature.key = true
        count++;
      });

      count = 0

      let geoJsonMarcadoresAreas = {
        type: "geojson",
        data: GeoJSON.parse(
          this.responseData.filter((x) => x.categories == "Áreas de Fundeio"),
          { Point: ["lat", "lng"] }
        ),
      };

      // insere ID em cada elemento do geojson de areas de fundeio
      geoJsonMarcadoresAreas.data.features.forEach((feature) => {
        feature.id = count;
        feature.key = true
        count++;
      });

      count = 0 
      let geoJsonMarcadoresEstruturas = {
        type: "geojson",
        data: GeoJSON.parse(
          this.responseData.filter(
            (x) => x.categories == "Estruturas de apoio"
          ),
          { Point: ["lat", "lng"] }
        ),
      };

        // insere ID em cada elemento do geojson de estruturas
      geoJsonMarcadoresEstruturas.data.features.forEach((feature) => {
        feature.id = count;
        feature.key = true
        count++;
      });

      map.addSource("rotas", geoJsonMarcadoresRotas);
      map.addSource("areas-source", geoJsonMarcadoresAreas);
      map.addSource("estruturas", geoJsonMarcadoresEstruturas);

      map.addLayer({
        id: "markers",
        type: "symbol",
        source: "rotas",
        paint: {
          "icon-color": "rgb(189, 28, 178)", //só funciona para icones no formato SDF
          "icon-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0,
            1,
          ],
        },
        layout: {
          "icon-image": "map-marker",
          "icon-size": 0.03,
          "icon-allow-overlap": true,
          "visibility": "visible"
        },
      });

      map.addLayer({
        id: "areas-marker",
        type: "symbol",
        source: "areas-source",
        paint: {
          "icon-color": "rgb(189, 28, 178)", //só funciona para icones no formato SDF
        },
        layout: {
          "icon-image": "map-marker",
          "icon-size": 0.03,
          "icon-allow-overlap": true,
          visibility: "visible",
        },
      });

      map.addLayer({
        id: "estruturas",
        type: "symbol",
        source: "estruturas",
        paint: {
          "icon-color": "rgb(189, 28, 178)", //só funciona para icones no formato SDF
        },
        layout: {
          "icon-image": "map-marker",
          "icon-size": 0.03,
          "icon-allow-overlap": true,
          visibility: "visible",
        },
      });


      map.once('idle',() => {
          this.loadResponseLayerData();
        } 
      )
    },
    loadData() {
      if (map.getSource("pescadores")) {
        map.removeLayer("markers2");
        map.removeSource("pescadores");
      }
      map.addSource("pescadores", { type: "geojson", data: this.pescadores });

      map.addSource("blocos", {
        type: "geojson",
        data: this.blocosExploratorios,
      });
      map.addSource("bacia", { type: "geojson", data: this.baciaHidrografica });
      map.addSource("bacia-sedimentar", {
        type: "geojson",
        data: this.baciaSedimentar,
      });

      map.addSource("campos", { type: "geojson", data: this.camposProducao });
      map.addSource("municipios", { type: "geojson", data: this.municipios });
      map.addSource("unidades", { type: "geojson", data: this.unidades });

      if (map.getSource("refinarias")) {
        map.removeLayer("markers");
        map.removeSource("refinarias");
      }
      map.addSource("refinarias", { type: "geojson", data: this.refinarias });

      if (map.getSource("ilhas")) {
        map.removeLayer("markers3");
        map.removeSource("ilhas");
      }

      map.addSource("ilhas", { type: "geojson", data: this.ilhas });

      if (map.getSource("estaleiros")) {
        map.removeLayer("estaleiros");
        map.removeSource("estaleiros");
      }

      map.addSource("estaleiros", { type: "geojson", data: this.estaleiros });

      if (map.getSource("entidades")) {
        map.removeLayer("entidades");
        map.removeSource("entidades");
      }

      map.addSource("entidades", { type: "geojson", data: this.entidades });

      map.addLayer({
        id: "refinarias",
        type: "symbol",
        source: "refinarias",
        paint: {
          "icon-color": "rgb(189, 28, 178)", //só funciona para icones no formato SDF
        },
        layout: {
          "icon-image": "refinery",
          "icon-size": 0.1,
          visibility: "visible",
        },
      });

      map.addLayer({
        id: "refinarias-line",
        type: "line",
        source: "refinarias",
        layout: {
          visibility: "visible",
        },
        paint: {
          "line-color": "rgb(0,0,0)",
          "line-width": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.8,
            1,
          ],
        },
      });

      map.addLayer({
        id: "blocos",
        type: "fill",
        source: "blocos",
        layout: {
          visibility: "visible",
        },
        paint: {
          "fill-color": "rgba(224, 31, 31, 0.64)",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0.7,
          ],
        },
      });
      map.addLayer({
        id: "blocos-line",
        type: "line",
        source: "blocos",
        layout: {
          visibility: "visible",
        },
        paint: {
          "line-color": "rgb(0,0,0)",
          "line-width": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.8,
            1,
          ],
        },
      });

      map.addLayer({
        id: "unidades",
        type: "fill",
        source: "unidades",
        layout: {
          visibility: "visible",
        },
        paint: {
          "fill-color": "rgb(60, 233, 36)",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.32,
            0.18,
          ],
        },
      });
      map.addLayer({
        id: "unidades-line",
        type: "line",
        source: "unidades",
        layout: {
          visibility: "visible",
        },
        paint: {
          "line-color": "rgb(0,0,0)",
          "line-width": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1.5,
            1,
          ],
        },
      });
      map.addLayer({
        id: "municipios",
        type: "fill",
        source: "municipios",
        layout: {
          visibility: "visible",
        },
        paint: {
          "fill-color": "rgb(245, 40, 145)",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.1,
            0.1,
          ],
        },
      });
      map.addLayer({
        id: "municipios-line",
        type: "line",
        source: "municipios",
        layout: {
          visibility: "visible",
        },
        paint: {
          "line-color": "rgb(0,0,0)",
          "line-width": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1.5,
            1,
          ],
        },
      });

      map.addLayer({
        id: "campos",
        type: "fill",
        source: "campos",
        layout: {
          visibility: "visible",
        },
        paint: {
          "fill-color": "rgb(245, 40, 145)",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.5,
            0.8,
          ],
        },
      });

      map.addLayer({
        id: "campos-line",
        type: "line",
        source: "campos",
        layout: {
          visibility: "visible",
        },
        paint: {
          "line-color": "rgb(0,0,0)",
          "line-width": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1.5,
            1,
          ],
        },
      });

      // map.addLayer({
      //   id: "bacia",
      //   type: "fill",
      //   source: "bacia",
      //   paint: {
      //     "fill-color": "rgb(245, 40, 145)",
      //     "fill-opacity": [
      //       "case",
      //       ["boolean", ["feature-state", "hover"], false],
      //       0.001,
      //       0.001,
      //     ],
      //   },
      // });
      map.addLayer({
        id: "bacia-line",
        type: "line",
        source: "bacia",
        layout: {
          visibility: "none",
        },
        paint: {
          "line-color": "rgb(0,0,0)",
          "line-width": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1.5,
            1,
          ],
        },
      });
      // map.addLayer({
      //   id: "bacia-sedimentar",
      //   type: "fill",
      //   source: "bacia-sedimentar",
      //   paint: {
      //     "fill-color": "rgb(245, 40, 145)",
      //     "fill-opacity": [
      //       "case",
      //       ["boolean", ["feature-state", "hover"], false],
      //       0.001,
      //       0.001,
      //     ],
      //   },
      // });
      map.addLayer({
        id: "bacia-sedimentar-line",
        type: "line",
        source: "bacia-sedimentar",
        layout: {
          visibility: "none",
        },
        paint: {
          "line-color": "rgb(0,0,0)",
          "line-width": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1.5,
            1,
          ],
        },
      });

      // pescadores
      map.addLayer({
        id: "markers2",
        type: "symbol",
        source: "pescadores",
        paint: {
          "text-color": "#fff",
        },
        layout: {
          "icon-image": "pescadores-icon",
          "icon-size": 0.7,
          "icon-ignore-placement": false,
          "icon-allow-overlap": false,
          visibility: "visible",
        },
      });

      map.addLayer({
        id: "markers3",
        type: "symbol",
        source: "ilhas",
        paint: {
          "text-color": "#fff",
        },
        layout: {
          "icon-image": "island",
          "icon-size": 0.1,
          "icon-ignore-placement": false,
          visibility: "visible",
        },
      });

      map.addLayer({
        id: "entidades",
        type: "symbol",
        source: "entidades",
        paint: {
          "text-color": "#fff",
        },
        layout: {
          "icon-image": "entidades-icon",
          "icon-size": 0.1,
          "icon-allow-overlap": false,
          "icon-ignore-placement": false,
          visibility: "visible",
        },
      });

      map.addLayer({
        id: "estaleiros",
        type: "symbol",
        source: "estaleiros",
        paint: {
          "text-color": "#fff",
        },
        layout: {
          "icon-image": "shipyard",
          "icon-allow-overlap": false,
          "icon-size": 0.1,
          visibility: "visible",
        },
      });

      // Adiciona layer de markers

      map.loadImage(island, (error, image) => {
        if (error) throw error;
        map.addImage("island", image);
      });
      map.loadImage(mapMarker, (error, image) => {
        if (error) throw error;
        map.addImage("map-marker", image);
      });

      map.loadImage(refinariaIcon, (error, image) => {
        if (error) throw error;
        map.addImage("refinery", image);
      });
      map.loadImage(pescadoresIcon, (error, image) => {
        if (error) throw error;
        map.addImage("pescadores-icon", image);
      });
      map.loadImage(entidadesIcon, (error, image) => {
        if (error) throw error;
        map.addImage("entidades-icon", image);
      });

      map.loadImage(shipyard, (error, image) => {
        if (error) throw error;
        map.addImage("shipyard", image);
      });
    },
    loadEvents(){
      map.on("click", "markers", (e) => {
        console.log("click markers", e);
        this.openInfoBox(e.features[0], false);
      });
      map.on("click", "areas-marker", (e) => {
        this.openInfoBox(e.features[0], false);
      });
      map.on("click", "estruturas", (e) => {
        this.openInfoBox(e.features[0], false);
      });

      let hoveredStateId = null;


      map.on("mousemove", "blocos", (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = e.features.length ? "pointer" : "";
          if (hoveredStateId !== null) {
            map.setFeatureState(
              { source: "blocos", id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: "blocos", id: hoveredStateId },
            { hover: true }
          );
        }
      });
      map.on("mousemove", "campos", (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = e.features.length ? "pointer" : "";
          if (hoveredStateId !== null) {
            map.setFeatureState(
              { source: "campos", id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: "campos", id: hoveredStateId },
            { hover: true }
          );
        }
      });
      map.on("mousemove", "unidades", (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = e.features.length ? "pointer" : "";
          if (hoveredStateId !== null) {
            map.setFeatureState(
              { source: "unidades", id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: "unidades", id: hoveredStateId },
            { hover: true }
          );
        }
      });

      map.on("mousemove", "municipios", (e) => {
          if (e.features.length > 0) {
            map.getCanvas().style.cursor = e.features.length ? "pointer" : "";
            if (hoveredStateId !== null) {
              map.setFeatureState(
                { source: "municipios", id: hoveredStateId },
                { hover: false }
              );
            }
            hoveredStateId = e.features[0].id;
            map.setFeatureState(
              { source: "municipios", id: hoveredStateId },
              { hover: true }
            );
          }
        });

        map.on("mouseleave", "municipios", () => {
          map.getCanvas().style.cursor = "";
          if (hoveredStateId !== null) {
            map.setFeatureState(
              { source: "municipios", id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = null;
      });


      map.on("mousemove", "bacia", (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = e.features.length ? "pointer" : "";
          if (hoveredStateId !== null) {
            map.setFeatureState(
              { source: "bacia", id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: "bacia", id: hoveredStateId },
            { hover: true }
          );
        }
      });
      map.on("mousemove", "bacia-sedimentar", (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = e.features.length ? "pointer" : "";
          if (hoveredStateId !== null) {
            map.setFeatureState(
              { source: "bacia-sedimentar", id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: "bacia-sedimentar", id: hoveredStateId },
            { hover: true }
          );
        }
      });

      map.on("mouseleave", "unidades", () => {
        map.getCanvas().style.cursor = "";
        if (hoveredStateId !== null) {
          map.setFeatureState(
            { source: "unidades", id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
      });

      map.on("mouseleave", "campos", () => {
        map.getCanvas().style.cursor = "";
        if (hoveredStateId !== null) {
          map.setFeatureState(
            { source: "campos", id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
      });

      map.on("mouseleave", "bacia", () => {
        map.getCanvas().style.cursor = "";
        if (hoveredStateId !== null) {
          map.setFeatureState(
            { source: "bacia", id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
      });
      map.on("mouseleave", "bacia-sedimentar", () => {
        map.getCanvas().style.cursor = "";
        if (hoveredStateId !== null) {
          map.setFeatureState(
            { source: "bacia-sedimentar", id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
      });

      map.on("mouseleave", "blocos", () => {
        map.getCanvas().style.cursor = "";
        if (hoveredStateId !== null) {
          map.setFeatureState(
            { source: "blocos", id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
      });

      map.on("mouseleave", "bacia", () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("mouseleave", "blocos", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("mousemove", "markers", (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = e.features.length ? "pointer" : "";
        }
      });

      map.on("mouseleave", "markers", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("mousemove", "areas-marker", (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = e.features.length ? "pointer" : "";
        }
      });

      map.on("mouseleave", "areas-marker", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("mousemove", "estruturas", (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = e.features.length ? "pointer" : "";
        }
      });

      map.on("mouseleave", "estruturas", () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("mousemove", "markers2", (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = e.features.length ? "pointer" : "";
        }
      });

      map.on("mouseleave","markers2", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("mousemove", "markers3", (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = e.features.length ? "pointer" : "";
        }
      });

      map.on("mouseleave", "markers3", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("mousemove", "entidades", (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = e.features.length ? "pointer" : "";
        }
      });

      map.on("mouseleave", "entidades", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("mousemove", "estaleiros", (e) => {
        if (e.features.length > 0) {
          map.getCanvas().style.cursor = e.features.length ? "pointer" : "";
        }
      });

      map.on("mouseleave", "estaleiros", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "unidades", (e) => {
        var p = polylabel(e.features[0].geometry.coordinates, 1.0);
        let coordinates;
        if (isNaN(p[0])){
          coordinates = e.lngLat
        } else {
          coordinates = p
        }
        const nome = e.features[0].properties.nome;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        var htmlpopup = `
        <div style="font-size:14px;font-family:Roboto;padding:4px 6px">Nome: ${nome}</div>
        `;

        new Mapbox.Popup({ className: "popup-class" })
          .setLngLat(coordinates)
          .setHTML(htmlpopup)
          .addTo(map);
      });


      map.on("click", "municipios", (e) => {
        console.log('e', e)
        var p = polylabel(e.features[0].geometry.coordinates, 1.0);
        let coordinates;
        if (isNaN(p[0])){
          coordinates = e.lngLat
        } else {
          coordinates = p
        }
        const nome = e.features[0].properties.NM_MUN;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        var htmlpopup = `
        <div style="font-size:14px;font-family:Roboto;padding:4px 6px">Nome: ${nome}</div>
        `;

        new Mapbox.Popup({ className: "popup-class" })
          .setLngLat(coordinates)
          .setHTML(htmlpopup)
          .addTo(map);
      });

      map.on("click", "blocos", (e) => {
        var p = polylabel(e.features[0].geometry.coordinates, 1.0);

        const coordinates = p;
        const description = e.features[0].properties.OPERADOR_C;
        const nome = e.features[0].properties.NOM_BACIA;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        var htmlpopup = `
        <div style="font-size:14px;font-family:Roboto;padding:4px 6px">Nome bacia: ${nome}</div>
        <div style="font-size:14px;font-family:Roboto;padding:4px 6px">Operador: ${description}</div>
        `;

        new Mapbox.Popup({ className: "popup-class" })
          .setLngLat(coordinates)
          .setHTML(htmlpopup)
          .addTo(map);
      });
      map.on("click", "campos", (e) => {
        var p = polylabel(e.features[0].geometry.coordinates, 1.0);

        const coordinates = p;
        const description = e.features[0].properties.OPERADOR_C;
        const nome = e.features[0].properties.NOM_CAMPO;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        var htmlpopup = `
        <div style="font-size:14px;font-family:Roboto;padding:4px 6px">Nome: ${nome}</div>
        <div style="font-size:14px;font-family:Roboto;padding:4px 6px">Operador: ${description}</div>
        `;

        new Mapbox.Popup({ className: "popup-class" })
          .setLngLat(coordinates)
          .setHTML(htmlpopup)
          .addTo(map);
      });

      map.on("click", "markers2", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.Name;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        var htmlpopup = `<div style="font-size:14px;font-family:Roboto;padding:4px 6px">${description}</div>`;

        new Mapbox.Popup({ className: "popup-class" })
          .setLngLat(coordinates)
          .setHTML(htmlpopup)
          .addTo(map);
      });
      map.on("click", "markers3", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.Name;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        var htmlpopup = `<div style="font-size:14px;font-family:Roboto;padding:4px 6px">${description}</div>`;

        new Mapbox.Popup({ className: "popup-class" })
          .setLngLat(coordinates)
          .setHTML(htmlpopup)
          .addTo(map);
      });
      map.on("click", "entidades", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.Name;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        var htmlpopup = `<div style="font-size:14px;font-family:Roboto;padding:4px 6px">${description}</div>`;

        new Mapbox.Popup({ className: "popup-class" })
          .setLngLat(coordinates)
          .setHTML(htmlpopup)
          .addTo(map);
      });
      map.on("click", "estaleiros", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.Name;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        var htmlpopup = `<div style="font-size:14px;font-family:Roboto;padding:4px 6px">${description}</div>`;

        new Mapbox.Popup({ className: "popup-class" })
          .setLngLat(coordinates)
          .setHTML(htmlpopup)
          .addTo(map);
      });
      map.on("click", "refinarias", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.Name;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        var htmlpopup = `<div style="font-size:14px;font-family:Roboto;padding:4px 6px">${description}</div>`;

        new Mapbox.Popup({ className: "popup-class" })
          .setLngLat(coordinates)
          .setHTML(htmlpopup)
          .addTo(map);
      });
    },

    async changeStyle() {
      // this.mapStyle =
      //   this.mapStyle == this.styleSatellite
      //     ? this.styleOutdoors
      //     : this.styleSatellite;

      //TODO: arrumar mapa perdendo  layer degeojson quando troca de style
      // await map.setStyle(this.styleSatellite)
      // this.loadData();

      // async function switchBaseMap(map, styleID) {
      // const response = await fetch(
      //   `${this.styleSatellite}`
      // );
      // const responseJson = await response.json();

      const { data: newStyle } = await axios.get(
        `https://api.mapbox.com/styles/v1/mapbox/satellite-v9?access_token=${this.accessToken}`
      );
      // const newStyle = this.styleSatellite;
      const currentStyle = map.getStyle();
      // ensure any sources from the current style are copied across to the new style
      newStyle.sources = Object.assign(
        {},
        currentStyle.sources,
        newStyle.sources
      );

      // find the index of where to insert our layers to retain in the new style
      let labelIndex = newStyle.layers.findIndex((el) => {
        return el.id == "waterway-label";
      });

      // default to on top
      if (labelIndex === -1) {
        labelIndex = newStyle.layers.length;
      }
      const appLayers = currentStyle.layers.filter((el) => {
        // app layers are the layers to retain, and these are any layers which have a different source set
        return (
          el.source &&
          el.source != "mapbox://mapbox.satellite" &&
          el.source != "mapbox" &&
          el.source != "composite"
        );
      });
      newStyle.layers = [
        ...newStyle.layers.slice(0, labelIndex),
        ...appLayers,
        ...newStyle.layers.slice(labelIndex, -1),
      ];
      await map.setStyle(newStyle);
    },
  },
  watch: {
    checkbox2(){
      this.mapShow(`markers`)
      if (!this.checkbox2){
        this.checkbox3 = false
        this.checkbox4 = false
        this.checkbox5 = false
      }
      if (this.checkbox2){
        this.checkbox3 = true
        this.checkbox4 = true
        this.checkbox5 = true
      }
    },
    checkbox20(){
      this.mapShow(`estruturas`)
      if (!this.checkbox20){
        this.checkbox31 = false
        this.checkbox32 = false
        this.checkbox33 = false
        this.checkbox34 = false
        this.checkbox35 = false
      }
      if (this.checkbox20){
        this.checkbox31 = true
        this.checkbox32 = true
        this.checkbox33 = true
        this.checkbox34 = true
        this.checkbox35 = true
      }
    },
    checkbox30(){
      this.mapShow(`areas-marker`)
      if (!this.checkbox30){
        this.checkbox21 = false
        this.checkbox22 = false
        this.checkbox23 = false
      }
      if (this.checkbox30){
        this.checkbox21 = true
        this.checkbox22 = true
        this.checkbox23 = true
      }
    },
    checkbox31(){
      this.mapShow();
    },
    shouldResponseLoad: {
      handler() {
        if (this.shouldResponseLoad.fetch && this.shouldResponseLoad.map) {
          this.loadResponseData();
        }
      },
      deep: true,
    },
  },
  async mounted() {
    const response = await axios.get(
      "https://guanabara-backend.herokuapp.com/location-points?_limit=-1"
    );

    this.responseData = response.data.map((item) => {
      if (item.photo[0]) {
        if (item.photo.length > 1) {
          let photos = new Array();
          item.photo.forEach((element) => {
            photos.push(element.url);
          });
          item.photo = photos;
        } else {
          item.photo = item.photo[0].url;
        }
      }
      return item;
    });

    this.shouldResponseLoad.fetch = true;

    // this.markers = response.data.map((item) => {
    //   let photos;
    //   if (item.photo.length)
    //     photos = item.photo?.map((photo) => photo.formats?.thumbnail?.url);
    //   else
    //     photos = [
    //       "data:image/png;base64,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",
    //     ];
    //   let obj = {
    //     coord: [item.lng, item.lat],
    //     createdAt: item.createdAt,
    //     img: photos,
    //     elements: item.elements.split(";"),
    //     impacts: item.impacts.split(";"),
    //     categories: item.categories,
    //   };
    //   return obj;
    // });
  },
};
</script>
<style scoped>
.popup-class {
  background-color: blue !important;
  width: 200px;
  font-size: 28px;
}
.header-info {
  height: 200px;
  width: 100%;
}
.mapboxgl-popup-content {
  padding: 0px !important;
}

.v-carousel {
  margin: 10px 0px;
}

.style-container {
  position: absolute;
  right: 0;
  z-index: 5;
  background-color: rgba(255, 255, 255);
  border-radius: 10px;
  margin: 5px;
}

.legend-container {
  position: absolute;
  left: 0;
  z-index: 5;
  background-color: rgba(255, 255, 255);
  border-radius: 10px;
  margin: 5px;
}

.max-expand{
  max-height:350px;
  overflow:auto
}
.layers-container {
  z-index: 2; 
  max-width: 30vw;
  width: 25vw;
  max-height:100vh;
  min-height: 99vh;
  overflow: auto;
  background-color: red;
  position: absolute;
  left: 0;
  z-index: 5;
  background-color: rgba(255, 255, 255);
  border-radius: 10px;
  margin: 5px;
}

.feature-div{
  cursor: pointer;
  border-radius: 5px;
  padding-left: 6px
}

.feature-div:hover{
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
}

.sticky {
    top: 0px;
    position: sticky;
    z-index: 100;
    background-color: white;
}

.rotate-img{
   writing-mode: vertical-rl;
   margin: 50px 0 45px 0px;
  transform: rotate(90deg);
  white-space: nowrap;
  display: inline-block;
  overflow: visible;
}

/* .v-list--dense .v-subheader {
    height: 10px;
} */
</style>