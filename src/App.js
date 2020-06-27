
import './index.css';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';
import { ReactComponent as PasswordIcon } from './icons/password.svg';
import { ReactComponent as LogoutIcon } from './icons/logout.svg';
import { ReactComponent as QuestionIcon } from './icons/question.svg';
import React, {useState,useEffect, useRef} from 'react';
import {CSSTransition} from "react-transition-group";

function App() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon/>}/>
      <NavItem icon={<BellIcon/>}/>
      <NavItem icon={<MessengerIcon/>}/>
      <NavItem icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
    </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props){
  const [open, setOpen] = useState(false);
  return(
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={()=> setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  )
}


function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
        {<ChevronIcon/>}
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings">
            Settings & Privacy
          </DropdownItem>
          <DropdownItem
            leftIcon={<QuestionIcon/>}
            rightIcon={<ChevronIcon />}
            goToMenu="help">
            Help & support
          </DropdownItem>
          <DropdownItem  leftIcon={<LogoutIcon/>}>Log out</DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Settings & Privacy</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Settings</DropdownItem>
          <DropdownItem leftIcon={<PasswordIcon />}>Privacy Checkup</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Activity log</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>News Feed preferences</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'help'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Help & support</h2>
          </DropdownItem>
          <DropdownItem leftIcon="😞">Sad</DropdownItem>
          <DropdownItem leftIcon="😡">Angry</DropdownItem>
          <DropdownItem leftIcon="🤨">Lost</DropdownItem>
          <DropdownItem leftIcon="😴">Sleepy</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;