import { useEffect, useState } from 'react'
import logoFallback from '../img/LOGO-INDACO-DECORI.png'

const NAV_LINKS = [
  { href: '#servizi', label: 'Servizi' },
  { href: '#processo', label: 'Processo' },
  { href: '#how-we-work', label: 'Come lavoriamo' },
  { href: '#contatti', label: 'Contatti' },
]

function Topbar({ logo = logoFallback }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onResize = () => {
      if (window.matchMedia('(min-width: 901px)').matches) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="topbar">
      <div className="topbar-slice topbar-slice-brand">
        <div className="brand">
          <img src={logo} alt="" decoding="async" />
          <div className="brand-text">
            <p className="brand-title">Indaco Decori</p>
            <span className="brand-subtitle">Decorazioni artistiche</span>
          </div>
        </div>
      </div>

      <div className="topbar-slice topbar-slice-tools">
        <button
          type="button"
          className={`topbar-menu-toggle ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="topbar-nav-drawer"
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
        >
          <span className="topbar-hamburger" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav className="nav nav--desktop" aria-label="Navigazione principale">
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn btn-outline topbar-cta" href="#contatti">
          Richiedi un preventivo
        </a>
      </div>

      <div
        id="topbar-nav-drawer"
        className={`topbar-drawer ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="topbar-drawer-nav" aria-label="Navigazione principale">
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div
        className={`topbar-backdrop ${menuOpen ? 'is-visible' : ''}`}
        aria-hidden="true"
        onClick={closeMenu}
      />
    </header>
  )
}

export default Topbar
