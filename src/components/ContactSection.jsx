function ContactSection({ formRef, formStatus, onSubmit }) {
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
            <span>+39 333 123 4567</span>
            <span>info@indacodecori.it</span>
            <span>Milano e provincia</span>
          </div>
        </div>
      </div>
      <form className="form" ref={formRef} onSubmit={onSubmit}>
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
            />
          </label>
          <label>
            Indirizzo e provincia
            <input
              type="text"
              name="user_address"
              placeholder="Inserisci il tuo indirizzo e provincia"
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
        {formStatus.message ? (
          <p className={`form-status ${formStatus.state}`}>{formStatus.message}</p>
        ) : null}
      </form>
    </section>
  )
}

export default ContactSection

