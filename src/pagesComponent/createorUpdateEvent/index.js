import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paddingContainer: {
    padding: '30px 70px',
    [theme.breakpoints.down('1350')]: {
      padding: '30px 40px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '5px',
    },
  },
}));
export default function Index(props) {
  const classes = useStyles();
  const [data, setData] = useState({
    name: '',
    tags: [],
    description: '',
    image: '',
    startDate: '',
    endDate: '',
    location: '',
    venue: '',
    price: '',
    address: '',
    phone: '',
    email: '',
    facebook: '',
    twitter: '',
    insta: '',
    linkdin: '',
    snapchat: '',
    whatsApp: '',
    sponsors: [],
    speakers: [],
    schedule: [],
  });

  const [coverFile, setCoverFile] = useState(null);
  const [tag, setTag] = useState('');

  const [zoom, setZoom] = useState(1);
  const [cropper, setCropper] = useState();
  const [showImageCropper, setShowImageCropper] = useState({
    active: false,
    file: null,
    fileName: '',
  });
  const [showSponsorCropper, setShowSponsorCropper] = useState({
    active: false,
    file: null,
    fileName: '',
  });
  const [showSpeakerCropper, setShowSpeakerCropper] = useState({
    active: false,
    file: null,
    fileName: '',
  });
  return (
    <Grid container direction="column">
      <Grid item style={{ marginTop: '2em' }}></Grid>
    </Grid>
  );
}
