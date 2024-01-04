import React, { useEffect, useRef, useState } from 'react'



const Row = (
    {
        children,
        onSubmit,
        forceSubmit
    }) => {

    const formRef = useRef()


    useEffect(() => {
        if (forceSubmit) {
            console.log(formRef.current)
        }
    }, [forceSubmit])


    return (
        <form
            ref={forceSubmit}
            onSubmit={onSubmit}
            className={`row`}>
            {
                children
            }
        </form>
    )
}

export default Row