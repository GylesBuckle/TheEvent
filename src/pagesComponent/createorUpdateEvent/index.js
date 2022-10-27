import React, { useState, useEffect, useRef, useContext } from 'react';
import dynamic from 'next/dynamic';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { useRouter } from 'next/router';
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
  IconButton,
  useMediaQuery,
  CircularProgress,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { TagsInput } from 'react-tag-input-component';
import { DropzoneArea } from 'material-ui-dropzone';
import Flatpickr from 'react-flatpickr';
import { compressAccurately } from 'image-conversion';
import Cropper from 'react-cropper';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import * as websiteInfo from '../../data/websiteInfo';
import dataURLtoFile from '../../utils/dataURLtoFile';
import searchLocations from '../../utils/getLocation';
import { GlobalContext } from '../../context/GlobalContext';
import axios from '../../utils/axios';
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
    height: '100%',
  },
  dropzoneRoot: {
    minHeight: '100px',
    border: '1px dashed #989090',
    padding: '5px',
    borderRadius: 15,
    height: '100%',
    boxSizing: 'border-box',
  },
  sponsorsDropzoneRoot: {
    width: '150px',
    height: '150px',
  },
  speakerDropzoneRoot: {
    padding: 0,
    width: '180px',
    height: '200px',
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
  const router = useRouter();
  const sponsorsDropzoneRef = useRef();

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const classes = useStyles();
  const { user: globaluser } = useContext(GlobalContext);

  const [data, setData] = useState({
    name: '',
    tags: [],
    description: '',
    image: '',
    startDate: '',
    endDate: '',
    time: '',
    location: '',
    locationCoordinates: [],
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
  const [loading, setLoading] = useState({
    active: false,
    action: '',
  });
  const [errors, setError] = useState([]);
  const [showToast, setShowToast] = useState({
    active: false,
    message: '',
  });

  const [imageFile, setImageFile] = useState(null);
  // AUTOCOMPLETE SUGGESTIONS FROM MAPBOX API
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);

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
    index: 0,
  });

  useEffect(() => {
    // bio.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    //globaluser.portfolio?.lifeStyleImages.map((x) => {
    //   return {
    //     img: x,
    //     new: false,
    //   };
    // })
    //deletedSponsorsImages:[]
    // businessLinkImages: globaluser.portfolio?.businessLinkImages
    // ? globaluser.portfolio?.businessLinkImages.map((x) => {
    //     return {
    //       ...x,
    //       new: false,
    //     };
    //   })
    // : [],
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
  const sponsorsUploadHandler = () => {
    if (typeof cropper !== 'undefined') {
      let obj = dataURLtoFile(
        cropper.getCroppedCanvas().toDataURL(showSponsorCropper.type),
        showSponsorCropper.fileName
      );

      setData((pro) => {
        return {
          ...pro,
          sponsors: [
            ...pro.sponsors,
            {
              img: obj,
              new: true,
            },
          ],
        };
      });
      setShowSponsorCropper({
        active: false,
        file: null,
        fileName: '',
      });
      setZoom(1);
      setCropper();
    }
  };
  const speakerUploadHandler = () => {
    if (typeof cropper !== 'undefined') {
      let obj = dataURLtoFile(
        cropper.getCroppedCanvas().toDataURL(showSpeakerCropper.type),
        showSpeakerCropper.fileName
      );

      setData({
        ...data,
        speakers: data.speakers.map((s, index) => {
          if (index === showSpeakerCropper.index) {
            s.image = obj;
            s.new = true;
          }
          return s;
        }),
      });
      setShowSpeakerCropper({
        active: false,
        file: null,
        fileName: '',
        index: 0,
      });
      setZoom(1);
      setCropper();
    }
  };

  const searchLocationHandler = async (value) => {
    let language = 'en';
    if (value) {
      let results = await searchLocations(value, language);
      if (results.success) {
        setAutoCompleteSuggestions(results.data);
      }
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    margin: `0 0 8px 0`,
    //marginTop: '2em',
    // change background colour if dragging
    background: 'inherit',
    overflow: 'hidden',
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const onDragEnd = async (key, result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(data[key], result.source.index, result.destination.index);
    setData({
      ...data,
      [key]: items,
    });
  };

  const validate = () => {};
  const resetHandler = () => {};
  const SubmitHandler = async () => {
    if (validate() === false) {
      return;
    }
    try {
      setLoading({
        active: true,
        action: 'submit',
      });

      let formData = new FormData();

      formData.append('name', data.name);
      formData.append('tags', JSON.stringify(data.tags));
      formData.append('description', data.description);
      formData.append('image', data.image);

      const startDate = new Date(data.startDate);
      startDate.setTime(new Date(data.time).getTime());
      formData.append('startDate', startDate);
      formData.append('endDate', data.endDate);
      formData.append('location', data.location);
      formData.append('locationCoordinates', JSON.stringify(data.locationCoordinates));
      formData.append('venue', data.venue);
      formData.append('price', data.price);
      formData.append('address', data.address);
      formData.append('email', data.email);
      formData.append('facebook', data.facebook);
      formData.append('twitter', data.twitter);
      formData.append('insta', data.insta);
      formData.append('linkdin', data.linkdin);
      formData.append('snapchat', data.snapchat);
      formData.append('whatsApp', data.whatsApp);
      formData.append('schedule', JSON.stringify(data.schedule));

      //sponsors
      let newSponsorsImages = [];
      let newSponsorsImagesIndex = [];
      data.sponsors.map((img, ind) => {
        if (img.new === true) {
          {
            newSponsorsImages.push(img.img);
            newSponsorsImagesIndex.push(ind);
          }
        }
      });
      formData.append(
        'deleteImages',
        data.deletedSponsorsImages ? JSON.stringify(data.deletedSponsorsImages) : JSON.stringify([])
      );
      for (let i = 0; i < newSponsorsImages.length; i++) {
        formData.append('newSponsorsImages', newSponsorsImages[i]);
      }
      formData.append('newSponsorsImagesIndex', JSON.stringify(newSponsorsImagesIndex));
      formData.append('sponsors', JSON.stringify(data.sponsors));

      // speakers
      let newSpeakersImages = [];
      let newSpeakersImagesIndex = [];
      data.speakers.map((img, ind) => {
        if (img.new === true) {
          {
            newSpeakersImages.push(img.image);
            newSpeakersImagesIndex.push(ind);
          }
        }
      });

      formData.append(
        'deleteSpeakersImages',
        data.deletedSpeakersImages ? JSON.stringify(data.deletedSpeakersImages) : JSON.stringify([])
      );
      for (let i = 0; i < newSpeakersImages.length; i++) {
        formData.append('newSpeakersImages', newSpeakersImages[i]);
      }
      formData.append('newSpeakersImagesIndex', JSON.stringify(newSpeakersImagesIndex));
      formData.append('speakers', JSON.stringify(data.speakers));

      let url = `/events`;
      if (props.edit) {
        url = `/events/${router.query.id}`;
      }
      const response = await axios.post(url, formData, {
        headers: {
          authorization: 'Bearer ' + globaluser?.token,
        },
      });

      if (response.data.status === 'success') {
        router.push('/admin-dashboard');
      } else {
        setError([response.data.message]);
      }
      setLoading({
        active: false,
        action: '',
      });
    } catch (err) {
      setLoading({
        active: false,
        action: '',
      });
      setError([err.response?.data?.message || 'Fail to update profile']);
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
  const sponsorsCroperDialog = (
    <Dialog
      maxWidth="lg"
      fullWidth
      open={showSponsorCropper.active}
      onClose={() => {
        setShowSponsorCropper({
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
          aspectRatio={1 / 1} //means 39% height as compare to width
          guides={false}
          src={showSponsorCropper.file}
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
                  setShowSponsorCropper({
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
              <Button variant="outlined" className={classes.button} onClick={sponsorsUploadHandler}>
                {t('events.createEvent.save')}
              </Button>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
  const speakersCroperDialog = (
    <Dialog
      maxWidth="lg"
      fullWidth
      open={showSpeakerCropper.active}
      onClose={() => {
        setShowSpeakerCropper({
          active: false,
          file: null,
          fileName: '',
          index: 0,
        });
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Cropper
          style={{ height: 390, width: '100%' }}
          aspectRatio={9 / 10}
          guides={false}
          src={showSpeakerCropper.file}
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
                  setShowSpeakerCropper({
                    active: false,
                    file: null,
                    fileName: '',
                    index: 0,
                  })
                }
              >
                {t('events.createEvent.cancel')}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" className={classes.button} onClick={speakerUploadHandler}>
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
      {sponsorsCroperDialog}
      {speakersCroperDialog}
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
                  style={{ padding: '0.3em', height: '100%' }}
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
              value={data.time}
              onChange={(date) => {
                setData((d) => {
                  return {
                    ...d,
                    time: date[0],
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
          <Grid item sm={4} xs={12}>
            <Autocomplete
              freeSolo
              id="location"
              value={data.location}
              onChange={(event, newValue) => {
                if (newValue) {
                  let locationCoordinates = autoCompleteSuggestions.filter(
                    (place) => place.place_name === newValue
                  );
                  setData({
                    ...data,
                    location: newValue,
                    locationCoordinates: locationCoordinates[0].center,
                  });
                }
              }}
              onInput={(e) => searchLocationHandler(e.target.value)}
              options={autoCompleteSuggestions.map((place) => place.place_name)}
              //size="small"
              disableClearable
              classes={{
                inputRoot: classes.input,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    classes: {
                      input: classes.input,
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
                            d="M12.231 11a2 2 0 100-4 2 2 0 000 4z"
                          ></path>
                          <path
                            stroke="#5D5D5D"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12.231 21s7-4.846 7-11.077a6.885 6.885 0 00-2.05-4.895A7.04 7.04 0 0012.23 3a7.04 7.04 0 00-4.95 2.028 6.885 6.885 0 00-2.05 4.895c0 6.23 7 11.077 7 11.077z"
                          ></path>
                        </svg>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  placeholder={t('events.createEvent.location')}
                  fullWidth
                />
              )}
            />
          </Grid>
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
                if (!e.target.value) {
                  setData({
                    ...data,
                    price: '',
                  });
                }
                if (/[0-9]|\./.test(e.target.value)) {
                  setData({
                    ...data,
                    price: e.target.value,
                  });
                }
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* address phone email */}
      <Grid item style={{ marginTop: '25px' }}>
        <Grid container spacing={2}>
          {/* address */}
          <Grid item sm={4} xs={12}>
            <TextField
              placeholder={t('events.createEvent.address')}
              id="address"
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
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.23096 21V5.00003"
                        stroke="#5D5D5D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.231 15.6867C14.4128 20.2361 10.0491 11.1374 4.23096 15.6867V4.31332C10.0491 -0.236049 14.4128 8.86269 20.231 4.31332V15.6867Z"
                        stroke="#5D5D5D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </InputAdornment>
                ),
              }}
              required
              value={data.address}
              onChange={(e) => {
                setData({
                  ...data,
                  address: e.target.value,
                });
              }}
            />
          </Grid>
          {/* phone */}
          <Grid item sm={4} xs={12}>
            <TextField
              placeholder={t('events.createEvent.phone')}
              id="phone"
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
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.2338 4.25725L9.30537 4.62864V4.62864L10.2338 4.25725ZM11.2881 6.89291L12.2166 6.52152V6.52152L11.2881 6.89291ZM10.9676 8.91606L11.7358 9.55625V9.55624L10.9676 8.91606ZM10.4002 9.59693L11.1684 10.2371L10.4002 9.59693ZM10.5224 12.2915L9.81533 12.9986L10.5224 12.2915ZM12.4395 14.2086L13.1466 13.5014L12.4395 14.2086ZM15.1341 14.3308L14.4939 13.5626L15.1341 14.3308ZM15.8149 13.7634L16.4551 14.5316L16.4551 14.5316L15.8149 13.7634ZM17.8381 13.4429L17.4667 14.3714L17.8381 13.4429ZM20.4737 14.4971L20.8451 13.5687L20.4737 14.4971ZM5.62569 4.00003H8.37689V2.00003H5.62569V4.00003ZM9.30537 4.62864L10.3596 7.2643L12.2166 6.52152L11.1623 3.88586L9.30537 4.62864ZM10.1994 8.27588L9.63199 8.95675L11.1684 10.2371L11.7358 9.55625L10.1994 8.27588ZM9.81533 12.9986L11.7324 14.9157L13.1466 13.5014L11.2295 11.5844L9.81533 12.9986ZM15.7742 15.099L16.4551 14.5316L15.1747 12.9952L14.4939 13.5626L15.7742 15.099ZM17.4667 14.3714L20.1023 15.4256L20.8451 13.5687L18.2095 12.5144L17.4667 14.3714ZM20.731 16.3541V19.1053H22.731V16.3541H20.731ZM19.8362 20C11.4938 20 4.73096 13.2372 4.73096 4.89477H2.73096C2.73096 14.3417 10.3892 22 19.8362 22V20ZM20.731 19.1053C20.731 19.5994 20.3304 20 19.8362 20V22C21.4349 22 22.731 20.704 22.731 19.1053H20.731ZM20.1023 15.4256C20.482 15.5775 20.731 15.9452 20.731 16.3541H22.731C22.731 15.1274 21.9841 14.0243 20.8451 13.5687L20.1023 15.4256ZM16.4551 14.5316C16.7373 14.2965 17.1257 14.2349 17.4667 14.3714L18.2095 12.5144C17.1864 12.1052 16.0213 12.2897 15.1747 12.9952L16.4551 14.5316ZM11.7324 14.9157C12.8295 16.0128 14.5823 16.0923 15.7742 15.099L14.4939 13.5626C14.0965 13.8937 13.5123 13.8672 13.1466 13.5014L11.7324 14.9157ZM9.63199 8.95675C8.63867 10.1487 8.71818 11.9015 9.81533 12.9986L11.2295 11.5844C10.8638 11.2187 10.8373 10.6344 11.1684 10.2371L9.63199 8.95675ZM10.3596 7.2643C10.496 7.60534 10.4345 7.99371 10.1994 8.27588L11.7358 9.55624C12.4412 8.70973 12.6258 7.54462 12.2166 6.52152L10.3596 7.2643ZM8.37689 4.00003C8.7858 4.00003 9.1535 4.24898 9.30537 4.62864L11.1623 3.88586C10.7067 2.74688 9.6036 2.00003 8.37689 2.00003V4.00003ZM5.62569 2.00003C4.02697 2.00003 2.73096 3.29605 2.73096 4.89477H4.73096C4.73096 4.40062 5.13154 4.00003 5.62569 4.00003V2.00003Z"
                        fill="#5D5D5D"
                      />
                    </svg>
                  </InputAdornment>
                ),
              }}
              required
              value={data.phone}
              onChange={(e) => {
                setData({
                  ...data,
                  phone: e.target.value,
                });
              }}
            />
          </Grid>
          {/* email */}
          <Grid item sm={4} xs={12}>
            <TextField
              placeholder={t('events.createEvent.email')}
              id="email"
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
                        d="M20.231 5h-16a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1V6a1 1 0 00-1-1z"
                      ></path>
                      <path
                        stroke="#5D5D5D"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.231 6l9.257 7 8.743-7"
                      ></path>
                    </svg>
                  </InputAdornment>
                ),
              }}
              required
              value={data.email}
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* network heading */}
      <Grid item style={{ marginTop: '2em' }}>
        <Typography variant="h5">{t('events.createEvent.network')}</Typography>
      </Grid>
      {/* network inputs */}
      <Grid item style={{ marginTop: '1em' }}>
        <Grid container spacing={2}>
          {/* facebook */}
          <Grid item sm={4} xs={12}>
            <TextField
              placeholder={t('events.createEvent.facebook')}
              id="facebook"
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
                      <g clipPath="url(#clip0_119_4349)">
                        <rect
                          width="24"
                          height="24"
                          x="0.231"
                          y="0.568"
                          fill="#6D6D6D"
                          rx="12"
                        ></rect>
                        <path
                          fill="#fff"
                          d="M16.902 16.037l.532-3.469h-3.328v-2.25c0-.949.464-1.875 1.955-1.875h1.514V5.49s-1.374-.234-2.686-.234c-2.742 0-4.533 1.662-4.533 4.669v2.643H7.309v3.469h3.047v8.386a12.071 12.071 0 003.75 0v-8.386h2.796z"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_119_4349">
                          <rect
                            width="24"
                            height="24"
                            x="0.231"
                            y="0.568"
                            fill="#fff"
                            rx="12"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </InputAdornment>
                ),
              }}
              required
              value={data.facebook}
              onChange={(e) => {
                setData({
                  ...data,
                  facebook: e.target.value,
                });
              }}
            />
          </Grid>
          {/* twitter */}
          <Grid item sm={4} xs={12}>
            <TextField
              placeholder={t('events.createEvent.twitter')}
              id="twitter"
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
                      <rect
                        width="24"
                        height="24"
                        x="0.731"
                        y="0.568"
                        fill="#6D6D6D"
                        rx="12"
                      ></rect>
                      <path
                        fill="#fff"
                        d="M10.535 18.898c5.322 0 8.232-4.41 8.232-8.232 0-.126 0-.252-.006-.372a5.928 5.928 0 001.446-1.5 5.872 5.872 0 01-1.662.456c.6-.36 1.056-.924 1.272-1.602-.558.33-1.176.57-1.836.702a2.894 2.894 0 00-4.926 2.64 8.208 8.208 0 01-5.964-3.024c-.246.426-.39.924-.39 1.452 0 1.002.51 1.89 1.29 2.406a2.842 2.842 0 01-1.308-.36v.036c0 1.404.996 2.568 2.322 2.838a2.884 2.884 0 01-1.308.048 2.889 2.889 0 002.7 2.01 5.816 5.816 0 01-4.284 1.194 8.06 8.06 0 004.422 1.308z"
                      ></path>
                    </svg>
                  </InputAdornment>
                ),
              }}
              required
              value={data.twitter}
              onChange={(e) => {
                setData({
                  ...data,
                  twitter: e.target.value,
                });
              }}
            />
          </Grid>
          {/* insta */}
          <Grid item sm={4} xs={12}>
            <TextField
              placeholder={t('events.createEvent.insta')}
              id="insta"
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
                      <g clipPath="url(#clip0_119_4360)">
                        <path
                          fill="#6D6D6D"
                          d="M6.317 24.483c-1.428-.064-2.203-.302-2.719-.503a4.547 4.547 0 01-1.683-1.095c-.513-.512-.83-1-1.095-1.683-.201-.515-.439-1.29-.503-2.718C.245 16.941.23 16.478.23 12.569c0-3.908.016-4.37.085-5.915C.38 5.227.62 4.453.819 3.936a4.565 4.565 0 011.095-1.684c.512-.512 1-.83 1.684-1.095.515-.201 1.29-.439 2.718-.504C7.86.583 8.323.568 12.231.568s4.37.016 5.915.085c1.427.065 2.201.304 2.718.504a4.53 4.53 0 011.684 1.095c.513.512.828 1 1.095 1.683.2.516.438 1.291.503 2.718.07 1.545.085 2.007.085 5.916 0 3.907-.014 4.37-.085 5.915-.065 1.427-.304 2.203-.504 2.718a4.54 4.54 0 01-1.094 1.683 4.54 4.54 0 01-1.684 1.095c-.515.201-1.29.439-2.718.503-1.543.071-2.007.085-5.915.085s-4.371-.013-5.914-.085z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M9.508 12.483a2.638 2.638 0 115.276 0 2.638 2.638 0 01-5.276 0zm-1.426 0a4.064 4.064 0 108.128 0 4.064 4.064 0 00-8.128 0m7.34-4.225a.95.95 0 10.95-.95.95.95 0 00-.95.95zM8.947 18.926c-.771-.035-1.19-.164-1.47-.272a2.46 2.46 0 01-.91-.592 2.443 2.443 0 01-.592-.91c-.109-.279-.237-.698-.272-1.47-.039-.834-.046-1.085-.046-3.199 0-2.113.008-2.363.046-3.198.035-.772.164-1.19.272-1.47a2.46 2.46 0 01.592-.91 2.44 2.44 0 01.91-.592c.28-.11.699-.238 1.47-.273.835-.038 1.085-.046 3.198-.046s2.364.008 3.199.046c.771.035 1.19.165 1.47.273.369.143.633.315.91.592.277.277.448.54.592.91.108.279.237.698.272 1.47.039.835.046 1.085.046 3.199 0 2.113-.008 2.363-.046 3.198-.035.772-.164 1.191-.272 1.47-.144.37-.315.633-.592.91-.277.276-.541.448-.91.592-.28.108-.699.237-1.47.272-.835.039-1.085.046-3.199.046s-2.364-.008-3.198-.046m-.065-14.31c-.843.039-1.419.172-1.921.368-.52.202-.962.473-1.403.913-.44.44-.71.88-.912 1.402-.196.503-.33 1.078-.368 1.921-.04.844-.048 1.114-.048 3.263 0 2.15.009 2.42.048 3.263.038.843.172 1.418.368 1.922.202.52.472.962.912 1.402.44.44.882.71 1.403.913.503.195 1.078.329 1.92.367.845.039 1.114.048 3.264.048 2.15 0 2.42-.009 3.263-.048.843-.038 1.418-.172 1.921-.367.52-.203.962-.473 1.402-.913.441-.44.71-.882.913-1.402.196-.503.33-1.079.368-1.921.038-.845.047-1.114.047-3.264 0-2.15-.009-2.419-.047-3.263-.038-.843-.172-1.418-.368-1.921a3.891 3.891 0 00-.913-1.402c-.44-.44-.881-.711-1.401-.913-.504-.196-1.08-.33-1.921-.368-.844-.038-1.114-.048-3.263-.048-2.15 0-2.42.01-3.264.048"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_119_4360">
                          <path fill="#fff" d="M0.231 0.568H24.231V24.568H0.231z"></path>
                        </clipPath>
                      </defs>
                    </svg>
                  </InputAdornment>
                ),
              }}
              required
              value={data.insta}
              onChange={(e) => {
                setData({
                  ...data,
                  insta: e.target.value,
                });
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* network inputs */}
      <Grid item style={{ marginTop: '1em' }}>
        <Grid container spacing={2}>
          {/* linkdin */}
          <Grid item sm={4} xs={12}>
            <TextField
              placeholder={t('events.createEvent.linkdin')}
              id="linkdin"
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
                      <g clipPath="url(#clip0_119_4368)">
                        <rect
                          width="24"
                          height="24"
                          x="0.746"
                          y="0.568"
                          fill="#6D6D6D"
                          rx="12"
                        ></rect>
                        <g clipPath="url(#clip1_119_4368)">
                          <path
                            fill="#fff"
                            d="M5.746 7.436c0-.45.157-.822.473-1.115.315-.293.725-.44 1.23-.44.495 0 .896.145 1.202.433.315.298.473.685.473 1.162 0 .433-.153.793-.46 1.082-.315.297-.73.446-1.243.446h-.013c-.496 0-.897-.15-1.203-.446a1.498 1.498 0 01-.46-1.122zM5.92 19.26v-9.027h3v9.027h-3zm4.662 0h3v-5.04c0-.316.037-.559.109-.73.126-.306.317-.565.574-.777.257-.212.579-.318.966-.318 1.01 0 1.514.68 1.514 2.041v4.824h3v-5.175c0-1.334-.316-2.345-.946-3.034-.631-.69-1.464-1.034-2.5-1.034-1.163 0-2.068.5-2.717 1.5v.027h-.013l.013-.027v-1.284h-3c.018.288.027 1.185.027 2.69 0 1.504-.008 3.617-.027 6.337z"
                          ></path>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_119_4368">
                          <path fill="#fff" d="M0.746 0.568H24.746V24.568H0.746z"></path>
                        </clipPath>
                        <clipPath id="clip1_119_4368">
                          <path
                            fill="#fff"
                            d="M5.746 5.568H19.746000000000002V19.567999999999998H5.746z"
                          ></path>
                        </clipPath>
                      </defs>
                    </svg>
                  </InputAdornment>
                ),
              }}
              required
              value={data.linkdin}
              onChange={(e) => {
                setData({
                  ...data,
                  linkdin: e.target.value,
                });
              }}
            />
          </Grid>
          {/* snapchat */}
          <Grid item sm={4} xs={12}>
            <TextField
              placeholder={t('events.createEvent.snapchat')}
              id="snapchat"
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
                      <rect
                        width="24"
                        height="24"
                        x="0.246"
                        y="0.568"
                        fill="#6D6D6D"
                        rx="12"
                      ></rect>
                      <path
                        fill="#fff"
                        d="M18.504 16.402c-2.344-1.135-2.717-2.886-2.734-3.016-.02-.157-.043-.28.131-.44.168-.155.91-.615 1.116-.759.34-.238.49-.476.38-.768-.077-.202-.265-.279-.464-.279a.862.862 0 00-.186.021c-.374.082-.737.269-.948.32a.33.33 0 01-.077.01c-.112 0-.154-.05-.144-.185.027-.409.082-1.207.018-1.953-.089-1.026-.42-1.534-.812-1.984-.19-.218-1.072-1.155-2.773-1.155-1.7 0-2.581.937-2.77 1.152-.393.45-.724.958-.812 1.984-.064.746-.006 1.544.018 1.954.008.128-.032.184-.144.184a.33.33 0 01-.077-.01c-.21-.05-.574-.238-.948-.32a.862.862 0 00-.186-.02c-.199 0-.386.077-.464.278-.11.292.039.53.38.768.207.144.95.603 1.117.758.173.16.15.284.13.441-.016.132-.39 1.884-2.733 3.016-.137.067-.37.207.041.435.646.357 1.077.319 1.411.534.284.183.116.577.323.72.253.175 1.003-.013 1.971.307.812.267 1.306 1.023 2.745 1.023 1.44 0 1.948-.76 2.745-1.023.967-.32 1.718-.132 1.972-.308.206-.142.039-.536.322-.72.335-.214.765-.176 1.412-.533.41-.225.177-.366.04-.432z"
                      ></path>
                      <path
                        fill="#6D6D6D"
                        d="M19.523 16.268c-.105-.286-.305-.439-.533-.566a1.341 1.341 0 00-.116-.06l-.207-.105c-.711-.377-1.266-.853-1.651-1.417a3.209 3.209 0 01-.284-.502c-.033-.094-.031-.148-.007-.196a.32.32 0 01.09-.095l.334-.218c.152-.098.273-.177.35-.232.293-.204.497-.421.624-.663a1.32 1.32 0 00.066-1.098c-.194-.508-.674-.824-1.256-.824a1.727 1.727 0 00-.461.06 10.79 10.79 0 00-.034-1.076c-.11-1.27-.554-1.937-1.018-2.468a4.058 4.058 0 00-1.036-.834c-.704-.402-1.502-.606-2.373-.606-.87 0-1.664.204-2.37.606-.389.22-.74.502-1.037.836-.464.53-.909 1.198-1.019 2.468-.03.361-.038.73-.033 1.076a1.732 1.732 0 00-.46-.061c-.583 0-1.065.316-1.257.825a1.322 1.322 0 00.064 1.098c.128.243.332.46.624.664.077.054.198.132.35.232.083.053.203.131.32.21a.345.345 0 01.104.103c.024.05.025.105-.012.205a3.178 3.178 0 01-.278.492c-.377.551-.916 1.018-1.604 1.392-.365.194-.743.323-.903.758-.121.328-.042.701.264 1.016.113.117.243.216.387.293.299.164.616.29.946.378a.624.624 0 01.191.085c.112.098.096.246.245.461.074.112.17.208.28.285.312.216.663.23 1.035.244.336.012.717.027 1.152.17.18.06.367.175.584.31.52.32 1.234.758 2.427.758s1.91-.44 2.435-.762c.216-.132.402-.246.577-.304.435-.144.815-.158 1.151-.171.372-.014.723-.028 1.036-.244.13-.09.24-.21.318-.348.107-.182.105-.309.205-.398a.592.592 0 01.18-.082c.334-.087.656-.215.958-.382.153-.081.29-.189.406-.317l.004-.005c.288-.308.36-.67.242-.99zm-1.06.57c-.647.357-1.077.32-1.411.535-.285.182-.116.577-.323.72-.253.174-1.003-.013-1.971.306-.8.264-1.309 1.024-2.745 1.024-1.437 0-1.935-.758-2.747-1.025-.966-.32-1.717-.133-1.971-.308-.206-.142-.039-.537-.323-.72-.335-.215-.764-.176-1.41-.532-.413-.227-.18-.368-.042-.434 2.343-1.135 2.717-2.886 2.734-3.016.02-.157.042-.28-.131-.441-.168-.155-.91-.614-1.116-.758-.341-.238-.491-.476-.38-.768.077-.202.265-.279.463-.279.063 0 .125.008.186.021.374.081.738.269.948.32.025.006.051.01.077.01.112 0 .152-.056.144-.185-.024-.41-.082-1.207-.018-1.953.089-1.026.42-1.534.812-1.984.189-.216 1.075-1.153 2.77-1.153 1.696 0 2.585.933 2.774 1.148.393.45.724.958.812 1.984.064.746.008 1.545-.018 1.954-.009.134.032.184.144.184a.336.336 0 00.077-.01c.21-.05.574-.238.948-.32a.862.862 0 01.186-.02c.2 0 .387.077.464.278.11.292-.039.53-.38.768-.206.144-.949.603-1.116.758-.174.16-.15.284-.13.441.016.132.39 1.884 2.733 3.016.138.07.372.21-.04.44z"
                      ></path>
                    </svg>
                  </InputAdornment>
                ),
              }}
              required
              value={data.snapchat}
              onChange={(e) => {
                setData({
                  ...data,
                  snapchat: e.target.value,
                });
              }}
            />
          </Grid>
          {/* whatsApp */}
          <Grid item sm={4} xs={12}>
            <TextField
              placeholder={t('events.createEvent.whatsApp')}
              id="whatsApp"
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
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.745605"
                        y="0.568298"
                        width="24"
                        height="24"
                        rx="12"
                        fill="#6D6D6D"
                      />
                      <path
                        d="M5.46655 19.5483L6.49549 15.812C5.85936 14.7153 5.52565 13.4733 5.52912 12.2036C5.52912 8.22503 8.78278 4.9903 12.7768 4.9903C14.7165 4.9903 16.538 5.74103 17.9041 7.10412C19.2737 8.4672 20.028 10.28 20.0246 12.207C20.0246 16.1856 16.7709 19.4203 12.7734 19.4203H12.7699C11.5567 19.4203 10.3644 19.1159 9.3042 18.5416L5.46655 19.5483ZM9.48843 17.2373L9.70743 17.3688C10.6321 17.9154 11.6923 18.2025 12.7734 18.206H12.7768C16.0965 18.206 18.801 15.5179 18.801 12.2105C18.801 10.6087 18.1753 9.10377 17.0386 7.96902C15.9019 6.83427 14.3863 6.21154 12.7768 6.21154C9.45715 6.20808 6.75272 8.89619 6.75272 12.2036C6.75272 13.3349 7.06905 14.4385 7.67389 15.3933L7.81641 15.6217L7.20809 17.8324L9.48843 17.2373Z"
                        fill="white"
                      />
                      <path
                        d="M5.72021 19.2958L6.71439 15.6874C6.09911 14.6322 5.77583 13.4318 5.77583 12.2071C5.77931 8.36689 8.91825 5.24286 12.7768 5.24286C14.6504 5.24286 16.4058 5.96938 17.7268 7.28403C19.0477 8.59868 19.7742 10.3492 19.7742 12.2105C19.7742 16.0507 16.6318 19.1747 12.7768 19.1747H12.7733C11.6018 19.1747 10.4512 18.8806 9.42924 18.3271L5.72021 19.2958Z"
                        fill="#6D6D6D"
                      />
                      <path
                        d="M5.46655 19.5483L6.49549 15.812C5.85936 14.7153 5.52565 13.4733 5.52912 12.2036C5.52912 8.22503 8.78278 4.9903 12.7768 4.9903C14.7165 4.9903 16.538 5.74103 17.9041 7.10412C19.2737 8.4672 20.028 10.28 20.0246 12.207C20.0246 16.1856 16.7709 19.4203 12.7734 19.4203H12.7699C11.5567 19.4203 10.3644 19.1159 9.3042 18.5416L5.46655 19.5483ZM9.48843 17.2373L9.70743 17.3688C10.6321 17.9154 11.6923 18.2025 12.7734 18.206H12.7768C16.0965 18.206 18.801 15.5179 18.801 12.2105C18.801 10.6087 18.1753 9.10377 17.0386 7.96902C15.9019 6.83427 14.3863 6.21154 12.7768 6.21154C9.45715 6.20808 6.75272 8.89619 6.75272 12.2036C6.75272 13.3349 7.06905 14.4385 7.67389 15.3933L7.81641 15.6217L7.20809 17.8324L9.48843 17.2373Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.9656 9.18677C10.83 8.88579 10.6875 8.87887 10.5589 8.87541C10.4546 8.87195 10.333 8.87195 10.2113 8.87195C10.0896 8.87195 9.89497 8.91692 9.72811 9.09682C9.56126 9.27672 9.09546 9.71263 9.09546 10.6018C9.09546 11.4874 9.74549 12.3454 9.83587 12.4665C9.92625 12.5876 11.0908 14.4661 12.9296 15.1892C14.4591 15.7912 14.772 15.6701 15.1022 15.6389C15.4324 15.6078 16.1729 15.203 16.3258 14.781C16.4753 14.3589 16.4753 13.9991 16.4301 13.923C16.3849 13.8469 16.2632 13.8019 16.0825 13.7119C15.9017 13.622 15.0118 13.1861 14.845 13.1238C14.6781 13.065 14.5565 13.0339 14.4383 13.2138C14.3166 13.3937 13.969 13.7984 13.8647 13.9195C13.7604 14.0406 13.6527 14.0544 13.4719 13.9645C13.2911 13.8745 12.7072 13.6843 12.0154 13.0685C11.4766 12.591 11.1116 11.9994 11.0073 11.8195C10.903 11.6396 10.9969 11.5428 11.0873 11.4528C11.1672 11.3732 11.268 11.2418 11.3584 11.138C11.4488 11.0342 11.4801 10.9581 11.5392 10.837C11.5983 10.7159 11.5705 10.6121 11.5253 10.5222C11.4801 10.4357 11.1255 9.54311 10.9656 9.18677Z"
                        fill="white"
                      />
                    </svg>
                  </InputAdornment>
                ),
              }}
              required
              value={data.whatsApp}
              onChange={(e) => {
                setData({
                  ...data,
                  whatsApp: e.target.value,
                });
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* sponsors heading */}
      <Grid item style={{ marginTop: '2em' }}>
        <Typography variant="h5">{t('events.createEvent.sponsors')}</Typography>
      </Grid>
      {/* sponsors */}
      <Grid item style={{ marginTop: '1em' }}>
        <Grid container spacing={2}>
          <Grid item>
            <DropzoneArea
              classes={{
                icon: classes.hide,
                root: [classes.dropzoneRoot, classes.sponsorsDropzoneRoot].join(' '),
                text: classes.dropZoneTextContainer,
              }}
              ref={sponsorsDropzoneRef}
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
                  style={{ padding: '0.3em', height: '100%' }}
                >
                  <Grid item>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="61"
                      height="61"
                      fill="none"
                      viewBox="0 0 61 61"
                    >
                      <path
                        fill="#5D5D5D"
                        d="M47.508 28.163l-.99.142a1 1 0 001.007.858l-.017-1zm-33.152-4.974l.065.997a1 1 0 00.84-.57l-.905-.427zM47.685 49.16c6.075 0 11-4.924 11-11h-2a9 9 0 01-9 9v2zm11-11c0-6.075-4.925-11-11-11v2a9 9 0 019 9h2zm-11-11l-.195.002.035 2 .16-.002v-2zm.813.86c-1.282-8.966-8.992-15.86-18.313-15.86v2c8.312 0 15.19 6.148 16.333 14.144l1.98-.284zm-18.313-15.86c-7.393 0-13.77 4.337-16.733 10.6l1.808.855c2.644-5.59 8.334-9.454 14.925-9.454v-2zM14.29 22.191c-7.04.46-12.606 6.315-12.606 13.47h2c0-6.094 4.742-11.082 10.736-11.475l-.13-1.995zM1.685 35.66c0 7.456 6.044 13.5 13.5 13.5v-2c-6.351 0-11.5-5.148-11.5-11.5h-2zm46 11.5h-32.5v2h32.5v-2z"
                      ></path>
                      <path
                        stroke="#5D5D5D"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M30.185 40.661v-15M22.685 30.662l7.5-5 7.5 5"
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
                </Grid>
              }
              onChange={(files) => {
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
                  setShowSponsorCropper({
                    active: true,
                    file: reader.result,
                    type: type,
                    fileName: fn,
                  });
                };
                reader.readAsDataURL(files[0]);
              }}
            />
          </Grid>
          {data.sponsors.map((item, i) => (
            <Grid item>
              <div
                key={i}
                style={{
                  width: '100%',
                  position: 'relative',
                }}
              >
                <img
                  src={
                    item.new === true
                      ? URL.createObjectURL(item.img)
                      : publicRuntimeConfig.REACT_APP_API_URL + '/files/sponsors/' + item.img
                  }
                  alt={item.new === true ? item.img.name : item.img}
                  className={[classes.dropzoneRoot, classes.sponsorsDropzoneRoot].join(' ')}
                />
                <IconButton
                  size="small"
                  onClick={() => {
                    const dataCopy = { ...data };
                    const images = [...dataCopy.sponsors];
                    let deletedImages = [];
                    const newImages = images.filter((im, index) => {
                      if (i === index && im.new === false) {
                        deletedImages.push(im.img);
                      }
                      return i !== index;
                    });
                    setData({
                      ...data,
                      sponsors: newImages,
                      deletedSponsorsImages: deletedImages,
                    });
                  }}
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.secondary.main,
                  }}
                >
                  <DeleteIcon size="small" />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* speakers heading */}
      <Grid item style={{ marginTop: '2em' }}>
        <Typography variant="h5">{t('events.createEvent.speakers')}</Typography>
      </Grid>
      {/* speakers add icon */}
      <Grid item style={{ marginTop: '1em' }}>
        <div
          className={classes.dropzoneRoot}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '140px',
            height: '140px',
            cursor: 'pointer',
          }}
          onClick={() => {
            setData({
              ...data,
              speakers: [
                {
                  image: '',
                  name: '',
                  description: '',
                  occupation: '',
                  facebook: '',
                  twitter: '',
                  insta: '',
                  linkdin: '',
                  snapchat: '',
                  whatsApp: '',
                  new: true,
                },
                ...data.speakers,
              ],
            });
            setTimeout(() => {
              window.scrollBy(0, 600);
            }, 1000);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="71"
            height="71"
            fill="none"
            viewBox="0 0 71 71"
          >
            <path
              stroke="#989090"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M18.343 35.609h35M35.843 53.109v-35"
            ></path>
          </svg>
        </div>
      </Grid>
      {/* speakers list */}
      <Grid item style={{ marginTop: '1.5em' }}>
        <Grid container direction="column">
          <DragDropContext onDragEnd={(result) => onDragEnd('speakers', result)}>
            <Droppable droppableId="characters">
              {(provided, snapshot) => (
                <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                  {data.speakers.map((item, i) => (
                    <Grid
                      item
                      key={i}
                      style={{
                        border: '1px solid #D1D0D3',
                        borderRadius: '15px',
                        padding: '20px',
                        paddingTop: '40px',
                        position: 'relative',
                        marginTop: i === 0 ? 0 : '20px',
                      }}
                    >
                      <Draggable key={`${i}`} draggableId={`${i}`} index={i}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                          >
                            {/* delete icon */}
                            <div
                              style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                const dataCopy = { ...data };
                                const images = [...dataCopy.speakers];
                                let deletedImages = [];
                                const newImages = images.filter((im, index) => {
                                  if (i === index && im.new === false) {
                                    deletedImages.push(im.img);
                                  }
                                  return i !== index;
                                });
                                setData({
                                  ...data,
                                  speakers: newImages,
                                  deletedSpeakersImages: deletedImages,
                                });
                              }}
                            >
                              <CloseIcon />
                            </div>
                            <Grid container direction="column">
                              {/* for image */}
                              <Grid item style={{ width: '100%' }}>
                                <Grid
                                  container
                                  direction={matchesSM ? 'column' : 'row'}
                                  spacing={2}
                                >
                                  {/* for image */}
                                  <Grid item>
                                    <DropzoneArea
                                      classes={{
                                        icon: classes.hide,
                                        root: [
                                          classes.dropzoneRoot,
                                          classes.speakerDropzoneRoot,
                                        ].join(' '),
                                        text: classes.dropZoneTextContainer,
                                      }}
                                      showAlerts={false}
                                      filesLimit={1}
                                      showPreviewsInDropzone={false}
                                      acceptedFiles={['image/*']}
                                      dropzoneText={
                                        item.image !== '' ? (
                                          <img
                                            src={
                                              item.new === true
                                                ? URL.createObjectURL(item.image)
                                                : publicRuntimeConfig.REACT_APP_API_URL +
                                                  '/files/speakers/' +
                                                  item.image
                                            }
                                            style={{ borderRadius: 15 }}
                                            className={[classes.speakerDropzoneRoot].join(' ')}
                                          />
                                        ) : (
                                          <Grid
                                            container
                                            justify="center"
                                            alignItems="center"
                                            direction="column"
                                            style={{ padding: '0.3em', height: '100%' }}
                                          >
                                            <Grid item>
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="61"
                                                height="61"
                                                fill="none"
                                                viewBox="0 0 61 61"
                                              >
                                                <path
                                                  fill="#5D5D5D"
                                                  d="M47.508 28.163l-.99.142a1 1 0 001.007.858l-.017-1zm-33.152-4.974l.065.997a1 1 0 00.84-.57l-.905-.427zM47.685 49.16c6.075 0 11-4.924 11-11h-2a9 9 0 01-9 9v2zm11-11c0-6.075-4.925-11-11-11v2a9 9 0 019 9h2zm-11-11l-.195.002.035 2 .16-.002v-2zm.813.86c-1.282-8.966-8.992-15.86-18.313-15.86v2c8.312 0 15.19 6.148 16.333 14.144l1.98-.284zm-18.313-15.86c-7.393 0-13.77 4.337-16.733 10.6l1.808.855c2.644-5.59 8.334-9.454 14.925-9.454v-2zM14.29 22.191c-7.04.46-12.606 6.315-12.606 13.47h2c0-6.094 4.742-11.082 10.736-11.475l-.13-1.995zM1.685 35.66c0 7.456 6.044 13.5 13.5 13.5v-2c-6.351 0-11.5-5.148-11.5-11.5h-2zm46 11.5h-32.5v2h32.5v-2z"
                                                ></path>
                                                <path
                                                  stroke="#5D5D5D"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M30.185 40.661v-15M22.685 30.662l7.5-5 7.5 5"
                                                ></path>
                                              </svg>
                                            </Grid>
                                            <Grid item>
                                              <Typography
                                                variant="body2"
                                                style={{
                                                  fontSize: '16px',
                                                  color: '#989090',
                                                  fontWeight: 400,
                                                }}
                                                align="center"
                                                className={[classes.label, classes.roboto].join(
                                                  ' '
                                                )}
                                              >
                                                {t('events.createEvent.uploadImage')}
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        )
                                      }
                                      onChange={(files) => {
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
                                          setShowSpeakerCropper({
                                            active: true,
                                            file: reader.result,
                                            type: type,
                                            fileName: fn,
                                            index: i,
                                          });
                                        };
                                        reader.readAsDataURL(files[0]);
                                      }}
                                    />
                                  </Grid>
                                  {/* name description */}
                                  <Grid item style={{ flex: 1 }}>
                                    <TextField
                                      placeholder={t('events.createEvent.speakerName')}
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
                                      value={item.name}
                                      onChange={(e) => {
                                        setData({
                                          ...data,
                                          speakers: data.speakers.map((s, index) => {
                                            if (index === i) {
                                              s.name = e.target.value;
                                            }
                                            return s;
                                          }),
                                        });
                                      }}
                                    />
                                    <div style={{ marginTop: '15px' }} />
                                    <TextField
                                      multiline
                                      minRows={4}
                                      placeholder={t('events.createEvent.speakerDescription')}
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
                                      value={item.description}
                                      onChange={(e) => {
                                        setData({
                                          ...data,
                                          speakers: data.speakers.map((s, index) => {
                                            if (index === i) {
                                              s.description = e.target.value;
                                            }
                                            return s;
                                          }),
                                        });
                                      }}
                                    />
                                  </Grid>
                                  {/* occupation */}
                                  <Grid item style={{ flex: 1 }}>
                                    <TextField
                                      placeholder={t('events.createEvent.occupation')}
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
                                      value={item.occupation}
                                      onChange={(e) => {
                                        setData({
                                          ...data,
                                          speakers: data.speakers.map((s, index) => {
                                            if (index === i) {
                                              s.occupation = e.target.value;
                                            }
                                            return s;
                                          }),
                                        });
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              {/* for speaker network heading*/}
                              <Grid item style={{ width: '100%', marginTop: '2em' }}>
                                <Typography variant="h5">
                                  {t('events.createEvent.speakerNetwork')}
                                </Typography>
                              </Grid>
                              {/* for speaker network */}

                              <Grid item style={{ width: '100%', marginTop: '1em' }}>
                                {/* 1st row */}
                                <Grid container spacing={2}>
                                  {/* facebook */}
                                  <Grid item sm={4} xs={12}>
                                    <TextField
                                      placeholder={t('events.createEvent.facebook')}
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
                                              <g clipPath="url(#clip0_119_4349)">
                                                <rect
                                                  width="24"
                                                  height="24"
                                                  x="0.231"
                                                  y="0.568"
                                                  fill="#6D6D6D"
                                                  rx="12"
                                                ></rect>
                                                <path
                                                  fill="#fff"
                                                  d="M16.902 16.037l.532-3.469h-3.328v-2.25c0-.949.464-1.875 1.955-1.875h1.514V5.49s-1.374-.234-2.686-.234c-2.742 0-4.533 1.662-4.533 4.669v2.643H7.309v3.469h3.047v8.386a12.071 12.071 0 003.75 0v-8.386h2.796z"
                                                ></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_119_4349">
                                                  <rect
                                                    width="24"
                                                    height="24"
                                                    x="0.231"
                                                    y="0.568"
                                                    fill="#fff"
                                                    rx="12"
                                                  ></rect>
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </InputAdornment>
                                        ),
                                      }}
                                      required
                                      value={item.facebook}
                                      onChange={(e) => {
                                        setData({
                                          ...data,
                                          speakers: data.speakers.map((s, index) => {
                                            if (index === i) {
                                              s.facebook = e.target.value;
                                            }
                                            return s;
                                          }),
                                        });
                                      }}
                                    />
                                  </Grid>
                                  {/* twitter */}
                                  <Grid item sm={4} xs={12}>
                                    <TextField
                                      placeholder={t('events.createEvent.twitter')}
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
                                              <rect
                                                width="24"
                                                height="24"
                                                x="0.731"
                                                y="0.568"
                                                fill="#6D6D6D"
                                                rx="12"
                                              ></rect>
                                              <path
                                                fill="#fff"
                                                d="M10.535 18.898c5.322 0 8.232-4.41 8.232-8.232 0-.126 0-.252-.006-.372a5.928 5.928 0 001.446-1.5 5.872 5.872 0 01-1.662.456c.6-.36 1.056-.924 1.272-1.602-.558.33-1.176.57-1.836.702a2.894 2.894 0 00-4.926 2.64 8.208 8.208 0 01-5.964-3.024c-.246.426-.39.924-.39 1.452 0 1.002.51 1.89 1.29 2.406a2.842 2.842 0 01-1.308-.36v.036c0 1.404.996 2.568 2.322 2.838a2.884 2.884 0 01-1.308.048 2.889 2.889 0 002.7 2.01 5.816 5.816 0 01-4.284 1.194 8.06 8.06 0 004.422 1.308z"
                                              ></path>
                                            </svg>
                                          </InputAdornment>
                                        ),
                                      }}
                                      required
                                      value={item.twitter}
                                      onChange={(e) => {
                                        setData({
                                          ...data,
                                          speakers: data.speakers.map((s, index) => {
                                            if (index === i) {
                                              s.twitter = e.target.value;
                                            }
                                            return s;
                                          }),
                                        });
                                      }}
                                    />
                                  </Grid>
                                  {/* insta */}
                                  <Grid item sm={4} xs={12}>
                                    <TextField
                                      placeholder={t('events.createEvent.insta')}
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
                                              <g clipPath="url(#clip0_119_4360)">
                                                <path
                                                  fill="#6D6D6D"
                                                  d="M6.317 24.483c-1.428-.064-2.203-.302-2.719-.503a4.547 4.547 0 01-1.683-1.095c-.513-.512-.83-1-1.095-1.683-.201-.515-.439-1.29-.503-2.718C.245 16.941.23 16.478.23 12.569c0-3.908.016-4.37.085-5.915C.38 5.227.62 4.453.819 3.936a4.565 4.565 0 011.095-1.684c.512-.512 1-.83 1.684-1.095.515-.201 1.29-.439 2.718-.504C7.86.583 8.323.568 12.231.568s4.37.016 5.915.085c1.427.065 2.201.304 2.718.504a4.53 4.53 0 011.684 1.095c.513.512.828 1 1.095 1.683.2.516.438 1.291.503 2.718.07 1.545.085 2.007.085 5.916 0 3.907-.014 4.37-.085 5.915-.065 1.427-.304 2.203-.504 2.718a4.54 4.54 0 01-1.094 1.683 4.54 4.54 0 01-1.684 1.095c-.515.201-1.29.439-2.718.503-1.543.071-2.007.085-5.915.085s-4.371-.013-5.914-.085z"
                                                ></path>
                                                <path
                                                  fill="#fff"
                                                  d="M9.508 12.483a2.638 2.638 0 115.276 0 2.638 2.638 0 01-5.276 0zm-1.426 0a4.064 4.064 0 108.128 0 4.064 4.064 0 00-8.128 0m7.34-4.225a.95.95 0 10.95-.95.95.95 0 00-.95.95zM8.947 18.926c-.771-.035-1.19-.164-1.47-.272a2.46 2.46 0 01-.91-.592 2.443 2.443 0 01-.592-.91c-.109-.279-.237-.698-.272-1.47-.039-.834-.046-1.085-.046-3.199 0-2.113.008-2.363.046-3.198.035-.772.164-1.19.272-1.47a2.46 2.46 0 01.592-.91 2.44 2.44 0 01.91-.592c.28-.11.699-.238 1.47-.273.835-.038 1.085-.046 3.198-.046s2.364.008 3.199.046c.771.035 1.19.165 1.47.273.369.143.633.315.91.592.277.277.448.54.592.91.108.279.237.698.272 1.47.039.835.046 1.085.046 3.199 0 2.113-.008 2.363-.046 3.198-.035.772-.164 1.191-.272 1.47-.144.37-.315.633-.592.91-.277.276-.541.448-.91.592-.28.108-.699.237-1.47.272-.835.039-1.085.046-3.199.046s-2.364-.008-3.198-.046m-.065-14.31c-.843.039-1.419.172-1.921.368-.52.202-.962.473-1.403.913-.44.44-.71.88-.912 1.402-.196.503-.33 1.078-.368 1.921-.04.844-.048 1.114-.048 3.263 0 2.15.009 2.42.048 3.263.038.843.172 1.418.368 1.922.202.52.472.962.912 1.402.44.44.882.71 1.403.913.503.195 1.078.329 1.92.367.845.039 1.114.048 3.264.048 2.15 0 2.42-.009 3.263-.048.843-.038 1.418-.172 1.921-.367.52-.203.962-.473 1.402-.913.441-.44.71-.882.913-1.402.196-.503.33-1.079.368-1.921.038-.845.047-1.114.047-3.264 0-2.15-.009-2.419-.047-3.263-.038-.843-.172-1.418-.368-1.921a3.891 3.891 0 00-.913-1.402c-.44-.44-.881-.711-1.401-.913-.504-.196-1.08-.33-1.921-.368-.844-.038-1.114-.048-3.263-.048-2.15 0-2.42.01-3.264.048"
                                                ></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_119_4360">
                                                  <path
                                                    fill="#fff"
                                                    d="M0.231 0.568H24.231V24.568H0.231z"
                                                  ></path>
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </InputAdornment>
                                        ),
                                      }}
                                      required
                                      value={item.insta}
                                      onChange={(e) => {
                                        setData({
                                          ...data,
                                          speakers: data.speakers.map((s, index) => {
                                            if (index === i) {
                                              s.insta = e.target.value;
                                            }
                                            return s;
                                          }),
                                        });
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                                {/* 2nd row */}
                                <Grid container spacing={2} style={{ marginTop: '16px' }}>
                                  {/* linkdin */}
                                  <Grid item sm={4} xs={12}>
                                    <TextField
                                      placeholder={t('events.createEvent.linkdin')}
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
                                              <g clipPath="url(#clip0_119_4368)">
                                                <rect
                                                  width="24"
                                                  height="24"
                                                  x="0.746"
                                                  y="0.568"
                                                  fill="#6D6D6D"
                                                  rx="12"
                                                ></rect>
                                                <g clipPath="url(#clip1_119_4368)">
                                                  <path
                                                    fill="#fff"
                                                    d="M5.746 7.436c0-.45.157-.822.473-1.115.315-.293.725-.44 1.23-.44.495 0 .896.145 1.202.433.315.298.473.685.473 1.162 0 .433-.153.793-.46 1.082-.315.297-.73.446-1.243.446h-.013c-.496 0-.897-.15-1.203-.446a1.498 1.498 0 01-.46-1.122zM5.92 19.26v-9.027h3v9.027h-3zm4.662 0h3v-5.04c0-.316.037-.559.109-.73.126-.306.317-.565.574-.777.257-.212.579-.318.966-.318 1.01 0 1.514.68 1.514 2.041v4.824h3v-5.175c0-1.334-.316-2.345-.946-3.034-.631-.69-1.464-1.034-2.5-1.034-1.163 0-2.068.5-2.717 1.5v.027h-.013l.013-.027v-1.284h-3c.018.288.027 1.185.027 2.69 0 1.504-.008 3.617-.027 6.337z"
                                                  ></path>
                                                </g>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_119_4368">
                                                  <path
                                                    fill="#fff"
                                                    d="M0.746 0.568H24.746V24.568H0.746z"
                                                  ></path>
                                                </clipPath>
                                                <clipPath id="clip1_119_4368">
                                                  <path
                                                    fill="#fff"
                                                    d="M5.746 5.568H19.746000000000002V19.567999999999998H5.746z"
                                                  ></path>
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </InputAdornment>
                                        ),
                                      }}
                                      required
                                      value={item.linkdin}
                                      onChange={(e) => {
                                        setData({
                                          ...data,
                                          speakers: data.speakers.map((s, index) => {
                                            if (index === i) {
                                              s.linkdin = e.target.value;
                                            }
                                            return s;
                                          }),
                                        });
                                      }}
                                    />
                                  </Grid>
                                  {/* snapchat */}
                                  <Grid item sm={4} xs={12}>
                                    <TextField
                                      placeholder={t('events.createEvent.snapchat')}
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
                                              <rect
                                                width="24"
                                                height="24"
                                                x="0.246"
                                                y="0.568"
                                                fill="#6D6D6D"
                                                rx="12"
                                              ></rect>
                                              <path
                                                fill="#fff"
                                                d="M18.504 16.402c-2.344-1.135-2.717-2.886-2.734-3.016-.02-.157-.043-.28.131-.44.168-.155.91-.615 1.116-.759.34-.238.49-.476.38-.768-.077-.202-.265-.279-.464-.279a.862.862 0 00-.186.021c-.374.082-.737.269-.948.32a.33.33 0 01-.077.01c-.112 0-.154-.05-.144-.185.027-.409.082-1.207.018-1.953-.089-1.026-.42-1.534-.812-1.984-.19-.218-1.072-1.155-2.773-1.155-1.7 0-2.581.937-2.77 1.152-.393.45-.724.958-.812 1.984-.064.746-.006 1.544.018 1.954.008.128-.032.184-.144.184a.33.33 0 01-.077-.01c-.21-.05-.574-.238-.948-.32a.862.862 0 00-.186-.02c-.199 0-.386.077-.464.278-.11.292.039.53.38.768.207.144.95.603 1.117.758.173.16.15.284.13.441-.016.132-.39 1.884-2.733 3.016-.137.067-.37.207.041.435.646.357 1.077.319 1.411.534.284.183.116.577.323.72.253.175 1.003-.013 1.971.307.812.267 1.306 1.023 2.745 1.023 1.44 0 1.948-.76 2.745-1.023.967-.32 1.718-.132 1.972-.308.206-.142.039-.536.322-.72.335-.214.765-.176 1.412-.533.41-.225.177-.366.04-.432z"
                                              ></path>
                                              <path
                                                fill="#6D6D6D"
                                                d="M19.523 16.268c-.105-.286-.305-.439-.533-.566a1.341 1.341 0 00-.116-.06l-.207-.105c-.711-.377-1.266-.853-1.651-1.417a3.209 3.209 0 01-.284-.502c-.033-.094-.031-.148-.007-.196a.32.32 0 01.09-.095l.334-.218c.152-.098.273-.177.35-.232.293-.204.497-.421.624-.663a1.32 1.32 0 00.066-1.098c-.194-.508-.674-.824-1.256-.824a1.727 1.727 0 00-.461.06 10.79 10.79 0 00-.034-1.076c-.11-1.27-.554-1.937-1.018-2.468a4.058 4.058 0 00-1.036-.834c-.704-.402-1.502-.606-2.373-.606-.87 0-1.664.204-2.37.606-.389.22-.74.502-1.037.836-.464.53-.909 1.198-1.019 2.468-.03.361-.038.73-.033 1.076a1.732 1.732 0 00-.46-.061c-.583 0-1.065.316-1.257.825a1.322 1.322 0 00.064 1.098c.128.243.332.46.624.664.077.054.198.132.35.232.083.053.203.131.32.21a.345.345 0 01.104.103c.024.05.025.105-.012.205a3.178 3.178 0 01-.278.492c-.377.551-.916 1.018-1.604 1.392-.365.194-.743.323-.903.758-.121.328-.042.701.264 1.016.113.117.243.216.387.293.299.164.616.29.946.378a.624.624 0 01.191.085c.112.098.096.246.245.461.074.112.17.208.28.285.312.216.663.23 1.035.244.336.012.717.027 1.152.17.18.06.367.175.584.31.52.32 1.234.758 2.427.758s1.91-.44 2.435-.762c.216-.132.402-.246.577-.304.435-.144.815-.158 1.151-.171.372-.014.723-.028 1.036-.244.13-.09.24-.21.318-.348.107-.182.105-.309.205-.398a.592.592 0 01.18-.082c.334-.087.656-.215.958-.382.153-.081.29-.189.406-.317l.004-.005c.288-.308.36-.67.242-.99zm-1.06.57c-.647.357-1.077.32-1.411.535-.285.182-.116.577-.323.72-.253.174-1.003-.013-1.971.306-.8.264-1.309 1.024-2.745 1.024-1.437 0-1.935-.758-2.747-1.025-.966-.32-1.717-.133-1.971-.308-.206-.142-.039-.537-.323-.72-.335-.215-.764-.176-1.41-.532-.413-.227-.18-.368-.042-.434 2.343-1.135 2.717-2.886 2.734-3.016.02-.157.042-.28-.131-.441-.168-.155-.91-.614-1.116-.758-.341-.238-.491-.476-.38-.768.077-.202.265-.279.463-.279.063 0 .125.008.186.021.374.081.738.269.948.32.025.006.051.01.077.01.112 0 .152-.056.144-.185-.024-.41-.082-1.207-.018-1.953.089-1.026.42-1.534.812-1.984.189-.216 1.075-1.153 2.77-1.153 1.696 0 2.585.933 2.774 1.148.393.45.724.958.812 1.984.064.746.008 1.545-.018 1.954-.009.134.032.184.144.184a.336.336 0 00.077-.01c.21-.05.574-.238.948-.32a.862.862 0 01.186-.02c.2 0 .387.077.464.278.11.292-.039.53-.38.768-.206.144-.949.603-1.116.758-.174.16-.15.284-.13.441.016.132.39 1.884 2.733 3.016.138.07.372.21-.04.44z"
                                              ></path>
                                            </svg>
                                          </InputAdornment>
                                        ),
                                      }}
                                      required
                                      value={item.snapchat}
                                      onChange={(e) => {
                                        setData({
                                          ...data,
                                          speakers: data.speakers.map((s, index) => {
                                            if (index === i) {
                                              s.snapchat = e.target.value;
                                            }
                                            return s;
                                          }),
                                        });
                                      }}
                                    />
                                  </Grid>
                                  {/* whatsApp */}
                                  <Grid item sm={4} xs={12}>
                                    <TextField
                                      placeholder={t('events.createEvent.whatsApp')}
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
                                              width="25"
                                              height="25"
                                              viewBox="0 0 25 25"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <rect
                                                x="0.745605"
                                                y="0.568298"
                                                width="24"
                                                height="24"
                                                rx="12"
                                                fill="#6D6D6D"
                                              />
                                              <path
                                                d="M5.46655 19.5483L6.49549 15.812C5.85936 14.7153 5.52565 13.4733 5.52912 12.2036C5.52912 8.22503 8.78278 4.9903 12.7768 4.9903C14.7165 4.9903 16.538 5.74103 17.9041 7.10412C19.2737 8.4672 20.028 10.28 20.0246 12.207C20.0246 16.1856 16.7709 19.4203 12.7734 19.4203H12.7699C11.5567 19.4203 10.3644 19.1159 9.3042 18.5416L5.46655 19.5483ZM9.48843 17.2373L9.70743 17.3688C10.6321 17.9154 11.6923 18.2025 12.7734 18.206H12.7768C16.0965 18.206 18.801 15.5179 18.801 12.2105C18.801 10.6087 18.1753 9.10377 17.0386 7.96902C15.9019 6.83427 14.3863 6.21154 12.7768 6.21154C9.45715 6.20808 6.75272 8.89619 6.75272 12.2036C6.75272 13.3349 7.06905 14.4385 7.67389 15.3933L7.81641 15.6217L7.20809 17.8324L9.48843 17.2373Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M5.72021 19.2958L6.71439 15.6874C6.09911 14.6322 5.77583 13.4318 5.77583 12.2071C5.77931 8.36689 8.91825 5.24286 12.7768 5.24286C14.6504 5.24286 16.4058 5.96938 17.7268 7.28403C19.0477 8.59868 19.7742 10.3492 19.7742 12.2105C19.7742 16.0507 16.6318 19.1747 12.7768 19.1747H12.7733C11.6018 19.1747 10.4512 18.8806 9.42924 18.3271L5.72021 19.2958Z"
                                                fill="#6D6D6D"
                                              />
                                              <path
                                                d="M5.46655 19.5483L6.49549 15.812C5.85936 14.7153 5.52565 13.4733 5.52912 12.2036C5.52912 8.22503 8.78278 4.9903 12.7768 4.9903C14.7165 4.9903 16.538 5.74103 17.9041 7.10412C19.2737 8.4672 20.028 10.28 20.0246 12.207C20.0246 16.1856 16.7709 19.4203 12.7734 19.4203H12.7699C11.5567 19.4203 10.3644 19.1159 9.3042 18.5416L5.46655 19.5483ZM9.48843 17.2373L9.70743 17.3688C10.6321 17.9154 11.6923 18.2025 12.7734 18.206H12.7768C16.0965 18.206 18.801 15.5179 18.801 12.2105C18.801 10.6087 18.1753 9.10377 17.0386 7.96902C15.9019 6.83427 14.3863 6.21154 12.7768 6.21154C9.45715 6.20808 6.75272 8.89619 6.75272 12.2036C6.75272 13.3349 7.06905 14.4385 7.67389 15.3933L7.81641 15.6217L7.20809 17.8324L9.48843 17.2373Z"
                                                fill="white"
                                              />
                                              <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M10.9656 9.18677C10.83 8.88579 10.6875 8.87887 10.5589 8.87541C10.4546 8.87195 10.333 8.87195 10.2113 8.87195C10.0896 8.87195 9.89497 8.91692 9.72811 9.09682C9.56126 9.27672 9.09546 9.71263 9.09546 10.6018C9.09546 11.4874 9.74549 12.3454 9.83587 12.4665C9.92625 12.5876 11.0908 14.4661 12.9296 15.1892C14.4591 15.7912 14.772 15.6701 15.1022 15.6389C15.4324 15.6078 16.1729 15.203 16.3258 14.781C16.4753 14.3589 16.4753 13.9991 16.4301 13.923C16.3849 13.8469 16.2632 13.8019 16.0825 13.7119C15.9017 13.622 15.0118 13.1861 14.845 13.1238C14.6781 13.065 14.5565 13.0339 14.4383 13.2138C14.3166 13.3937 13.969 13.7984 13.8647 13.9195C13.7604 14.0406 13.6527 14.0544 13.4719 13.9645C13.2911 13.8745 12.7072 13.6843 12.0154 13.0685C11.4766 12.591 11.1116 11.9994 11.0073 11.8195C10.903 11.6396 10.9969 11.5428 11.0873 11.4528C11.1672 11.3732 11.268 11.2418 11.3584 11.138C11.4488 11.0342 11.4801 10.9581 11.5392 10.837C11.5983 10.7159 11.5705 10.6121 11.5253 10.5222C11.4801 10.4357 11.1255 9.54311 10.9656 9.18677Z"
                                                fill="white"
                                              />
                                            </svg>
                                          </InputAdornment>
                                        ),
                                      }}
                                      required
                                      value={item.whatsApp}
                                      onChange={(e) => {
                                        setData({
                                          ...data,
                                          speakers: data.speakers.map((s, index) => {
                                            if (index === i) {
                                              s.whatsApp = e.target.value;
                                            }
                                            return s;
                                          }),
                                        });
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </div>
                        )}
                      </Draggable>
                    </Grid>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>
      {/* schedule heading */}
      <Grid item style={{ marginTop: '2em' }}>
        <Typography variant="h5">{t('events.createEvent.schedule')}</Typography>
      </Grid>
      {/* schedule add icon */}
      <Grid item style={{ marginTop: '1em' }}>
        <div
          className={classes.dropzoneRoot}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '140px',
            height: '140px',
            cursor: 'pointer',
          }}
          onClick={() => {
            setData({
              ...data,
              schedule: [
                {
                  startDate: '',
                  time: '',
                  topic: '',
                  topicDetails: '',
                  speaker: '',
                },
                ...data.schedule,
              ],
            });
            setTimeout(() => {
              window.scrollBy(0, 600);
            }, 1000);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="71"
            height="71"
            fill="none"
            viewBox="0 0 71 71"
          >
            <path
              stroke="#989090"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M18.343 35.609h35M35.843 53.109v-35"
            ></path>
          </svg>
        </div>
      </Grid>
      {/* schedule list */}
      <Grid item style={{ marginTop: '1.5em' }}>
        <Grid container direction="column">
          <DragDropContext onDragEnd={(result) => onDragEnd('schedule', result)}>
            <Droppable droppableId="characters">
              {(provided, snapshot) => (
                <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                  {data.schedule.map((item, i) => (
                    <Grid
                      item
                      key={i}
                      style={{
                        boxSizing: 'border-box',
                        border: '1px solid #D1D0D3',
                        borderRadius: '15px',

                        position: 'relative',
                        marginTop: i === 0 ? 0 : '20px',
                      }}
                    >
                      <Draggable draggableId={`${i}`} index={i}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                          >
                            <div style={{ margin: '20px', marginTop: '40px' }}>
                              {/* delete icon */}
                              <div
                                style={{
                                  position: 'absolute',
                                  top: 10,
                                  right: 10,
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  const dataCopy = { ...data };
                                  const scheduleCopy = [...dataCopy.schedule];
                                  const newSchedule = scheduleCopy.filter((im, index) => {
                                    return i !== index;
                                  });
                                  setData({
                                    ...data,
                                    schedule: newSchedule,
                                  });
                                }}
                              >
                                <CloseIcon />
                              </div>
                              <Grid container direction="column">
                                {/* startDate time topic */}
                                <Grid item style={{ width: '100%' }}>
                                  <Grid container spacing={2}>
                                    {/* startDate */}
                                    <Grid item sm={4} xs={12}>
                                      <Flatpickr
                                        value={item.startDate}
                                        onChange={(date) => {
                                          setData({
                                            ...data,
                                            schedule: data.schedule.map((s, index) => {
                                              if (index === i) {
                                                s.startDate = date[0];
                                              }
                                              return s;
                                            }),
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

                                    {/* time */}
                                    <Grid item sm={4} xs={12}>
                                      <Flatpickr
                                        value={item.time}
                                        onChange={(date) => {
                                          setData({
                                            ...data,
                                            schedule: data.schedule.map((s, index) => {
                                              if (index === i) {
                                                s.time = date[0];
                                              }
                                              return s;
                                            }),
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
                                    {/* topic */}
                                    <Grid item sm={4} xs={12}>
                                      <TextField
                                        placeholder={t('events.createEvent.topic')}
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
                                        value={item.topic}
                                        onChange={(e) => {
                                          setData({
                                            ...data,
                                            schedule: data.schedule.map((s, index) => {
                                              if (index === i) {
                                                s.topic = date[0];
                                              }
                                              return s;
                                            }),
                                          });
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                {/* topicDetails speakerName */}
                                <Grid item style={{ width: '100%', marginTop: '19px' }}>
                                  <Grid container spacing={2}>
                                    {/* topicDetails */}
                                    <Grid item sm={8} xs={12}>
                                      <TextField
                                        placeholder={t('events.createEvent.topicDetails')}
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
                                        value={item.topicDetails}
                                        onChange={(e) => {
                                          setData({
                                            ...data,
                                            schedule: data.schedule.map((s, index) => {
                                              if (index === i) {
                                                s.topicDetails = date[0];
                                              }
                                              return s;
                                            }),
                                          });
                                        }}
                                      />
                                    </Grid>
                                    {/* speakerName */}
                                    <Grid item sm={4} xs={12}>
                                      <TextField
                                        placeholder={t('events.createEvent.speakerName')}
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
                                        value={item.speaker}
                                        onChange={(e) => {
                                          setData({
                                            ...data,
                                            schedule: data.schedule.map((s, index) => {
                                              if (index === i) {
                                                s.speaker = date[0];
                                              }
                                              return s;
                                            }),
                                          });
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    </Grid>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>

      {/* submit */}
      <Grid item style={{ marginTop: '1.5em', marginBottom: '4em' }}>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item md={3} sm={6}>
            <Button
              fullWidth
              className={classes.button}
              disabled={loading.active}
              onClick={SubmitHandler}
            >
              {loading.active && loading.action === 'submit' && (
                <CircularProgress size="2rem" style={{ color: theme.palette.secondary.main }} />
              )}

              {t('events.createEvent.save')}
            </Button>
          </Grid>
          <Grid item md={3} sm={6}>
            <Button
              fullWidth
              className={classes.button}
              disabled={loading.active}
              onClick={resetHandler}
              style={{
                background: '#DEDEDE',
                color: '#5D5D5D',
              }}
            >
              {t('events.createEvent.reset')}
            </Button>
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
          .MuiDropzoneArea-textContainer{
            height: 100%;
          }
        `}
      </style>
    </Grid>
  );
}
