import logoFallback from '../img/LOGO-INDACO-DECORI.png'

function Topbar({ logo = logoFallback }) {
  return (
    <header className="topbar">
      <div className="brand">
        <img src={logo} alt="Indaco Decori logo" />
        <div>
          <p className="brand-title">Indaco Decori</p>
          <span className="brand-subtitle">Decorazioni artistiche</span>
        </div>
      </div>
      <nav className="nav">
        <a href="#servizi">Servizi</a>
        <a href="#processo">Processo</a>
        <a href="#gallery">Gallery</a>
        <a href="#contatti">Contatti</a>
      </nav>
      <a className="btn btn-outline" href="#contatti">
        Richiedi un preventivo
      </a>
    </header>
  )
}

export default Topbar

