import { BsFillPersonFill } from "react-icons/bs";
import IconReturn from '../Utilities/IconReturn'

const initialSearch = (props) => {
  
    return(<div>
        {props.desiredID.length  <= 0 && props.rsvpTexts.length > 0 &&
        <div className='input-items'>
        <h3>Select the correct party</h3>
        <ul className ='initial-search-list'>
        {props.rsvpTexts.map(item => (
          <li key={item._id} className='initial-search-list-item' onClick={() => props.setID(item._id)}>
              {item.familyName} 
              <br></br>
              {item.rsvpCode}
              <br></br>
            {IconReturn(item.membersInvited, <BsFillPersonFill/>)}
            </li>
        ))}
      </ul>
      </div>
        }
        
        </div>
        )
} 

export default initialSearch