import { useCallback, useEffect, useState } from 'react'

const PREVIEW_COUNT = 4

function HowWeWorkSection({ showcases }) {
  const [lightbox, setLightbox] = useState(null)
  const [moreOpen, setMoreOpen] = useState({})

  const closeLightbox = useCallback(() => setLightbox(null), [])

  useEffect(() => {
    if (!lightbox) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox])

  const toggleMore = (key) => {
    setMoreOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  if (!showcases?.length) return null

  return (
    <section className="section" id="how-we-work" style={{ scrollMarginTop: '100px' }}>
      <div className="work-showcase-list">
        {showcases.map((row) => {
          const primary = row.images.slice(0, PREVIEW_COUNT)
          const extra = row.images.slice(PREVIEW_COUNT)
          const hasExtra = extra.length > 0
          const expanded = !!moreOpen[row.key]

          return (
            <article key={row.key} className="work-showcase-row">
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
                        setLightbox({
                          src,
                          alt: `${row.title} — immagine ${i + 1}`,
                        })
                      }
                      aria-label={`Ingrandisci: ${row.title}, foto ${i + 1}`}
                    >
                      <img src={src} alt="" loading="lazy" decoding="async" />
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
                                setLightbox({
                                  src,
                                  alt: `${row.title} — immagine ${n}`,
                                })
                              }
                              aria-label={`Ingrandisci: ${row.title}, foto ${n}`}
                            >
                              <img src={src} alt="" loading="lazy" decoding="async" />
                            </button>
                          )
                        })}
                      </div>
                    )}
                    <p className="work-showcase-more">
                      <button
                        type="button"
                        className="work-showcase-more-btn"
                        onClick={() => toggleMore(row.key)}
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
        })}
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
          <img src={lightbox.src} alt={lightbox.alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}

export default HowWeWorkSection
