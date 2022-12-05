import { ImSpinner2 } from 'react-icons/im'

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, isLoading, loadingText = '', ...rest } = props

  const buttonLabel = isLoading ? (
    <div className="flex items-center justify-center gap-2" role="presentation">
      <ImSpinner2 className="animate-spin" />
      <p>{loadingText}</p>
    </div>
  ) : (
    children
  )

  return (
    <button
      {...rest}
      disabled={isLoading}
      className="bg-primary rounded-lg p-2.5 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#436fa8] focus:outline-none focus:ring-0"
    >
      {buttonLabel}
    </button>
  )
}
