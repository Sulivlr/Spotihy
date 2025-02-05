import React, { useState } from 'react';
import {Avatar, Button, Menu, MenuItem} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/users/usersThunks';
import { NavLink, useNavigate } from 'react-router-dom';
import { selectUser, unsetUser } from '../../features/users/usersSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {API_URL} from '../../config';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const user = useAppSelector(selectUser);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(unsetUser());
    navigate('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        {user && (
          <Typography component="h1" variant="h5">
            {user.displayName}
          </Typography>
        )}
        <Button onClick={handleClick} color="inherit">
          {user && user.googleID ?
            <Avatar alt={user.displayName} src={user.avatar}/> :
            <Avatar alt={user?.displayName} src={API_URL + '/' + user?.avatar} />
          }
        </Button>
      </Box>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem component={NavLink} to="/new-artist" onClick={handleClose}>
          New Artist
        </MenuItem>
        <MenuItem component={NavLink} to="/new-album" onClick={handleClose}>
          New Album
        </MenuItem>
        <MenuItem component={NavLink} to="/new-track" onClick={handleClose}>
          New Track
        </MenuItem>
        <MenuItem component={NavLink} to="/trackhistory" onClick={handleClose}>
          Track History
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
