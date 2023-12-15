import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../TCG-Mart-CSS-Pages/ListCardPage.css';
import { getCardByCardID, getSellerDetails, updateCard } from "../services/apiServices";
import SecondNavi from "../Navigations/secondNavi";
import { Alert, Autocomplete, Button, InputAdornment, Snackbar, TextField } from '@mui/material';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import ImageUploader from '../Cloudinary/ImageUploader';
import { insertCard } from '../services/apiServices';
import {ConfirmationDialog} from '../Dialogues/Dialogues';
import LoadingComponent from '../Loading/loadingComponent';

const CardTextField = ({ label, name, value, onChange, multiline, rows, startAdornment, helperText }) => {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleTextFieldClick = () => {
      setIsClicked(true);
    };
  
    const handleTextFieldBlur = () => {
      setIsClicked(false);
    };
  
    return (
      <div className="list-fields-container">
        <TextField
          size="small"
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          multiline={multiline}
          rows={rows}
          helperText={isClicked ? helperText : ''}
          onClick={handleTextFieldClick}
          onBlur={handleTextFieldBlur}
          InputProps={{ startAdornment: startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment> }}
        />
      </div>
    );
  };

export default function EditCardPage(){
    const { cardId } = useParams();
    const [card, setCard] = useState({});
    const [seller, setSeller] = useState({});

    useEffect(() => {
        const getCardInfo = async () => {
          try {
            const result = await getCardByCardID(cardId);
            console.log(result);
            setCard(result);
          } catch (error) {
            console.log(error);
          }
        };
    
        getCardInfo();
      }, [cardId]);
    
      useEffect(() => {
        const getUserInfo = async () => {
          try {
            const result = await getSellerDetails(card.uid);
            setSeller(result);
            // console.log(result);
          } catch (error) {
            console.log(error);
          }
        };
    
        // Check if card.uid is present
        if (card.uid) {
          getUserInfo();
        }
      }, [card.uid]);
    
      const updateCardImg = (imgUrl) => {
        setCard((prevCard) => ({
          ...prevCard,
          cardImg: imgUrl
        }));
      };
    
      const resetCardImg = () => {
        setCard((prevCard) => ({
          ...prevCard,
          cardImg: ""
        }));
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCard({
          ...card,
          [name]: value,
        });
      };
    
      const isCardAttributesEmpty = () => {
        for (const key in card) {
          if (card.hasOwnProperty(key) && card[key] === "") {
            return true; // At least one field is empty
          }
        }
        return false; // All fields are filled
      };
    
      const validatePrice = (input) =>{
        return /^\d+$/.test(input);
      }
    
      const resetCardValues = () => {
        setCard({
          cardTitle: "",
          cardImg: "",
          cardCondition: "",
          cardNumRarity: "",
          cardTypeHPStage: "",
          cardPrice: "",
          cardDescription: "",
          uid: localStorage.getItem("uid")
        });
        resetCardImg();
      };
    
      const [invalidField, setInvalidField] = useState(false);
      const handleCloseinvalidField = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setInvalidField(false);
      };
    
      const [blankFields, setBlankFields] = useState(false);
      const handleCloseBlankFields = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setBlankFields(false);
      };
    
      const [snackbarSucess, setSnackbarSuccess] = useState(false)
      const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarSuccess(false);
      };
      const[snackbarInvalid, setSnackbarInvalid] = useState(false);
      const handleCloseInvalid = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarInvalid(false);
      };
    
      const [openDialogue, setOpenDialogue] = useState(false);
      const [confirmationStatus, setConfirmationStatus] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const handleOpenDialog = () => {
        setOpenDialogue(true);
      };
      const handleConfirmationDialogClose = (confirmed) => {
        setOpenDialogue(false);
        setConfirmationStatus(confirmed);
        console.log(confirmationStatus);
    
        if (confirmed) {
          handleSubmit();
        }
      };
    
      const handleSubmit = async () => {
        if(isCardAttributesEmpty()){
          setBlankFields(true);
          return;
        }
    
        if(!validatePrice(card.cardPrice)){
          setInvalidField(true);
          return;
        }
        try{
          setIsLoading(true);
          const result = await updateCard(card.cardid, card);
          console.log(result);
          if (result.success) {
            resetCardValues();
            setTimeout(() => {
              setSnackbarSuccess(true);
          }, 2000);
          } else {
            setSnackbarInvalid(true);
          }
        }catch(error){
          alert('Check Eclipse.');
        }   
      };
    
      const stopLoading = () => {
        setIsLoading(false);
      };
    
      const cardConditionOptions = ['Near Mint', 'Lightly Played', 'Moderately Played', 'Heavily Played', 'Damaged'];
    
      return (
        <div className='list-page-main'>
          <SecondNavi />
          <div className="list-container">
            {/* Section 1 */}
            <div className="section">
              <LooksOneOutlinedIcon color="primary" fontSize="large" />
              <p className=''>Basic Card Details</p>
            </div>
            {/* Card Name */}
            <CardTextField
              label=""
              name="cardTitle"
              value={card.cardTitle}
              onChange={handleInputChange}
              helperText="E.g Shiny Charizard"
            />
            {/* Card Condition */}
            <div className="autocomplete-field-container">
              <Autocomplete
                size='small'
                disablePortal
                id="combo-box-demo"
                options={cardConditionOptions}
                value={card.cardCondition}
                onChange={(event, newValue) => { handleInputChange({ target: { name: 'cardCondition', value: newValue } }); }}
                renderInput={(params) => <TextField label="Card Condition" {...params} />}
              />
            </div>
            {/* Card Number/Rarity */}
            <CardTextField
              label=""
              name="cardNumRarity"
              value={card.cardNumRarity}
              onChange={handleInputChange}
              helperText="E.g 100 / Ultra Rare"
            />
            {/* Card Type/HP/Stage */}
            <CardTextField
              label=""
              name="cardTypeHPStage"
              value={card.cardTypeHPStage}
              onChange={handleInputChange}
              helperText="E.g Fire / 250 / World Stage"
            />
            {/* Card Price */}
            <CardTextField
              label=""
              name="cardPrice"
              value={card.cardPrice}
              onChange={handleInputChange}
              startAdornment="₱"
            />
            {/* Section 2  */}
            <div className="section">
              <LooksTwoOutlinedIcon color="primary" fontSize="large" />
              <p className=''>Additional Details</p>
            </div>
            {/* Upload Image */}
            <ImageUploader cardImg={card.cardImg} updateCardImg={updateCardImg} />
            {/* Description */}
            <CardTextField
              label=""
              name="cardDescription"
              value={card.cardDescription}
              onChange={handleInputChange}
              multiline
              rows="4"
            />
    
            <Button variant="contained" 
              style={{ marginTop: '1.5%', marginBottom: '1.5%' }}
              onClick={handleOpenDialog}>
              Update
            </Button>
            
            {/* Snackbar for when submit but there are blank fields */}
            <Snackbar open={blankFields} autoHideDuration={3000} onClose={handleCloseBlankFields} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <Alert onClose={handleCloseBlankFields} severity="warning" sx={{ width: '100%' }}>
                Please fill in all fields!
              </Alert>
            </Snackbar>
    
            {/* Snackbar for when submit, the inputs are invalid */}
            <Snackbar open={invalidField} autoHideDuration={3000} onClose={handleCloseinvalidField} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <Alert onClose={handleCloseinvalidField} severity="warning" sx={{ width: '100%' }}>
                Please input fields in valid format!
              </Alert>
            </Snackbar>
    
            {/* Snackbar for successfully listing an item */}
            <Snackbar open={snackbarSucess} autoHideDuration={3000} onClose={handleCloseSuccess} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
              <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                Congrats! Your card has successfully been updated 🎉
              </Alert>
            </Snackbar>
    
            {/* Snackbar for error */}
            <Snackbar open={snackbarInvalid} autoHideDuration={3000} onClose={handleCloseInvalid} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
              <Alert onClose={handleCloseInvalid} severity="error" sx={{ width: '100%' }}>
                Error. Couldn't update your item. Try again later.
              </Alert>
            </Snackbar>
    
            {openDialogue && <ConfirmationDialog status={true} onClose={handleConfirmationDialogClose} title={"Are you sure you want to list this item?"} />}
            {isLoading && <LoadingComponent onClose={stopLoading}/>}
          </div>
        </div>
      );
    }