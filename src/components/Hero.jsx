import { useEffect, useState } from 'react'
import heroPhoto from '../img/foto-1/1.jpg'

function Hero({ stats }) {
  const [isHeroLightboxOpen, setIsHeroLightboxOpen] = useState(false)

  useEffect(() => {
    if (!isHeroLightboxOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsHeroLightboxOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isHeroLightboxOpen])

  return (
    <>
      <section className="hero">
        <div className="hero-content">
        <p className="eyebrow">Indaco Decori</p>
        <h1>Azienda di Adriano e Filippo Simeoni</h1>
        <p className="hero-text">
          Con la collaborazione di mio figlio Filippo realizziamo con cura e passione
          ogni intervento affidatoci al fine di garantire ai nostri clienti affidabilità e precisione
          cercando di soddisfare ogni esigenza portandola alla soluzione più accurata e adatta alle
          proprie necessità.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contatti">
            Prenota una consulenza
          </a>
          <a className="btn btn-ghost" href="#how-we-work">
            Guarda i prima e dopo
          </a>
        </div>
        <div className="stats">
          {stats.map((item) => (
            <div className="stat" key={item.label}>
              <span>{item.value}</span>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
        </div>
        <div className="hero-card">
          <button
            type="button"
            className="hero-image-button"
            aria-label="Apri foto in grande"
            onClick={() => setIsHeroLightboxOpen(true)}
          >
            <img
              className="hero-image"
              src={heroPhoto}
              alt="Dettaglio di finiture e colori per ambienti interni."
              decoding="async"
              fetchPriority="high"
            />
          </button>
          <div className="hero-card-content">
            <h4>
            Oltre 35 anni di esperienza nella decorazione d'interni, per ambienti che emozionano al primo sguardo.
            </h4>
          </div>
        </div>
      </section>
      {isHeroLightboxOpen && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Foto hero ingrandita"
          onClick={() => setIsHeroLightboxOpen(false)}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            aria-label="Chiudi"
            onClick={() => setIsHeroLightboxOpen(false)}
          >
            ×
          </button>
          <img
            src={heroPhoto}
            alt="Dettaglio di finiture e colori per ambienti interni."
            decoding="async"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

export default Hero

