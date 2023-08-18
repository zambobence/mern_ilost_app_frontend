import React from 'react'
import {format , formatDistanceToNow, } from 'date-fns'

const DateComponent = ({date}) => {

    if(date){
        const now = Date.now()
        const unixDate = new Date(date)
        if (now - unixDate < 86400000) {
            const isoDate = formatDistanceToNow(unixDate, { addSuffix: true })
            return <span>{isoDate}</span>
        }
        else {
            const formattedDate = format(unixDate, 'yyyy-MM-dd')
            return (
                <p>
                    <i aria-label='date' className="fa-solid fa-calendar"></i>
                    {formattedDate}
                </p>
        )}
    }
}

export default DateComponent