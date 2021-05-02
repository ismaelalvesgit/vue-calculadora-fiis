<template>
  <md-card class="m-1 w-25">
    <md-card-header>
      <div class="row">
        <div class="col">
          <md-icon class="dndZone fa fa-bars"></md-icon>
        </div>
        <md-button class="md-icon-button md-accent mr-1" @click="close(data)">
          <md-tooltip md-direction="top">Fechar</md-tooltip>
          <md-icon>close</md-icon>
        </md-button>
      </div>
      <div class="md-title md-display-1">Avaliação Qualitativa 01</div>
      <div class="md-subhead">{{data.description}}</div>
    </md-card-header>
    <md-card-content>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-xlarge-size-100">
          <md-field :class="$v.localization.$error ? 'md-invalid': ''">
            <label>Tem imóveis bem localizados?</label>
            <md-input v-model="$v.localization.value.$model" type="number" :max="localization.weight"></md-input>
            <span class="md-error" v-if="!$v.localization.value.required">Valor e Requirido </span>
            <span class="md-error" v-if="!$v.localization.value.between">Valor e tem que estar entre 0 e {{localization.weight}} </span>
          </md-field>
          <md-field :class="$v.manager.$error ? 'md-invalid': ''">
            <label>Tem bom gestor?</label>
            <md-input v-model="$v.manager.value.$model" type="number" :max="manager.weight"></md-input>
            <span class="md-error" v-if="!$v.manager.value.required">Valor e Requirido </span>
            <span class="md-error" v-if="!$v.manager.value.between">Valor e tem que estar entre 0 e {{manager.weight}} </span>
          </md-field>
          <md-field :class="$v.propertyConditions.$error ? 'md-invalid': ''">
            <label>Os imóveis são novos e estão em boas condições?</label>
            <md-input v-model="$v.propertyConditions.value.$model" type="number" :max="propertyConditions.weight"></md-input>
            <span class="md-error" v-if="!$v.propertyConditions.value.required">Valor e Requirido </span>
            <span class="md-error" v-if="!$v.propertyConditions.value.between">Valor e tem que estar entre 0 e {{propertyConditions.weight}} </span>
          </md-field>
          <md-field :class="$v.vacancy.$error ? 'md-invalid': ''">
            <label>Tem baixa vacância histórica (em relação ao seu setor)?</label>
            <md-input v-model="$v.vacancy.value.$model" type="number" :max="vacancy.weight"></md-input>
            <span class="md-error" v-if="!$v.vacancy.value.required">Valor e Requirido </span>
            <span class="md-error" v-if="!$v.vacancy.value.between">Valor e tem que estar entre 0 e {{vacancy.weight}} </span>
          </md-field>
          <md-field :class="$v.tenants.$error ? 'md-invalid': ''">
            <label>Os inquilinos são bons?</label>
            <md-input v-model="$v.tenants.value.$model" type="number" :max="tenants.weight"></md-input>
            <span class="md-error" v-if="!$v.tenants.value.required">Valor e Requirido </span>
            <span class="md-error" v-if="!$v.tenants.value.between">Valor e tem que estar entre 0 e {{tenants.weight}} </span>
          </md-field>
          <md-field :class="$v.diversification.$error ? 'md-invalid': ''">
            <label>Tem boa diversificação interna?</label>
            <md-input v-model="$v.diversification.value.$model" type="number" :max="diversification.weight"></md-input>
            <span class="md-error" v-if="!$v.diversification.value.required">Valor e Requirido </span>
            <span class="md-error" v-if="!$v.diversification.value.between">Valor e tem que estar entre 0 e {{diversification.weight}} </span>
          </md-field>
          <md-field :class="$v.dividends.$error ? 'md-invalid': ''">
            <label>Tem bom histórico de distribuição de proventos?</label>
            <md-input v-model="$v.dividends.value.$model" type="number" :max="dividends.weight"></md-input>
            <span class="md-error" v-if="!$v.dividends.value.required">Valor e Requirido </span>
            <span class="md-error" v-if="!$v.dividends.value.between">Valor e tem que estar entre 0 e {{dividends.weight}} </span>
          </md-field>
          <md-field :class="$v.perpetuity.$error ? 'md-invalid': ''">
            <label>Apresenta características de perpetuidade?</label>
            <md-input v-model="$v.perpetuity.value.$model" type="number" :max="perpetuity.weight"></md-input>
            <span class="md-error" v-if="!$v.perpetuity.value.required">Valor e Requirido </span>
            <span class="md-error" v-if="!$v.perpetuity.value.between">Valor e tem que estar entre 0 e {{perpetuity.weight}} </span>
          </md-field>
          <md-field :class="$v.unrepentable.$error ? 'md-invalid': ''">
            <label>È irreplicável em sua região e em sua região?</label>
            <md-input v-model="$v.unrepentable.value.$model" type="number" :max="unrepentable.weight"></md-input>
            <span class="md-error" v-if="!$v.unrepentable.value.required">Valor e Requirido </span>
            <span class="md-error" v-if="!$v.unrepentable.value.between">Valor e tem que estar entre 0 e {{unrepentable.weight}} </span>
          </md-field>
          <md-field :class="$v.versatile.$error ? 'md-invalid': ''">
            <label>Os imóveis do fundo são versáteis (multi-uso)?</label>
            <md-input v-model="$v.versatile.value.$model" type="number" :max="versatile.weight"></md-input>
            <span class="md-error" v-if="!$v.versatile.value.required">Valor e Requirido </span>
            <span class="md-error" v-if="!$v.versatile.value.between">Valor e tem que estar entre 0 e {{versatile.weight}} </span>
          </md-field>
          <strong v-if="result">Resultado: SCORE {{result}}</strong>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import { required, between } from 'vuelidate/lib/validators'
import mainService from '../../services/main.service'
import store from '../../store'

export default {
  name: 'Qualitative01',
  props: {
    data: Object
  },
  data(){
    return {
      localization: this.data?.variables?.localization,
      manager: this.data?.variables?.manager,
      propertyConditions: this.data?.variables?.propertyConditions,
      vacancy: this.data?.variables?.vacancy,
      tenants: this.data?.variables?.tenants,
      diversification: this.data?.variables?.diversification,
      dividends: this.data?.variables?.dividends,
      perpetuity: this.data?.variables?.perpetuity,
      unrepentable: this.data?.variables?.unrepentable,
      versatile: this.data?.variables?.versatile,
    }
  },
  validations (){
    return {
      localization: {
        value:{
          required,
          between: between(0, this.localization.weight)
        }
      },
      manager: {
        value:{
          required,
          between: between(0, this.manager.weight)
        }
      },
      propertyConditions: {
        value:{
          required,
          between: between(0, this.propertyConditions.weight)
        }
      },
      vacancy: {
        value:{
          required,
          between: between(0, this.vacancy.weight)
        }
      },
      tenants: {
        value:{
          required,
          between: between(0, this.tenants.weight)
        }
      },
      diversification: {
        value:{
          required,
          between: between(0, this.diversification.weight)
        }
      },
      dividends: {
        value:{
          required,
          between: between(0, this.dividends.weight)
        }
      },
      perpetuity: {
        value:{
          required,
          between: between(0, this.perpetuity.weight)
        }
      },
      unrepentable: {
        value:{
          required,
          between: between(0, this.unrepentable.weight)
        }
      },
      versatile: {
        value:{
          required,
          between: between(0, this.versatile.weight)
        }
      },
    }
  },
  computed: {
    result: function(){
      let result = 0;
      const check = Object.keys(this.data?.variables)
      check.forEach((key)=>{
        result += parseFloat(this.data.variables[key].value)
      })
      if(!this.$v.$invalid){
        return mainService.currencyFormat(result)
      }
      return false
    }
  },
  methods: {
    close: (data)=>{
      store.commit('removeCalculation', data)
    }
  }
}
</script>
