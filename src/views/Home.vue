<template>
    <div class="col mt-3">
        <dnd-zone handle-class="dndZone" :transition-duration="0.3" v-if="calculations.length > 0">
            <dnd-container :dnd-model="calculations" class="row" dense>
                <dnd-item 
                v-for="calculation in calculations"
                :key="calculation.id"
                :dnd-id="calculation.id"
                :dnd-model="calculation">
                    <!--
                        Porcentagem
                    -->
                    <porcentage1 v-if="calculation.type === 'porcentage1'" v-bind:data="calculation"></porcentage1>
                    <porcentage2 v-else-if="calculation.type === 'porcentage2'" v-bind:data="calculation"></porcentage2>
                    <porcentage3 v-else-if="calculation.type === 'porcentage3'" v-bind:data="calculation"></porcentage3>
                    <porcentage4 v-else-if="calculation.type === 'porcentage4'" v-bind:data="calculation"></porcentage4>
                    <porcentage5 v-else-if="calculation.type === 'porcentage5'" v-bind:data="calculation"></porcentage5>
                    <porcentage6 v-else-if="calculation.type === 'porcentage6'" v-bind:data="calculation"></porcentage6>
                    <porcentage7 v-else-if="calculation.type === 'porcentage7'" v-bind:data="calculation"></porcentage7>
                    <!--
                        Qualitativa
                    -->
                    <qualitative1 v-else-if="calculation.type === 'qualitativa1'" v-bind:data="calculation"></qualitative1>
                    
                    <md-card class="m-1" v-else>
                        <md-card-content>
                            <strong>Calculo Não encontrado</strong>
                        </md-card-content>
                    </md-card>
                </dnd-item>
            </dnd-container>
        </dnd-zone>
        <md-empty-state 
            v-if="calculations.length == 0"
            md-icon="leaderboard"
            md-label="Faça seu primeiro calculo... prometo que vai ser bem rapido 😉"
            md-description="Clique no botão abaixo para fazer a sua primeiro calculo.">
            <md-button class="md-primary md-raised" @click="showDialog = true">Calcular</md-button>
        </md-empty-state>
        <md-speed-dial class="md-bottom-right" md-direction="bottom">
            <md-speed-dial-target @click="showDialog = true">
                <md-icon>add</md-icon>
            </md-speed-dial-target>
        </md-speed-dial>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Escolhar a Calculadora</md-dialog-title>
            <md-list>
                <md-list-item md-expand v-for="listCalculation of listCalculations" v-bind:key="listCalculation.id">
                    <md-icon :class="listCalculation.icon"></md-icon>
                    <span class="md-list-item-text">{{listCalculation.name}}</span>

                    <md-list slot="md-expand" >
                        <md-list-item  v-for="sub of listCalculation.list" v-bind:key="sub.id" class="md-inset" @click="addCalculation(sub); showDialog=false">
                            {{sub.name}}
                            <md-tooltip md-direction="top">{{sub.description}}</md-tooltip>
                        </md-list-item>
                    </md-list>
                </md-list-item>
            </md-list>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Fechar</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
import porcentage1 from '../components/percentage/percentage01'
import porcentage2 from '../components/percentage/percentage02'
import porcentage3 from '../components/percentage/percentage03'
import porcentage4 from '../components/percentage/percentage04'
import porcentage5 from '../components/percentage/percentage05'
import porcentage6 from '../components/percentage/percentage06'
import porcentage7 from '../components/percentage/percentage07'
import qualitative1 from '../components/qualitative/qualitative01'
import store from '../store'
import mainService from '../services/main.service'
import * as uuid from 'uuid'

export default {
    name: "HomePage",
    components:{
        porcentage1,
        porcentage2,
        porcentage3,
        porcentage4,
        porcentage5,
        porcentage6,
        porcentage7,
        qualitative1
    },
    data(){
        return {
            showDialog: false
        }
    },
    methods: {
        addCalculation: (data)=>{
            store.commit('addCalculation', {
                ...data.value,
                description: data.description,
                id: uuid.v4()
            })
        }
    },
    computed: {
        calculations: ()=>{
            return store.state.calculations
        },
        listCalculations: ()=>{
            return mainService.getListCalculations()
        }
    }
}
</script>

<style lang="css" scoped>
    .md-bottom-right{
        position: fixed;
    }
</style>