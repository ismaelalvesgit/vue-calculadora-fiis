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
      <div class="md-title md-display-1"> Calculadora De Porcentagem 06</div>
      <div class="md-subhead">{{data.description}}</div>
    </md-card-header>
    <md-card-content>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-small-size-100">
          <md-field :class="$v.variables.value1.$error ? 'md-invalid': ''">
            <label>Valor X R$</label>
            <md-input v-model="$v.variables.value1.$model" type="number" maxlength="60"></md-input>
            <span class="md-error" v-if="!$v.variables.value1.required">Valor e Requirido </span>
          </md-field>
          <md-field :class="$v.variables.value2.$error ? 'md-invalid': ''">
            <label>Valor Y %</label>
            <md-input v-model="$v.variables.value2.$model" type="number" maxlength="60"></md-input>
            <span class="md-error" v-if="!$v.variables.value2.required">Valor e Requirido </span>
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
  name: 'Percentage06',
  props: {
    data: Object
  },
  data(){
    return {
      variables:{
        value1: this.data?.variables?.value1 ?? 0,
        value2: this.data?.variables?.value2 ?? 0,
      }
    }
  },
  validations:{
    variables: {
      value1: {
        required
      },
      value2: {
        required
      },
    }
  },
  computed: {
    result: function(){
      if(this.variables){
        const y = (this.variables.value1 / 100) * this.variables.value2
        return mainService.currencyFormat(y + parseInt(this.variables.value1))
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