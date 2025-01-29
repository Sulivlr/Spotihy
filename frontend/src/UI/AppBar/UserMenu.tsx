import React, {useState} from 'react';
import {Button, Grid2, Menu, MenuItem} from '@mui/material';
import {AccountCircle} from '@mui/icons-material';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../features/users/usersThunks';
import {NavLink, useNavigate} from 'react-router-dom';
import {unsetUser} from '../../features/users/usersSlice';


const UserMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
    navigate('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <Grid2>
      <Button onClick={handleClick} color="inherit">
        <AccountCircle />
      </Button>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem color="inherit" component={NavLink} to="/trackhistory" onClick={handleClose}>
          Track History
        </MenuItem>
        <MenuItem color="inherit" component={NavLink} to="/new-album" onClick={handleClose}>
          New Album
        </MenuItem>
        <MenuItem color="inherit" component={NavLink} to="/new-artist" onClick={handleClose}>
          New Artist
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Grid2>
  );
};

export default UserMenu;