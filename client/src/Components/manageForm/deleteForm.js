import React, { useState, useEffect } from "react"
import axios from "axios"
import LoadingSpinner from "../LoadSpinner/LoadSpinner"
import IconReturn from "../Utilities/IconReturn"
import { BsFillPersonFill } from "react-icons/bs"
import Modal from "../Model/Modal"
import "../../App.css"

const DeleteForm = (props) => {
	const [rsvpList, setRsvpList] = useState([])
	const [rsvps, setRsvps] = useState([])
	const [modal, setModal] = useState(false)
	const [id, setID] = useState("")
	const [newFamilyName, setNewFamilyName] = useState("")
	const [newFamilyList, setNewFamilyList] = useState([])
	const [errorMessage, setErrorMessage] = useState("")
	const [skipContent, setSkipContent] = useState(true)

	const settingModal = (value) => {
		setID(value._id)
		setModal(true)
		setErrorMessage("")
	}

	useEffect(() => {
		setModal(false)
	}, [newFamilyList])

	const populateList = async () => {
		let rsvpitems = []
		const unique = (x, i, a) => a.indexOf(x) === i
		const data = await axios.get(`api/rsvp`)
		data.data.data.map((item) => {
			if (item.familyName.length > 0) {
				rsvpitems.push(item.familyName)
			}
		})

		setRsvpList(rsvpitems.filter(unique))
	}

	const deleteID = async (id) => {
		if (id == null) {
			fetchRsvps()
			populateList()
		} else {
			await axios.delete(`api/rsvp/${id}`).then(function (response) {
				fetchRsvps()
				populateList()
				setID("")
				setErrorMessage("successful")
			})
		}
	}

	useEffect(() => {
		populateList()
	}, [])

	useEffect(() => {
		const data = []
		if (skipContent) {
			setSkipContent(false)
		}
		if (rsvpList.length > 0) {
			for (var i = 0; i < rsvpList.length; i++) {
				data.push(rsvpList[i])
				setRsvps(data)
				props.setLoading(false)
			}
		}
		if ((rsvpList.length === 0) & !skipContent) {
			setRsvps(rsvpList)
			props.setLoading(false)
		}
	}, [rsvpList])

	// useEffect( () => {
	//   props.setLoading(false)
	// }, [rsvps])

	const setOption = (e) => {
		setNewFamilyName(e.target.value)
	}

	useEffect(() => {
		fetchRsvps()
	}, [newFamilyName])

	useEffect(() => {})

	const fetchRsvps = async () => {
		const rsvpTextsList = []
		if (newFamilyName.length > 0) {
			const data = await axios
				.get(`api/rsvpfilter?familyName=${newFamilyName}`)
				.then(function (response) {
					if (response.data.filteredData.length > 0) {
						response.data.filteredData.map((item) => {
							rsvpTextsList.push(item)
						})
						setNewFamilyList(rsvpTextsList)
					} else setNewFamilyList(response.data.filteredData)
				})
		}
	}
	return (
		<div className='sub-container'>
			{/* load spinner if api is still loading */}
			{props.loading === true && (
				<div>
					{" "}
					<LoadingSpinner />
				</div>
			)}
			{/* else reutrn the delete page */}
			{props.loading === false && rsvps.length >= 1 && (
				<div className='create-form-container'>
					<span>Select a family to view their party</span>
					<select className='search-input' onChange={setOption}>
						<option key='select' style={{ display: "none" }} value=''>
							Select An Item
						</option>
						{rsvps.map((item) => {
							return (
								<option key={item} value={item}>
									{item}
								</option>
							)
						})}
					</select>
				</div>
			)}
			{props.loading === false && rsvps.length === 0 && (
				<div className='nav-sub-container'>
					{" "}
					<div className='alert alert-danger'>
						{" "}
						There are no current families in the system. Please create one for
						this feature to work correctly.{" "}
					</div>{" "}
				</div>
			)}
			{newFamilyName.length > 0 && (
				<div className='create-form-container'>
					<ul key={newFamilyName} className='initial-search-list'>
						{newFamilyList.map((item) => (
							<div>
								<li
									key={item._id}
									className={
										id === item._id
											? "initial-search-list-item selected-out"
											: "initial-search-list-item"
									}
									onClick={() => settingModal(item)}
								>
									{item.familyName}
									<br></br>
									{item.rsvpCode}
									<br></br>
									<div>
										{IconReturn(item.membersInvited, <BsFillPersonFill />)}
									</div>
								</li>
								{modal === true && item._id === id && (
									<Modal
										value={id}
										title='delete'
										deleteFunction={deleteID}
									></Modal>
								)}
							</div>
						))}
					</ul>
				</div>
			)}
			{errorMessage.length > 1 && (
				<div className='nav-sub-container'>
					<div className='alert alert-success'>
						{" "}
						This family record deletion was {errorMessage}
					</div>
				</div>
			)}
		</div>
	)
}
export default DeleteForm
