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
        const form = new FormData()
        if (image) {
            form.append('file', image)
        }

        const response = await fetch('/api/file-upload', {
            method: 'POST',
            body: form
        })
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
