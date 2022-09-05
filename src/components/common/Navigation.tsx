import { IconContext } from 'react-icons';
import { MdList, MdQueryStats, MdRefresh } from 'react-icons/md';

import logo from 'src/assets/logo.svg';

import Logout from './Logout';
import NavCartButton from './NavCartButton';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-between py-4 h-100 bg-white">
      <div className="p-1 position-relative app-logo">
        <img src={logo} alt="logo" />
        <div className="logout position-absolute top-0 start-100">
          <Logout />
        </div>
      </div>
      <IconContext.Provider value={{ color: 'black', className: 'material-icon' }}>
        <nav className="d-flex flex-column justify-content-between w-100">
          <NavigationLink to="/items" tooltip="items">
            <MdList />
          </NavigationLink>
          <NavigationLink to="/history" tooltip="history">
            <MdRefresh />
          </NavigationLink>
          <NavigationLink to="/stats" tooltip="stats">
            <MdQueryStats />
          </NavigationLink>
        </nav>
        <NavCartButton />
      </IconContext.Provider>
    </div>
  );
}
