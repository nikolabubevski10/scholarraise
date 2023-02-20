import React, {useState, useCallback, useRef} from 'react'
import {Avatar, Button, Flex, Dialog, Heading, Image} from 'sr-components'
import uuid from 'uuid'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import Resizer from 'react-image-file-resizer'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import {avatarFallback} from '../../helpers/images'
import {useAppContext} from '../../context/appContext'
import {getS3SignedUrl} from '../../api/s3'
import {useNotification} from '../../hooks/useNotification'

const UploadAvatarDialog = ({isOpen, onClose, format = 'avatar', name, avatarSrc, submitPhoto}) => {
  const isAvatar = format === 'avatar'
  const width = isAvatar ? 72 : 600
  const height = isAvatar ? 72 : 200
  const aspect = isAvatar ? 1 : 1148 / 348

  const [crop, setCrop] = useState({width, height, aspect})
  const [preview, setPreview] = useState()
  const imgRef = useRef()

  const [isCropping, setCropping] = useState()
  const [selectedFile, setFile] = useState()
  const [croppedFile, setCroppedFile] = useState()
  const {isLoading, setLoading} = useAppContext()
  const {success, failed} = useNotification()

  const makeClientCrop = async crop => {
    if (selectedFile?.preview && crop.width && crop.height) {
      createCropPreview(imgRef.current, crop, selectedFile.file.name)
    }
  }

  const addFile = files => {
    setLoading(true)
    Resizer.imageFileResizer(
      files[0], // file
      isAvatar ? 400 : 2400, // maxWidth
      isAvatar ? 400 : 800, // maxHeight
      'png', // type of compression
      100, // 0-100 quality value
      0, // rotation
      blob => {
        // callback called when image is finished resizing
        const file = new File([blob], files[0].name, {lastModified: files[0].lastModified})
        blob.name = files[0].name
        setFile({file, preview: window.URL.createObjectURL(blob)})
        setLoading(false)
        setCropping(true)
      },
      'blob', // output type
    )
  }

  const resetFile = () => {
    URL.revokeObjectURL(preview)
    setFile()
    setPreview()
  }

  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'))
          return
        }
        blob.name = fileName
        window.URL.revokeObjectURL(preview)
        setPreview(window.URL.createObjectURL(blob))
      }, 'image/png')
    })
  }

  const onLoad = useCallback(img => {
    imgRef.current = img
  }, [])

  const submit = () => {
    const filename = `${uuid.v4()}.png`
    let signedUrl

    setLoading(true)
    getS3SignedUrl(filename)
      .then(res => res.presignedAwsUrl)
      .then(url => {
        signedUrl = url.substring(0, url.indexOf('?'))
        return axios.put(url, croppedFile, {
          headers: {'Content-Type': selectedFile.file.type},
        })
      })
      .then(() => submitPhoto(signedUrl)) // make sure submitPhoto is *always* a promise!
      .then(() => success('Image uploaded successfully.'))
      .catch(() => failed('We could not submit your image. Please try again!'))
      .finally(() => setLoading(false))
  }

  const hasAvatarButtons = {
    left: [
      <Button variant="primary" onClick={submit} disabled={isLoading}>
        Upload
      </Button>,
      <Button variant="error" onClick={resetFile}>
        Reset
      </Button>,
    ],
  }

  const noAvatarButtons = {
    left: [
      <Dropzone accept="image/*" multiple={false} onDrop={addFile}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button variant="secondary">Select a file</Button>
            </div>
          </section>
        )}
      </Dropzone>,
    ],
  }

  const WhileCroppingButton = {
    right: [
      <Button
        variant="primary"
        onClick={async () => {
          setLoading(true)
          await fetch(preview)
            .then(r => r.blob())
            .then(blob =>
              setCroppedFile(
                new File([blob], selectedFile.file.name, {
                  lastModified: selectedFile.file.lastModified,
                }),
              ),
            )
            .then(setLoading)
        }}
      >
        Ready
      </Button>,
    ],
  }

  if (isCropping) {
    return (
      <Dialog
        hasBackground
        heading={'Adjust the image'}
        buttons={WhileCroppingButton}
        isOpen={isCropping}
        close={() => setCropping()}
        width={[1, null, 1 / 2]}
      >
        <Flex justifyContent="center" alignItems="center">
          <ReactCrop
            src={selectedFile?.preview}
            crop={crop}
            onImageLoaded={onLoad}
            onChange={c => setCrop(c)}
            onComplete={makeClientCrop}
            circularCrop={aspect === 1}
          />
        </Flex>
      </Dialog>
    )
  }

  return (
    <Dialog
      hasBackground
      heading={isAvatar ? 'Upload a new avatar' : 'Upload a new cover photo'}
      buttons={selectedFile ? hasAvatarButtons : noAvatarButtons}
      isOpen={isOpen}
      close={() => {
        setFile()
        setPreview()
        onClose()
      }}
      width={[1, null, 1 / 2]}
    >
      {isAvatar ? (
        <Flex alignItems="center">
          <Avatar mr={3} size={5} src={selectedFile ? preview : avatarFallback(avatarSrc).image} />
          <Heading textStyle="h4">{name}</Heading>
        </Flex>
      ) : (
        <Image src={preview} />
      )}
    </Dialog>
  )
}

export default UploadAvatarDialog
