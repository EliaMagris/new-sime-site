import { useEffect, useRef } from 'react'

function ServicesSection() {
  const sectionRef = useRef(null)

  const internalServices = [
    {
      title: 'Sistemi in Cartongesso e Isolamento Termico interno',
      description:
        'Progettiamo soluzioni in cartongesso per ridisegnare gli spazi: velette con LED integrati, pareti divisorie acustiche e interventi mirati di isolamento termico interno (cappotto) per migliorare l’efficienza energetica.',
    },
    {
      title: 'Risanamento Pareti e Trattamenti Antimuffa',
      description:
        'Interveniamo su pareti ammalorate da umidità e muffe con cicli di risanamento certificati, garantendo ambienti sani e finiture durature per abitazioni private ed uffici.',
    },
    {
      title: 'Tinteggiature Professionali e Verniciature',
      description:
        'Realizziamo tinteggiature per interni ed esterni con prodotti di alta gamma, traspiranti ed eco-compatibili all’acqua. Dall\'appartamento privato al condominio, garantiamo una copertura perfetta, massima pulizia del cantiere e una consulenza cromatica personalizzata.',
    },
    {
      title: 'Decorazioni Materiche e Finiture di Pregio',
      description:
        'Trasformiamo le tue pareti in opere d’arte con tecniche decorative moderne: dal perlescente agli effetti materici contemporanei.',
    },
    {
      title: 'Posa Carta da Parati e Rivestimenti Murali',
      description:
        'Posa professionale di carte da parati e rivestimenti murali: parati vinilici lavabili, fibre naturali ed elementi tecnici per qualsiasi ambiente. Applicazione precisa e grande attenzione alla simmetria dei decori.',
    },
    {
      title: 'Trattamento Legno per Interni ed Esterni',
      description:
        'Trattiamo e proteggiamo il legno con cicli di impregnanti e vernici all’acqua ad alta penetrazione per travi a vista, sottotetti, serramenti e recinzioni, proteggendo la fibra da raggi UV, funghi e intemperie.',
    },
  ]

  const externalServices = [
        {
      title: 'Isolamento Termico a Cappotto',
      description:
        'Realizziamo sistemi di isolamento a cappotto, curando con precisione i punti critici per eliminare i ponti termici, ridurre i consumi energetici e prevenire la formazione di muffe interne.',
    },
    {
      title: 'Rivestimenti a Spessore e Finiture Decorative da Esterno',
      description:
        'Applichiamo rivestimenti a spessore e finiture materiche per esterni che garantiscono uniformità cromatica, estetica moderna e una resistenza agli urti superiore alle normali pitture.',
    },
    {
      title: 'Rifacimento Facciate e Pitture in Autopulente',
      description:
        'Utilizziamo cicli di pittura autopulente ad alta idrorepellenza che permettono alle pareti di mantenersi pulite nel tempo, con colori vividi e superfici protette dagli agenti atmosferici.',
    },
  ]

  useEffect(() => {
    const sectionEl = sectionRef.current
    if (!sectionEl) return

    const elements = sectionEl.querySelectorAll('[data-animate-on-scroll]')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section services-section"
      id="servizi"
      style={{ scrollMarginTop: '100px' }}
    >
      <div className="services-row services-row--internal">
        <div className="services-intro animate-on-scroll" data-animate-on-scroll>
          <p className="eyebrow">Interni</p>
          <h2>Opere interne curate in ogni dettaglio.</h2>
          <p>
            Dalla semplice tinteggiatura alle decorazioni materiche più ricercate, progettiamo e
            realizziamo interventi per interni pensati su misura per il tuo stile e le esigenze di
            ogni ambiente.
          </p>
        </div>

        <div className="services-cards">
          {internalServices.map((service, index) => (
            <article
              key={service.title}
              className="service-card animate-on-scroll"
              data-animate-on-scroll
              style={{ transitionDelay: `${0.05 * index}s` }}
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="services-row services-row--external">
        <div className="services-intro animate-on-scroll" data-animate-on-scroll>
          <p className="eyebrow">Esterni</p>
          <h2>Interventi esterni duraturi e sicuri.</h2>
          <p>
            Ci occupiamo di facciate, cappotti termici e finiture decorative per esterni, con
            materiali certificati e tecniche applicative che garantiscono prestazioni e bellezza nel
            tempo.
          </p>
        </div>

        <div className="services-cards">
          {externalServices.map((service, index) => (
            <article
              key={service.title}
              className="service-card animate-on-scroll"
              data-animate-on-scroll
              style={{ transitionDelay: `${0.05 * index}s` }}
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection

