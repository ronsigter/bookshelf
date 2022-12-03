interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input: React.FC<InputProps> = (props) => {
  const { label, ...rest } = props

  return (
    <div className="relative text-white">
      <input
        {...rest}
        id={label}
        placeholder=" "
        className="focus:border-primary peer block w-full appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2.5 pb-2.5  pt-4 text-sm focus:outline-none focus:ring-0"
      />
      <label
        htmlFor={label}
        className="peer-focus:peer-placeholder-shown:text-primary peer-focus:peer-placeholder-shown:bg-background absolute top-3 left-1 z-10 origin-[0] px-2 py-1 text-sm text-gray-400
        transition duration-200 peer-focus:peer-placeholder-shown:-translate-y-[1.6rem] peer-focus:peer-placeholder-shown:translate-x-1 peer-focus:peer-placeholder-shown:scale-75"
      >
        {label}
      </label>
    </div>
  )
}
