import React from 'react'

import axios from 'axios';
const Test = () => {
    
    return (
        <div>
            <button onClick={async()=>{
 await axios.get("https://mwhnp1hb4f.execute-api.us-east-1.amazonaws.com/getAll").then(res=>{
    console.log(res)
})
            }}>delete</button>
        </div>
    )
}

export default Test
