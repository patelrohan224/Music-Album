import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AlbumE from "./AlbumE";
import "./hoe.css";
export default function Album({ togleLogin, addAlbum, forceUpade }) {
  const [albumdata, setalbumdata] = useState([]);
  const [load1, setload1] = useState(false);
  const [error1, seterror1] = useState(false);
  const [totalPage, setTotalpage] = useState(0);
  const [forceUpade2, setforceUpade2] = useState(0);
  const [page, serPage] = useState(1);
  const [limit, serLimit] = useState(5);
  const [year, setyear] = useState(false);
  const [genre,setgenre]=useState(false);
  useEffect(() => {
    async function getalbum() {
      setload1(true);
      try {
        // let contest=await axios(`http://localhost:2345/admin/contestAll?page=${page}&limit=${limit}&deadline=${deadline?"1":"-1"}`)
        let album = await axios.get(
          `http://localhost:2345/music/allAllbum?page=${page}&limit=${limit}&year=${
            year ? "-1" : "1"
          }&genre=${
            genre  ? "-1" : "1"
          }`
        );
        if (album !== undefined) {
          // console.log('album:', album)
          setTotalpage(album.data.totalPages);
          setalbumdata(album.data.Albmus);
          setload1(false);
          seterror1(false);
        }
      } catch (error) {
        console.log("error:", error);
        seterror1(true);
        setload1(false);
      }
    }
    getalbum();
  }, [page, year, forceUpade2, addAlbum, forceUpade, genre]);
  return (
    <>
      <div className="contest">
        {albumdata !== undefined ? (
          <div>
            &nbsp;
            <Button
              onClick={() => {
                setyear(!year);
              }}
              style={{ margin: "1% 0%" }}
              variant="outlined"
            >
              Sort year
            </Button>
            <Button
              onClick={() => {
                setgenre(!genre);
              }}
              style={{ margin: "1% 0%" }}
              variant="outlined"
            >
              Sort Genre
            </Button>
          </div>
        ) : (
          ""
        )}
        {load1 ? (
          <p>Loading...</p>
        ) : error1 ? (
          <p>Something went wrong</p>
        ) : (
          <div>
            {albumdata !== undefined
              ? albumdata?.map((e) => (
                  <AlbumE
                    e={e}
                    togleLogin={togleLogin}
                    key={e._id}
                    setforceUpade2={setforceUpade2}
                    forceUpade2={forceUpade2}
                  />
                ))
              : "No Album is available"}
          </div>
        )}

        {albumdata !== undefined ? (
          <div>
            <Button
              disabled={page == 0 || page == 1}
              onClick={() => {
                serPage(page - 1);
              }}
              variant="text"
            >
              PREV
            </Button>{" "}
            &nbsp;
            <Button
              disabled={page === totalPage}
              onClick={() => {
                serPage(page + 1);
              }}
              variant="text"
            >
              NEXT
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
