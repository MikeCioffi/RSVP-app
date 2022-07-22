import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faHouse,
	faChartLine,
	faFolderPlus,
} from "@fortawesome/free-solid-svg-icons"

const Nav = (props) => {
	return (
		<div className='nav-container'>
			<button
				className={
					props.activity === "search" ? "submit-btn selected" : "submit-btn"
				}
				onClick={() => props.setActive("search")}
			>
				<FontAwesomeIcon icon={faHouse} />
				HOME
			</button>
			<button
				className={
					props.activity === "manage" ? "submit-btn selected" : "submit-btn"
				}
				onClick={() => props.setActive("manage")}
			>
				<FontAwesomeIcon icon={faFolderPlus} /> Admin{" "}
			</button>
			<button
				className={
					props.activity === "dashboard" ? "submit-btn selected" : "submit-btn"
				}
				onClick={() => props.setActive("dashboard")}
			>
				<FontAwesomeIcon icon={faChartLine} />
				dash{" "}
			</button>
		</div>
	)
}
export default Nav
