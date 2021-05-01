<template>
  <md-card class="m-1">
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
      <div class="md-title md-display-1"> Calculadora De Porcentagem 01</div>
      <div class="md-subhead">{{data.description}}</div>
    </md-card-header>
    <md-card-content>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-small-size-100">
          <md-field :class="$v.variables.porcentage.$error ? 'md-invalid': ''">
            <label>X %</label>
            <md-input v-model="$v.variables.porcentage.$model" type="number" maxlength="60"></md-input>
            <span class="md-error" v-if="!$v.variables.porcentage.required">Percentual e Requirido </span>
          </md-field>
          <md-field :class="$v.variables.value.$error ? 'md-invalid': ''">
            <label>Y R$</label>
            <md-input v-model="$v.variables.value.$model" type="number" maxlength="60"></md-input>
            <span class="md-error" v-if="!$v.variables.value.required">Valor e Requirido </span>
          </md-field>
          <strong v-if="result">Resultado: R$ {{result}}</strong>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import mainService from '../../services/main.service'
import store from '../../store'

export default {
  name: 'Percentage01',
  props: {
    data: Object
  },
  data(){
    return {
      variables:{
        porcentage: this.data?.variables?.porcentage ?? 0,
        value: this.data?.variables?.value ?? 0,
      }
    }
  },
  validations:{
    variables: {
      porcentage: {
        required
      },
      value: {
        required
      },
    }
  },
  computed: {
    result: function(){
      if(this.variables){
        return mainService.currencyFormat((this.variables.porcentage / 100) * this.variables.value)
      }
      return 0
    }
  },
  methods: {
    close: (data)=>{
      store.commit('removeCalculation', data)
    }
  }
}
</script>
