import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AddToken, LogOut } from "../redux/actions";
import { Button } from "@mui/material";
import "./hoe.css";
import Album from "./Album";
import Addalbum from "./Addalbum";
import {TextField} from "@mui/material";
export default function Home() {
  const location = useLocation();
  let token = location.search;
  let name = token.split("rohanEmail");
  token = name[0].substring(1);
  let dispatch = useDispatch();
  const [togleLogin, setTogleLogin] = useState(true);
  const [hover, sethover] = useState(false);
  const [addalbum,setaddalbum]=useState(false);
  const [forceUpade,setforceUpade]=useState(0)
  const islogin = useSelector((state) => state.Auth.AuthReducer);
  const google_auth = () => {
    window.location.href = " http://localhost:2345/auth/google";
  };
  const logout = () => {
    dispatch(LogOut());
    token = "";

    window.location.href = "http://localhost:3000/";
  };

  useEffect(() => {
    if(token!==""){
        dispatch(AddToken({token}))
        setTogleLogin(false)
    }
},[togleLogin])   
  return (
    <>
      <div className="navbar">
        {/* <img
          style={{ height: "40px", width: "100px", float: "left" }}
          src="https://cdn-icons-png.flaticon.com/512/167/167708.png"
          alt=""
        /> */}
        {/* <TextField
              // error={aimg}
              // label={aimg ? "error" : "ArtistImg"}
              // helperText={aimg ? "ArtistImg is required" : ""}
              // value={astring}
              onChange={(e) => {
                // setastring(e.target.value);
              }}
              id="outlined-basic"
              variant="outlined"
              className="name_inpt"
              size="small"
            /> */}
        {togleLogin ? (
          <Button
            onClick={() => {
              google_auth();
            }}
            variant="text"
            style={{ float: "right", color: "rgb(81 142 248)" }}
          >
            Signup/Login
          </Button>
        ) : (
          ""
        )}
        {togleLogin ? (
          <img
            onClick={() => {
              google_auth();
            }}
            style={{
              height: "40px",
              width: "40px",
              float: "right",
              cursor: "pointer",
            }}
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt=""
          />
        ) : (
          <Button
            onMouseEnter={() => {
              sethover(true);
            }}
            onMouseLeave={() => {
              sethover(false);
            }}
            onClick={logout}
            style={{ float: "right" }}
            variant="contained"
          >
            {!hover ? name[1] : "Log out"}
          </Button>
        )}
        {!togleLogin ? (
          <div>
            {" "}
            <Button
              onClick={() => {
                if (!togleLogin) {
                  setaddalbum(!addalbum);
                //   setcontestAddflag(false);
                }
              }}
              style={{ float: "right", margin: "0% 1%" }}
              variant={!togleLogin ? "contained" : "outlined"}
            >
              Add Album
            </Button>
          </div>
        ) : (
          ""
        )} 
      </div>
      {addalbum?<Addalbum 
        forceUpade={forceUpade}  setforceUpade={setforceUpade}
        setaddalbum={setaddalbum} addalbum={addalbum} />:""}
      {
        <div style={addalbum?{opacity:".3"}:{opacity:"1"}}>
          <Album togleLogin={togleLogin} forceUpade={forceUpade} />
        </div>
      }
    </>
  );
}


