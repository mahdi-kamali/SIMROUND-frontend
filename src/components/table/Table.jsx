import React, { useEffect } from 'react'

const Table = ({ children, columnsStyle }) => {

    const style = {
        gridTemplateColumns: columnsStyle,
    }



    return (
        <div className='table' style={style}   >
            {children}
        </div>
    )
}

export default Table