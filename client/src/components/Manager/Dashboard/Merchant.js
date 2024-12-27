/*
 *
 * Customer
 *
 */

import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import AccountMenu from '../AccountMenu';
import Page404 from '../../Common/Page404';

import Account from '../../../containers/Account';
import AccountSecurity from '../../../containers/AccountSecurity';
import Address from '../../../containers/Address';
import Product from '../../../containers/Product';
import Category from '../../../containers/Category';
import Brand from '../../../containers/Brand';
import Order from '../../../containers/Order';
import Reviews from '../../../containers/Review';
import Wishlist from '../../../containers/WishList';

const Distributor = props => {
  return (
    <div className='merchant'>
      <Row>
        <Col xs='12' md='5' xl='3'>
          <AccountMenu {...props} />
        </Col>
        <Col xs='12' md='7' xl='9'>
          <div className='panel-body'>
            <Switch>
              <Route exact path='/dashboard' component={Account} />
              <Route path='/dashboard/AccountSecurity' component={AccountSecurity} />
              <Route path='/dashboard/address' component={Address} />
              <Route path='/dashboard/products' component={Product} />
              <Route path='/dashboard/category' component={Category}/>
              <Route path='/dashboard/brand' component={Brand} />
              <Route path='/dashboard/orders' component={Order} />
              <Route path='/dashboard/reviews' component={Reviews}/>
              <Route path='/dashboard/wishlist' component={Wishlist} />
              <Route path='*' component={Page404} />
            </Switch>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Distributor;
