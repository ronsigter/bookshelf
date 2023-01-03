type TooltipProps = {
  children: React.ReactNode
  message: string
}

export const Tooltip: React.FC<TooltipProps> = ({ children, message }) => {
  return (
    <div role="tooltip" className="group/tooltip relative flex flex-col items-center">
      {children}
      <div className="invisible absolute bottom-0 mb-6 hidden flex-col items-center group-hover/tooltip:visible group-hover/tooltip:flex">
        <span className="relative z-10 whitespace-nowrap rounded-md bg-gray-600 p-2 text-xs leading-none text-white shadow-lg">
          {message}
        </span>
        <div className="-mt-2 h-3 w-3 rotate-45 bg-gray-600"></div>
      </div>
    </div>
  )
}
