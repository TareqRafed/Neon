import React, { useState, useEffect } from 'react';
import '../scss/upload.scss';
import TextInput from '../../text_inputs/js/textInput'
import { useHistory } from "react-router-dom";
import axios from 'axios';

import { connect } from 'react-redux';

const Upload = (props) => {

    const types = ['image/png', 'image/jpeg', 'image/jpg',] // allowed types
    const [artwork, setArtwork] = useState(null) // holdes artwork aka image
    const [Discription, setDiscription] = useState('')

    const postUpload = (e)=> {
        let img = artwork.file;
        let fd = new FormData();

        fd.append('image', img);
        fd.append('discription', Discription)
        
        axios.post('/upload/', fd , {
            headers: {
                'Authorization' : `Token ${props.token}`
            }
        })
        
        .then(res => {
            if(res.status == 201){
                alert("Uploaded successfuly")
            } else {
                alert("fail to upload, check internet connection");
            }

        })
        
        .catch(err => {
            alert("upload failed, couldn't connect to server");
            console.log(err);
        });
    }

   
    const handleImages = (e) => {
        let err = '';
        if(e.target.files > 1){
            err += 'One image per upload only\n';
        } else if (types.every(type => e.target.files[0].type !== type)) {
            err += e.target.files[0].type+' is not a supported format\n';
        }

        if(err !== ''){
            setArtwork(null)
            alert(err);
        } else {
          setArtwork({
              file:e.target.files[0],
              url: URL.createObjectURL(e.target.files[0]),
          })
        }

    }

    


    
    // to kick user if not authenticated
    const history = useHistory();
    useEffect(() => {
     if(!props.isAuthenticated) history.push('/')
    }, [])
     

return (
    
    <div id="upload">
        <input id="upload-image" type="file" onChange={(e)=> handleImages(e)}  hidden />
        <label className="upload-image"  for="upload-image" >Pick your hero!</label>
        {artwork != null && <img id="uploaded-image" src={artwork.url} />}
        <TextInput name="Discription" value={Discription} setValue={setDiscription} isPassword={false} />
        {artwork != null && <button className="btn" onClick={(e)=> postUpload(e)}>Upload</button>}
    </div>
);

}


const mapStateToProps = state => {
    return {
        token: state.token
    }
}



export default connect(mapStateToProps)(Upload);