import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, getProduct } from './../store';

const ProductList = ({ products, deleteProduct, getProduct }) => {
    return (
        <ul className='product-list'>
            {products.map((product) => {
                return (
                    <li key={product.id}> 
                        <Link to={`/products/${product.id}`} onClick={() => getProduct(product.id)}>{product.name} </Link>
                        {product.rating} 
                        <button onClick={() => deleteProduct(product)}>Delete Product</button>
                    </li>
                )
            })}
        </ul>
    )
}

const mapStateToProps = (state) => {
    return { products: state.products }
}

const mapDispatchToPropd = (dispatch) => {
    return { 
        deleteProduct: (product) => dispatch(deleteProduct(product)),
        getProduct: (id) => dispatch(getProduct(id)) 
        }
}

export default connect(mapStateToProps, mapDispatchToPropd)(ProductList);