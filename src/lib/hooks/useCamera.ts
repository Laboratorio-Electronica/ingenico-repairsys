import { useRef, useState } from 'react'

export function useCamera() {

  const videoRef = useRef<HTMLVideoElement>(null)

  const [stream, setStream] = useState<MediaStream | null>(null)

  async function start() {

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    })

    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream
    }

    setStream(mediaStream)
  }

  function stop() {

    stream?.getTracks().forEach(track => track.stop())

    setStream(null)
  }

  return {
    videoRef,
    start,
    stop
  }
}