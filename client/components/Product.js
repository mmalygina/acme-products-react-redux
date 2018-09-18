import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Product = ({path, match, product}) => {
    return (
        <div className='product'>
            <div className='product-name'>{product.name} with rating {product.rating}</div>
            <Link to={`/products/`}> Back </Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { product: state.product }
}

export default connect(mapStateToProps)(Product);
