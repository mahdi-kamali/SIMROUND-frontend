import React, { useState } from 'react'



const Row = ({ children, onSubmit }) => {





    return (
        <form
            onSubmit={onSubmit}
            className={`row`}>
            {
                children
            }
        </form>
    )
}

export default Row