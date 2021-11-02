import React, { useEffect, useState,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
// import star from "../img/star.png";
// import exemple from "../../img/0125.png";
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
    // console.log("trandinglist apres:")
    // console.log(trendList2)

  },[posts]) //posts et incomingEvent dans le []?

// pour supprimer les events passés
  useEffect(() => {
    console.log("ce qu'on a au premier passage: ")
    console.log(posts)
    // console.log("trandinglist apres:")
    // console.log(trendList2)

  },[])


  // const [passage, setPassage] = useState(false)

  //si on prends les props, seul userdata est un objet les deux autres sont des array
  // pareil quand je fais les reducer ici wtf?  


  //pour afficher le derneir event
  //bonne version mais qui load pas assez vite donc le tableau est vide
  //LE PROB: comme c'est dans une boucle, le state avant de rentrer dans le use effect est a '' et ne se met pas a jour tant qu'on ne sort pas du useffect
  useEffect(() => {
    // console.log("dernier event 1:")
    // console.log(incomingEvent)
    // console.log(posts[0].createdAt.getTime())
    if(posts[0] !== undefined){
      console.log("dernier event 2:")
      console.log(incomingEvent)
    for(let i = 0; i < posts.length; i++){
      // console.log("la date de maintenant et sa version parsée: ")

      // console.log(Date.now()) //DEJA PARSEE
      // console.log(Date.parse(Date.now()))

      // console.log("la date du post actuel dans la boucle:")
      // console.log(posts[i].date)
      // console.log(Date.parse(posts[i].date))

      if(posts[i].isEvent === true && (Date.parse(posts[i].date) < Date.now())){
          console.log(posts[i].title+" doit etre supprimé !") //plus petit = date deja passée
          // dispatch(deletePost(posts[i]._id))
      }
      if(posts[i].isEvent === true && incomingEvent === ''){
        // alert(posts[i]._id)
        setIncomingEvent(posts[i]._id)
        setIncomingEventDate(posts[i].date)
        // changeDate(posts[i]._id,posts[i].date)
        // console.log("dernier event 3:")
        // console.log(incomingEvent)
      }else if(posts[i].isEvent === true && incomingEventDate !== undefined && incomingEventDate !== null && incomingEventDate !== null){
        // console.log("dernier event 4:")
        // console.log(incomingEvent)
        if(Date.parse(posts[i].date) > Date.parse(incomingEventDate)){
          // console.log("on va jamais passer ici je parie sans le .getTime() qui bug de ses morts???")
          setIncomingEvent(posts[i]._id)
        setIncomingEventDate(posts[i].date)
        // changeDate(posts[i]._id,posts[i].date)
          // console.log("dernier event 5:")
          // console.log(incomingEvent)
        }
      }


    }
  }
  // console.log("dernier event 6:")
  // console.log(incomingEvent)
  // dispatch(getTrends(1,1000))
  }, [posts,incomingEvent]); //[posts] ? => ajouté incomingEvent pour que la boucle se mette a jour (meme si pour moi c'est bizarre de devoir faire ça)

  // const changeDate = (id,date) =>{
  //   setIncomingEvent(id)
  //   setIncomingEventDate(date)
  // }
  
  // const handlePassage = () => {
  //   setPassage(true);
  // }

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
    // alert(id)
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
        {/* {console.log("trendlist2 avant d'etre use: ")}
        {console.log(trendList2)} */}
        {/* {console.log("trendList2.length:::"+trendList2.length)}
        {console.log("trendList2:::")}
        {console.log(trendList2)} */}
        
            {trendList2 !== undefined && trendList2[0] !== null && trendList2 !== isEmpty && trendList2.length !== undefined ?
              trendList2.map((val) => {
                // console.log("val:::")
                // console.log(val)
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
                      {isEmpty(val.picture) && isEmpty(val.video) && (
                          <img src={usersData !== isEmpty && usersData.map((user)=>{
                              if(user._id === val.posterId) {
                                  return user.picture;
                              } else return null;
                          })
                          .join("")
                        } alt="post-pic" />
                      )}
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
                {/* {console.log("posts dans modal:")}
                {console.log(posts)} */}
                
                  {/* {trendPost} */}
                  {/* {console.log("trendList")}
                  {console.log(trendList)} */}
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
