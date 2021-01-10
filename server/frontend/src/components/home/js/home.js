import React, { useState } from 'react';
import ImageCard from '../../image_card/js/imageCard';
import '../scss/home.scss';
import * as ACTIONS from './actions';
import { bool } from 'prop-types';
import GetImages from './fetchAPI';
import ImageViewer from '../../image_viewer/js/imageViewer';


const Home = () => {

    let [imgData, bottomBoundaryRef] = GetImages() // custom hook, returns images from api, and a ref to determine last element in order to fetch the next page

    const [imageViewer, setImageViewr] = useState({'src': "", "discription": "", "user": ""});
    const [openImageViewer, setOpenImageViewr] = useState(false);
    

    const viewImage = (image) => {
        console.log("clicked")
 
        setImageViewr({
            'src': image.image,
            'discription': image.discription,
            'user': image.user,
        })
        setOpenImageViewr(true);
    }

    return (
        <>
        {openImageViewer && <ImageViewer src={imageViewer.src} discription={imageViewer.discription} user={imageViewer.user} exit={()=> setOpenImageViewr(false)} />}
        <div id="grid-container">
            {imgData.images.map((value, index) =>
                <ImageCard onClick={()=>viewImage(value)} src={value.image} type={value.ratio} user={value.user} key={"image" + index} tag="test"  />
            )}
            {imgData.fetching && (
                <div >
                    <p className="text-white">Getting images</p>
                </div>
            )}
        
        <div id='page-bottom-boundary' ref={bottomBoundaryRef}></div>
        </div>
        
        </>
    )
}



export default Home;