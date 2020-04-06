import React from 'react';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';

const DropDown = () => {
    return (
        
        <DropdownMenu userName="Chris Smith">
            <MenuItem text="Home" location="/home" />
            <MenuItem text="Edit Profile" location="/profile" />
            <MenuItem text="Change Password" location="/change-password" />
            <MenuItem text="Privacy Settings" location="/privacy-settings" />
        </DropdownMenu>
        
    )
}

export default DropDown