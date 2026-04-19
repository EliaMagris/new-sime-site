function ProcessSection({ processSteps }) {
  return (
    <section className="section split" id="processo" style={{ scrollMarginTop: '100px' }}>
      <div>
        <p className="eyebrow">Metodo</p>
        <h2>Un percorso chiaro, dall' idea alla realizzazione.</h2>
        <p>
          Ogni progetto parte da un ascolto attento delle esigenze e si
          conclude con un risultato che valorizza l'architettura.
        </p>
        <div className="stack">
          {processSteps.map((step, index) => (
            <div className="step" key={step.title}>
              <span>{`0${index + 1}`}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="quote-card">
        <h3>Consulenza creativa dedicata</h3>
        <p>
          Ci avvaliamo di studi di architettura, interior designer per creare soluzioni e campioni personalizzati.
        </p>
        <ul>
          <li>Analisi tecnica dei supporti</li>
          <li>Rendering e prove colore</li>
          <li>Programmazione dei tempi di cantiere</li>
        </ul>
      </div>
    </section>
  )
}

export default ProcessSection

