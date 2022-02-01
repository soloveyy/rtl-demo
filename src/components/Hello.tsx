import React, { useState } from 'react';



function Hello() {
    const [text, setText] = useState('')
    return (
        <>
            <h1>Hello</h1>
            <button onClick={()=>console.log('Button Clicked')}>Button</button>
            <input 
                type="text"
                placeholder={text}
                onClick={(e)=>setText((e.target as HTMLInputElement).value)}
            />
        </>
    )
}

export default Hello