interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  label: string
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { label, ...rest } = props

  return (
    <button
      {...rest}
      className="bg-primary rounded-lg p-2.5 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#436fa8] focus:outline-none focus:ring-0"
    >
      {label}
    </button>
  )
}
