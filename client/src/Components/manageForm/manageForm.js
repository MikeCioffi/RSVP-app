import React, { useState, useEffect } from "react"

import CreateForm from "./createForm"
import DeleteForm from "./deleteForm"

const ManageForm = () => {
	const [manageActivity, setManageActivity] = useState("")
	const [loading, setLoading] = useState(true)

	const loadingSetter = (value) => {
		setLoading(value)
	}

	useEffect(() => {
		loadingSetter(true)
	}, [manageActivity])

	return (
		<div>
			{manageActivity !== "test" && (
				<div className='nav-sub-container'>
					<button
						className={
							manageActivity === "create" ? "save-btn selected" : "save-btn"
						}
						onClick={() => setManageActivity("create")}
					>
						{" "}
						Create{" "}
					</button>
					<button
						className={
							manageActivity === "delete" ? "save-btn selected" : "save-btn"
						}
						onClick={() => setManageActivity("delete")}
					>
						{" "}
						Delete{" "}
					</button>
				</div>
			)}
			{manageActivity === "create" && <CreateForm key={"createForm"} />}
			{manageActivity === "delete" && (
				<DeleteForm
					key={"deleteFrom"}
					activity={manageActivity}
					loading={loading}
					setLoading={loadingSetter}
				/>
			)}
		</div>
	)
}
export default ManageForm
