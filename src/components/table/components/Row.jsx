import React, { useEffect, useRef, useState } from 'react'



const Row = (
    {
        children,
        onSubmit,
        forceSubmit,
        hasError = undefined,
        hasSuccess = undefined,
    }) => {

    const formRef = useRef()




    useEffect(() => {
        if (forceSubmit !== undefined) {
            formRef.current.requestSubmit();
        }
    }, [forceSubmit])


    console.log(hasError)


    return (
        <form
            ref={formRef}
            onSubmit={onSubmit}
            className={`row has-${hasError && "error"}`}>
            {
                children
            }

            {
                hasError && <h1
                    key={Math.random()}
                    className='error-box'
                    style={{
                        gridColumn: "-1/1"
                    }}>{hasError?.reason.map((item,index)=>{
                        return <li key={index}>{item}</li>
                    })}</h1>
            }


            {
                hasSuccess && <h1
                    key={Math.random()}
                    className='success-box'
                    style={{
                        gridColumn: "-1/1"
                    }}>{hasSuccess?.reason}</h1>
            }
        </form>
    )
}

export default Row