import React from "react";
import { Grid, Typography, useTheme, useMediaQuery } from "@material-ui/core";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Trans } from "react-i18next";

const firmsData = [
  // "mvl.svg",
  "uprisox.png",
  "automaxing.svg",
  "inski.svg",
  "idealise.svg",
  "leadalerts.svg",
  "sp.svg",
  "exsillence.svg",
  "mirza.svg",
  "cyberc.svg", 
];
export default function Firms() {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid container direction="column" style={{ background: "#fff" }}>
      <Grid item style={{ width: "100%", background: "#fff" }}>
        <Typography
          variant="body1"
          disableGutters
          align={"center"}
          style={{
            lineHeight: "1.5em",
            fontSize: "20px",
            color: "#2f2f2f",
            fontWeight: 300,
          }}
        >
          <Trans
            i18nKey="homepage.firms.text"
            //values={{ profile: props.selectedProfile.type.label }}
            components={{ bold: <strong /> }}
          />
        </Typography>
      </Grid>
      <Grid
        item
        style={{
          width: "100%",

          marginTop: "1.5em",
          marginBottom: "10px",
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          {firmsData.length > 0 && (
            <Slider
              slidesToScroll={1}
              infinite={firmsData.length > 5}
              //slidesToShow={5}
              slidesToShow={matchesXS ? 1 : matchesSM ? 2 : 5}
              swipeToSlide={true}
              speed={500}
              arrows={false}
              dots={false}
              autoplay={true}
            >
              {firmsData.map((s, i) => {
                return (
                  <div
                    dataIndex={i}
                    key={i}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={`/firms/${s}`}
                      style={{
                        width: "192px",
                        height: "80px",
                      }}
                      alt={`/firms/${s}`}
                    />
                  </div>
                );
              })}
            </Slider>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
