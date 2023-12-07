import { InputAdornment, TextField } from '@mui/material';
import '../TCG-Mart-CSS-Pages/ListCardPage.css';
import React, { useEffect, useRef, useState } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';


const ImageUploader = ({ cardImg, updateCardImg }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [uploadedImgName, setUploadedImgName] = useState('');

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: 'damt8ae1j',
        uploadPreset: 'u3qqa4tx'
      },
      function (error, result) {
        if (!error && result && result.event === 'success') {
          console.log(result.info.secure_url);

          // Call the callback function to update cardImg in App.js
          updateCardImg(result.info.secure_url);
        }
        if (!error && result && result.event === 'queues-end') {
          const fileName = result.info.files[0].name;
          console.log('Uploaded File Name:', fileName);
          setUploadedImgName(fileName);
        }
      }
    );
  }, [updateCardImg]);

  return (
    <div className='list-fields-container'>
      {/* <p className='attributeNames'></p> */}
      <TextField 
        disabled 
        size="small" 
        label={cardImg ? uploadedImgName : "Upload Image"}
        InputProps={{ endAdornment: ( 
        <InputAdornment 
          position="end" 
          onClick={() => widgetRef.current.open()} 
          style={{ cursor: 'pointer' }}> 
            <FileUploadOutlinedIcon/>
        </InputAdornment>),}}
      />

    </div>
  );
};

export default ImageUploader;