import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import {
  Grid,
  TextField,
  Typography,
  Snackbar,
  Slider,
  Dialog,
  DialogContent,
  Button,
  InputAdornment,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { TagsInput } from 'react-tag-input-component';
import { DropzoneArea } from 'material-ui-dropzone';
import Flatpickr from 'react-flatpickr';
import { compressAccurately } from 'image-conversion';
import Cropper from 'react-cropper';

import * as websiteInfo from '../../data/websiteInfo';
import dataURLtoFile from '../../utils/dataURLtoFile';
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
    //fontFamily: 'Poppins',
    fontSize: '16px',
    background: '#F1F1F1',
    color: '#5E5E5E',
    borderRadius: '5px',
    boxShadow: 'none',
    '& ::placeholder': {
      fontWeight: 400,
      color: '#5e5e5e',
      opacity: 1,
      //fontFamily: 'Poppins',
    },
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
  button: {
    ...theme.typography.button,
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
  const [errors, setError] = useState([]);
  const [showToast, setShowToast] = useState({
    active: false,
    message: '',
  });

  const [imageFile, setImageFile] = useState(null);

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

  useEffect(() => {
    // bio.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  }, []);

  const imageChangeHandler = (files) => {
    const maximumSize = websiteInfo.maximumFileSize;

    if (!files || !files[0]) {
      return;
    }
    if (files[0].size > maximumSize) {
      setShowToast({
        active: true,
        message: t('events.createEvent.sizeError'),
        severity: 'error',
      });
      return;
    }
    const fn = files[0].name;
    const type = files[0].type;

    const reader = new FileReader();
    reader.onload = () => {
      setShowImageCropper({
        active: true,
        file: reader.result,
        type: type,
        fileName: fn,
      });
    };
    reader.readAsDataURL(files[0]);
  };
  const imageCropHandler = async () => {
    if (typeof cropper !== 'undefined') {
      let obj = dataURLtoFile(
        cropper.getCroppedCanvas().toDataURL(showImageCropper.type),
        showImageCropper.fileName
      );
      if (obj.size > 300000) {
        let compressObjBlob = await compressAccurately(obj, 300);
        let compressObjFile = new File([compressObjBlob], showImageCropper.fileName, {
          type: showImageCropper.type,
        });
        obj = compressObjFile;
      }

      setImageFile(obj);
      setData((d) => {
        return {
          ...d,
          image: obj,
        };
      });
      setShowImageCropper({
        active: false,
        file: null,
        fileName: '',
      });
      setZoom(1);
      setCropper();

      //   setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const imageCroperDialog = (
    <Dialog
      maxWidth="lg"
      fullWidth
      open={showImageCropper.active}
      onClose={() => {
        setShowImageCropper({
          active: false,
          file: null,
          fileName: '',
        });
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Cropper
          style={{ height: 390, width: '100%' }}
          aspectRatio={16 / 9}
          guides={false}
          src={showImageCropper.file}
          //   ref={(cropper) => {
          //     this.cropper = cropper;
          //   }}
          //ref={cropperRef}
          viewMode={1}
          dragMode="move"
          cropBoxMovable={false}
          zoomTo={zoom}
          responsive={true}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />

        <div style={{ marginTop: '1em' }}>
          <Slider
            value={zoom}
            //min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(zoom)}
            classes={{ root: 'slider' }}
          />
        </div>

        <div style={{ marginTop: '1em' }}>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() =>
                  setShowImageCropper({
                    active: false,
                    file: null,
                    fileName: '',
                  })
                }
              >
                {t('events.createEvent.cancel')}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" className={classes.button} onClick={imageCropHandler}>
                {t('events.createEvent.save')}
              </Button>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
  return (
    <Grid container direction="column" className={classes.paddingContainer}>
      {imageCroperDialog}
      <Snackbar
        open={showToast.active}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setShowToast({
            active: false,
            message: '',
          });
        }}
        message={showToast.message}
      />
      {/* eventtitle */}
      <Grid item style={{ marginTop: '2em' }}>
        <TextField
          placeholder={t('events.createEvent.name')}
          id="name"
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
          placeHolder={t('events.createEvent.tags')}
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
              placeholder={t('events.createEvent.description')}
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
                      style={{ fontSize: '16px', color: '#989090', fontWeight: 400 }}
                      align="center"
                      className={[classes.label, classes.roboto].join(' ')}
                    >
                      {t('events.createEvent.uploadImage')}
                    </Typography>
                  </Grid>

                  {data.image !== '' && (
                    <Grid item style={{ marginTop: '3px' }}>
                      <Typography variant="body2">
                        {imageFile !== null
                          ? imageFile.name.length > 10
                            ? imageFile.name
                            : imageFile.name.slice(0, 10) + '...'
                          : publicRuntimeConfig.REACT_APP_API_URL + '/files/events/' + data.image}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              }
              onChange={(files) => imageChangeHandler(files)}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* startDate endDate time */}
      <Grid item style={{ marginTop: '25px' }}>
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
                    placeholder={t('events.createEvent.startDate')}
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
                      endAdornment: (
                        <InputAdornment>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="none"
                            viewBox="0 0 25 25"
                          >
                            <path
                              stroke="#5D5D5D"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19.231 4.854h-14a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1v-14a1 1 0 00-1-1z"
                            ></path>
                            <path
                              stroke="#5D5D5D"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16.231 16.854h.002v.002h-.002v-.002zM12.231 16.854h.002v.002h-.002v-.002zM8.231 16.854h.002v.002h-.002v-.002zM16.231 12.854h.002v.002h-.002v-.002zM12.231 12.854h.002v.002h-.002v-.002zM8.231 12.854h.002v.002h-.002v-.002zM4.231 8.854h16M16.231 2.854v2M8.231 2.854v2"
                            ></path>
                          </svg>
                        </InputAdornment>
                      ),
                    }}
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
                    placeholder={t('events.createEvent.endDate')}
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
                      endAdornment: (
                        <InputAdornment>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="none"
                            viewBox="0 0 25 25"
                          >
                            <path
                              stroke="#5D5D5D"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19.231 4.854h-14a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1v-14a1 1 0 00-1-1z"
                            ></path>
                            <path
                              stroke="#5D5D5D"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16.231 16.854h.002v.002h-.002v-.002zM12.231 16.854h.002v.002h-.002v-.002zM8.231 16.854h.002v.002h-.002v-.002zM16.231 12.854h.002v.002h-.002v-.002zM12.231 12.854h.002v.002h-.002v-.002zM8.231 12.854h.002v.002h-.002v-.002zM4.231 8.854h16M16.231 2.854v2M8.231 2.854v2"
                            ></path>
                          </svg>
                        </InputAdornment>
                      ),
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
          {/* time */}
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
                mode: 'time',
                // dateFormat: 'd M Y',
                // altFormat: 'F j, Y',
                altInput: false,
                altInputClass: classes.input,
                // formatDate: (d) => {
                //   console.log(d, '');
                // },
              }}
              render={({ defaultValue, value, ...props }, ref) => {
                return (
                  <TextField
                    placeholder={t('events.createEvent.time')}
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
                      endAdornment: (
                        <InputAdornment>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="24"
                            fill="none"
                            viewBox="0 0 25 24"
                          >
                            <path
                              stroke="#5D5D5D"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="2"
                              d="M12.231 21a9 9 0 100-18 9 9 0 000 18z"
                            ></path>
                            <path
                              stroke="#5D5D5D"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12.231 7v5h5"
                            ></path>
                          </svg>
                        </InputAdornment>
                      ),
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
      {/* location venue price */}
      <Grid item style={{ marginTop: '25px' }}>
        <Grid container spacing={2}>
          {/* location */}
          <Grid item sm={4} xs={12}></Grid>
          {/* venue */}
          <Grid item sm={4} xs={12}>
            <TextField
              placeholder={t('events.createEvent.venue')}
              id="venue"
              //label={t('signup.firstName')}
              variant="outlined"
              fullWidth
              //size="small"
              InputProps={{
                classes: {
                  root: classes.input,
                  notchedOutline: classes.inputOutline,
                },
                endAdornment: (
                  <InputAdornment>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      fill="none"
                      viewBox="0 0 25 24"
                    >
                      <path
                        stroke="#5D5D5D"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.731 6l6-3v15l-6 3V6zM9.731 18l6 3V6l-6-3v15zM3.731 6l6-3v15l-6 3V6z"
                      ></path>
                    </svg>
                  </InputAdornment>
                ),
              }}
              required
              value={data.venue}
              onChange={(e) => {
                setData({
                  ...data,
                  venue: e.target.value,
                });
              }}
            />
          </Grid>
          {/* Price */}
          <Grid item sm={4} xs={12}>
            <TextField
              placeholder={t('events.createEvent.price')}
              id="price"
              //label={t('signup.firstName')}
              variant="outlined"
              fullWidth
              //size="small"
              InputProps={{
                classes: {
                  root: classes.input,
                  notchedOutline: classes.inputOutline,
                },
                endAdornment: (
                  <InputAdornment>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      fill="none"
                      viewBox="0 0 25 24"
                    >
                      <path
                        stroke="#5D5D5D"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.231 5h-16a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1V6a1 1 0 00-1-1zM7.231 15h4M3.231 11h18M3.231 9h18"
                      ></path>
                    </svg>
                  </InputAdornment>
                ),
              }}
              required
              value={data.price}
              onChange={(e) => {
                setData({
                  ...data,
                  price: e.target.value,
                });
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
