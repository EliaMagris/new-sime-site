import { useEffect, useState } from 'react'
import ImageCarousel from './ImageCarousel'

function GallerySection({ galleryImages }) {
  const [zoomedIndex, setZoomedIndex] = useState(null)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setZoomedIndex(null)
        return
      }
      if (zoomedIndex == null) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setZoomedIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1))
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setZoomedIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1))
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [zoomedIndex, galleryImages.length])

  return (
    <section className="section gallery" id="gallery" style={{ scrollMarginTop: '100px' }}>
      <div className="section-title">
        <p className="eyebrow">Gallery</p>
        <h2>Ispirazioni reali, finiture autentiche.</h2>
        <p>
          Selezione di progetti recenti: superfici materiche, effetti lucidi,
          marmorini e dettagli artigianali.
        </p>
      </div>
      <ImageCarousel
        images={galleryImages}
        onImageClick={(index) => setZoomedIndex(index)}
      />
      {zoomedIndex != null && (
        <div
          className="gallery-lightbox"
          onClick={() => setZoomedIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Immagine ingrandita"
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={(e) => { e.stopPropagation(); setZoomedIndex(null) }}
            aria-label="Chiudi"
          >
            ×
          </button>
          <button
            type="button"
            className="gallery-lightbox-prev"
            onClick={(e) => {
              e.stopPropagation()
              setZoomedIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1))
            }}
            aria-label="Immagine precedente"
          >
            ‹
          </button>
          <button
            type="button"
            className="gallery-lightbox-next"
            onClick={(e) => {
              e.stopPropagation()
              setZoomedIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1))
            }}
            aria-label="Immagine successiva"
          >
            ›
          </button>
          <img
            src={galleryImages[zoomedIndex]}
            alt={`Decorazione ${zoomedIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

export default GallerySection

