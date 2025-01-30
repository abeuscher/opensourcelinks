// src/components/common/Header.tsx

import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import type { NavItem } from '../../types/navigation';
import { mainNavItems } from '../../data/navigation';
import { useRouter } from 'next/router';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileAnchorEl, setMobileAnchorEl] = useState<null | HTMLElement>(null);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<null | HTMLElement>(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setDropdownAnchorEl(event.currentTarget);
    setOpenDropdownIndex(index);
  };

  const handleDropdownClose = () => {
    setDropdownAnchorEl(null);
    setOpenDropdownIndex(null);
  };

  const handleNavigation = (url: string) => {
    if (url !== '#') {
      router.push(url);
      handleMobileMenuClose();
      handleDropdownClose();
    }
  };

  const renderDesktopNav = () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {mainNavItems.map((item, index) => (
        <React.Fragment key={item.url}>
          {item.children ? (
            <Box>
              <Button
                color="inherit"
                onClick={e => handleDropdownOpen(e, index)}
                endIcon={<ExpandMoreIcon />}
                startIcon={item.icon && <item.icon />}
              >
                {item.text}
              </Button>
              <Popper
                open={openDropdownIndex === index}
                anchorEl={dropdownAnchorEl}
                transition
                placement="bottom-start"
              >
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper>
                      <ClickAwayListener onClickAway={handleDropdownClose}>
                        <MenuList>
                          {item.children.map(child => (
                            <MenuItem
                              key={child.url}
                              onClick={() => handleNavigation(child.url)}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                              }}
                            >
                              {child.text}
                              {child.icon && <child.icon sx={{ fontSize: 20 }} />}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
          ) : (
            <Link href={item.url} passHref legacyBehavior>
              <Button
                component="a"
                color="inherit"
                className={item.className}
                startIcon={item.icon && <item.icon />}
              >
                {item.text}
              </Button>
            </Link>
          )}
        </React.Fragment>
      ))}
    </Box>
  );

  const renderMobileNav = () => (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMobileMenuOpen}
        sx={{ ml: 'auto' }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={mobileAnchorEl}
        open={Boolean(mobileAnchorEl)}
        onClose={handleMobileMenuClose}
      >
        {mainNavItems.map(item => (
          <React.Fragment key={item.url}>
            {item.children ? (
              item.children.map(child => (
                <MenuItem
                  key={child.url}
                  onClick={() => handleNavigation(child.url)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  {child.icon && <child.icon sx={{ fontSize: 20 }} />}
                  {child.text}
                </MenuItem>
              ))
            ) : (
              <MenuItem
                onClick={() => handleNavigation(item.url)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                {item.icon && <item.icon sx={{ fontSize: 20 }} />}
                {item.text}
              </MenuItem>
            )}
          </React.Fragment>
        ))}
      </Menu>
    </>
  );

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Link href="/" passHref legacyBehavior>
          <Typography
            variant="h6"
            component="a"
            sx={{
              flexGrow: 0,
              mr: 4,
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'none',
                color: 'inherit',
              },
            }}
          >
            Escape the Oligarchy
          </Typography>
        </Link>

        {isMobile ? renderMobileNav() : renderDesktopNav()}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
