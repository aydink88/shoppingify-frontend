import { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import useSidebarOptions from 'src/hooks/useSidebarOptions';

import AddItem from './AddItem';
import EditAmounts from './EditAmounts';
import ShowItem from './ShowItem';
import ToggleDone from './ToggleDone';

export default function Sidebar() {
  const { state: sidebar } = useSidebarOptions();

  const modeMap = {
    ADD_ITEM: AddItem,
    SHOW_ITEM: ShowItem,
    TOGGLE_DONE: ToggleDone,
    EDIT_AMOUNTS: EditAmounts,
  };

  const ActiveComponent = modeMap[sidebar.mode];

  const nodeRef = useRef(null);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={sidebar.mode} nodeRef={nodeRef} timeout={300} classNames="sidebarfade">
        <div ref={nodeRef} className="h-100">
          <ActiveComponent />
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}
