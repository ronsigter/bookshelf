'use client'

import { useMutation } from '@tanstack/react-query'
import { Button } from 'components/buttons/Button'
import { Input } from 'components/forms/Input'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { createBook } from 'services/books'

type FormType = {
  title: string
  description: string
  image: FileList
}

// TODO: Add image preview of upload
// TODO: Maybe add react-dropzone?

export const CreateBookForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<FormType>()

  const { data: session } = useSession()
  const { mutateAsync } = useMutation({
    mutationFn: async (vars: FormType) => {
      const { data } = await createBook(session, vars)
      return data
    }
  })

  const onSubmit = async (form: FormType) => {
    await mutateAsync(form)
  }

  const errorFieldMessage = (error?: string): React.ReactNode => {
    if (!error) return null
    return (
      <div className="px-[0.75rem] pt-1" role="presentation" aria-label="error-field-message">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          label="Title"
          {...register('title', {
            required: 'Title is required.'
          })}
        />
        {errorFieldMessage(errors.title?.message)}
      </div>
      <div>
        <div className="relative flex flex-col text-white">
          <textarea
            id="description"
            rows={10}
            placeholder=" "
            className={`focus:border-primary peer block w-full appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-2.5 pb-2.5  pt-4 text-sm focus:outline-none focus:ring-0`}
            {...register('description', {
              required: 'Description is required.'
            })}
          />
          <label
            htmlFor="description"
            className="peer-focus:text-primary bg-background absolute top-3 left-1 z-10 origin-[0] -translate-y-[1.6rem] translate-x-1 scale-75 px-2 py-1 text-sm transition duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-[1.6rem] peer-focus:translate-x-1 peer-focus:scale-75"
          >
            Description
          </label>
        </div>
        {errorFieldMessage(errors.description?.message)}
      </div>
      <div>
        <div className="relative flex flex-col text-white">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            accept="image/png, image/jpeg"
            {...register('image', {
              required: 'Image is required.'
            })}
          />
          {errorFieldMessage(errors.image?.message)}
        </div>
      </div>
      <Button type="submit" isLoading={isSubmitting} loadingText="Submitting...">
        Submit
      </Button>
    </form>
  )
}
