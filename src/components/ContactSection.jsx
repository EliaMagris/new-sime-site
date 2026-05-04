import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

function ContactSection({ formRef, formStatus, onSubmit }) {
  const [validationMessage, setValidationMessage] = useState('')

  const handleSubmit = (event) => {
    const formEl = formRef?.current ?? event.currentTarget
    if (!formEl.checkValidity()) {
      event.preventDefault()
      setValidationMessage('*Cortesemente compilare tutte le sezioni*')
      return
    }

    setValidationMessage('')
    onSubmit(event)
  }

  return (
    <section className="section contact" id="contatti">
      <div className="contact-info">
        <p className="eyebrow">Contatti</p>
        <h2>Parliamo del tuo prossimo progetto.</h2>
        <p>
          Raccontaci l'idea e ti contatteremo per un sopralluogo e un
          preventivo dedicato.
        </p>
        <div className="contact-card">
          <h3>Indaco Decori</h3>
          <p>Decorazioni interne ed esterne con finiture artistiche.</p>
          <div className="contact-details">
            <span>+39 335 613 2110</span>
            <span>+39 389 947 4164</span>
            <span>indacodecori@gmail.com</span>
            <span>Pordenone e provincia</span>
            <div className="contact-phone-actions">
              <a
                href="tel:+393356132110"
                className="contact-phone-link contact-phone-call"
              >
                <span className="contact-phone-icon">☎</span>
                <span>Chiama</span>
              </a>
              <a
                href="https://wa.me/393356132110"
                className="contact-phone-link contact-phone-whatsapp"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-phone-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <form
        className="form"
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        onInput={() => validationMessage && setValidationMessage('')}
      >
        <div className="form-row">
          <label>
            Nome e cognome
            <input
              type="text"
              name="user_name"
              placeholder="Inserisci il tuo nome"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="user_email"
              placeholder="nome@email.com"
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Telefono
            <input
              type="tel"
              name="user_phone"
              placeholder="+39 000 0000000"
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Indirizzo
            <input
              type="text"
              name="user_address"
              placeholder="Via, numero civico, città"
              autoComplete="street-address"
              required
            />
          </label>
        </div>
        <label>
          Messaggio
          <textarea
            name="message"
            placeholder="Descrivi il progetto e le esigenze"
            rows="5"
            required
          />
        </label>
        <button className="btn btn-primary" type="submit" disabled={formStatus.state === 'loading'}>
          {formStatus.state === 'loading' ? 'Invio in corso...' : 'Invia richiesta'}
        </button>
        {validationMessage ? <p className="form-status error">{validationMessage}</p> : null}
        {formStatus.message ? (
          <p className={`form-status ${formStatus.state}`}>{formStatus.message}</p>
        ) : null}
      </form>
    </section>
  )
}

export default ContactSection

