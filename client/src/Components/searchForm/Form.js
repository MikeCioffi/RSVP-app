import React, { useState , useEffect} from 'react'
import axios from 'axios';
import InitialSearch from './initialSearch'
import UpdateSearch  from './updateSearch'
import './Form.css';
import upperFirst from '../Utilities/Camalize'

axios.defaults.baseURL = 'https://evening-reef-49840.herokuapp.com/'
console.log(axios.defaults.baseURL)


const Form = () => {
    //initialize all the RSVP information
    // const [rsvpInformation, setRsvpInformation] = useState([{
    //     rsvpCode: "",
    //     familyName: "",
    //     attending: false, 
    //     memberInvited: 0, 
    //     totalMembersInvited: 0, 
    //     chicken: 0 , 
    //     steak: 0, 
    //     vegetarian: 0
    // }])

    const [desiredID, setDesiredID] = useState("")
    const [error, setEorror] = useState("")
    const [familyName, setFamilyName] = useState()
    const [rsvpTexts, setRsvpTexts] = useState([])



    const resetData = () => {
        // setNewData(false)
        setDesiredID("")
        setFamilyName("")
    }

    const setID = (id) => {
        console.log('setting desired ID to ' + id)
        setDesiredID(id)
    }

    const fetchRsvps = async() => {
        let rsvpTextsList = []
        // const data = await axios.get('/api/rsvp')
        const data = await axios.get(`api/rsvpfilter?familyName=${upperFirst(familyName)}`)
        console.log(data.data.filteredData.length)
        if (data.data.filteredData.length > 0){
            setEorror("")
            console.log('setting resetting ID')
            console.log(data.data.filteredData)
            data.data.filteredData.map((item) => 
                rsvpTextsList.push(item)
            )
            setRsvpTexts(rsvpTextsList)
            // setRsvpInformation(rsvpTextsList)
            resetData(); 
           
        }
        else{
            
            setEorror("test") 
            resetData(); 
        
        }

    }



    const updateInput = (e) => {
   
        if (e.keyCode === 13){
            fetchRsvps()
        }
        console.log(e)
     
    }



    useEffect(() => {
    }, [desiredID])

return( <div>
            <div className = 'input-items'>
            <h2>Enter the last name of your family</h2>
            <input className = 'search-input' type="text" onKeyDown={updateInput} onChange={(e)=> setFamilyName(e.target.value)} value={familyName} placeholder="Need Help? Try Smith.."/>
            <button className="submit-btn" onClick={()=>fetchRsvps()}> Find </button>
            {error.length >1 &&<div className ='alert alert-danger'>Name not found, please try again</div>}
            </div>
           {error.length === 0 && 
                    <div>
                <InitialSearch rsvpTexts = {rsvpTexts} setID = {setID} desiredID={desiredID}/>
                <UpdateSearch rsvpTexts = {rsvpTexts}  desiredID={desiredID} setID = {setID}/>
                </div>
           }

</div>
)}

export default Form