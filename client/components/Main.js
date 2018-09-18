import React, {Component} from 'react';
import store, { getProducts } from './../store';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import ProductList from './ProductList';
import CreateForm from './CreateForm';
import Product from './Product';

class Main extends Component{
    componentDidMount(){
        store.dispatch(getProducts());
    }

    render() {
        const renderNav = ({ location })=> {
            return (
              <Nav 
                path={ location.pathname }
              />
            );
        };

        const renderProducts = ({ location })=> {
            return (
              <ProductList
                path={ location.pathname }
              />
            );
        };

        const renderCreateForm = ({ location })=> {
            return (
              <CreateForm
                path={ location.pathname }
              />
            );
        };

        const renderProduct = (props)=> {
            return (
              <Product
                path={ props.location.pathname }
                match = { props.match }
              />
            );
        };

        return (
            <div id = 'main'>
                <h1>ACME Products</h1>
                <Router>
                    <div>
                    <Route path='/' render = { renderNav } />
                    <Route path='/products' render = { renderProducts }/>
                    <Switch>
                        <Route path='/products/create' render = { renderCreateForm } />
                    </Switch>
                    <Route path='/products/:id' render = { renderProduct } />
                    </div>
                </Router>
            </div>
        )
    }
}

export default Main;