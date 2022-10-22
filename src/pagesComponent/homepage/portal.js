import React, { useState } from "react";
import {
  Grid,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  bgWrapper: {
    "&::before": {
      content: "''",
      position: "absolute",
      width: "118px",
      height: "118px",
      borderRadius: "50%",
      background: "#75f1d5",
      top: "-59px",
      right: "-48px",
      zIndex: 1,
      animation: "jumpTwo 6s infinite linear",
    },
  },
  portalImages: {
    opacity: 1,
    transform: "translateZ(0)",
    animation: "slideBottom 0.7s ease-in-out 0s 1 normal none running",
  },
}));
export default function Portal() {
  const { t } = useTranslation();

  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [portal, setPortal] = useState(0);

  return (
    <Grid
      container
      style={{
        padding: matchesXS ? "30px 0" : matchesSM ? "50px 0" : "70px 0",
        background: "#f9f9f9",
        borderRadius: "25px",
        position: "relative",
      }}
      direction="column"
      alignItems="center"
      className={matchesSM ? "" : classes.bgWrapper}
    >
      {!matchesSM && (
        <div
          style={{
            position: "absolute",
            left: "-33px",
            top: "22%",
            animation: "jumpTwo 6s infinite linear",
          }}
        >
          <img src="/dev/curve1.svg" alt="curve1" />
        </div>
      )}
      {!matchesSM && (
        <div
          style={{
            position: "absolute",
            right: "-33px",
            top: "58%",
            animation: "jumpTwo 6s infinite linear",
          }}
        >
          <img src="/dev/curve2.svg" alt="curve2" />
        </div>
      )}
      {/* tabs */}
      <Grid item>
        <Tabs
          value={portal}
          textColor="primary"
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
          orientation={matchesXS ? "vertical" : "horizontal"}
          onChange={(event, newValue) => setPortal(newValue)}
          aria-label="disabled tabs example"
        >
          <Tab
            style={{ margin: matchesXS ? "0 10px" : "0 50px" }}
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  paddingBottom: 5,
                  borderBottom: portal === 0 ? "3px solid #000" : 0,
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <img
                  src="/dev/user.svg"
                  alt="user"
                  style={{ width: "16px", height: "16px" }}
                />
                <Typography
                  variant="subtitle1"
                  style={{
                    textTransform: "none",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  {t("homepage.portal.tab1")}
                </Typography>
              </div>
            }
          />
          <Tab
            style={{ margin: matchesXS ? "0 10px" : "0 50px" }}
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  paddingBottom: 5,
                  borderBottom: portal === 1 ? "3px solid #000" : 0,
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <img
                  src="/dev/share.svg"
                  alt="share"
                  style={{ width: "16px", height: "16px" }}
                />
                <Typography
                  variant="subtitle1"
                  style={{
                    textTransform: "none",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  {t("homepage.portal.tab2")}
                </Typography>
              </div>
            }
          />

          <Tab
            style={{ margin: matchesXS ? "0 10px" : "0 50px" }}
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  paddingBottom: 5,
                  borderBottom: portal === 2 ? "3px solid #000" : 0,
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <img
                  src="/dev/notes.svg"
                  alt="notes"
                  style={{ width: "16px", height: "16px" }}
                />
                <Typography
                  variant="subtitle1"
                  style={{
                    textTransform: "none",
                    color: "#000",
                    fontWeight: "500",
                  }}
                >
                  {t("homepage.portal.tab3")}
                </Typography>
              </div>
            }
          />
        </Tabs>
      </Grid>
      {/* portal */}
      <Grid item style={{ marginTop: "2em" }}>
        <Grid container justifyContent="center">
          {portal === 0 && (
            <img
              src="/dev/tappioportal.gif"
              alt="tappioportal"
              className={classes.portalImages}
              data-aos="fade"
              data-aos-duration="1200"
              style={{ width: "100%", height: "70%" }}
            />
          )}
          {portal === 1 && (
            <img
              src="/dev/tappioportal2.gif"
              alt="tappioportal2"
              style={{ width: "100%", height: "70%" }}
            />
          )}
          {portal === 2 && (
            <img
              src="/dev/screen_16.png"
              alt="screen_16"
              style={{ width: "100%", height: "70%" }}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
