import Image from 'next/image'

export const InProgressState = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col gap-1">
        <Image width={400} height={400} alt="bookney-logo" src="/bookney-light.png" />
        <h3 className="text-center text-lg text-white">This page is currently in progress...</h3>
      </div>
    </div>
  )
}
