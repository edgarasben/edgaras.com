'use client'

import { useState } from 'react'

export function FormUpload() {
  const [image, setImage] = useState<File | null>(null)
  const [createObjectURL, setCreateObjectURL] = useState<string | undefined>(undefined)

  const uploadToClient = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      setImage(file)
      setCreateObjectURL(URL.createObjectURL(file))
    }
  }

  const uploadToServer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (image) {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ file: image.name })
      })

      if (response.ok) {
        const { presignedUrl } = await response.json()

        console.log('Uploading file to:', presignedUrl)
        const uploadResponse = await fetch(presignedUrl, {
          method: 'PUT',
          body: image /* 
          headers: {
            'Content-Type': image.type
          } */
        })

        if (uploadResponse.ok) {
          console.log('File uploaded successfully')
        } else {
          console.error('Error uploading file:', uploadResponse.statusText)
        }
      } else {
        console.error('Error getting presigned URL:', response.statusText)
      }
    }
  }

  return (
    <form onChange={uploadToClient} onSubmit={uploadToServer}>
      <input type="file" name="file" />
      <button type="submit">Submit</button>
      {createObjectURL && (
        <img
          src={createObjectURL}
          className="h-16 w-16 overflow-hidden rounded-full"
          alt="image"
        />
      )}
    </form>
  )
}
