import { useCallback, useEffect, useRef, useState } from 'react'

const PREVIEW_COUNT = 4
const LAZY_ROOT_MARGIN = '220px'

function useLoadImagesWhenNear() {
  const ref = useRef(null)
  const [ready, setReady] = useState(() =>
    typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined'
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect()
          queueMicrotask(() => setReady(true))
        }
      },
      { rootMargin: LAZY_ROOT_MARGIN, threshold: 0.01 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, ready]
}

const imgSizes = '(max-width: 900px) 42vw, 24vw'

function HowWeWorkSection({ showcases }) {
  const [lightbox, setLightbox] = useState(null)
  const [moreOpen, setMoreOpen] = useState({})

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const goLightboxPrev = useCallback(() => {
    setLightbox((lb) => {
      if (!lb?.sources?.length) return lb
      const len = lb.sources.length
      if (len < 2) return lb
      return { ...lb, index: (lb.index - 1 + len) % len }
    })
  }, [])

  const goLightboxNext = useCallback(() => {
    setLightbox((lb) => {
      if (!lb?.sources?.length) return lb
      const len = lb.sources.length
      if (len < 2) return lb
      return { ...lb, index: (lb.index + 1) % len }
    })
  }, [])

  useEffect(() => {
    if (!lightbox) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goLightboxPrev()
      if (e.key === 'ArrowRight') goLightboxNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox, goLightboxPrev, goLightboxNext])

  const toggleMore = (key) => {
    setMoreOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  if (!showcases?.length) return null

  return (
    <section className="section" id="how-we-work" style={{ scrollMarginTop: '100px' }}>
      <div className="work-showcase-list">
        {showcases.map((row) => (
          <ShowcaseArticle
            key={row.key}
            row={row}
            expanded={!!moreOpen[row.key]}
            onToggleMore={() => toggleMore(row.key)}
            onOpenLightbox={setLightbox}
          />
        ))}
      </div>

      {lightbox && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Immagine ingrandita"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            aria-label="Chiudi"
            onClick={closeLightbox}
          >
            ×
          </button>
          {lightbox.sources.length > 1 && (
            <>
              <button
                type="button"
                className="gallery-lightbox-prev"
                aria-label="Immagine precedente"
                onClick={(e) => {
                  e.stopPropagation()
                  goLightboxPrev()
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="gallery-lightbox-next"
                aria-label="Immagine successiva"
                onClick={(e) => {
                  e.stopPropagation()
                  goLightboxNext()
                }}
              >
                ›
              </button>
            </>
          )}
          <img
            src={lightbox.sources[lightbox.index]}
            alt={`${lightbox.title} — immagine ${lightbox.index + 1}`}
            decoding="async"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

function ShowcaseArticle({ row, expanded, onToggleMore, onOpenLightbox }) {
  const [articleRef, imagesReady] = useLoadImagesWhenNear()
  const primary = row.images.slice(0, PREVIEW_COUNT)
  const extra = row.images.slice(PREVIEW_COUNT)
  const hasExtra = extra.length > 0

  return (
    <article ref={articleRef} className="work-showcase-row">
      <div className="work-showcase-copy">
        <h3 className="work-showcase-title">{row.title}</h3>
        <p className="work-showcase-subtitle">{row.subtitle}</p>
        <div className="work-showcase-rule" aria-hidden />
      </div>
      <div className="work-showcase-gallery">
        <div className="work-showcase-grid">
          {primary.map((src, i) => (
            <button
              key={`${row.key}-p-${i}`}
              type="button"
              className="work-showcase-thumb"
              onClick={() =>
                onOpenLightbox({
                  sources: row.images,
                  index: i,
                  title: row.title,
                })
              }
              aria-label={`Ingrandisci: ${row.title}, foto ${i + 1}`}
            >
              {imagesReady ? (
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  sizes={imgSizes}
                />
              ) : (
                <span className="work-showcase-thumb-placeholder" aria-hidden />
              )}
            </button>
          ))}
        </div>
        {hasExtra && (
          <>
            {expanded && (
              <div className="work-showcase-grid work-showcase-grid-extra" aria-label="Altre immagini">
                {extra.map((src, i) => {
                  const n = PREVIEW_COUNT + i + 1
                  return (
                    <button
                      key={`${row.key}-e-${i}`}
                      type="button"
                      className="work-showcase-thumb"
                      onClick={() =>
                        onOpenLightbox({
                          sources: row.images,
                          index: PREVIEW_COUNT + i,
                          title: row.title,
                        })
                      }
                      aria-label={`Ingrandisci: ${row.title}, foto ${n}`}
                    >
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        sizes={imgSizes}
                      />
                    </button>
                  )
                })}
              </div>
            )}
            <p className="work-showcase-more">
              <button
                type="button"
                className="work-showcase-more-btn"
                onClick={onToggleMore}
                aria-expanded={expanded}
              >
                {expanded ? 'Mostra meno' : 'Mostra altri'}
              </button>
            </p>
          </>
        )}
      </div>
    </article>
  )
}

export default HowWeWorkSection
