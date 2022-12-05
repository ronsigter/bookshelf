import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input: React.FC<InputProps> = React.forwardRef<any, InputProps>(
  function InputComponent(props, ref) {
    const { label, ...rest } = props

    return (
      <div className="relative text-white">
        <input
          {...rest}
          ref={ref}
          id={label}
          placeholder=" "
          className="focus:border-primary peer block w-full appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2.5 pb-2.5  pt-4 text-sm focus:outline-none focus:ring-0"
        />
        <label
          htmlFor={label}
          className="peer-focus:text-primary bg-background absolute top-3 left-1 z-10 origin-[0] -translate-y-[1.6rem] translate-x-1 scale-75 px-2 py-1 text-sm transition duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-[1.6rem] peer-focus:translate-x-1 peer-focus:scale-75"
        >
          {label}
        </label>
      </div>
    )
  }
)
