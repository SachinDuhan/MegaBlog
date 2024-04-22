import { SelectHTMLAttributes, forwardRef, useId } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[],
  label: string,
  className: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({
    options,
    label,
    className="",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
      {label && <label htmlFor={id}></label>}
      <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
        {(options as any[])?.map((option)=> (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
      </select>
    </div>
  )
})

export default Select
