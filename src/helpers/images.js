import avatarPlaceholder from '../assets/avatar.svg'
import coverPlaceholder from '../assets/cover.svg'

export const getRotation = (file, callback) => {
  const fileReader = new FileReader()

  const rotation = {
    1: 'rotate(0deg)',
    3: 'rotate(180deg)',
    6: 'rotate(90deg)',
    8: 'rotate(270deg)',
  }

  fileReader.onloadend = () => {
    const scanner = new DataView(fileReader.result)

    let idx = 0
    let value = 1

    if (fileReader.result.length < 2 || scanner.getUint16(idx) !== 0xffd8) {
      if (callback) {
        callback(rotation[value])
      }
      return
    }

    idx += 2

    let maxBytes = scanner.byteLength
    let littleEndian = false

    while (idx < maxBytes - 2) {
      const uint16 = scanner.getUint16(idx, littleEndian)

      idx += 2

      switch (uint16) {
        case 0xffe1:
          if (scanner.getUint16(idx + 8) === 0x4949) {
            littleEndian = true
          }

          maxBytes = scanner.getUint16(idx, littleEndian) - idx
          idx += 2
          break
        case 0x0112:
          value = scanner.getUint16(idx + 6, littleEndian)
          maxBytes = 0
          break
        default:
          break
      }
    }

    if (callback) {
      callback(rotation[value])
    }
  }

  fileReader.readAsArrayBuffer(file)
}

export const avatarFallback = avatar => {
  if (!avatar || avatar === '' || avatar === 'PLACEHOLDER')
    return {image: avatarPlaceholder, existed: false}

  return {image: avatar, existed: true}
}

export const coverFallback = cover => {
  if (!cover || cover === '' || cover === 'PLACEHOLDER')
    return {image: coverPlaceholder, existed: false}

  return {image: cover, existed: true}
}
