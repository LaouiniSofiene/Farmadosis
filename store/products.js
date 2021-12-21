import data from '../static/products.json';

export const state = () => ({
  products: data.products,
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  ADD_PRODUCT(state, product) {
    let products = state.products.concat(product);
    state.products = products;
  },
  DELETE_PRODUCT(state, productId){
    let products = state.products.filter(p => p.id != productId)
    state.products = products;
  },
  EDIT_PRODUCT(state, product) {
    let products = state.products.filter(p => p.id != product.id).concat(product)
    state.products = products;
  }
}

export const getters = {
  get: state => id => {
    return state.products.find(p => p.id == id) || {}
  },
  all: state => {
    return state.products
  }
}