import React, { useState } from 'react'

import { logFormData } from "../../../libs/formDataLogger"


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