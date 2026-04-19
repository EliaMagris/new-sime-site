function Hero({ stats }) {
  return (
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
        <div className="hero-image" />
        <div className="hero-card-content">
          <h4>
            Tonalità calde, neutri sofisticati e tocchi decisi per ambienti
            che parlano di te.
          </h4>
        </div>
      </div>
    </section>
  )
}

export default Hero

