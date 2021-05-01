<template>
  <div id="app">
    <md-toolbar class="md-primary">
      <h3 class="md-title" style="flex: 1">
        Olá Bem-vindo(a) De Volta
      </h3>
      <md-button class="md-icon-button" @click="reset()">
        <md-tooltip md-direction="top">Limpar Tudo</md-tooltip>
        <md-icon>cached</md-icon>
      </md-button>
    </md-toolbar>
    <router-view class="mb-5 mb-3"></router-view>
  </div>
</template>

<script>
import store from './store'

export default {
  name: 'App',
  methods: {
    reset: ()=>{
      store.commit('clear')
    }
  }
}
</script>
