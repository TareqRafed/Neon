import React, {useEffect, useRef} from 'react';
import { string, number, func } from 'prop-types';
import '../scss/imageCard.scss';
import { useProgressiveImage } from './progressiveImage';
import loading from '../../../assets/images/loading.png';


// TODO : implement image viewer on click

const ImageCard = ({onClick, user, src, index, type,}) => {

    const loaded = useProgressiveImage(src)
    
    let imgDimenstion = type == 'tall' ? 'card-tall' : 'card-wide'

    // give a random border color class,  // cancelled feature
  /*  let borderColors = ['pink','blue','green'];
    let border = borderColors[Math.floor(Math.random()*3)];
    */ 

    return (
        <div onClick={onClick} className={`imageCard ${imgDimenstion} greenBorder`} style={{backgroundImage: `url(${loaded || loading})`}} >
            <p className="text-white username-label">{user}</p>
            </div>
        
        
    )
}

ImageCard.propTypes = {
    onClick: func.isRequired,
    user : string.isRequired,
    src : string.isRequired,
    index : number.isRequired,
    type : string
}


export default ImageCard;