import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { Grid, TextField, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { TagsInput } from 'react-tag-input-component';
import { DropzoneArea } from 'material-ui-dropzone';
import Flatpickr from 'react-flatpickr';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});
const useStyles = makeStyles((theme) => ({
  paddingContainer: {
    padding: '0 70px',
    [theme.breakpoints.down('1350')]: {
      padding: '0 40px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 10px',
    },
  },
  label: {
    ...theme.typography.label,
  },
  input: {
    ...theme.typography.input,
    fontFamily: 'Montserrat',
    background: '#F1F1F1',
    color: '#5E5E5E',
    borderRadius: '5px',
    boxShadow: 'none',
    //marginTop: '5px',
  },
  inputOutline: {
    border: 'none',
  },
  dropZoneTextContainer: {
    margin: 0,
  },
  dropzoneRoot: {
    minHeight: '100px',
    border: '1px dashed #989090',
    padding: '10px 5px',
    borderRadius: 15,
    height: '100%',
  },
  hide: {
    display: 'none',
  },
}));
export default function Index(props) {
  const { t } = useTranslation();

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
    <Grid container direction="column" className={classes.paddingContainer}>
      {/* eventtitle */}
      <Grid item style={{ marginTop: '2em' }}>
        <TextField
          placeholder={t('signup.firstName')}
          id="firstName"
          //label={t('signup.firstName')}
          variant="outlined"
          fullWidth
          //size="small"
          InputProps={{
            classes: {
              root: classes.input,
              notchedOutline: classes.inputOutline,
            },
          }}
          required
          value={data.name}
          onChange={(e) => {
            setData({
              ...data,
              name: e.target.value,
            });
          }}
        />
      </Grid>
      {/* tags */}
      <Grid item style={{ marginTop: '15px' }}>
        <TagsInput
          value={data.tags}
          onChange={(tags) =>
            setData({
              ...data,
              tags: tags,
            })
          }
          name="tags"
          placeHolder="Enter Tags"
        />
      </Grid>
      {/* description and image */}
      <Grid item style={{ marginTop: '15px' }}>
        <Grid container spacing={2}>
          {/* description */}
          <Grid item md={6} xs={12}>
            <SunEditor
              mode="classic"
              setOptions={{
                height: '150px',
                katex: 'window.katex',
                buttonList: [
                  [
                    'undo',
                    'redo',
                    // 'font',
                    'fontSize',
                    'formatBlock',
                    'paragraphStyle',
                    'blockquote',
                    'bold',
                    'underline',
                    'italic',
                    'strike',
                    'subscript',
                    'superscript',
                    'fontColor',
                    'hiliteColor',
                    'textStyle',
                    'removeFormat',
                    'outdent',
                    'indent',
                    'align',
                    'horizontalRule',
                    'list',
                    'lineHeight',
                    'table',
                    'link',
                    // 'image',
                    // 'video',
                    'math',
                    // 'imageGallery',
                    'fullScreen',
                    'codeView',
                  ],
                ],
              }}
              className={classes.input}
              placeholder={t('editPortfolio.bio.bioPlaceholder')}
              setContents={data.bio}
              onChange={(content) =>
                setData((d) => {
                  return {
                    ...d,
                    bio: content,
                  };
                })
              }
            />
          </Grid>
          {/* image */}
          <Grid item md={6} xs={12}>
            <DropzoneArea
              classes={{
                icon: classes.hide,
                root: classes.dropzoneRoot,
                text: classes.dropZoneTextContainer,
              }}
              showAlerts={false}
              filesLimit={1}
              showPreviewsInDropzone={false}
              acceptedFiles={['image/*']}
              dropzoneText={
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  direction="column"
                  style={{ padding: '0.3em' }}
                >
                  <Grid item>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="241"
                      height="155"
                      fill="none"
                      viewBox="0 0 241 155"
                    >
                      <path
                        fill="#989090"
                        fillRule="evenodd"
                        stroke="#989090"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M190.351 148.111c22.091 0 40-17.908 40-40 0-22.091-17.909-40-40-40-.237 0-.473.002-.708.007-4.85-33.926-34.026-60.007-69.292-60.007-27.967 0-52.103 16.4-63.315 40.108-26.07 1.707-46.685 23.392-46.685 49.892 0 27.615 22.385 50 50 50h130z"
                        clipRule="evenodd"
                      ></path>
                      <path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="M120.351 118.111v-60M90.35 78.111l30.001-20 30 20"
                      ></path>
                    </svg>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      style={{ fontSize: '12px', color: '#929397', fontWeight: 400 }}
                      align="center"
                      className={[classes.label, classes.roboto].join(' ')}
                    >
                      {t('editPortfolio.hobby.hobbyImage')}
                    </Typography>
                  </Grid>

                  {data.image !== null && (
                    <Grid item style={{ marginTop: '3px' }}>
                      <Typography variant="body2">
                        {data.hobbyImage?.name.length > 10
                          ? data.hobbyImage?.name.slice(0, 10) + '...'
                          : data.hobbyImage?.name}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              }
              onChange={(files) => {
                setData({
                  ...data,
                  image: files[0],
                });
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* startDate endDate time */}
      <Grid item style={{ marginTop: '15px' }}>
        <Grid container spacing={2}>
          {/* startDate */}
          <Grid item sm={4} xs={12}>
            <Flatpickr
              value={data.startDate}
              onChange={(date) => {
                console.log(date);
                setData((d) => {
                  return {
                    ...d,
                    startDate: date[0],
                  };
                });
              }}
              options={{
                dateFormat: 'd M Y',
                altFormat: 'F j, Y',
                altInput: false,
                altInputClass: classes.input,
                // formatDate: (d) => {
                //   console.log(d, '');
                // },
              }}
              render={({ defaultValue, value, ...props }, ref) => {
                return (
                  <TextField
                    placeholder="Start Date"
                    //label={data.startDate ? '' : 'Start Date'}
                    id="startDate"
                    variant="outlined"
                    fullWidth
                    //size="small"
                    InputProps={{
                      classes: {
                        root: classes.input,
                        notchedOutline: classes.inputOutline,
                      },
                    }}
                    // defaultValue={data.dob
                    //   .toLocaleDateString(window.navigator?.language, {
                    //     year: 'numeric',
                    //     month: 'long',
                    //     day: 'numeric',
                    //   })
                    //   .split('.')
                    //   .join('')
                    //   .split(',')
                    //   .join('')}
                    inputRef={ref}
                  />
                );
              }}
            />
          </Grid>
          {/* endDate */}
          <Grid item sm={4} xs={12}>
            <Flatpickr
              value={data.endDate}
              onChange={(date) => {
                setData((d) => {
                  return {
                    ...d,
                    endDate: date[0],
                  };
                });
              }}
              options={{
                dateFormat: 'd M Y',
                altFormat: 'F j, Y',
                altInput: false,
                altInputClass: classes.input,
                // formatDate: (d) => {
                //   console.log(d, '');
                // },
              }}
              render={({ defaultValue, value, ...props }, ref) => {
                return (
                  <TextField
                    placeholder="End Date"
                    //label={data.startDate ? '' : 'Start Date'}
                    id="endDate"
                    variant="outlined"
                    fullWidth
                    //size="small"
                    InputProps={{
                      classes: {
                        root: classes.input,
                        notchedOutline: classes.inputOutline,
                      },
                    }}
                    // defaultValue={data.dob
                    //   .toLocaleDateString(window.navigator?.language, {
                    //     year: 'numeric',
                    //     month: 'long',
                    //     day: 'numeric',
                    //   })
                    //   .split('.')
                    //   .join('')
                    //   .split(',')
                    //   .join('')}
                    inputRef={ref}
                  />
                );
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <style>
        {`
          .rti--container{
            border: 0;
            font-family: Montserrat;
            background: #F1F1F1;
            color: #5E5E5E;
            border-radius: 5px;
            box-shadow: none;
            min-height: 42px;
          }
          .rti--container input{
            background: #F1F1F1;
          }
        `}
      </style>
    </Grid>
  );
}
