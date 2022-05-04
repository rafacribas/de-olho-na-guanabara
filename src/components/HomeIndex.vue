<template>
    <v-container class="pa-0" fluid style="height:100%">
        <router-view style="height:100%"/>
        
                <div class="style-container">             
                    <v-btn large @click="changeStyle()" icon> <v-icon :color="isSatellite ? 'blue' : ''">mdi-satellite-variant</v-icon></v-btn> <br>   
                    <!-- <v-btn @click="">geojson</v-btn>   -->
                </div>
                <!-- <div v-if="opentestekey" class="layers-container hidden-md-and-down">                        
                    <div>
                        <div class="d-flex justify-end">
                        <v-btn class="ma-2" small dense @click="opentestekey = false"><v-icon>mdi-close</v-icon></v-btn>

                        </div>
                        <div>
                            {{opentestecontent}}
                        </div>
                    </div>
                </div> -->
                <div>                        
                    <div class="layers-container hidden-sm-and-down" style="z-index:2">
                        <!-- <div>
                            <v-btn v-for="(layer, index) in layers" :key="index" @click="mapShow(layer.value)">{{layer.name}}</v-btn>                            
                        </div> -->
                        <v-list rounded class="mb-4">
                            <v-list-item v-for="(layer, index) in layers" :key="index">
                                <v-checkbox
                                    @click="mapShow(layer.value)"
                                    v-model="layer.visibility"
                                    :label="layer.name"
                                    hide-details
                                > </v-checkbox>
                            </v-list-item>

                        </v-list>
                    </div>
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
                        <v-card-title class="headline">Filtrar marcadores</v-card-title>
                        <v-list rounded>
                            <v-list-item v-for="(layer, index) in layers" :key="index">
                                <v-checkbox
                                    @click="mapShow(layer.value)"
                                    v-model="layer.visibility"
                                    :label="layer.name"
                                    hide-details
                                > </v-checkbox>
                            </v-list-item>
                            <v-card-actions class=" pa-0 d-flex justify-end">
                                <v-btn text @click="dialog =false">
                                    Fechar
                                </v-btn></v-card-actions>
                        </v-list>
                    </v-card>
                    </v-dialog>

                </div>
                <MglMap 
                    @click="opentestekey=false"
                    @load="onMapLoaded"
                    class="mapa"
                    :accessToken="accessToken"
                    :mapStyle="mapStyle"
                    :center="center"
                    :zoom="zoom"
                    > 

                    <MglMarker v-for="marker in markers" :key="marker.index" :coordinates="marker.coord" color="blue">
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
                    </MglMarker>
                </MglMap>


    </v-container>
    
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/no-unused-vars */

import poligonos from '../assets/poligonos.geojson'
import estaleiros from '../assets/estaleiros.geojson'
import pescadores from '../assets/pescadores.geojson'
import poligonosLabel from '../assets/poligonos-label.geojson'
import ilhas from '../assets/ilhas.geojson'
import entidades from '../assets/entidades.geojson'
import refinarias from '../assets/refinarias.geojson'
import { MglMap, MglMarker,MglPopup, MglGeojsonLayer } from "vue-mapbox";
import marcadores from '../assets/marcadores.geojson'
import Mapbox from 'mapbox-gl'
 // eslint-disable-next-line no-unused-vars
import axios from 'axios'
import polylabel from 'polylabel'
 // eslint-disable-next-line no-unused-vars
/* eslint-disable vue/no-unused-vars */
import oilBarrel from '../assets/oil-barrel.png'
import oilDrop from '../assets/oil-drop.png'
import refinariaIcon from '../assets/refinery.png'
import pescadoresIcon from '../assets/fishing-net.png'
import island from '../assets/island.png'
import entidadesIcon from '../assets/hands.png'
import shipyard from '../assets/shipyard.png'

let map = null;


export default {
    name: 'HomeIndex',
    components: {
        MglMap,
        MglMarker,
        MglPopup,
        MglGeojsonLayer
    },
    computed:{        
        isSatellite(){
            return this.mapStyle == this.styleSatellite ? true : false
        }
    },
    created() {
    // We need to set mapbox-gl library here in order to use it in template
        this.mapbox = Mapbox;
    },
    data(){
        return {
            dialog: false,
            layers: [
                {
                    name: 'Refinarias',
                    value: 'markers',
                    visibility: true
                },
                {
                    name: 'Pescadores',
                    value: 'markers2',
                    visibility: true
                },
                {
                    name: 'Ilhas',
                    value: 'markers3',
                    visibility: true
                },
                {
                    name: 'Entidades',
                    value: 'markers4',
                    visibility: true
                },
                {
                    name: 'Estaleiros',
                    value: 'markers5',
                    visibility: true
                }
            ],
            estaleiros: estaleiros,
            marcadores:marcadores,
            poligonos: poligonos,
            pescadores: pescadores,
            poligonosLabel: poligonosLabel,
            ilhas: ilhas,
            entidades: entidades,
            refinarias: refinarias,
            responseData: null,
            markersData: {
                id : 1,
                type:"FeatureCollection",
                name: "marcadores",
                crs: { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
                features: []
            },
            bounds: [
                [-42.650481, -23.171651],
                [-43.66336, -22.3557]

            ],
            opentestekey: false,
            opentestecontent: '',
            primaryColor: 'rgba(255,150,180,0.98)',
            accessToken: 'pk.eyJ1IjoicmFmYWNyaWJhcyIsImEiOiJjazloZ3R0aW0weWIxM2ZwOWl2bTZ5aHhrIn0.q8zXHOGQxnHffPu-T6L85A',
            mapStyle: 'mapbox://styles/rafacribas/cl1ye632t001j14ms7r26m9md',
            styleOutdoors: 'mapbox://styles/rafacribas/cl1ye632t001j14ms7r26m9md',
            styleSatellite: 'mapbox://styles/mapbox/satellite-streets-v11',
            center: [-43.12725,-22.81692],
            zoom: 12,
            markers: [],
            coordCampo: [],
            geoJsonPoligonos: {
                type: 'geojson',
                data: poligonos
            },
            geoJsonPoligonosLabel: {
                type: 'geojson',
                data: poligonosLabel
            }            
        }
    },
    methods:{    
        adicionarIds(){
            const arr = [

                    {
                        "type": "Feature",
                        "properties": {
                            "Name": "Viaduto sobre o Rio Suruí do sistema de dutos do (COMPERJ), ",
                            "tessellate": -1,
                            "extrude": 0,
                            "visibility": -1
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                            -43.11684270589647,
                            -22.67124964167459,
                            0
                            ]
                        }
                        },
                        {
                        "type": "Feature",
                        "properties": {
                            "Name": "WHITE MARTINS Gases Industriais",
                            "tessellate": -1,
                            "extrude": 0,
                            "visibility": -1
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                            -43.25375,
                            -22.709167,
                            0
                            ]
                        }
                        }
            ];

            for (let i = 0; i < arr.length; i++) {
                arr[i]['id'] = i;
                
            }
            console.log('arr', arr)
            return arr;
        },
        mapShow(layerId){
            const visibility =  map.getLayoutProperty(layerId,'visibility')
            console.log(`visibility`, visibility)
            let state = null;
            state = visibility == 'visible' ? 'none' : 'visible'
            console.log(`state`, state)
            map.setLayoutProperty(layerId, 'visibility', state);

        },
        loadData(){
            console.log(`before removing and adding sources`, map)
            if (map.getSource('pescadores')){
                map.removeLayer('markers2')
                map.removeSource('pescadores')
            }
            map.addSource('pescadores', {type:'geojson',data:this.pescadores})

            if (map.getSource('refinarias')){
                map.removeLayer('markers')
                map.removeSource('refinarias')
            }
            map.addSource('refinarias', {type:'geojson', data:this.refinarias})

            if (map.getSource('ilhas')){
                map.removeLayer('markers3')
                map.removeSource('ilhas')
            }

            map.addSource('ilhas', {type:'geojson', data:this.ilhas})

            if (map.getSource('estaleiros')){
                map.removeLayer('markers5')
                map.removeSource('estaleiros')
            }

            map.addSource('estaleiros', {type:'geojson', data:this.estaleiros})

            if (map.getSource('entidades')){
                map.removeLayer('markers4')
                map.removeSource('entidades')
            }

            map.addSource('entidades', {type:'geojson', data:this.entidades})
            console.log(`sources added`, map)
            // let geoJsonMarcadores = {
                //     type: 'geojson',
            //     data:  GeoJSON.parse(this.responseData,{Point:['lat', 'lng']})
            // }

            // map.addSource('marcadores', geoJsonMarcadores)

            // console.log(`geoJsonMarcadores`, geoJsonMarcadores)

            

            //  Adiciona layer de poligonos
            // map.addLayer({
                //     id: 'poligonos-fill',
            //     type: 'fill',
            //     source: 'poligonos',
            //     paint: {
            //         'fill-color': 'rgb(46, 45, 42)',
            //         'fill-opacity': [
                //             'case',
            //             ['boolean', ['feature-state', 'hover'], false],
            //             1,
            //             0.7
            //         ]
            //     }
            // })
            // Adiciona layer de contorno dos polígonos
            // map.addLayer({
            //     id: 'poligonos-line',
            //     type: 'line',
            //     source: 'poligonos',                
            //     paint: {
                //         'line-color': 'rgb(0,0,0)',
            //         'line-width': [
            //             'case',
            //             ['boolean', ['feature-state', 'hover'], false],
            //             0.8,
            //             1
            //         ]
            //     }
            // })

                map.addLayer({
                    id: "markers",
                    type: "symbol",
                    source: "refinarias",                              
                    paint: {
                        "icon-color": "rgb(189, 28, 178)", //só funciona para icones no formato SDF
    
    
                    },
                    layout: {
                        'icon-image': 'refinery',
                        'icon-size': 0.1,
                        'visibility': 'visible'
                    }
                });
            // pescadores
            map.addLayer({
                id: "markers2",
                type: "symbol",
                source: "pescadores",                              
                paint: {
                    "text-color": "#fff"
                },
                layout: {
                    'icon-image': 'pescadores-icon',
                    'icon-size': 0.1    ,
                    'icon-ignore-placement': true,
                    'visibility': 'visible'
                }
            });

            map.addLayer({
                id: "markers3",
                type: "symbol",
                source: "ilhas",                              
                paint: {
                    "text-color": "#fff"
                },
                layout: {
                    'icon-image': 'island',
                    'icon-size': 0.1    ,
                    'icon-ignore-placement': true,
                    'visibility': 'visible'
                }
            });

            map.addLayer({
                id: "markers4",
                type: "symbol",
                source: "entidades",                              
                paint: {
                    "text-color": "#fff"
                },
                layout: {
                    'icon-image': 'entidades-icon',
                    'icon-size': 0.1    ,
                    'icon-ignore-placement': true,
                    'visibility': 'visible'
                }
            });

            map.addLayer({
                id: "markers5",
                type: "symbol",
                source: "estaleiros",                              
                paint: {
                    "text-color": "#fff"
                },
                layout: {
                    'icon-image': 'shipyard',
                    'icon-size': 0.1    ,
                    'visibility': 'visible'
                }
            });

            console.log(`layers added`, map)
            //  Adiciona layer de título dos polígonos zzzz
            // map.addLayer({
            //     id: "labels",
            //     type: "symbol",
            //     source: "poligonos-label",                              
            //     paint: {
            //         "text-color": "#fff"
            //     },
            //     layout: {
            //         'text-field':['get', 'name'],
            //         "text-anchor": "center",
            //         "icon-allow-overlap": true
            //     }
            // });

            // Adiciona layer de markers
            map.loadImage(
                oilBarrel,
                (error, image) => {
                    if (error) throw error;
                    map.addImage('oil-icon', image);
                }
            );
            map.loadImage(
                island,
                (error, image) => {
                    if (error) throw error;
                    map.addImage('island', image);
                }
            );
            
            map.loadImage(
                refinariaIcon,
                (error, image) => {
                    if (error) throw error;
                    map.addImage('refinery', image);
                }
            );
            map.loadImage(
                pescadoresIcon,
                (error, image) => {
                    if (error) throw error;
                    map.addImage('pescadores-icon', image);
                }
            );
            map.loadImage(
                entidadesIcon,
                (error, image) => {
                    if (error) throw error;
                    map.addImage('entidades-icon', image);
                }
            );

            map.loadImage(
                shipyard,
                (error, image) => {
                    if (error) throw error;
                    map.addImage('shipyard', image);
                }
            );
            
            map.loadImage(
                oilDrop,
                (error, image) => {
                    if (error) throw error;
                    map.addImage('oil-drop', image);
                }
            );

        },
        openteste(data){
            this.opentestecontent = data;
            this.opentestekey = !this.opentestekey
        },
        onMapLoaded(event) {
            map = event.map
            this.loadData()

            let hoveredStateId = null;            
            //  MOUSE ENTER
            map.on('mousemove', 'poligonos-fill', (e) => {
                if (e.features.length > 0) {
                    map.getCanvas().style.cursor = e.features.length ? 'pointer' : '';
                    if (hoveredStateId !== null){
                        map.setFeatureState(
                            {source: 'poligonos', id: hoveredStateId},
                            {hover: false}
                        );
                    }
                    hoveredStateId = e.features[0].id;
                    map.setFeatureState(
                        { source: 'poligonos', id: hoveredStateId },
                        { hover: true }
                    );
                }
            })

            //  MOUSE LEAVE
            map.on('mouseleave', 'poligonos-fill', () => {
                map.getCanvas().style.cursor = ''
                if (hoveredStateId !== null) {
                    map.setFeatureState(
                        { source: 'poligonos', id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;
            });

            map.on('click', 'poligonos-fill', (e) => {
                this.openInfoBox(e.features[0])
            });

            map.on('click', 'markers', (e) => {
                this.openInfoBox(e.features[0])
            });
            map.on('click', 'markers2', (e) => {
                this.openInfoBox(e.features[0])
            });
            map.on('click', 'markers3', (e) => {
                this.openInfoBox(e.features[0])
            });
            map.on('click', 'markers4', (e) => {
                this.openInfoBox(e.features[0])
            });
            map.on('click', 'markers5', (e) => {
                this.openInfoBox(e.features[0])
            });


            map.on('mousemove', 'markers', (e) => {
                if (e.features.length > 0) {
                    map.getCanvas().style.cursor = e.features.length ? 'pointer' : '';
                }
            })

            map.on('mouseleave', 'markers', () => {
                map.getCanvas().style.cursor = ''
            })
            map.on('mousemove', 'markers2', (e) => {
                if (e.features.length > 0) {
                    map.getCanvas().style.cursor = e.features.length ? 'pointer' : '';
                }
            })

            map.on('mouseleave', 'markers2', () => {
                map.getCanvas().style.cursor = ''
            })

            map.on('mousemove', 'markers3', (e) => {
                if (e.features.length > 0) {
                    map.getCanvas().style.cursor = e.features.length ? 'pointer' : '';
                }
            })

            map.on('mouseleave', 'markers3', () => {
                map.getCanvas().style.cursor = ''
            })

            map.on('mousemove', 'markers4', (e) => {
                if (e.features.length > 0) {
                    map.getCanvas().style.cursor = e.features.length ? 'pointer' : '';
                }
            })

            map.on('mouseleave', 'markers4', () => {
                map.getCanvas().style.cursor = ''
            })

            map.on('mousemove', 'markers5', (e) => {
                if (e.features.length > 0) {
                    map.getCanvas().style.cursor = e.features.length ? 'pointer' : '';
                }
            })

            map.on('mouseleave', 'markers5', () => {
                map.getCanvas().style.cursor = ''
            })

            map.on('click', 'markers', (e) => {

                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.Name;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                var htmlpopup = `<div style="font-size:18px;font-family:Roboto;padding:4px 6px">${description}</div>`

                new Mapbox.Popup({className: 'popup-class'})
                .setLngLat(coordinates)
                .setHTML(htmlpopup)
                .addTo(map);


            });
            map.on('click', 'markers', (e) => {

                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.Name;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                var htmlpopup = `<div style="font-size:18px;font-family:Roboto;padding:4px 6px">${description}</div>`

                new Mapbox.Popup({className: 'popup-class'})
                .setLngLat(coordinates)
                .setHTML(htmlpopup)
                .addTo(map);


            });
            map.on('click', 'markers', (e) => {

                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.Name;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                var htmlpopup = `<div style="font-size:18px;font-family:Roboto;padding:4px 6px">${description}</div>`

                new Mapbox.Popup({className: 'popup-class'})
                .setLngLat(coordinates)
                .setHTML(htmlpopup)
                .addTo(map);


            });
            map.on('click', 'markers2', (e) => {

                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.Name;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                var htmlpopup = `<div style="font-size:18px;font-family:Roboto;padding:4px 6px">${description}</div>`

                new Mapbox.Popup({className: 'popup-class'})
                .setLngLat(coordinates)
                .setHTML(htmlpopup)
                .addTo(map);


            });
            map.on('click', 'markers3', (e) => {

                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.Name;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                var htmlpopup = `<div style="font-size:18px;font-family:Roboto;padding:4px 6px">${description}</div>`

                new Mapbox.Popup({className: 'popup-class'})
                .setLngLat(coordinates)
                .setHTML(htmlpopup)
                .addTo(map);


            });
            map.on('click', 'markers4', (e) => {

                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.Name;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                var htmlpopup = `<div style="font-size:18px;font-family:Roboto;padding:4px 6px">${description}</div>`

                new Mapbox.Popup({className: 'popup-class'})
                .setLngLat(coordinates)
                .setHTML(htmlpopup)
                .addTo(map);


            });
            map.on('click', 'markers5', (e) => {

                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.Name;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                var htmlpopup = `<div style="font-size:18px;font-family:Roboto;padding:4px 6px">${description}</div>`

                new Mapbox.Popup({className: 'popup-class'})
                .setLngLat(coordinates)
                .setHTML(htmlpopup)
                .addTo(map);


            });


        },
        openInfoBox(feature){ 
            console.log(`feature`, feature)
            this.opentestecontent = feature.properties.description ? feature.properties.description : feature.properties.impacts
            if (!this.opentestecontent) this.opentestecontent = feature.properties.Name
            this.opentestekey = true;  
        },
        async changeStyle(){
            // this.mapStyle = this.mapStyle == this.styleSatellite ?  this.styleOutdoors : this.styleSatellite;            
            await map.setStyle(this.styleSatellite)
            this.loadData();
        }
    },
    watch:{
        layers:{
            handler(newVal, oldVal){
                console.log(`newVal`, newVal)
                console.log(`oldVal`, oldVal)
                if (newVal == false){

                }
            },
            deep: true
        }
    },
    async mounted(){
        const response = await axios.get('https://guanabara-backend.herokuapp.com/location-points')
        this.responseData = response.data;
        // this.loadData();

        this.markers = response.data.map(item =>{
            let photos;
            if(item.photo.length)
                photos = item.photo?.map(photo => photo.formats?.thumbnail?.url)
            else
                photos = ['data:image/png;base64,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']
            let obj = {
                'coord': [item.lng,item.lat],
                'createdAt': item.createdAt,
                'img': photos,
                'categories' : item.categories,
                'impacts': item.impacts.split(';'),
            }
            if (item.elements){
                obj['elements'] = item.elements.split(';')
            }
            return obj
        })  
        
        
        // this.markersData.features = response.data.map( item => {
 
        //     let obj = {
        //         id: item.id,
        //         type: 'Feature',
        //         properties: {
        //             categories : item.categories,
        //             impacts: item.impacts.split(';'),
        //             createdAt: item.createdAt
        //         },
        //         geometry: {
        //             type: "Point",
        //             coordinates: [item.lat, item.lng]
        //         }
        //     }

        //     if (item.elements){
        //         obj['elements'] = item.elements.split(';')
        //     }
        //     return obj
        // })
    }
}
</script>
<style scoped>
.popup-class{
    background-color:blue !important;
    width:200px;
    font-size: 28px;
}
.header-info{
    height: 200px;
    width: 100%;
    
}
.mapboxgl-popup-content{
    padding: 0px !important;
}

.v-carousel {
    margin: 10px 0px;
}

.style-container{
    position: absolute;
    right: 0;
    z-index: 5;
    background-color: rgba(255,255,255);
    border-radius: 10px;
    margin: 5px;
}

.legend-container{
    position: absolute;
    left: 0;
    z-index: 5;
    background-color: rgba(255,255,255);
    border-radius: 10px;
    margin: 5px;
}
.layers-container{
    background-color:red;
    position: absolute;
    left: 0;
    z-index: 5;
    background-color: rgba(255,255,255);
    border-radius: 10px;
    margin: 5px;
}

</style>