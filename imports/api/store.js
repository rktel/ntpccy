import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
       names: ['Sophia','Deysi','Carmen','Milleny']
    },
    getters:{
        countNames: state => {
            return state.names.length
        }
    },
    mutations:{
        ADD_NAME: (state,name) => {
            state.names.push(name)
        }
    }
})