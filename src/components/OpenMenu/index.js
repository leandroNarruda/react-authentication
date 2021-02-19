import React from 'react';
import { Button, IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MoreVert } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

export default function SimpleMenu() {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path) => {
    setAnchorEl(null);
    history.push(path)
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <IconButton aria-label="settings">
            <MoreVert />
        </IconButton>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose('tech-register')}>Cadastrar Tecnologia</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
