import React ,{useId}from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
},ref) {
    const id = useId();
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='inline-block mb-1 pl-1'>{label}</label>}
        <select
        {...props}
        ref={ref}
        id={id}
        className={`px-3 py-2 rounded-lg focus:bg-gray-50 border-white border-2 focus:border-blue-500 ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)
