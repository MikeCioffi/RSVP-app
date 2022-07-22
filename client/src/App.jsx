import React, { useState } from "react"
import "./Components/Utilities/button.css"
import "./App.css"
import SearchForm from "./Components/searchForm/Form"
import ManageForm from "./Components/manageForm/manageForm"
import Dashboard from "./Components/Dashboard/Dashboard"
import Nav from "./Components/Nav/Nav"

function App() {
	require("typeface-lato")

	const [activity, setActivity] = useState("search")

	const setActive = (str) => {
		setActivity(str)
	}

	return (
		<div>
			<Nav setActive={setActive} activity={activity} />
			{}
			{activity === "search" && <SearchForm reset={setActive}></SearchForm>}
			{activity === "manage" && <ManageForm></ManageForm>}
			{activity === "dashboard" && <Dashboard></Dashboard>}
		</div>
	)
}

export default App
