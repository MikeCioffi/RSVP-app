import React, { useState , useEffect} from 'react'
import axios from 'axios';
import { GiChicken, GiSteak, GiCarrot } from "react-icons/gi";

import {RiEmotionSadLine} from "react-icons/ri"

// import "../Form/button.css"

const UpdateSearch = (props) => {
    const [initialItem, setInitialItem] = useState({})
    const [updated , setUpdated] = useState(false)
    const [totalRSVP, setTotalRSVP] = useState(0)
    const [chicken, setChicken] = useState(0) 
    const [steak, setSteak] = useState(0) 
    const [vegetarian, setVegetarian] = useState(0) 
    const [decline, setDecline] = useState(0)

  
    

    const updateRSVP = async(data) => {
        await axios.put(`api/rsvp/${data._id}`, 
        {
            rsvpCode: data.rsvpCode,
            familyName: data.familyName,
            attending: true,
            membersInvited: data.membersInvited,
            totalMembersInvited: data.totalMembersInvited,
            chicken: chicken,
            steak: steak,
            vegetarian: vegetarian,
            decline: decline

          })
          .then(function (response) {
            setUpdated(true)
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    useEffect(() => {
        props.rsvpTexts.map(item =>{
            if(props.desiredID === item._id){
            setInitialItem(item)
        } 
       }) 
        setUpdated(false)
      }, [props.desiredID, props.rsvpTexts]);
    
      // set inital values for form
    useEffect(() => {
        setChicken(initialItem.chicken)
        setSteak(initialItem.steak)
        setVegetarian(initialItem.vegetarian)
        // setDecline(initialItem.decline)

      }, [initialItem])


    useEffect(() =>  {
        setTotalRSVP(parseFloat(chicken)+parseFloat(steak)+parseFloat(vegetarian))
    }, [chicken,steak,vegetarian])

    useEffect(() => {
        setDecline(initialItem.membersInvited - parseFloat(totalRSVP))

    },[initialItem.membersInvited, totalRSVP])




    return(<div>
        {/* information is displayed if the user hasn't made changes */}
        {props.desiredID.length  > 0 &&  updated ===false &&
        <ul className='updated-search-list'>
        <div key={initialItem._id}>
            <div className='update-search-list-initial-items'>
            <h3>{initialItem.familyName} Family of {initialItem.membersInvited} selected </h3>
              </div> 
            <div className= 'updated-search-list-items'> 
                <div className = 'updated-search-list-item'>
                <p>Steak:</p> 
                <button className = 'item minus' onClick = { () => setSteak((Steak) =>{if(Steak>0){ return Steak - 1} return Steak})}>-</button>
                <p> {steak}</p>
                <button className = 'item plus' onClick = {() => setSteak((Steak) => {if(Steak< initialItem.membersInvited) {return Steak + 1} return Steak})}>+</button>
                </div>
                <div className = 'updated-search-list-item'>               
                 <p>Chicken:</p>
                 <button className = 'item minus' onClick = { () => setChicken((Chicken) =>{if(Chicken>0){ return Chicken - 1} return Chicken})}>-</button>
                <p> {chicken}</p>
                <button className = 'item plus' onClick = {() => setChicken((Chicken) => {if(Chicken< initialItem.membersInvited) {return Chicken + 1} return Chicken})}>+</button>        
                </div>
                <div className = 'updated-search-list-item'>                
                <p>Vegetarian:</p>
                <button className = 'item minus' onClick = { () => setVegetarian((Vegetarian) =>{if(Vegetarian>0){ return Vegetarian - 1} return Vegetarian})}>-</button>
                <p> {vegetarian}</p>
                <button className = 'item plus' onClick = {() => setVegetarian((Vegetarian) => {if(Vegetarian< initialItem.membersInvited) {return Vegetarian + 1} return Vegetarian})}>+</button>        
                </div>
                <div className = 'updated-search-list-item'>               
                 <p>{decline > 0 && <RiEmotionSadLine/>}Decline:</p>
                <p className='declines' id="declines" name="Declines" >{decline} </p>
                </div>
                {totalRSVP > initialItem.membersInvited && 
                <div className = 'alert alert-danger'> You currently have {totalRSVP} members attending while only {initialItem.membersInvited} were invited </div> 
                }
            </div>
            <div className = 'btn-container'>
            <button className='save-btn disabled' onClick={()=>props.setID("")} > Cancel </button>
            <button className={totalRSVP > initialItem.membersInvited? "save-btn disabled": "save-btn"} onClick={()=>updateRSVP(initialItem)} disabled = {totalRSVP > initialItem.membersInvited? true: false}> Save </button>

            </div>

          </div>
      </ul>
  
        }
        {updated === true && totalRSVP > 0 && <div className ='nav-sub-container'>
        <div className = 'alert alert-success'>
            Thanks! We have confirmed {totalRSVP} members celebrating. 
            <br></br><GiSteak/>{steak} Steak 
            <br></br> <GiChicken/>{chicken} Chicken 
            <br></br> <GiCarrot/>{vegetarian} Vegetarian
            </div>
            </div>
        }
         {decline > 0 && updated === true && <div className ='nav-sub-container'>
        <div className = 'alert alert-danger'>
            We're sorry to hear {decline} family members are unable to join us!
        </div>     </div>}   
        </div>
        )
} 

export default UpdateSearch