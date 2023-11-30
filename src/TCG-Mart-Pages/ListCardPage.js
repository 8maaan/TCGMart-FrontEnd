import { Button, TextField } from '@mui/material';
import SecondNavi from '../Navigations/secondNavi';
import '../TCG-Mart-CSS-Pages/ListCardPage.css';
import ImageUploader from '../Cloudinary/ImageUploader';
import { useState } from 'react';

export default function ListCardPage() {
    const [card, setCard]= useState({
        cardTitle: "",
        cardImg: "",
        cardCondition: "",
        cardNumRarity: "",
        cardTypeHPStage: "",
        cardPrice: "",
        cardDescription: "",
        uid: "1"
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCard((prevCard) => ({
          ...prevCard,
          [name]: value,
        }));
    };

    const updateCardImg = (imgUrl) => {
        setCard((prevCard) => ({
          ...prevCard,
          cardImg: imgUrl
        }));
    };

    const FormField = ({ fieldName, label }) => (
        <div className="list-fields-container">
          <p>{fieldName}</p>
          <TextField size="small" label={label}/>
        </div>
    );
    
    return (
        <div>
            <SecondNavi />           
            <div className="list-container">
                <br></br>
                <p>Listing Form</p>
                <br></br>
                <FormField fieldName="Card Name" />
                {/* to be fixed */}
                {/* <ImageUploader updateCardImg={updateCardImg} /> */}
                <FormField fieldName="Condition" />
                <FormField fieldName="Card Number/Rarity" />
                <FormField fieldName="Card Type/HP/Stage" />
                <FormField fieldName="Price" />
                <div className="list-fields-container">
                    <p>Description</p>
                    <TextField  
                        id="outlined-multiline-static"
                        multiline
                        rows={3}
                        defaultValue="" />
                </div>
                
                <Button variant="contained" style={{marginTop:'1.5%', marginBottom:'1.5%'}}>List</Button>
            </div>
        </div>
    );
}
