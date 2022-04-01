import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import grants from "./grants.json";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#00e3ab",
      },
    },
  });
  const [grant, setGrant] = useState();
  const [page, setPage] = useState("home");

  const setRandomGrant = () => {
    const num = Math.floor(Math.random() * grants.length);
    const selectedGrant = grants[num];
    //const title = selectedGrant.title;
    setGrant(selectedGrant);
    setPage("grant");
  };

  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={theme}>
          <img src={logo}></img>
          {page === "home" && (
            <div>
              <h2>Try the Greenpill Lottery!</h2>
              <p>
                Can't decide what grant to contribute to? Contribute to a random
                grant.
              </p>
              <Button
                variant="contained"
                onClick={() => {
                  setRandomGrant();
                }}
              >
                {" "}
                Click Me!
              </Button>
            </div>
          )}
          {grant && page === "grant" && (
            <div>
              <Button
                sx ={{marginBottom: "20px"}}
                variant="contained"
                onClick={() => {
                  setPage("home");
                }}
              >
                Go Back
              </Button>

              <Card sx={{ maxWidth: 500 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={grant.logo}
                  alt={grant.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {grant.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {grant.description.slice(0, 300) + "..."}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    color="secondary"
                    variant="contained"
                    fullWidth="true"
                    onClick={() => {
                      window.location.href = `https://gitcoin.co${grant.details_url}`;
                    }}
                  >
                    Go to grant
                  </Button>
                </CardActions>
              </Card>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  marginTop: "20px",
                }}
              >
                {" "}
                <Typography variant="h6">Don't like this one? </Typography>
                <ArrowRightAltIcon />
                <Button
                  variant="contained"
                  onClick={() => {
                    setRandomGrant();
                  }}
                >
                  {" "}
                  Try Again!
                </Button>
              </div>
            </div>
          )}
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
