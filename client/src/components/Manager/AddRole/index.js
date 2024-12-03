/**
 *
 * AddBrand
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';

const AddRole = props => {
  const { roleFormData, formErrors, roleChange, addRole } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addRole();
  };

  return (
    <div className='add-role'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Role Name'}
              value={roleFormData.name}
              onInputChange={(name, value) => {
                roleChange(name, value);
              }}
            />
          </Col>
          {/*<Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Brand Description'}
              value={brandFormData.description}
              onInputChange={(name, value) => {
                brandChange(name, value);
              }}
            />
          </Col> */}
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-brand'}
              name={'isActive'}
              label={'Active?'}
              checked={roleFormData.isActive}
              toggleCheckboxChange={value => roleChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-role-actions'>
          <Button type='submit' text='Add Role' />
        </div>
      </form>
    </div>
  );
};

export default AddRole;
