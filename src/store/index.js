import Vue from  'vue'
import Vuex from 'vuex'
import mainService from '../services/main.service'

Vue.use(Vuex) 

const store = new Vuex.Store({
    state: {
        calculations: mainService.getCalculations() || []
    },
    mutations: {
        addCalculation(state, calculation){
            if(state.calculations.includes(calculation)) return
            state.calculations.push(calculation)
            mainService.setCalculations(state.calculations)
        },
        removeCalculation(state, calculation){
            const index = state.calculations.findIndex((e) => e.id === calculation.id)
            if(index !== -1){
                state.calculations.splice(index, 1)
            }
            mainService.setCalculations(state.calculations)
        },
        clear(state){
            state.calculations = []
            mainService.setCalculations(state.calculations)
        }
    }
})

export default store;