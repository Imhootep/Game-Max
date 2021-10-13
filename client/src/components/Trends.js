import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPosts } from '../actions/post.actions';
import star from '../img/star.png';
import exemple from '../img/0125.png';

const Trends = () => {
    
    return (
        <div className="trends">
            <div className="eventBlock">
                <b>Prochain évènement</b>
                <div className="eventBlockText">
                    <div>
                        Soirée d'information gamemax
                    </div>
                    <div>
                        15/10/2021
                    </div>
                </div>
                <img className="favoriteEventBanner" src={exemple} />
            </div>
            <div className="favoriteBlock">
                <b>Favoris</b>
                <div>
                    <div>
                        <a href="https://www.google.com">
                            <img className="favoriteIcon" src={star} />
                            Inscriptions pour la gamejam de Noel
                        </a>
                    </div>
                    <div>
                        <a href="https://www.google.com">
                            <img className="favoriteIcon" src={star} />
                            Les bonnes pratiques d'optimisation by Fishing Cactus
                        </a>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Trends;


