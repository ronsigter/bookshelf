interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  label: string
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { label, ...rest } = props

  return (
    <button {...rest} className="btn">
      {label}
    </button>
  )
}
