interface UseAnimation {
  setGlowOpacity: (value: number, index: number) => void
}

export const useAnimation = (): UseAnimation => {
  function setGlowOpacity(value: number, index: number): void {
    const blobList = document.querySelectorAll('.blob')
    const blob = blobList[index]
    useAnime({
      targets: blob,
      opacity: value,
      easing: 'easeOutExpo',
    })
  }
  return {
    setGlowOpacity,
  }
}
