import React, { useState } from "react";
import {
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  title: {
    lineHeight: "25px",
    fontSize: "17px",
    color: "rgba(0, 0, 0, 0.63)",
    fontWeight: 400,
  },
  headline: {
    fontSize: "68px",
    fontWeight: "500",

    lineHeight: "1.05em",
    color: "#000",
    marginTop: 10,
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  },
  headingLine: {
    position: "relative",
    display: "inline-block",
    zIndex: 10,
    "&:before": {
      content: "''",
      width: "100%",
      height: "13px",
      backgroundColor: "#00FFD0",
      position: "absolute",
      left: 0,
      bottom: "10px",
      zIndex: "-1",
      [theme.breakpoints.down("sm")]: {
        bottom: "5px",
        height: "8px",
      },
    },
  },
  content: {
    lineHeight: "25px",
    fontSize: "20px",
    color: "rgba(0, 0, 0, 0.63)",
    fontWeight: 400,
  },
  button: {
    marginTop: "1em",
    textTransform: "none",
    paddingLeft: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:hover .MuiButton-endIcon svg": {
      transform: "translateX(3px)",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default function Services() {
  const { t } = useTranslation();

  const classes = useStyles();

  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [videoModal, setVideoModal] = useState(false);

  const renderVideoModal = (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={videoModal}
      onClose={() => setVideoModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={videoModal}>
        <div
          style={{
            width: matchesSM ? "80vw" : "50vw",
            height: matchesSM ? "50vh" : "60vh",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/A-ZpPe35-m4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style={{
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </div>
      </Fade>
    </Modal>
  );

  let servicesData = [
    {
      icon: "/dev/clip.svg",
      title: t("homepage.allServices.title.1"),
      description: t("homepage.allServices.description.1"),
    },
    {
      icon: "/dev/platform.svg",
      title: t("homepage.allServices.title.2"),
      description: t("homepage.allServices.description.2"),
    },
    {
      icon: "/dev/check.svg",
      title: t("homepage.allServices.title.3"),
      description: t("homepage.allServices.description.3"),
    },
    {
      icon: "/dev/share.svg",
      title: t("homepage.allServices.title.4"),
      description: t("homepage.allServices.description.4"),
    },
    {
      icon: "/dev/web.svg",
      title: t("homepage.allServices.title.5"),
      description: t("homepage.allServices.description.5"),
    },
    {
      icon: "/dev/notes.svg",
      title: t("homepage.allServices.title.6"),
      description: t("homepage.allServices.description.6"),
    },
  ];
  return (
    <Grid container direction="column" style={{ overflow: "hidden" }}>
      {renderVideoModal}
      {/* connect with us */}
      <Grid item>
        <Grid
          container
          //direction={matches1350 ? "column" : "row"}
          justifyContent="center"
          alignItems="center"
          spacing={matchesSM ? 0 : 2}
        >
          <Grid item xl={4} md={6} xs={12}>
            <Grid container direction="column">
              <Typography
                variant="body1"
                disableGutters
                className={classes.title}
                align={matchesSM ? "center" : "left"}
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                {t("homepage.connect.title")}
              </Typography>

              <Typography
                variant="h1"
                disableGutters
                className={classes.headline}
                align={matchesSM ? "center" : "left"}
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                {t("homepage.connect.heading1")}{" "}
                <span className={classes.headingLine}>
                  {" "}
                  {t("homepage.connect.heading")}
                </span>
              </Typography>

              <Typography
                variant="body1"
                disableGutters
                className={classes.content}
                align={matchesSM ? "center" : "left"}
                style={{ marginTop: matchesSM ? "0.7em" : "2em" }}
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                {t("homepage.connect.description")}
              </Typography>
              <Grid
                item
                container={matchesSM}
                justifyContent="center"
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <Button
                  fullWidth={false}
                  variant="text"
                  className={classes.button}
                  endIcon={
                    <ArrowRightAltIcon
                      size="1rem"
                      style={{ transition: "all 0.3s ease-in-out" }}
                    />
                  }
                >
                  <Typography
                    variant="body1"
                    style={{ color: "#000", fontWeight: 500 }}
                  >
                    {t("homepage.connect.learnMore")}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src="/dev/prodesigns.gif"
              alt="Professional Impression"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: matchesSM ? "460px" : "560px",
                maxHeight: matchesSM ? "470px" : "570px",
              }}
              data-aos="fade-left"
              data-aos-duration="1200"
            />
          </Grid>
        </Grid>
      </Grid>
      {/* scanning */}
      <Grid item style={{ marginTop: "9em" }}>
        <Grid
          container
          direction={matchesSM ? "column-reverse" : "row"}
          justifyContent="center"
          alignItems="center"
          spacing={matchesSM ? 0 : 2}
        >
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            style={{
              display: matchesSM ? "flex" : "unset",
              justifyContent: "center",
            }}
          >
            <img
              src="/dev/easysetup.gif"
              alt="Profile few clicks configuration with Tappio"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: matchesSM ? "460px" : "560px",
                maxHeight: matchesSM ? "470px" : "570px",
              }}
              data-aos="fade-right"
              data-aos-duration="1200"
            />
          </Grid>
          <Grid item xl={4} md={6} xs={12}>
            <Grid container direction="column">
              <Typography
                variant="body1"
                disableGutters
                className={classes.title}
                align={matchesSM ? "center" : "left"}
                data-aos="fade-left"
                data-aos-duration="1200"
              >
                {t("homepage.scanning.title")}
              </Typography>

              <Typography
                variant="h1"
                disableGutters
                className={classes.headline}
                align={matchesSM ? "center" : "left"}
                // style={{ whiteSpace: "pre" }}
                data-aos="fade-left"
                data-aos-duration="1200"
              >
                {t("homepage.scanning.heading1")}{" "}
                <span className={classes.headingLine}>
                  {t("homepage.scanning.heading")}
                </span>
              </Typography>

              <Typography
                variant="body1"
                disableGutters
                className={classes.content}
                align={matchesSM ? "center" : "left"}
                style={{ marginTop: matchesSM ? "0.7em" : "2em" }}
                data-aos="fade-left"
                data-aos-duration="1200"
              >
                {t("homepage.scanning.description")}
              </Typography>
              <Grid item container={matchesSM} justifyContent="center">
                <Button
                  fullWidth={false}
                  variant="text"
                  className={classes.button}
                  endIcon={
                    <ArrowRightAltIcon
                      size="1rem"
                      style={{ transition: "all 0.3s ease-in-out" }}
                    />
                  }
                  data-aos="fade-left"
                  data-aos-duration="1200"
                >
                  <Typography
                    variant="body1"
                    style={{ color: "#000", fontWeight: 500 }}
                  >
                    {t("homepage.scanning.learnMore")}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* notes */}
      <Grid item style={{ marginTop: "9em" }}>
        <Grid
          container
          spacing={matchesSM ? 0 : 2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xl={4} md={6} xs={12}>
            <Grid container direction="column">
              <Typography
                variant="body1"
                disableGutters
                className={classes.title}
                align={matchesSM ? "center" : "left"}
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                {t("homepage.notes.title")}
              </Typography>

              <Typography
                variant="h1"
                disableGutters
                className={classes.headline}
                align={matchesSM ? "center" : "left"}
                // style={{ whiteSpace: "pre" }}
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                <span className={classes.headingLine}>
                  {t("homepage.notes.heading1")}
                </span>{" "}
                {t("homepage.notes.heading")}
              </Typography>

              <Typography
                variant="body1"
                disableGutters
                className={classes.content}
                align={matchesSM ? "center" : "left"}
                style={{ marginTop: matchesSM ? "0.7em" : "2em" }}
                data-aos="fade-right"
                data-aos-duration="1200"
              >
                {t("homepage.notes.description")}
              </Typography>
              <Grid item container={matchesSM} justifyContent="center">
                <Button
                  fullWidth={false}
                  variant="text"
                  className={classes.button}
                  data-aos="fade-right"
                  data-aos-duration="1200"
                  endIcon={
                    <ArrowRightAltIcon
                      size="1rem"
                      style={{ transition: "all 0.3s ease-in-out" }}
                    />
                  }
                  id={matchesXS ? "" : "benefits"}
                >
                  <Typography
                    variant="body1"
                    style={{ color: "#000", fontWeight: 500 }}
                  >
                    {t("homepage.notes.learnMore")}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              data-aos="fade-left"
              data-aos-duration="1200"
              src="/dev/missionandstorytappio.png"
              alt="Mission and Story of the Tappio"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: matchesSM ? "460px" : "560px",
                maxHeight: matchesSM ? "470px" : "570px",
              }}
            />
          </Grid>
        </Grid>
        <div id={matchesXS ? "benefits" : ""} />
      </Grid>
      {/* why choose */}
      <Grid item style={{ marginTop: "9em", marginBottom: "7em" }}>
        <Grid
          container
          direction={matchesSM ? "column-reverse" : "row"}
          justifyContent="center"
          alignItems="center"
          spacing={matchesSM ? 0 : 2}
        >
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            style={{
              display: matchesSM ? "flex" : "unset",
              justifyContent: "center",
            }}
          >
            <img
              src="/dev/tappiogif.gif"
              alt="tappiogif.gif"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: matchesSM ? "460px" : "560px",
                maxHeight: matchesSM ? "470px" : "570px",
              }}
              data-aos="fade-right"
              data-aos-duration="1200"
            />
          </Grid>
          <Grid item xl={6} md={6} xs={12}>
            <Grid container direction="column">
              <Grid
                style={{ marginTop: matchesSM ? "1em" : 0 }}
                item
                container={matchesSM}
                justifyContent="center"
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setVideoModal(true)}
                  data-aos="fade-left"
                  data-aos-duration="1200"
                >
                  <img src="/dev/play.svg" alt="play" />
                </div>
              </Grid>
              <Typography
                variant="h1"
                disableGutters
                className={classes.headline}
                align={matchesSM ? "center" : "left"}
                style={{ lineHeight: "1.32em" }}
                data-aos="fade-left"
                data-aos-duration="1200"
              >
                {t("homepage.whyChoseUs.heading")}{" "}
                <span className={classes.headingLine}>
                  {t("homepage.whyChoseUs.heading1")}
                </span>{" "}
                {t("homepage.whyChoseUs.heading2")}
              </Typography>

              <Typography
                variant="body1"
                disableGutters
                className={classes.content}
                align={matchesSM ? "center" : "left"}
                style={{ marginTop: matchesSM ? "0.7em" : "2em" }}
                data-aos="fade-left"
                data-aos-duration="1200"
              >
                {t("homepage.whyChoseUs.description")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* all services */}
      <Grid
        item
        style={{
          background: "#f8f9fa",
          borderRadius: "25px",
          padding: "4em 0",
        }}
      >
        <Grid
          container
          spacing={3}
          alignItems="flex-start"
          justifyContent="center"
        >
          {servicesData.map((item, i) => (
            <Grid
              item
              style={{
                marginTop: matchesXS
                  ? i > 0
                    ? "3em"
                    : 0
                  : matchesSM
                  ? i > 1
                    ? "3em"
                    : 0
                  : i > 2
                  ? "3em"
                  : 0,
              }}
              md={4}
              sm={6}
              xs={10}
              key={i}
            >
              <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                  spacing={2}
                >
                  {/* icon */}
                  <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      src={item.icon}
                      style={{
                        backgroundColor: "transparent",
                        width: "32px",
                        height: "26px",
                      }}
                      alt={item.icon}
                    />
                  </Grid>
                  {/* title */}
                  <Grid item>
                    <Typography
                      variant="h2"
                      disableGutters
                      style={{
                        fontWeight: 500,
                        fontSize: "24px",
                        lineHeight: "28.33px",
                        color: "#101621",
                      }}
                      align="center"
                    >
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid item container justifyContent="center">
                    <Typography
                      variant="subtitle1"
                      disableGutters
                      style={{
                        color: "#292929",
                        lineHeight: "32px",
                        width: matchesXS ? "100%" : "65%",
                      }}
                      align="center"
                    >
                      {item.description}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ))}
        </Grid>
        <div id="pricing" />
      </Grid>
    </Grid>
  );
}
