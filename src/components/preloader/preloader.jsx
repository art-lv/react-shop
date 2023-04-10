import React from 'react'
import loaderImg from '../../images/loading.gif'

const Preloader = () => {
    return (
        <div className='preloader'>
            <img src={loaderImg}  /> 
        </div>
    )
}

export default Preloader