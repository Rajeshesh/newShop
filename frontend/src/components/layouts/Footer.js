import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import {
  ArrowDropUp,
  LinkedIn,
  Facebook,
  Email,
  Twitter,
  GitHub,
} from "@mui/icons-material";
import FlexBetween, {
  FlexBetweenStart,
  FlexCenter,
} from "../styledComponents/FlexBetween";
import { Link } from "react-router-dom";

export default function Footer() {
  const theme = useTheme();
  const above400 = useMediaQuery("(min-width:400px)");
  const above600 = useMediaQuery("(min-width:600px)");
  return (
    <footer className="pt-3 pb-3">
      <Link to="/">
        <FlexCenter
          bgcolor={theme.palette.background.alt1}
          flexDirection="column"
        >
          <ArrowDropUp />
          <p>Back to top</p>
        </FlexCenter>
      </Link>
      <Box
        display="flex"
        justifyContent={above400 ? "space-between" : "start"}
        alignItems={above400 ? "flex-start" : "center"}
        flexDirection={above400 ? "row" : "column"}
        bgcolor={theme.palette.background.alt}
        p="5px"
        sx={{
          "h4 , p": {
            textAlign: "center",
          },
        }}
      >
        <div className="m-1">
          <h4>Get to Know Us</h4>
          <p>
            <a href="mailto:cisr6146@gmail.com">Contact Us</a>
          </p>
          <p>
            <Link to="/">Shop.in</Link>
          </p>
          <p>
            <Link to="careers">Careers</Link>
          </p>
          <p>
            <Link to="about">About Us</Link>
          </p>
        </div>
        {above600 && (
          <div className="m-1">
            <p>
              <a href="mailto:cisr6146@gmail.com">
                <Email />
              </a>
            </p>
            <p>
              <a href="https://www.linkedin.com/in/rajesh-p-09b86724a">
                <LinkedIn />
              </a>
            </p>
            <p>
              <a href="https://github.com/Rajeshesh">
                <GitHub />
              </a>
            </p>
            <p>
              <a>
                <Twitter />
              </a>
            </p>
            <p>
              <a>
                <Facebook />
              </a>
            </p>
          </div>
        )}

        <div className="m-1">
          <h4>Stay with Us</h4>
          <p>
            <Link to="myprofile">Your Account</Link>
          </p>
          <p>
            <Link to="orders">Your Orders</Link>
          </p>
          <p>
            <Link to="/">Your Recently Viewed Items</Link>
          </p>
        </div>
        <div className="m-1">
          <h4>Let Us Help you</h4>
          <p>
            <Link to="/customer/service">Customer Service</Link>
          </p>
          <p>
            <Link to="/return/centre">Return Centre</Link>
          </p>
          <p>
            <Link to="/help">Help</Link>
          </p>
        </div>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        bgcolor={theme.palette.background.alt1}
      >
        {!above600 && (
          <div className="mt-1">
            <a className="ml-1" href="mailto:cisr6146@gmail.com">
              <Email />
            </a>
            <a
              className="ml-1"
              href="https://www.linkedin.com/in/rajesh-p-09b86724a"
            >
              <LinkedIn />
            </a>
            <a className="ml-1" href="https://github.com/Rajeshesh">
              <GitHub />
            </a>
            <a className="ml-1">
              <Twitter />
            </a>
            <a className="ml-1">
              <Facebook />
            </a>
          </div>
        )}
        <FlexCenter m="7px" gap="15px">
          <Button sx={{ bgcolor: theme.palette.bg3 }} variant="contained">
            Switch Account
          </Button>
          <Button variant="contained" sx={{ bgcolor: theme.palette.bg5 }}>
            Sign Out
          </Button>
        </FlexCenter>
        <FlexCenter gap="20px">
          <div>Conditions of Use</div>
          <div>Privacy Notes</div>
          <div>Interest-Based Ads</div>
        </FlexCenter>
        <p className="mt-1">
          <p>
            Copyright &copy; Developed Shop - 2023-2024, All Rights Reserved
          </p>
        </p>
      </Box>
    </footer>
  );
}
