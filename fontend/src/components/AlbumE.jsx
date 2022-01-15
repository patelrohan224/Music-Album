import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./hoe.css";
export default function Album({ e, setforceUpade2, togleLogin, forceUpade2 }) {
  const [show, setshow] = useState(false);
  const { token } = useSelector((state) => state.Auth);
  const [id, setid] = useState("");
  const [error, seterror] = useState(false);
  const [load, setLoad] = useState(false);
  const [name, setname] = useState("");
  const [editflag, seteditflag] = useState(false);
  async function deleteA(id) {
    setLoad(true);
    try {
      let album = await axios.delete(
        `http://localhost:2345/music/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setLoad(false);
      setforceUpade2(forceUpade2 + 1);
      seterror(false);
    } catch (error) {
      console.log("error:", error);
      setLoad(false);
      seterror(true);
    }
  }
  async function editA(id) {
    setLoad(true);
    try {
      let album = await axios.patch(
        `http://localhost:2345/music/editAlbum/${id}`,
        {
          name: `${name}`,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setname("");
      setLoad(false);
      setforceUpade2(forceUpade2 + 1);
      seterror(false);
    } catch (error) {
      console.log("error:", error);
      setLoad(false);
      seterror(true);
    }
  }
  useEffect(() => {
    async function verify() {
      try {
        // let contest=await axios(`http://localhost:2345/admin/contestAll?page=${page}&limit=${limit}&deadline=${deadline?"1":"-1"}`)
        let album = await axios.get(`http://localhost:2345/music/getId`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (album !== undefined) {
          // console.log("album:", album.data.user._id);
          setid(album.data.user._id);
        }
      } catch (error) {
        console.log("error:", error);
      }
    }

    if (togleLogin == false) {
      verify();
    }
  }, [show]);
  return load ? (
    <>
      <p>Loading...</p>
    </>
  ) : error ? (
    <>
      <p>Something went wrong</p>
    </>
  ) : (
    <>
      <div className="alpar">
        <div className="albumE">
          <div className="img">
            <img
              className="img_G"
              onClick={() => {
                setshow(!show);
              }}
              src={e.albumimg}
              alt=""
            />
          </div>
          <div className="cont_pr">
            <div className="cont">
              {!editflag ? (
                <h1
                  onClick={() => {
                    setshow(!show);
                  }}
                >
                  {e.name}
                </h1>
              ) : (
                <>
                  <TextField
                    label={e.name}
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    id="outlined-basic"
                    variant="outlined"
                    className="name_inpt"
                    size="small"
                  />
                  <Button
                    disabled={!name}
                    onClick={() => {
                      editA(e._id);
                    }}
                  >
                    Add
                  </Button>
                </>
              )}
              <p
                onClick={() => {
                  setshow(!show);
                }}
              >
                {e.genre}
              </p>
              <p
                onClick={() => {
                  setshow(!show);
                }}
              >
                {e.year}
              </p>
              <div className="img2">
                <img
                  onClick={() => {
                    setshow(!show);
                  }}
                  className="img_"
                  src={e.artistimg}
                  alt=""
                />
              </div>
            </div>
            <div className="cont">
              <p
                onClick={() => {
                  setshow(!show);
                }}
              >
                {e.artistname}
              </p>
              <p
                onClick={() => {
                  setshow(!show);
                }}
              >
                songs {e.songs.length}
              </p>
              {id == e.artist ? (
                <>
                  <Button
                    onClick={() => {
                      seteditflag(!editflag);
                    }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => deleteA(e._id)}>Delete</Button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div>
          {show ? (
            <>
              {e.songs?.map((e, i) => (
            <div key={i} className="songss">
                <p>{i+1} {e[0]}</p>
                <p>{e[1]}</p>
            </div>
                ))}
                </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
