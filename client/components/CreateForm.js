import React, { Component } from 'react';
import { connect } from 'react-redux';
import faker from 'faker';
import { createProduct } from '../store';

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            rating: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    handleSelect (event) {
        this.setState({
            rating: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div className='random'>
                    <button onClick={()=> this.props.createProduct({name: faker.commerce.product(), rating: faker.random.number()})}>
                    Add A New Random Product
                    </button>
                </div>
                <div className="add-grocery">
                <h3> OR create a new Product </h3>
                <input
                    type="text"
                    name ='name'
                    value={this.state.name}
                    onChange = {this.handleChange}
                />
                <select onChange={ this.handleSelect }>
                <option>---</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>
                <button
                    onClick={() => {
                        this.props.createProduct({name: this.state.name, rating: this.state.rating});
                        this.setState({ name: '' });
                    }}
                    >
                    Add Product
                </button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch)=>({
    createProduct: (product)=> dispatch(createProduct(product))
});

export default connect(null, mapDispatchToProps)(CreateForm);