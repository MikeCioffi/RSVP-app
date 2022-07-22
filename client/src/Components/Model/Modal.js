import React from "react"

const Modal = (props) => {
	//modal reveives a type
	//modal reveives a funtion
	//     {modal === true && <Modal value = {id} deleteFunction = {deleteID}></Modal>}

	const deleteReset = () => {
		props.deleteFunction(props.value)
	}

	const fakeReset = () => {
		props.deleteFunction(null)
	}

	return (
		<div>
			<p>Are you sure you'd like to {props.title} this?</p>

			<button className='confirm-btn yes' onClick={() => deleteReset()}>
				yes
			</button>
			<button className='confirm-btn no' onClick={() => fakeReset()}>
				no
			</button>
		</div>
	)
}

export default Modal
