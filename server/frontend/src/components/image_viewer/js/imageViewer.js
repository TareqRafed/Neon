import React from 'react';
import ReactDOM from 'react-dom';
import { string, func } from 'prop-types';
import '../scss/imageViewer.scss';
import exitIcon from '../../../assets/images/icons/exit.png';

// TODO : implement image viewer on click

const ImageViewer = ({ src, discription, user, exit }) => {



    return (
        ReactDOM.createPortal(
            <div id="image-viewer">
                <img onClick={exit} className="exit" src={exitIcon} />
                <img className="image" alt={discription} src={src} />
                <div className="text-white">
                    <p>
                        By: {user}
                    </p>
                    <p>
                        {discription}
                    </p>
                </div>
            </div>,
            document.getElementById('root')
        )
    )
}

ImageViewer.propTypes = {
    src: string.isRequired,
    discription: string,
    user: string.isRequired,
    exit: func.isRequired,
}


export default ImageViewer;