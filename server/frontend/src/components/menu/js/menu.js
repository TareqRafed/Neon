import React from 'react';
import { bool } from 'prop-types';
import '../scss/menu.scss';
import List from '../../list/js/list';

const Menu = (props) => {
    let menuState = props.open ? 'open' : 'close';
  return (
    <div id="Menu" className={menuState}>
      <List forMenu={true}/>
    </div>
  )
}


Menu.propTypes = {
    open: bool.isRequired,
  }

export default Menu;