import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 30,
    height: 18,
    padding: 0,

    margin: theme.spacing(1),
    marginRight: 0,
  },
  switchBase: {
    padding: 0,
    backgroundColor: 'rgba(160, 169, 176, 0.2)',
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 14,
    height: 14,
    margin: 2,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid #AFAFAF`,
    backgroundColor: '#AFAFAF',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default IOSSwitch;
