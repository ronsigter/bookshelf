'use client'

import { Button } from 'components/buttons/Button'
// TODO: Only admin can access this page

import { Input } from 'components/forms/Input'
import { useForm } from 'react-hook-form'

type FormType = {
  title: string
  description: string
  image: File
}

export default function AdminPage() {
  const { handleSubmit, register } = useForm<FormType>()

  const onSubmit = async (form: FormType) => {
    console.log(form)
  }

  return (
    <div className="flex h-screen flex-col px-10">
      <div className="w-full max-w-sm">
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input label="Title" {...register('title')} />
          </div>
          <div>
            <div className="relative flex flex-col text-white">
              <textarea
                rows={10}
                placeholder=" "
                className={`focus:border-primary peer block w-full appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2.5 pb-2.5  pt-4 text-sm focus:outline-none focus:ring-0`}
                {...register('description')}
              />
              <label className="peer-focus:text-primary bg-background absolute top-3 left-1 z-10 origin-[0] -translate-y-[1.6rem] translate-x-1 scale-75 px-2 py-1 text-sm transition duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-[1.6rem] peer-focus:translate-x-1 peer-focus:scale-75">
                Description
              </label>
            </div>
          </div>
          <div>
            <input type="file" {...register('image')} />
          </div>
          <Button loadingText="Submitting...">Submit</Button>
        </form>
      </div>
    </div>
  )
}
