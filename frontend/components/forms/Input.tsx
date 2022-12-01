interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input: React.FC<InputProps> = (props) => {
  const { label, ...rest } = props

  return (
    <div className="form-input">
      <input {...rest} id={label} placeholder=" " className="input" />
      <label htmlFor={label} className="label">
        {label}
      </label>
    </div>
  )
}
