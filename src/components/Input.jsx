import React,{useId}from 'react'

function Input({
    label,
    placeholder,
    type = 'text',
    className = '',
    ...props
},ref
) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && <label className='block mb-2 text-white' htmlFor={id}>{label}</label>}
      <input
        id={id}
        
        placeholder={placeholder}
        type={type}
        className={ `border rounded-md p-2 w-full pl-1${className}`}
        ref={ref}
      />
    </div>
  )
}

export default React.forwardRef(Input);
