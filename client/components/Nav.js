import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
                topRated ? <Link to={`/products/${topRated.id}`}>Top Rated ({topRated.name})</Link> : null
            }
        </div>
    )
}

const mapStateToProps = ({ products }) => {
    const id = Math.max.apply(Math, products.map((elem) => {
        return elem.id;   
    }))
    const topRated = products.filter((e) => e.id === id)[0]
    return { 
        products,
        topRated
    };
}
export default connect(mapStateToProps)(Nav);