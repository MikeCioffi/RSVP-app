// imports
import React, { useState } from 'react'
import { GiChicken, GiSteak, GiCarrot } from "react-icons/gi";
import './Dashboard.css'

import axios from 'axios'
import LoadSpinner from '../LoadSpinner/LoadSpinner';

const Dashboard = () => {
    const [totalRSVP, setTotalRSVP] = useState(0)
    const [chicken, setChicken] = useState(0) 
    const [steak, setSteak] = useState(0) 
    const [vegetarian, setVegetarian] = useState(0) 
    const [decline, setDecline] = useState(0)
    const[runOnce, setRunOnce] = useState(true)
    const populateList = async() => {
        let tmpChicken = 0; 
        let tmpSteak = 0; 
        let tmpVegetarian = 0; 
        let tmpDecline = 0; 
    
        await axios.get(`api/rsvp`)
        .then(function(response){
            
            const updateValues = (item) => {
                tmpChicken = (tmpChicken + item.chicken)  
                tmpSteak = tmpSteak + item.steak
                tmpVegetarian = tmpVegetarian + item.vegetarian
                tmpDecline = tmpDecline + item.decline
            }
            
    
            response.data.data.map((item) => {
                    return updateValues(item); 

                    })
            setTotalRSVP(tmpChicken+tmpSteak+tmpVegetarian)
            setChicken(tmpChicken)
            setSteak(tmpSteak)
            setVegetarian(tmpVegetarian)
            setDecline(tmpDecline)

    })}
    if(runOnce){
        populateList()
        setRunOnce(false)
    }
    return (totalRSVP ?  <div className='dash-container--column' >
            <h1>Summary</h1> 
            <div className='dash-container--row'>

            <div className ='dash-column'>  {chicken} <GiChicken/></div>
            <div className ='dash-column'>  {steak} <GiSteak/></div>

            <div className ='dash-column'>  {vegetarian} <GiCarrot/></div>

            </div>
            <div>Total: {totalRSVP} Guests</div>
            <div>Not Attending: {decline}</div>
        </div> : 
        <div className='dash-container--column' >
            <LoadSpinner/>

        </div>
    )

}


export default Dashboard; 