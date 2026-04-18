import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'
import logo from './img/LOGO-INDACO-DECORI.png'
import Topbar from './components/Topbar'
import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import ProcessSection from './components/ProcessSection'
import HowWeWorkSection from './components/HowWeWorkSection'
import ContactSection from './components/ContactSection'

function App() {
  const formRef = useRef(null)
  const [formStatus, setFormStatus] = useState({
    state: 'idle',
    message: '',
  })

  /** Immagini “Come lavoriamo”: cartelle dedicate (solo aggiungere/rimuovere file, nomi ordinati 1,2,3…) */
  const imagesEsterni = import.meta.glob('./img/lavori-esterni/*.{png,jpg,jpeg,svg}', { eager: true })
  const imagesInterni = import.meta.glob('./img/lavori-interni/*.{png,jpg,jpeg,svg}', { eager: true })

  const sortImageModules = (ctx) =>
    Object.keys(ctx)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }))
      .map((key) => ctx[key].default)

  const processSteps = [
    {
      title: 'Sopralluogo',
      description: 'Analisi degli spazi e consulenza sullo stile desiderato.',
    },
    {
      title: 'Proposta creativa',
      description: 'Palette colore e rendering delle finiture.',
    },
    {
      title: 'Applicazione',
      description: 'Esecuzione precisa con materiali di alta gamma e cura dei dettagli.',
    },
  ]

  const stats = [
    { label: 'Anni di esperienza', value: '30+' },
    { label: 'Lavori completati', value: '2000+' },
    { label: 'Clienti stabili', value: '300+' },
  ]

  const workShowcaseDefs = [
    {
      title: 'Ristrutturazione esterni',
      subtitle: 'prima e dopo',
      images: sortImageModules(imagesEsterni),
    },
    {
      title: 'Ristrutturazione interni',
      subtitle: 'prima e dopo',
      images: sortImageModules(imagesInterni),
    },
  ]

  const workShowcases = workShowcaseDefs
    .map((def, index) => {
      if (!def.images?.length) return null
      const { images, ...rest } = def
      return {
        key: `showcase-${index}-${rest.title}`,
        ...rest,
        images,
      }
    })
    .filter(Boolean)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const serviceId = 'service_96w2isy'
    const templateId = 'template_js4sttx'
    const publicKey = 'AdRnlR0aJ8VLmwV96'

    setFormStatus({ state: 'loading', message: 'Invio in corso...' })

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey })
      setFormStatus({
        state: 'success',
        message: 'Messaggio inviato. Ti risponderemo al più presto.',
      })
      formRef.current?.reset()
    } catch (error) {
      console.error(error)
      setFormStatus({
        state: 'error',
        message: 'Non siamo riusciti a inviare il messaggio. Riprova più tardi.',
      })
    }
  }

  return (
    <div className="page">
      <Topbar logo={logo} />

      <main>
        <Hero stats={stats} />

        <ServicesSection />

        <ProcessSection processSteps={processSteps} />

        <HowWeWorkSection showcases={workShowcases} />

        <ContactSection
          formRef={formRef}
          formStatus={formStatus}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  )
}

export default App
