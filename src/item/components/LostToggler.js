import React from 'react'
import './LostToggler.css'
function LostToggler(props) {

    return (
        <div className='lost-toggler' onClick={props.toggleLost}>
            <label>Lost</label>
                {props.lost 
                    ? <i className="fa-solid fa-toggle-off toggle"></i> 
                    : <i className="fa-solid fa-toggle-on toggle"></i> 
                }
            <label>Found</label>
        </div>
  )
}

export default LostToggler