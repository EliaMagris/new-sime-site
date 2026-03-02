import { useRef, useState } from 'react'

function ImageCarousel({ images, onImageClick }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef(null)

  if (!images || images.length === 0) {
    return null
  }

  const goToPrev = () => {
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1))
  }

  const goToNext = () => {
    setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1))
  }

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current == null) return
    const deltaX = event.changedTouches[0].clientX - touchStartX.current

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        goToPrev()
      } else {
        goToNext()
      }
    }

    touchStartX.current = null
  }

  const handleImageClick = () => {
    if (typeof onImageClick === 'function') {
      onImageClick(currentIndex)
    }
  }

  return (
    <div className="carousel" aria-label="Galleria di immagini delle decorazioni">
      <button
        type="button"
        className="carousel-arrow carousel-arrow-left"
        onClick={goToPrev}
        aria-label="Immagine precedente"
      >
        ‹
      </button>
      <div
        className="carousel-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={`Decorazione ${currentIndex + 1}`}
          className="carousel-image"
          onClick={handleImageClick}
        />
      </div>
      <button
        type="button"
        className="carousel-arrow carousel-arrow-right"
        onClick={goToNext}
        aria-label="Immagine successiva"
      >
        ›
      </button>
      <div className="carousel-dots" aria-hidden="true">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel

