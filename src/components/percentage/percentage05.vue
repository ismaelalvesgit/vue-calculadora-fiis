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
      <div class="md-title md-display-1"> Calculadora De Porcentagem 05</div>
      <div class="md-subhead">{{data.description}}</div>
    </md-card-header>
    <md-card-content>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-small-size-100">
          <md-field :class="$v.value1.$error ? 'md-invalid': ''">
            <label>Valor X R$</label>
            <md-input v-model="$v.value1.$model" type="number" maxlength="60"></md-input>
            <span class="md-error" v-if="!$v.value1.required">Valor e Requirido </span>
          </md-field>
          <md-field :class="$v.value2.$error ? 'md-invalid': ''">
            <label>Valor Y R$</label>
            <md-input v-model="$v.value2.$model" type="number" maxlength="60"></md-input>
            <span class="md-error" v-if="!$v.value2.required">Valor e Requirido </span>
          </md-field>
          <strong v-if="result">Resultado: %{{result}}</strong>
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
  name: 'Percentage05',
  props: {
    data: Object
  },
  data(){
    return {
      value1: this.data?.variables?.value1,
      value2: this.data?.variables?.value2,
    }
  },
  validations:{
    value1: {
      required
    },
    value2: {
      required
    },
  },
  computed: {
    result: function(){
      if(!this.$v.$invalid){
        return mainService.currencyFormat((this.value1 / this.value2) * 100)
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