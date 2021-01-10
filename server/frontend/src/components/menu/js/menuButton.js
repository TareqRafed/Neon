import React from 'react';
import { bool, func } from 'prop-types';
import '../scss/menuButton.scss';

const MenuButton = ({ open, setOpen }) => {
    let menuState = open ? "open" : "closed"
  return (
    <div id="menuButton" className={menuState} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </div>
  )
}
MenuButton.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};
export default MenuButton;