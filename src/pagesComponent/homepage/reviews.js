import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const useStyles = makeStyles((theme) => ({
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
}));
export default function Reviews() {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const reviews = [
    {
      review:
        "I find the idea cool, Networking was much faster and I definitely stuck in the head of all new contacts! It's the perfect digital business card and I'm extremly happy with it!",
      userName: "Luisa Hagedorn",
      country: "Germany",
      profile: "/dev/reviews/luisa.png",
    },
    {
      review:
        "Very innovative idea that works perfectly and looks very classy. All in all, a great product with excellent support that is fair and always available. A great step towards the future. Highly recommended! ",
      userName: "Qamar Hameed",
      country: "Germany",
      profile: "/dev/reviews/qamar.png",
    },
    {
      review:
        "Super handy for sharing your contact info - you can also edit your info at any time, or add more contact options. Really well thought out and implemented. AND: The people you share your contacts with are guaranteed to remember you, as they have never seen this system before :-)",
      userName: "Lucas Sälzle",
      country: "Germany",
      profile: "/dev/reviews/lucas.png",
    },
    {
      review:
        "I loved it. Best card I have used so far. Never switching back to old cards now. ",
      userName: "Mehdi Mughal",
      country: "Pakistan",
      profile: "/dev/reviews/mehdi.png",
    },
    {
      review:
        "It helps me expand my social network and I can even share my business info's with just one tap and link & totally envoirnment friendly!",
      userName: "Mirza Iqbal",
      country: "Germany",
      profile: "/dev/reviews/mirza.png",
    },
    {
      review:
        "No more paper and always up to date. I think the idea is just Amaaazing. totally Love it!!",
      userName: "Knut Richter",
      country: "Germany",
      profile: "/dev/reviews/knut.png",
    },
    {
      review:
        "With just one tap I can now add and share not only my contact , but also social media, paypal and many more URLs in a signle links! How awesome is that please! I highly recommend this new kind of business cards! Many thanks to Team Tappio!",
      userName: "Patrick Stockinger",
      country: "Germany",
      profile: "/dev/reviews/patrick.png",
    },
  ];

  const boxShadowHandler = () => {
    let card2 = document.querySelectorAll(".slick-active .paper");

    if (card2 && card2 !== null && !matchesSM && !matchesXS) {
      card2[1].style.boxShadow = "0px 4px 18px 3px rgb(13 19 215 / 6%)";
      card2[1].style.border = "none";
      card2[0].style.boxShadow = "none";
      card2[0].style.border = "2px solid #e8edf0";
      card2[2].style.boxShadow = "none";
      card2[2].style.border = "2px solid #e8edf0";
    }
  };
  useEffect(() => {
    boxShadowHandler();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Grid container direction="column" alignItems="center">
      {/* for heart */}
      <Grid item>
        <img
          src="/dev/heart.svg"
          alt="heart"
          style={{ width: "72px", height: "72px" }}
        />
      </Grid>
      {/* title */}
      <Grid item>
        <Typography
          variant="h1"
          disableGutters
          className={classes.headline}
          align={matchesSM ? "center" : "left"}
          //style={{ whiteSpace: 'pre' }}
        >
          <span className={classes.headingLine}>
            {t("homepage.review.title1")}
          </span>{" "}
          {t("homepage.review.title")}
        </Typography>
      </Grid>
      {/* description */}
      <Grid item style={{ marginTop: "1em" }}>
        <Typography
          variant="body1"
          disableGutters
          align={matchesSM ? "center" : "left"}
          style={{
            lineHeight: "1.5em",
            fontSize: "24px",
            color: "#2f2f2f",
            fontWeight: 300,
          }}
        >
          {t("homepage.review.description")} ❤
        </Typography>
      </Grid>
      {/* for slider */}
      <Grid
        item
        container
        style={{
          marginTop: "2em",
          marginBottom: "10px",
        }}
      >
        <Slider
          slidesToScroll={1}
          infinite={true}
          dots={true}
          autoplay
          afterChange={() => boxShadowHandler()}
          // onReInit={() => console.log('swip')}
          // onSwipe={() => console.log('swip')}
          slidesToShow={
            reviews.length > 2
              ? matchesXS
                ? 1
                : matchesSM
                ? 2
                : 3
              : reviews.length === 0
              ? 1
              : reviews.length
          }
          swipeToSlide={true}
          speed={500}
          arrows={false}
        >
          {reviews.map((eachReview, ind) => (
            <div
              key={ind}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Paper
                elevation={0}
                className="paper"
                style={{
                  cursor: "hand",
                  position: "relative",
                  backgroundPositionY: "center",
                  padding: "42px 44px 48px 57px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  border: "2px solid #e8edf0",
                  marginBottom: "1em",
                  borderRadius: "10px",
                  margin: "0 10px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: "20px",
                    lineHeight: "38px",
                    textAlign: "center",
                    fontWeight: 400,
                    paddingBottom: "40px",
                  }}
                >
                  {eachReview.review}
                </Typography>
                <Grid container>
                  <Grid item>
                    <img
                      alt={eachReview.profile}
                      src={eachReview.profile}
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "15px",
                        borderRadius: "50%",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: "18px",

                        fontWeight: 500,
                      }}
                    >
                      {eachReview.userName},{" "}
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          color: "#8a8a8a",
                        }}
                      >
                        {eachReview.country}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          ))}
        </Slider>
      </Grid>
      <style>
        {`
          .slick-initialized{
            width: 100%;
        }`}
      </style>
    </Grid>
  );
}
