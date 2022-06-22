import React, {useState , useEffect} from 'react'
import axios from 'axios';
import Camalize from '../Utilities/Camalize';
import './manageForm.css'

const CreateForm =() => {
    const [newCode, setNewCode] = useState('')
    const [newFamilyName, setNewFamilyName] = useState('')
    const [newTotalMembers, setNewTotalMembers] = useState(0)
    const [error, setError] = useState('')

    const [disabled, setDisabled] = useState(true)

    // form validation error strings
    const [formValidation, setFormValidation] = useState('')
    const [codeValidation, setCodeValidation ] = useState('')
    const [nameValidation, setNameValidation ] = useState('')
    const [memberValidation, setMemberValidation ] = useState('')


    const resetData = () => {
        setNewCode('')
        setNewFamilyName("")
        setNewTotalMembers(0)
    }

    function containsSpecialChars(str) {
      const specialChars = /^\w+$/;
      return specialChars.test(str);
    }
    
    useEffect(() => {
      setFormValidation(codeValidation + nameValidation + memberValidation)
    },[codeValidation, nameValidation, memberValidation])

    useEffect(()=>{
      if(formValidation.length >= 1 ){
        return  setDisabled(true)
      }
      if(formValidation.length === 0){
        if(newCode.length > 0 && newFamilyName.length > 0 && Number(newTotalMembers) > 0){
        return setDisabled(false)
        }
      else return setDisabled(true)
        
      }
    },[formValidation, newCode, newFamilyName, newTotalMembers])

    useEffect(() => {
      if(newFamilyName.length > 0 ){
        if (containsSpecialChars(newFamilyName)){
          setNameValidation('')
        }
        else{
          setNameValidation('Family Name contains a special character. ')
        }
      }
    },[newFamilyName])

    useEffect(() => {
      if(newCode.length > 0 ){
        if (containsSpecialChars(newCode)){
          setCodeValidation('')
        }
        else{
          setCodeValidation('Code contains a special character. ')
        }
      }

    },[newCode])


    useEffect(() => {
      // Total members validation
      if(newTotalMembers.length > 0 ){
        if(newTotalMembers <= 0){
          setMemberValidation('Family Members is less than 0. ')
        }
        if(Number.isInteger(Number(newTotalMembers))){
          setMemberValidation('')
        }
        else{
          setMemberValidation('Family Members is not an integer. ')
        }
      }

    },[newTotalMembers] )

    const createRSVP = async() => {
        await axios.post(`api/rsvp/`, 
        {
            rsvpCode: newCode,
            familyName: Camalize(newFamilyName),
            attending: false,
            membersInvited: newTotalMembers,
            totalMembersInvited: newTotalMembers,
            chicken: 0,
            steak: 0,
            vegetarian: 0,
            decline: 0

          })
          .then(function (response) {
            setError(response.status);
            resetData()
          })
          .catch(function (error) {
            console.log(error);
          });
    }




return( 
    <div className ='create-form'>
      <div className ='create-form-container'>
        <div className ='create-form-item'>
        <p>RSVP Code:</p>
        <input className='search-input' type="text" id="newRsvpCode" name="newRsvpCode"  onChange = {e => setNewCode(e.target.value)} placeHolder="RSVP Code" value={newCode} ></input>
        </div>
        <div className ='create-form-item'>
        <p>Family Name:</p>
        <input className='search-input' type="text" id="newFamilyName" name="newFamilyName"  onChange = {e => setNewFamilyName(e.target.value)} placeHolder='Family Name' value={newFamilyName} ></input>
        </div>
        <div className ='create-form-item'>
        <p>Total Family Members:</p>
        <input className='search-input' type="tel" pattern="[0-9]+" id="newTotalMembers" name="newTotalMembers" onChange = {e => setNewTotalMembers(e.target.value)} value={newTotalMembers} ></input>
        </div>
        <div className ='create-form-item'>
        <button  id = 'button'className= {disabled? "save-btn disabled" : "save-btn"} disabled ={disabled} onClick={()=>createRSVP()} > Save </button>
        </div>
        {formValidation.length > 0 && <div className ='alert alert-danger'> {formValidation + ' Please correct these errors and try again'} </div>}
      </div>
    {/* add form valida tion */}
    {error === 200 && 
    <div className = 'nav-sub-container'>
    <div className =  'alert alert-success'>This family was created.</div>
    </div>}
    </div>
)
}
export default CreateForm