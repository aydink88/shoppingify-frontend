import { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import Navigation from 'src/components/common/Navigation';
import Sidebar from 'src/components/sidebar';
import useSidebarOptions from 'src/hooks/useSidebarOptions';
import PrivateRoutes from 'src/routes/PrivateRoutes';

export default function AuthenticatedApp() {
  const { setSidebarState, isSidebarVisible, setSidebarActivity } = useSidebarOptions();
  const location = useLocation();

  //set initial visibility of sidebar and change in case window resizes
  useEffect(() => {
    const isWindowMobile = window.innerWidth < 768;
    setSidebarState({ isMobile: isWindowMobile, isActivated: !isWindowMobile });

    const isMobileListener = () => {
      if (window.innerWidth < 768) {
        setSidebarState({ isMobile: true, isActivated: false });
      } else {
        setSidebarState({ isMobile: false, isActivated: true });
      }
    };
    window.addEventListener('resize', isMobileListener);
    return () => {
      window.removeEventListener('resize', isMobileListener);
    };
  }, []);

  // onclickoutside hook might be better solution
  // useMediaquery might be better
  // switch off sidebar on route change
  // reimplement considering effect above
  useEffect(() => {
    if (window.innerWidth < 768) setSidebarActivity(false);
  }, [location.pathname]);

  return (
    <>
      <div className="d-flex vh-100 mx-0 overflow-auto">
        <Col id="content" xs={10} sm={11} md={6} lg={7} xl={8} className="ms-5">
          <div className="position-fixed start-0 h-100">
            <Navigation />
          </div>
          <PrivateRoutes />
        </Col>

        <Col
          id="sidebar-container"
          sm={7}
          md={5}
          lg={4}
          xl={3}
          className={`${
            isSidebarVisible ? 'd-block' : 'd-none'
          } h-100 position-fixed end-0 bg-white`}
        >
          <Sidebar />
        </Col>
      </div>
    </>
  );
}
