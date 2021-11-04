import React, { useEffect, useState,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
// import star from "../img/star.png";
// import exemple from "../../img/0125.png";
import eventdefault from "../../img/eventdefault.jpg";

import { getTrends, getFavorites } from "../../actions/post.actions";
// import { NavLink } from "react-router-dom";
import Modal from "../Modals";
// import axios from "axios";
// import Cookies from "js-cookie";
import { UidContext } from '../AppContext';
import { deletePost } from "../../actions/post.actions";

const Trends = ({posts,userData,usersData}) => {

  const uid = useContext(UidContext)
  // const posts = await posts.json()
  // const posts = useSelector((state) => state.allPostsReducer);
  // const usersData = useSelector((state) => state.usersReducer);
  // const userData = useSelector((state) => state.userReducer);
  // const trendList = useSelector((state) => state.trendingReducer);
  const trendList2 = useSelector((state) => state.trendingReducer);
  const [trendPost, setTrendPost] = useState('')
  const dispatch = useDispatch();
  
  const [openModal, setOpenModal] = useState(false)
  const [incomingEvent, setIncomingEvent] = useState('')
  const [incomingEventDate, setIncomingEventDate] = useState()
  //chercher les favoris
  useEffect(() => {
    dispatch(getFavorites(uid)) 
  },[posts]) //posts et incomingEvent dans le []?

  //si on prends les props, seul userdata est un objet les deux autres sont des array   // pareil quand je fais les reducer ici wtf?  

  useEffect(() => {
    if(posts[0] !== undefined){
    for(let i = 0; i < posts.length; i++){

      if(posts[i].isEvent === true && (Date.parse(posts[i].date) < Date.now())){
          console.log(posts[i].title+" doit etre supprimé !") //plus petit = date deja passée
          dispatch(deletePost(posts[i]._id))
      }
      if(posts[i].isEvent === true && incomingEvent === ''){
        setIncomingEvent(posts[i]._id)
        setIncomingEventDate(posts[i].date)
      }else if(posts[i].isEvent === true && incomingEventDate !== undefined && incomingEventDate !== null && incomingEventDate !== null){
    
        if(Date.parse(posts[i].date) < Date.parse(incomingEventDate)){
          setIncomingEvent(posts[i]._id)
          setIncomingEventDate(posts[i].date)
        }
      }


    }
  }
  }, [posts,incomingEvent]); //[posts] ? => ajouté incomingEvent pour que la boucle se mette a jour (meme si pour moi c'est bizarre de devoir faire ça)


  // c'est quoi ça? => la fonction qui charge quand on touche le fond et qui BUG => DESACTIVED
  // useEffect(() => {
  //   if (!isEmpty(posts[0])) {
  //     const postsArr = Object.keys(posts).map((i) => posts[i]);
  //     let sortedArray = postsArr.sort((a, b) => {
  //       return b.likers.length - a.likers.length;
  //     });

  //     sortedArray.length = 5;
  //     dispatch(getTrends(sortedArray));
  //   }
  // }, [posts]);


  const showModal = (id) => {
    setOpenModal(true);
    setTrendPost(id)
  }

  const hideModal = () => {
    setOpenModal(false);
  }

  return (
    <>
      <div className="trends">
        {/* version clean mais probleme de load avec la requete qui se refait quand on scroll */}
      {posts.map((vals) => {
           return (
            incomingEvent === vals._id && incomingEventDate === vals.date ?
              <div className="eventBlock">
              <b>Prochain évènement</b>
              <div className="eventBlockText">
                <div className={"eventText" + vals.eventType}>{vals.title}</div>
                <div className="eventText">{dateParser(vals.date)}</div>
                
              </div>
              {vals.picture && (
              <img className={"favoriteEventBanner favoriteEventBanner" + vals.eventType } src={process.env.REACT_APP_API_URL+vals.picture}/>)}
              {vals.video &&(
                <iframe
                src={vals.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={vals._id}
              ></iframe>
              )}
              {console.log("vals.picture")}
              {console.log(vals.picture)}
              {console.log("vals.video")}
              {console.log(vals.video)}
              {vals.picture !== true || vals.video !== true && <img className={"favoriteEventBanner favoriteEventBanner" + vals.eventType } src={eventdefault}/>}
              <div className={"eventMess"}>{vals.message}</div>
            </div>
           : 
           ''
        )})}

          {incomingEvent === '' ?
            <div className="eventBlock">
              <b>Prochain évènement</b>
              <div className="eventBlockText">
                <div>Pas d'évènement à venir</div>
                <div>xx/xx/xxxx</div>
              </div>
            </div>
            : ''}

        <div className="favoriteBlock">
          <b>Favoris</b>
          <div className="trending-container">
            {trendList2 !== undefined && trendList2[0] !== null && trendList2 !== isEmpty && trendList2.length !== undefined ?
              trendList2.map((val) => {
                let postImagePath = process.env.REACT_APP_API_URL+val.picture;
                return (
                
                  <div key={val._id} className="favoriteContainer">
                    <div>
                      {val.picture && (
                        <img src={postImagePath} alt="post-pic"/>
                      )}
                      {val.video && (
                        <iframe
                          src={val.video}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={val._id}
                        ></iframe>
                      )}
                      {/* {isEmpty(val.picture) && isEmpty(val.video) && (
                          <img src={usersData !== isEmpty && usersData.map((user)=>{
                              if(user._id === val.posterId) {
                                  return user.picture;
                              } else return null;
                          })
                          .join("")
                        } alt="post-pic" />
                      )} */}
                    </div>
                    <div className="trend-content">
                        <p>{val.message}</p>
                        <span onClick={() => showModal(val._id)}>lire</span>
                    </div>
                  </div>
                  
                );
              }):''}
        
          
      </div>
        </div>
        <Modal showModal={openModal} hideModal={hideModal}  postId={trendPost}>
                 {trendList2 && trendList2[0] !== undefined && trendList2[0] !== null && (
                 trendList2.map((popupPost) => {
                   if(popupPost._id === trendPost){
                    return (
                      <>
                        <div className="modal-header">
                          <h2>{popupPost.title}</h2>
                        </div>
                        <div className="modal-body">
                          <div className="modal-pic">
                            <img src={process.env.REACT_APP_API_URL+popupPost.picture} />
                          </div>
                          <p>{popupPost.message}</p>
                      </div>
                      </>
                     )
                   }
                 }))
                 }
          </Modal>
      </div>
          <>
      <div>
      
          </div>
        
          </>
        
    </>
  );
};

export default Trends;
