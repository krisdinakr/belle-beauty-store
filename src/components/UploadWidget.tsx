/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef } from 'react'

interface IUploadWidget {
  children: FC<{ cloudinary: any; widget: any; open: () => void }>
  onUpload: (error: any, result: any, widget: any) => void
  maxFiles: number
}

let cloudinary: any

const UploadWidget = ({ children, onUpload, maxFiles = 10 }: IUploadWidget) => {
  const widget = useRef<any>()
  useEffect(() => {
    if (!cloudinary) {
      cloudinary = window.cloudinary
    }

    function onIdle() {
      if (!widget.current) {
        widget.current = createWidget()
      }
    }

    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1)

    return () => {
      widget.current?.destroy()
      widget.current = undefined
    }
    // eslint-disable-next-line
  }, [])

  function createWidget() {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      console.warn(`Kindly ensure you have the cloudName and UploadPreset 
      setup in your .env file at the root of your project.`)
    }
    const options = {
      cloudName,
      uploadPreset,
      secure: true,
      maxFiles,
      cropping: true,
      folder: 'belle-beauty-store',
      sources: ['local', 'camera', 'google_drive'],
      multiple: false,
      clientAllowedFormats: ['jpeg', 'jpg', 'png'],
      maxImageFileSize: 2000000,
      maxImageWidth: 2000,
      showPoweredBy: false,
    }

    return cloudinary?.createUploadWidget(options, function (error: any, result: any) {
      if ((error || result.event === 'success') && typeof onUpload === 'function') {
        onUpload(error, result, widget)
      }
    })
  }

  function open() {
    if (!widget.current) {
      widget.current = createWidget()
    }
    widget.current && widget.current.open()
  }

  return <>{children({ cloudinary, widget, open })}</>
}

export default UploadWidget
