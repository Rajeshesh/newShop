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
  FlexCenter,
} from "../styledComponents/FlexBetween";
import { Link } from "react-router-dom";

export default function Footer() {
  const theme = useTheme();
  const below500 = useMediaQuery("(min-width:400px)");
  return (
    <footer className="pt-3 pb-3">
      <FlexCenter
        bgcolor={theme.palette.background.alt1}
        flexDirection="column"
      >
        <ArrowDropUp />
        <p>Back to top</p>
      </FlexCenter>
      <FlexBetween
        flexDirection={below500 ? "row" : "column"}
        bgcolor={theme.palette.background.alt}
      >
        <div>
          <ul>
            <li style={{ fontWeight: "bold" }}>Get to Know Us</li>
            <li>
              <Link to="contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/">Shop.in</Link>
            </li>
            <li>
              <Link to="careers">Careers</Link>
            </li>
            <li>
              <Link to="about">About Us</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <a href="mailto:rp4549993@gmail.com">
                <Email />
              </a>
            </li>
            <li>
              <a>
                <LinkedIn />
              </a>
            </li>
            <li>
              <a>
                <GitHub />
              </a>
            </li>
            <li>
              <a>
                <Twitter />
              </a>
            </li>
            <li>
              <a>
                <Facebook />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li style={{ fontWeight: "bold" }}>Stay with Us</li>
            <li>
              <Link to="myprofile">Your Account</Link>
            </li>
            <li>
              <Link to="orders">Your Orders</Link>
            </li>
            <li>
              <Link to="/">Your Recently Viewed Items</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li style={{ fontWeight: "bold" }}>Let Us Help you</li>
            <li>
              <Link to="/customer/service">Customer Service</Link>
            </li>
            <li>
              <Link to="/return/centre">Return Centre</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </div>
      </FlexBetween>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        bgcolor={theme.palette.background.alt1}
      >
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
