import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProduct } from './../store';

const Nav = ({ products, topRated }) => {
    return (
        <div className='nav'>
            <Link to={`/products`}>
                <button>Products ({ products.length })</button>
            </Link>
            <Link to={`/products/create`}>
                <button>Create Product</button>
            </Link>
            {
                topRated ? <Link to={`/products/${topRated.id}`} onClick={() => getProduct(topRated.id)}>Top Rated ({topRated.name})</Link> : null
            }
        </div>
    )
}

const mapStateToProps = ({ products }) => {
    const rating = Math.max.apply(Math, products.map(elem => elem.rating))
    const topRated = products.filter((e) => e.rating === rating)[0]
    return { 
        products,
        topRated
    };
}

const mapDispatchToPropd = (dispatch) => {
    return { 
        getProduct: (id) => dispatch(getProduct(id)) 
        }
}
export default connect(mapStateToProps, mapDispatchToPropd)(Nav);