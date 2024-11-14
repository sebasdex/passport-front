import * as React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
interface FadeMenuProps {
    handleOut?: () => void;
    userRoleCheck: string;
}


export default function FadeMenu({ handleOut, userRoleCheck }: FadeMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const links = [
        { name: 'Cursos', path: '/courses', role: ['administrador'] },
        { name: 'Empleados', path: '/employees', role: ['administrador'] },
        { name: 'Usuarios', path: '/users', role: ['administrador'] },
        { name: 'Salir', path: '', role: ['administrador', 'empleado'], handleOutClick: handleOut },
    ];

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='lg:hidden'>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                color='inherit'
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {
                    links.map((link, index) => link.role.includes(userRoleCheck) ? (
                        link.handleOutClick ? (
                            <MenuItem key={index} onClick={link.handleOutClick}>{link.name}</MenuItem>
                        ) : (
                            <MenuItem key={index} component={Link} to={link.path} onClick={() => handleClose()}>
                                {link.name}
                            </MenuItem>
                        )
                    ) : (
                        null
                    )

                    )}

            </Menu>
        </div>
    );
}
