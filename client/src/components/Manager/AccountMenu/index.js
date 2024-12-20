/**
 *
 * AccountMenu
 *
 */

import React from 'react';

import { NavLink } from 'react-router-dom';
import { Collapse, Navbar } from 'reactstrap';

import Button from '../../Common/Button';

const AccountMenu = props => {
  const { user, isMenuOpen, menuItems, toggleMenu } = props;
  console.log('Menu Items in AccountMenu:', menuItems);
  //console.log('Links passed to AccountMenu:', links);

  const getAllowedProvider = link => {
    if (!link.provider) return true;

    const userProvider = user.provider ?? '';
    if (!userProvider) return true;

    return link.provider.includes(userProvider);
  };

  return (
    <div className='panel-sidebar'>
      <Button
        text='Dashboard Menu'
        className={`${isMenuOpen ? 'menu-panel' : 'menu-panel collapse'}`}
        ariaExpanded={isMenuOpen ? 'true' : 'false'}
        // ariaLabel={isMenuOpen ? 'dashboard menu expanded' : 'dashboard menu collapse'}
        onClick={toggleMenu}
      />
      <h3 className='panel-title'>Account</h3>
      <Navbar color='light' light expand='md'>
        <Collapse isOpen={isMenuOpen} navbar>
          <ul className='panel-links'>
            {menuItems.map((link,index) => {
              //check if the link is allowed for the current users'provider
              const isProviderAllowed = getAllowedProvider(link);
              if (!isProviderAllowed) return null;
              return (
                <li key={index}>
                  <NavLink
                    to={link.to} //link to full path including prefix
                    activeClassName='active-link'
                    exact
                  >
                    {link.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </Collapse>
      </Navbar>
    </div>
  );
};

AccountMenu.defaultProps = {
  menuItems: [],
};


export default AccountMenu;
