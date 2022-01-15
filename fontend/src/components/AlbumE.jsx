
import React from 'react';
import "./hoe.css";
export default function Album({e,setforceUpade,togleLogin,forceUpade}){
    console.log(e);
    return (
        <>
        <div className="albumE">
            <div className="img">
                <img className="img_G" src={e.albumimg} alt="" />
            </div>
                <div className='cont_pr'>
                    <div className="cont">
                        <h1>{e.name}</h1>
                        <p>{e.genre}</p>
                        <p>{e.year}</p>
                        <div className="img2">
                    <img  className="img_" src={e.artistimg} alt="" />
                </div>    
                    </div>   
                    <div className="cont">
                        <p>{e.artistname}</p>
                        <p>songs {e.songs.length}</p>
                    </div>   
                </div>       
               
        </div>
           
        </>
    )
}