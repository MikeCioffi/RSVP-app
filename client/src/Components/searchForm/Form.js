import React, { useState, useEffect } from "react"
import axios from "axios"
import InitialSearch from "./initialSearch"
import UpdateSearch from "./updateSearch"
import "./Form.css"
import upperFirst from "../Utilities/Camalize"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

axios.defaults.baseURL = "https://evening-reef-49840.herokuapp.com/"
console.log(axios.defaults.baseURL)

const Form = () => {
	const [desiredID, setDesiredID] = useState("")
	const [error, setEorror] = useState("")
	const [familyName, setFamilyName] = useState("")
	const [rsvpTexts, setRsvpTexts] = useState([])

	const resetData = () => {
		// setNewData(false)
		setDesiredID("")
		setFamilyName("")
	}

	const setID = (id) => {
		setDesiredID(id)
	}

	const fetchRsvps = async () => {
		let rsvpTextsList = []
		// const data = await axios.get('/api/rsvp')
		const data = await axios.get(
			`api/rsvpfilter?familyName=${upperFirst(familyName)}`
		)
		if (data.data.filteredData.length > 0) {
			setEorror("")
			data.data.filteredData.map((item) => rsvpTextsList.push(item))
			setRsvpTexts(rsvpTextsList)
			// setRsvpInformation(rsvpTextsList)
			resetData()
		} else {
			setEorror("test")
			resetData()
		}
	}

	const updateInput = (e) => {
		if (e.keyCode === 13) {
			fetchRsvps()
		}
	}

	useEffect(() => {}, [desiredID])

	return (
		<div>
			<div className='input-items'>
				<h2>Enter the last name of your family</h2>
				<input
					className='search-input'
					type='text'
					onKeyDown={updateInput}
					onChange={(e) => setFamilyName(e.target.value)}
					value={familyName}
					placeholder='Need Help? Try Smith..'
				/>
				<button className='submit-btn find' onClick={() => fetchRsvps()}>
					Find <FontAwesomeIcon icon={faArrowRight} />
				</button>
				{error.length > 1 && (
					<div className='alert alert-danger'>
						Name not found, please try again
					</div>
				)}
			</div>
			{error.length === 0 && (
				<div>
					<InitialSearch
						rsvpTexts={rsvpTexts}
						setID={setID}
						desiredID={desiredID}
					/>
					<UpdateSearch
						rsvpTexts={rsvpTexts}
						desiredID={desiredID}
						setID={setID}
					/>
				</div>
			)}
		</div>
	)
}

export default Form
