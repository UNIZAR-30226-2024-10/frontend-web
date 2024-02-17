import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React from 'react'

function SideBar() {
  return (
    <Sidebar  rootStyles={{
    [`.${sidebarClasses.container}`]: {
      backgroundColor: 'red',
    },
  }}>
        <Menu>
            <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
            </SubMenu>
            <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem>
        </Menu>
    </Sidebar>
  )
}

export default SideBar
