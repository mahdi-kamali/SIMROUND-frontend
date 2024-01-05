import React, { useEffect, useRef, useState } from 'react'



const Row = (
    {
        children,
        onSubmit,
        forceSubmit
    }) => {

    const formRef = useRef()


    useEffect(() => {
        if (forceSubmit !== undefined) {
            formRef.current.requestSubmit();
        }
    }, [forceSubmit])


    return (
        <form
            ref={formRef}
            onSubmit={onSubmit}
            className={`row`}>
            {
                children
            }
        </form>
    )
}

export default Row