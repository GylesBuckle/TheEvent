import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  Grid,
  useMediaQuery,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { GlobalContext } from '../context/GlobalContext';
import * as websiteInfo from '../data/websiteInfo';
const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.typography.container,
  },
  menuPaper: {
    backgroundColor: '#fff',
    boxShadow: '0px 7px 24px rgba(129, 131, 141, 0.1)',
    borderRadius: '12px',
    padding: '2px 16px',
  },
  listItem: {
    ...theme.typography.label,
    fontSize: '13px',
    fontWeight: 400,
    color: '#121111',
  },
  label: {
    ...theme.typography.label,
  },
  button: {
    ...theme.typography.button,
    padding: '10px 21px',
    [theme.breakpoints.down('550')]: {
      display: 'none',
    },
  },
  tab: {
    ...theme.typography.h4,
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 500,
    textTransform: 'normal !important',
    minWidth: 10,
    color: '#000',
    marginLeft: '20px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      opacity: 1,
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));
  const matches1150 = useMediaQuery(theme.breakpoints.down('1150'));

  const { setAuth, user: globaluser } = useContext(GlobalContext);
  const isAdmin = globaluser?.roles.includes('Super Admin') || globaluser?.roles.includes('Admin');

  const [profileMenu, setProfileMenu] = useState(null);

  const [openDrawer, setOpenDrawer] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const logoutHandler = async () => {
    try {
      router.push('/login');
      setAuth(null);

      setProfileMenu(null);
      await localStorage.removeItem(websiteInfo.tokenKey);
    } catch (e) {
      console.log('faled to logout', e);
    }
  };

  const menuID = 'profile-menu';
  const renderMenu = (
    <Menu
      anchorEl={profileMenu}
      id={menuID}
      keepMounted
      MenuListProps={{ onMouseLeave: () => (matchesSM ? '' : setProfileMenu(null)) }}
      open={Boolean(profileMenu)}
      onClose={() => setProfileMenu(null)}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      classes={{
        paper: classes.menuPaper,
      }}
      disableScrollLock
    >
      {isAdmin && (
        <MenuItem
          style={{ background: 'transparent' }}
          divider
          onClick={() => setProfileMenu(null)}
        >
          <Link href="/admin-dashboard" style={{ textDecoration: 'none' }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <SettingsIcon fontSize="small" style={{ fill: 'rgba(0, 0, 0, 0.87)' }} />
              </Grid>
              <Grid item>
                <Typography className={classes.listItem}>
                  {' '}
                  {t('common.header.submenu.settingSubmenu.1')}
                </Typography>
              </Grid>
            </Grid>
          </Link>
        </MenuItem>
      )}

      <MenuItem style={{ background: 'transparent' }} onClick={logoutHandler}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <ExitToAppIcon fontSize="small" />
          </Grid>
          <Grid item>
            <Typography className={classes.listItem}>
              {' '}
              {t('common.header.submenu.settingSubmenu.2')}
            </Typography>
          </Grid>
        </Grid>
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        // classes={{ paper: classes.drawer }}
      >
        {/* <div className={classes.toolbarMargin} /> */}
        <List onClick={() => setOpenDrawer(false)}>
          <Link href={`/${globaluser?.userName}`} style={{ textDecoration: 'none' }}>
            <ListItem divider button>
              <ListItemText className={classes.tab} disableTypography>
                {t('common.header.menu.1')}
              </ListItemText>
            </ListItem>
          </Link>
          <Link href="/edit-profile" style={{ textDecoration: 'none' }}>
            <ListItem divider button>
              <ListItemText className={classes.tab} disableTypography>
                {t('common.header.menu.2')}
              </ListItemText>
            </ListItem>
          </Link>
          <Link href="/account" style={{ textDecoration: 'none' }}>
            <ListItem divider button>
              <ListItemText className={classes.tab} disableTypography>
                {t('common.header.submenu.settingSubmenu.1')}
              </ListItemText>
            </ListItem>
          </Link>

          <ListItem divider button onClick={logoutHandler}>
            <ListItemText className={classes.tab} disableTypography>
              {t('common.header.submenu.settingSubmenu.2')}
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </React.Fragment>
  );

  const logoContainer = (
    <Grid container alignItems={matchesSM ? 'flex-end' : 'center'}>
      <Grid item component={Link} href="/" style={{ cursor: 'pointer' }}>
        <Typography variant="h6" noWrap>
          <img
            src="/dev/logo.png"
            style={{
              width: '208px',
              height: '106px',
              marginTop: matchesSM ? '5px' : 0,
            }}
            alt="logo"
          />
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <AppBar
        elevation={0}
        position="static"
        style={{
          backgroundColor: '#fff',
        }}
      >
        <Toolbar disableGutters>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid
              container
              className={[classes.container].join(' ')}
              justifyContent="space-between"
              alignItems="center"
              wrap="nowrap"
              style={{ gap: '30px' }}
            >
              {/* {matchesSM && (
                <Grid item>
                  <Grid container alignItems="center" spacing={1} wrap={'nowrap'}>
                    <Grid item>
                      <IconButton
                        aria-label="show more"
                        aria-haspopup="true"
                        onClick={() => setOpenDrawer(true)}
                        color="inherit"
                        style={{ padding: 0 }}
                      >
                        <FormatListBulletedIcon size="large" color="primary" />
                      </IconButton>
                    </Grid>

                    <Grid item>{logoContainer}</Grid>
                  </Grid>
                </Grid>
              )} */}
              {/* {!matchesSM && ( */}
              <Grid item>{logoContainer}</Grid>
              {/* )} */}
              {!matchesSM && (
                <Grid item style={{ flex: 1 }}>
                  <Typography variant="h5" align="center">
                    {t('common.header.text')}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <Grid
                  container
                  spacing={matches1150 ? 0 : matchesXL ? 5 : 3}
                  alignItems="center"
                  justifyContent="flex-end"
                  wrap="nowrap"
                >
                  {/* {!matchesSM && (
                    <Grid item>
                      <Link href="/edit-profile">
                        <Typography className={classes.tab}>{t('common.header.menu.2')}</Typography>
                      </Link>
                    </Grid>
                  )} */}
                  {/* {!matchesSM && ( */}
                  <Grid item>
                    <Link href="/#events">
                      <Button className={classes.button}>{t('common.header.buy')}</Button>
                    </Link>
                  </Grid>
                  {globaluser && globaluser.token && (
                    <Grid item>
                      <Typography
                        style={{ cursor: 'pointer' }}
                        className={classes.tab}
                        aria-owns={profileMenu ? menuID : undefined}
                        aria-haspopup={profileMenu ? true : false}
                        onMouseOver={(e) => (matchesSM ? '' : setProfileMenu(e.currentTarget))}
                        onClick={(e) => setProfileMenu(e.currentTarget)}
                      >
                        <SettingsIcon />
                        {/* {t('common.header.menu.3')} */}
                      </Typography>
                    </Grid>
                  )}

                  {/* )} */}
                  <Grid item style={{ marginRight: matchesSM ? '0.45em' : 0 }}></Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {drawer}
    </div>
  );
}
