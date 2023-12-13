import React from 'react'

const ErrorDetails = ({message}) => {
  return (
    <div className='flex justify-around items-center gap-2 text-red-900'>
    <div>X</div>
    <div>{message}</div>
    </div>
  )
}

export default ErrorDetails