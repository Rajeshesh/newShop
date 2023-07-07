import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { Stack } from "@mui/system";
import { Avatar, Button, useTheme } from "@mui/material";
import { LocalMallOutlined, LockResetOutlined } from "@mui/icons-material";
export default function Profile() {
  const { user } = useSelector((state) => state.authState);
  const { palette } = useTheme();

  return user ? (
    <Fragment>
      <MetaData title={"My Profile"} />
      <div className="mt-5 profile">
        <div className="profile__image">
          <Avatar
            alt="user image"
            src={user.avatar ?? "./images/default_avatar.png"}
            sx={{ width: 240, height: 240 }}
          />
        </div>

        <div className="mt-5">
          <h4>Full Name</h4>
          <p>{user.name}</p>

          <h4>Email Address</h4>
          <p>{user.email}</p>

          <h4>Joined On</h4>
          <p>{String(user.createdAt).substring(0, 10)}</p>

          <Stack
            direction="row"
            justifyContent="space-evenly"
            className={`mb-2`}
          >
            <Link to="/myprofile/update" className="mt-8 ">
              <Button variant="contained" sx={{ bgcolor: palette.bg4 }}>
                Edit Profile
              </Button>
            </Link>

            <Link to="/orders" className="mt-8">
              <Button
                variant="contained"
                sx={{ bgcolor: palette.bg4 }}
                endIcon={<LocalMallOutlined />}
              >
                My Orders
              </Button>
            </Link>
          </Stack>
          <Link to="/myprofile/update/password" className="mt-8">
            <Button
              variant="outlined"
              sx={{ bgcolor: palette.bg2, color: palette.bg1 }}
              startIcon={<LockResetOutlined />}
            >
              Change Password
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  ) : null;
}
