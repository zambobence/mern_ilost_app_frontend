import React from 'react'

export default function Select(props) {

const optionArray = props.options.map((e, i) => <option key={i} value={e}>{e}</option>)

    return (
        <div className='input-controller'>
            <select onChange={props.onChange}>
                {optionArray}
            </select>
            {!props.isValid && <p>{props.error}</p>}
        </div>
  )
}
