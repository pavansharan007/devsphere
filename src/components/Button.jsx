import React from 'react'

function Button({children,textColor='text-white',bgColor='bg-blue-500',type='button',className=''}) {

  return (
    <div>
      <button className={`${textColor} ${bgColor} ${className}`} type={type}>
        {children}
      </button>
    </div>
  )
}

export default Button
