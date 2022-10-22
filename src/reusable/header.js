import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  useTheme,
  Grid,
  useMediaQuery,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AppsIcon from '@material-ui/icons/Apps';

import { GlobalContext } from '../context/GlobalContext';
import DownloadButton from './downloadButton';
const useStyles = makeStyles((theme) => ({
  grow: {
    marginBottom: '1em',
  },
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0.5em',
      paddingRight: '0.5em',
    },
  },
  container: {
    zIndex: 2,
    width: '80%',
    [theme.breakpoints.between('1300', '1400')]: {
      width: '90%',
    },
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  inputRoot: {
    fontFamily: 'Inter',
    fontSize: '13px',
    fontWeight: 500,
    '&::placeholder': {
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '13px',
      opacity: 0.7,
    },
  },
  nameLabel: {
    ...theme.typography.label,
    fontSize: '14px',
    fontWeight: 400,
    color: '#1F4173',
    display: 'flex',
    alignItems: 'center',
  },
  menuPaper: {
    backgroundColor: '#fff',
    boxShadow: '0px 7px 24px rgba(129, 131, 141, 0.1)',
    borderRadius: '12px',
    padding: '2px 16px',
  },
  NotificationMenuPaper: {
    maxWidth: '300px',
    maxHeight: '70vh',
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
  input: {
    ...theme.typography.input,
    borderRadius: '5px',
    boxShadow: 'none',
    marginTop: '7px',
  },
  button: {
    ...theme.typography.label,
    fontSize: '20px',
    color: '#fff',
    backgroundColor: '#1A1A1A',
    borderRadius: '9px',
    fontWeight: 700,
    textTransform: 'none',
    boxShadow: '0px 4px 4px 0px #00000040',

    '&:hover': {
      color: '#fff',
      backgroundColor: '#1A1A1A',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
      fontWeight: 500,
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
  const isCompany = globaluser?.roles.includes('Company');
  const isEmployee = globaluser?.roles.includes('Employee');

  const [profileMenu, setProfileMenu] = useState(null);
  const [features, setFeaturesMenu] = useState(null);

  const [openDrawer, setOpenDrawer] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const logoutHandler = async () => {
    try {
      router.push('/login');
      setAuth(null);

      setProfileMenu(null);
      await localStorage.removeItem('tappio-jwt');
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
      MenuListProps={{ onMouseLeave: () => setProfileMenu(null) }}
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
      <MenuItem style={{ background: 'transparent' }} divider onClick={() => setProfileMenu(null)}>
        <Link
          href={globaluser?.roles?.includes('User') ? '/choose-feature' : '/edit-profile'}
          style={{ textDecoration: 'none' }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <AppsIcon fontSize="small" style={{ fill: 'rgba(0, 0, 0, 0.87)' }} />
            </Grid>
            <Grid item>
              <Typography className={classes.listItem}> {t('homepage.header.home')}</Typography>
            </Grid>
          </Grid>
        </Link>
      </MenuItem>
      {!isAdmin && (
        <MenuItem
          style={{ background: 'transparent' }}
          divider
          onClick={() => setProfileMenu(null)}
        >
          <Link href="/account" style={{ textDecoration: 'none' }}>
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

  const featuresMenuID = 'features-menu';
  const featuresMenu = (
    <Menu
      anchorEl={features}
      id={featuresMenuID}
      keepMounted
      MenuListProps={{ onMouseLeave: () => setFeaturesMenu(null) }}
      open={Boolean(features)}
      onClose={() => setFeaturesMenu(null)}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      classes={{
        paper: classes.menuPaper,
      }}
      disableScrollLock
    >
      <MenuItem style={{ background: 'transparent' }} divider onClick={() => setFeaturesMenu(null)}>
        <Link href={`/${globaluser?.userName}`} target="_blank" style={{ textDecoration: 'none' }}>
          <a style={{ textDecoration: 'none' }} target="_blank">
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Typography className={classes.listItem}> {t('common.header.menu.1')}</Typography>
              </Grid>
            </Grid>
          </a>
        </Link>
      </MenuItem>
      {globaluser?.roles?.includes('User') && globaluser?.portfolio && (
        <MenuItem
          style={{ background: 'transparent' }}
          divider
          onClick={() => setFeaturesMenu(null)}
        >
          <Link href={`/w/${globaluser?.userName}`} target="_blank">
            <a style={{ textDecoration: 'none' }} target="_blank">
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Typography className={classes.listItem}> {t('common.header.menu.4')}</Typography>
                </Grid>
              </Grid>
            </a>
          </Link>
        </MenuItem>
      )}
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
          {isCompany && (
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <ListItem divider button>
                <ListItemText className={classes.tab} disableTypography>
                  {t('common.header.submenu.settingSubmenu.3')}
                </ListItemText>
              </ListItem>
            </Link>
          )}
          <ListItem divider button onClick={logoutHandler}>
            <ListItemText className={classes.tab} disableTypography>
              {t('common.header.submenu.settingSubmenu.2')}
            </ListItemText>
          </ListItem>
          {/* paper saved */}
          {!isCompany && (
            <ListItem divider button>
              <ListItemText
                className={classes.tab}
                disableTypography
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="23"
                  fill="none"
                  viewBox="0 0 22 23"
                >
                  <path
                    fill="#00AC47"
                    d="M21.727 2.891c-2.379-1.803-6.04-2.88-9.795-2.88-4.644 0-8.428 1.622-10.38 4.449C.635 5.787.127 7.36.043 9.132c-.074 1.579.192 3.325.788 5.203C2.87 8.225 8.561 3.441 15.124 3.441c0 0-6.14 1.616-10.001 6.622a14.484 14.484 0 00-2.099 3.739 21.157 21.157 0 00-1.65 8.201h2.75s-.418-2.626.308-5.645c1.074.153 2.157.234 3.241.243 2.529 0 4.326-.547 5.658-1.721 1.194-1.052 1.853-2.467 2.55-3.963 1.064-2.287 2.27-4.877 5.772-6.878a.688.688 0 00.074-1.145V2.89z"
                  ></path>
                </svg>{' '}
                {t('common.header.menu.paperSaved')} {globaluser?.paperSaved}
              </ListItemText>
            </ListItem>
          )}
        </List>
      </SwipeableDrawer>
    </React.Fragment>
  );

  const logoContainer = (
    <Grid container alignItems={matchesSM ? 'flex-end' : 'center'}>
      <Grid item component={Link} href="/" style={{ cursor: 'pointer' }}>
        <Typography variant="h6" noWrap>
          <img
            src="/dev/tappio.png"
            style={{
              width: matchesSM ? '100px' : '166px',
              height: matchesSM ? '37px' : '56px',
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
          paddingTop: '0.4em',
          paddingBottom: '0.4em',
          backgroundColor: '#fff',
          position: 'fixed',
        }}
        className={classes.root}
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
              style={{
                width:
                  router.pathname !== '/edit-profile' &&
                  router.pathname !== '/edit-portfolio' &&
                  router.pathname !== '/meetings-get-started'
                    ? '98%'
                    : undefined,
              }}
              className={[
                classes.container,
                router.pathname === '/edit-profile' ||
                router.pathname === '/edit-portfolio' ||
                router.pathname === '/meetings-get-started'
                  ? 'container'
                  : '',
              ].join(' ')}
              justifyContent="space-between"
              alignItems="center"
              wrap="nowrap"
            >
              {matchesSM && (
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
              )}
              {!matchesSM && (
                <Grid item style={{ flex: 1 }} container={matchesSM} md={2} justifyContent="center">
                  <Grid item>{logoContainer}</Grid>
                </Grid>
              )}

              <Grid item md xs>
                <Grid
                  container
                  spacing={matches1150 ? 0 : matchesXL ? 5 : 3}
                  alignItems="center"
                  justifyContent="flex-end"
                  wrap="nowrap"
                >
                  {!matchesSM && !isCompany && (
                    <Grid item>
                      <Typography
                        className={classes.tab}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="23"
                          fill="none"
                          viewBox="0 0 22 23"
                        >
                          <path
                            fill="#00AC47"
                            d="M21.727 2.891c-2.379-1.803-6.04-2.88-9.795-2.88-4.644 0-8.428 1.622-10.38 4.449C.635 5.787.127 7.36.043 9.132c-.074 1.579.192 3.325.788 5.203C2.87 8.225 8.561 3.441 15.124 3.441c0 0-6.14 1.616-10.001 6.622a14.484 14.484 0 00-2.099 3.739 21.157 21.157 0 00-1.65 8.201h2.75s-.418-2.626.308-5.645c1.074.153 2.157.234 3.241.243 2.529 0 4.326-.547 5.658-1.721 1.194-1.052 1.853-2.467 2.55-3.963 1.064-2.287 2.27-4.877 5.772-6.878a.688.688 0 00.074-1.145V2.89z"
                          ></path>
                        </svg>{' '}
                        {t('common.header.menu.paperSaved')} {globaluser?.paperSaved}
                      </Typography>
                    </Grid>
                  )}

                  {!matchesSM && isCompany && (
                    <Grid item>
                      <Link href="/dashboard">
                        <a className={classes.tab}>{t('common.header.submenu.settingSubmenu.3')}</a>
                      </Link>
                    </Grid>
                  )}
                  {!matchesSM && (
                    <Grid item>
                      {globaluser?.roles?.includes('User') ? (
                        <Typography
                          className={classes.tab}
                          aria-owns={features ? menuID : undefined}
                          aria-haspopup={features ? true : false}
                          onMouseOver={(e) => setFeaturesMenu(e.currentTarget)}
                        >
                          {t('common.header.menu.5')}
                        </Typography>
                      ) : (
                        <Link href={`/${globaluser?.userName}`}>
                          <a className={classes.tab} target="_blank">
                            {t('common.header.menu.1')}
                          </a>
                        </Link>
                      )}
                    </Grid>
                  )}
                  {!matchesSM && (
                    <Grid item>
                      <Link href="/edit-profile">
                        <Typography className={classes.tab}>{t('common.header.menu.2')}</Typography>
                      </Link>
                    </Grid>
                  )}
                  {!matchesSM && (
                    <Grid item>
                      <Typography
                        className={classes.tab}
                        aria-owns={profileMenu ? menuID : undefined}
                        aria-haspopup={profileMenu ? true : false}
                        onMouseOver={(e) => setProfileMenu(e.currentTarget)}
                      >
                        {t('common.header.menu.3')}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item style={{ marginRight: matchesSM ? '0.45em' : 0 }}>
                    <DownloadButton
                      style={{
                        padding: '8px 48px',
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {featuresMenu}
      {drawer}
    </div>
  );
}
