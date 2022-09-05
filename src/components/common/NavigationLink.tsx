import type { ReactNode } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '@testing-library/jest-dom';

export default function NavigationLink({
  children,
  tooltip,
  to,
}: {
  children: ReactNode;
  tooltip: string;
  to: string;
}) {
  return (
    <OverlayTrigger
      key="nav-link"
      placement="right"
      overlay={<Tooltip id={`link-tooltip`}>{tooltip}</Tooltip>}
    >
      <NavLink to={to} className={({ isActive }) => `my-4${isActive ? ' selected' : ''}`}>
        {children}
      </NavLink>
    </OverlayTrigger>
  );
}
