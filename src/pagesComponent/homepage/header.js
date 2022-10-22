import React, { useState, useContext } from 'react';
import Link from 'next/link';
import {
  useMediaQuery,
  useScrollTrigger,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Grid,
  useTheme,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AppsIcon from '@material-ui/icons/Apps';
import { useTranslation } from 'react-i18next';
import DownloadButton from '../../reusable/downloadButton';
import { GlobalContext } from '../../context/GlobalContext';

const useStyles = makeStyles((theme) => ({
  AppBar: {
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: '#fff',
    transition: 'all 0.4s ease-out',
  },
  toolbarMargin: {
    //classname
    ...theme.mixins.toolbar,
    marginBottom: '95px',
    [theme.breakpoints.down('1350')]: {
      marginBottom: '65px',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '33px',
    },
  },
  toolbarMarginTrigger: {
    //classname
    ...theme.mixins.toolbar,
    marginBottom: '60px',
    [theme.breakpoints.down('1350')]: {
      marginBottom: '30px',
    },
  }, //This Provides height of Appbar,//By Using this we can push content after appbar
  logo: {
    textTransform: 'none',
    width: '141px',
    height: '53px',
  },
  tab: {
    ...theme.typography.caption,
    color: '#000',
    opacity: 1,
    textTransform: 'none',
  },
  button: {
    marginRight: '20px',
    color: '#000',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: '1em',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawerIcon: {
    width: 50,
    height: 50,
  },
  drawer: {
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      width: '30%',
    },

    [theme.breakpoints.down('xs')]: {
      width: '65%',
    },
  },
  drawerItem: {
    ...theme.typography.caption,
    color: '#000',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
}));

export default function Header(props) {
  const trigger = useScrollTrigger({
    disableHysteresis: true, //disable delay
    threshold: 0, //how far user has to scroll beforee it triggers this event
  });
  const { t } = useTranslation();
  const { user } = useContext(GlobalContext);
  let authenticated = !(user === null || !user.token);

  const classes = useStyles();
  const theme = useTheme();
  const matches1350 = useMediaQuery(theme.breakpoints.down('1350'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);

  const routes = [
    { name: t('homepage.header.1'), link: '#home', activeIndex: 0 },
    {
      name: t('homepage.header.2'),
      link: '#features',
      activeIndex: 1,
    },
    { name: t('homepage.header.3'), link: '#benefits', activeIndex: 2 },
    { name: t('homepage.header.4'), link: '#pricing', activeIndex: 3 },
    { name: t('homepage.header.5'), link: '#reviews', activeIndex: 4 },
  ];
  const tabs = (
    <React.Fragment>
      <Grid container style={{ flexWrap: 'nowrap' }} justify="space-between" alignItems="center">
        <Grid item style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Tabs>
            {routes.map((route, index) => (
              <Tab
                className={classes.tab}
                key={route.name + index}
                label={
                  <Typography className={classes.tab} variant="caption">
                    {route.name}
                  </Typography>
                }
                component={'a'}
                href={route.link}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" wrap="nowrap">
            {!props.loadingAuth && (
              <Grid item>
                <Link
                  href={user?.roles?.includes('User') ? '/choose-feature' : '/edit-profile'}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    variant="text"
                    startIcon={authenticated ? <AppsIcon /> : <LockOutlinedIcon />}
                    style={{ textTransform: 'none', background: 'transparent' }}
                  >
                    <Typography className={classes.button} variant="caption">
                      {authenticated ? t('homepage.header.home') : t('homepage.header.login')}
                    </Typography>
                  </Button>
                </Link>
              </Grid>
            )}
            <Grid item>
              <DownloadButton />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={trigger ? classes.toolbarMarginTrigger : classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route, i) => (
            <>
              <ListItem
                key={route.name + i}
                divider
                button
                component={'a'}
                href={route.link}
                onClick={(e) => {
                  // route.onMouseOver
                  //   ? route.onMouseOver(e, 'sm')
                  //   : setOpenDrawer(false);
                  // props.setValue(i);
                  setOpenDrawer(false);
                }}
                classes={{ selected: classes.drawerItemSelected }}
              >
                {/* <ListItemIcon className={classes.menuItemIcon}>
          <IconDashboard />
        </ListItemIcon> */}
                <ListItemText className={classes.drawerItem} disableTypography>
                  {route.name}
                </ListItemText>
              </ListItem>
            </>
          ))}
          {!props.loadingAuth && (
            <Link href={user?.roles?.includes('User') ? '/choose-feature' : '/edit-profile'}>
              <ListItem divider button classes={{ selected: classes.drawerItemSelected }}>
                <Button
                  variant="text"
                  startIcon={authenticated ? <AppsIcon /> : <LockOutlinedIcon />}
                  style={{ textTransform: 'none' }}
                >
                  <Typography className={classes.button} variant="caption">
                    {authenticated ? t('homepage.header.home') : t('homepage.header.login')}
                  </Typography>
                </Button>
              </ListItem>
            </Link>
          )}
          <ListItem
            divider
            button
            style={{ margin: '10px 0' }}
            classes={{ selected: classes.drawerItemSelected }}
          >
            <DownloadButton style={{ padding: '8px 59px' }} />
          </ListItem>
        </List>
      </SwipeableDrawer>
      <Grid container justifyContent="flex-end">
        <IconButton
          onClick={() => setOpenDrawer((openDrawer) => !openDrawer)}
          disableRipple
          className={classes.drawerIconContainer}
        >
          <MenuIcon className={classes.drawerIcon} htmlColor={theme.palette.common.blue} />
        </IconButton>
      </Grid>
    </React.Fragment>
  );
  return (
    <div>
      <AppBar
        position="static"
        style={{
          boxShadow: trigger ? '0px 0px 3px #313C4F59' : 'none',
          padding: trigger
            ? matchesSM
              ? '5px 5px'
              : matches1350
              ? '10px 40px'
              : '10px 70px'
            : matchesSM
            ? '10px 5px'
            : matches1350
            ? '30px 40px'
            : '30px 70px',
          position: 'fixed',
        }}
        className={classes.AppBar}
      >
        <Toolbar disableGutters={true}>
          <Grid container alignItems="center" wrap="nowrap" spacing={0} disableRipple>
            <Grid item>
              <img
                src="/dev/tappio.png"
                style={{
                  backgroundColor: 'transparent',
                }}
                alt="logo"
                className={classes.logo}
              />
            </Grid>
            <Grid item style={{ flex: 1 }}>
              {matches1350 ? drawer : tabs}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <div className={classes.toolbarMargin}></div>
      {/* This Div is Imaginary Space we Assign to AppBar */}
    </div>
  );
}
