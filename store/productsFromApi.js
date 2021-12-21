import axios from 'axios'

export const state = () => ({
  productsFromApi: [],
})

export const mutations = {
  SET_PRODUCTS_FROM_API(state, productsFromApi) {
    state.productsFromApi = productsFromApi;
  },
  ADD_PRODUCT_FROM_API(state, productFromApi) {
    let productsFromApi = state.productsFromApi.concat(productFromApi);
    state.productsFromApi = productsFromApi;
  },
  DELETE_PRODUCT_FROM_API(state, productFromApiId){
    let productsFromApi = state.productsFromApi.filter(p => p.recall_number != productFromApiId)
    state.productsFromApi = productsFromApi;
  },
  EDIT_PRODUCT_FROM_API(state, productFromApi) {
    let productsFromApi = state.productsFromApi.filter(p => p.recall_number != productFromApi.recall_number).concat(productFromApi)
    state.productsFromApi = productsFromApi;
  }
}

export const actions = {
    async loadAll({commit}){
        await axios.get('https://api.fda.gov/food/enforcement.json?limit=50')
            .then(response => {
                commit('SET_PRODUCTS_FROM_API', response.data.results)
        })
    },
}

export const getters = {
  get: state => id => {
    return state.productsFromApi.find(p => p.id == id) || {}
  },
  all: state => {
    return state.productsFromApi
  }
}