import { useState, useEffect, useRef, ChangeEvent } from 'react'
import styled from 'styled-components'
import Button from '../UIElements/Button'
import ThemedTippy from './ThemedTippy'
import placePlaceholder from '../../../shared/image/place-placeholder.png'

const StyledImageUpload = styled.div`
  margin-bottom: 1em;
  input {
    display: none;
  }
  .image-upload {
    display: flex;
    align-items: flex-end;
  }

  .image-upload__button {
    justify-content: center;
    button {
      margin: 0;
    }
  }

  .image-upload__preview {
    width: 5rem;
    height: 5rem;
    margin-right: 0.5em;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

type ImageUploadProps = {
  id: string
  errorText?: string
  showErrorMessage: boolean
  initialPreviewUrl?: string
  required?: boolean
  autoFocus?: boolean
  inputChangeCallback: (id: string, value: any, isValid: boolean) => void
}

const ImageUpload = (props: ImageUploadProps) => {
  const initialPreviewUrl = props.initialPreviewUrl
    ? props.initialPreviewUrl
    : placePlaceholder

  const [file, setFile] = useState<File | null>(null) // points to file(binary)
  const [previewUrl, setPreviewUrl] = useState<string>(initialPreviewUrl) // points to dataURL(base64)
  const [isValid, setIsValid] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // If file is selected, parse file and set url
  useEffect(() => {
    if (!file) return
    const fileReader = new FileReader()
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        setPreviewUrl(fileReader.result)
      }
    }
    fileReader.readAsDataURL(file)
  }, [file])

  // If not required anymore, reset all state to default(blank)
  useEffect(() => {
    if (!props.required) {
      setFile(null)
      setPreviewUrl(initialPreviewUrl)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }, [props.required, initialPreviewUrl])

  const handleSelectImage = () => {
    inputRef.current?.click()
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let selectedFile
    let isFileValid = isValid
    if (e.target.files && e.target.files.length === 1) {
      selectedFile = e.target.files[0]
      // console.log(selectedFile)
      setFile(selectedFile)
      setIsValid(true)
      isFileValid = true
    } else {
      setIsValid(false)
      isFileValid = false
    }

    props.inputChangeCallback(props.id, selectedFile, isFileValid)
  }

  const inValid = props.required && !isValid && props.showErrorMessage

  return (
    <StyledImageUpload>
      <input
        ref={inputRef}
        type="file"
        accept=".jpb,.jpeg,.png"
        onChange={handleInputChange}
      />
      <div className="image-upload">
        <ThemedTippy
          content={props.errorText}
          visible={inValid}
          placement="right-start"
          popperOptions={{
            modifiers: [
              {
                name: 'flip',
                options: {
                  fallbackPlacements: ['top-end'],
                },
              },
            ],
          }}
          zIndex={5}
        >
          <div className="image-upload__preview">
            <img src={previewUrl} alt="Preview" />
          </div>
        </ThemedTippy>
        <div className="image-upload">
          <div className="image-upload__button">
            <Button type="button" onClick={handleSelectImage} success>
              Select Image
            </Button>
          </div>
        </div>
      </div>
    </StyledImageUpload>
  )
}

export default ImageUpload
