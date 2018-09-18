import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';
import thunk from 'redux-thunk';

const GET_PRODUCTS = 'GET_PRODUCTS';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const GET_PRODUCT = 'GET_PRODUCT';

const productsReducer = (state = [], action) => {
    console.log('Action: ', action.type)
    switch(action.type){
        case DELETE_PRODUCT:
            let newState = state.filter((product) => product.id !== action.product.id);
            return newState;
        case GET_PRODUCTS:
            return action.products;
        case CREATE_PRODUCT:
            const product = action.product;
            return [ ...state, product];
        default: 
            return state;
    }
}

const productReducer = (state = {}, action) => {
    switch(action.type){
        case GET_PRODUCT:
            return action.product;   
        default:
            return state;    
    }
}

const reducer = combineReducers({
    products: productsReducer,
    product: productReducer
})

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunk));

const _getProducts = (products) => {
    return {
        products,
        type: GET_PRODUCTS
    };
};

const getProducts = () => {
    return (dispatch) => {
        return axios.get('/api/products')
            .then(res => res.data)
            .then(products => dispatch(_getProducts(products)))
    };
}

const _deleteProduct = (product) => {
    console.log('_deleteProduct ', product)
    return {
        product,
        type: DELETE_PRODUCT
    }
}

const deleteProduct = (product)=> {
    console.log('in deleteProduct: ', product)
    return (dispatch)=> {
        dispatch(_deleteProduct(product));
        return axios.delete(`/api/products/${ product.id }`);
    };
}
  
const _createProduct = (product)=> {
    return {
        product,
        type: CREATE_PRODUCT
    };
};

const createProduct = (product)=> {
    return (dispatch)=> {
      return axios.post('/api/products', product)
        .then((response) => {
            return response.data
        })
        .then(product => dispatch( _createProduct(product)));
    };
  }

const _getProduct = (product) => {
    return {
        product,
        type: GET_PRODUCT
    };
}

const getProduct = (id) => {
    return(dispatch) => {
        axios.get(`/api/products/${id}`)
            .then(response => response.data)
            .then(product => dispatch(_getProduct(product)))
    };
}

export default store;
export { getProducts, deleteProduct, createProduct, getProduct }