function ServicesSection({ services }) {
  return (
    <section className="section highlight" id="servizi" style={{ scrollMarginTop: '100px' }}>
      <div className="section-title">
        <p className="eyebrow">Servizi</p>
        <h2>Soluzioni su misura.</h2>
        <p>
          Dalle pareti interne alle facciate esterne, proponiamo finiture
          esclusive con un approccio sartoriale.
        </p>
      </div>
      <div className="grid">
        {services.map((service) => (
          <article className="card" key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection

