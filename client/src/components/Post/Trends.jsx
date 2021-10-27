import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
// import star from "../img/star.png";
import exemple from "../../img/0125.png";
import { getTrends } from "../../actions/post.actions";
// import { NavLink } from "react-router-dom";
import Modal from "../Modals";

const Trends = ({posts,userData,usersData}) => {
  // const posts = useSelector((state) => state.allPostsReducer);
  // const usersData = useSelector((state) => state.usersReducer);
  // const userData = useSelector((state) => state.userReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const [trendPost, setTrendPost] = useState('')
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false)
  const [incomingEvent, setIncomingEvent] = useState('')
  const [incomingEventDate, setIncomingEventDate] = useState()
  // const [passage, setPassage] = useState(false)

  //si on prends les props, seul userdata est un objet les deux autres sont des array
  // pareil quand je fais les reducer ici wtf?  

  //bonne version mais qui load pas assez vite donc le tableau est vide
  useEffect(() => {
    // console.log("les posts de ses morts:")
    // console.log(posts[0])
    // console.log(posts[0].createdAt.getTime())
    if(posts[0] !== undefined){
    for(let i = 0; i < posts.length; i++){
      if(posts[i].isEvent === true && incomingEvent === ''){
        setIncomingEvent(posts[i]._id)
        setIncomingEventDate(posts[i].date)
      }else if(posts[i].isEvent === true && incomingEventDate !== undefined && incomingEventDate !== null && incomingEventDate !== null){
        if(Date.parse(posts[i].date) < Date.parse(incomingEventDate)){
          // console.log("on va jamais passer ici je parie sans le .getTime() qui bug de ses morts???")
          setIncomingEvent(posts[i]._id)
          setIncomingEventDate(posts[i].date)
        }
      }
    }
  }
  }, [posts]);

  
  // const handlePassage = () => {
  //   setPassage(true);
  // }

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });

      sortedArray.length = 3;
      dispatch(getTrends(sortedArray));
    }
  }, [posts]);


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
      {posts.map((posts) => {
           return (
            incomingEvent === posts._id && incomingEventDate === posts.date ?
              <div className="eventBlock">
              <b>Prochain évènement</b>
              {/* {console.log("incomingEvent")}
              {console.log(incomingEvent)}
              {console.log("incomingEventDate")}
              {console.log(incomingEventDate)}
              {console.log("posts._id")}
              {console.log(posts._id)}
              {console.log("posts.createdAt")}
              {console.log(posts.createdAt)}
              {console.log("passage")}
              {console.log(passage)}
              {handlePassage} */}
              <div className="eventBlockText">
                <div>{posts.title}</div>
                <div>{posts.date}</div>
              </div>
              <img className="favoriteEventBanner" src={exemple}/>
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
        
        
            {trendList.length &&
              trendList.map((post) => {
                let postImagePath = process.env.REACT_APP_API_URL+post.picture;
                return (
                
                  <div key={post._id} className="favoriteContainer">
                    <div>
                      {post.picture && (
                        <img src={postImagePath} alt="post-pic"/>
                      )}
                      {post.video && (
                        <iframe
                          src={post.video}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={post._id}
                        ></iframe>
                      )}
                      {isEmpty(post.picture) && isEmpty(post.video) && (
                          <img src={usersData !== isEmpty && usersData.map((user)=>{
                              if(user._id === post.posterId) {
                                  return user.picture;
                              } else return null;
                          })
                          .join("")
                        } alt="post-pic" />
                      )}
                    </div>
                    <div className="trend-content">
                        <p>{post.message}</p>
                        <span onClick={() => showModal(post._id)}>lire</span>
                    </div>
                  </div>
                  
                );
              })}
        
          
      </div>
        </div>
        <Modal showModal={openModal} hideModal={hideModal}  postId={trendPost}>
                {/* {console.log("posts dans modal:")}
                {console.log(posts)} */}
                
                  {/* {trendPost} */}
                  {/* {console.log("trendList")}
                  {console.log(trendList)} */}
                 {trendList && trendList[0] !== undefined && (
                 trendList.map((popupPost) => {
                   if(popupPost._id === trendPost){
                    return (
                      <>
                        <div className="modal-header">
                          <h2>Titre</h2>
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
