import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'
import logo from './img/LOGO-INDACO-DECORI.png'
import Topbar from './components/Topbar'
import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import ProcessSection from './components/ProcessSection'
import GallerySection from './components/GallerySection'
import ContactSection from './components/ContactSection'

function App() {
  const formRef = useRef(null)
  const [formStatus, setFormStatus] = useState({
    state: 'idle',
    message: '',
  })

  const imagesContext1 = import.meta.glob('./img/foto-1/*.{png,jpg,jpeg,svg}', { eager: true })
  const imagesContext2 = import.meta.glob('./img/foto-2/*.{png,jpg,jpeg,svg}', { eager: true })

  const images1 = Object.values(imagesContext1).map((image) => image.default)
  const images2 = Object.values(imagesContext2).map((image) => image.default)

  const galleryImages = images1.concat(images2)

  const services = [
    {
      title: 'Decorazioni d\'interni',
      description:
        'Effetti materici, spatolati, marmorini e finiture che trasformano ogni ambiente.',
    },
    {
      title: 'Restyling facciate',
      description:
        'Soluzioni resistenti e di design per esterni, con palette cromatiche su misura.',
    },
    {
      title: 'Texture personalizzate',
      description:
        'Campioni e prove colore dedicati per trovare la combinazione perfetta.',
    },
  ]

  const processSteps = [
    {
      title: 'Sopralluogo',
      description: 'Analisi degli spazi e consulenza sullo stile desiderato.',
    },
    {
      title: 'Proposta creativa',
      description: 'Moodboard, palette colore e rendering delle finiture.',
    },
    {
      title: 'Applicazione',
      description: 'Esecuzione precisa con materiali di alta gamma e cura dei dettagli.',
    },
  ]

  const stats = [
    { label: 'lavori completati', value: '320+' },
    { label: 'Anni di esperienza', value: '30+' },
  ]

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

        <ServicesSection services={services} />

        <ProcessSection processSteps={processSteps} />

        <GallerySection galleryImages={galleryImages} />

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
