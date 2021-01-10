import React, {useState} from 'react';
import '../scss/header.scss';
import {ReactComponent as Logo} from "../../../assets/images/logo.svg";
import IsPortratit from '../../../helpers/getOrientation';
import MenuButton from '../../menu/js/menuButton';
import Menu from '../../menu/js/menu';
import List from '../../list/js/list';

const Header = (props) => {
    let isPortrait = IsPortratit(); // useEffect hook
    const [menuOpened, setMenuOpen] = useState(false); 

    return <div id="Header">
        <Menu  open={menuOpened} setOpen={setMenuOpen} />
        <div className="appbar">
            <Logo className="logo" />
            {isPortrait ? <MenuButton open={menuOpened} setOpen={setMenuOpen} /> : <List forMenu={false} />}
        </div>
        {props.children}
</div>
}

export default Header;
