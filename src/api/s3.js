import api from '.'

export function getS3SignedUrl(filename) {
  return api().post(`s3-sign?file_name=${filename}`)
}
