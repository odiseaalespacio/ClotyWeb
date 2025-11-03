import { useState } from 'react'

export default function Contacto() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  function validateEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
  }

  function validatePhone(v: string) {
    return /^\+?[0-9\s()-]{7,15}$/.test(v)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return setStatus('Nombre es requerido')
    if (!validateEmail(email)) return setStatus('Email inválido')
    if (!validatePhone(phone)) return setStatus('Teléfono inválido')
    if (!subject.trim()) return setStatus('Asunto es requerido')
    if (message.trim().length < 10) return setStatus('Mensaje muy corto')
    // Persistencia mínima opcional en localStorage
    const list = JSON.parse(localStorage.getItem('cloty_contacts_v1') || '[]')
    list.push({ id: Date.now(), name, email, phone, subject, message, createdAt: new Date().toISOString() })
    localStorage.setItem('cloty_contacts_v1', JSON.stringify(list))
    setName(''); setEmail(''); setPhone(''); setSubject(''); setMessage('')
    setStatus('¡Mensaje enviado!')
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Contáctanos</h1>
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          <div className="p-4 bg-light rounded-4 h-100">
            <h5 className="mb-3">Información</h5>
            <p className="mb-2"><strong>Soporte:</strong> soporte@cloty.example</p>
            <p className="mb-2"><strong>Ventas:</strong> ventas@cloty.example</p>
            <p className="mb-2"><strong>Teléfono:</strong> +56 2 2345 6789</p>
            <p className="mb-2"><strong>Horario:</strong> Lun a Vie, 09:00–18:00</p>
            <p className="mb-0"><strong>Dirección:</strong> Av. Siempre Viva 123, Santiago, Chile</p>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="p-4 border rounded-4 h-100">
            <h5 className="mb-3">¿Por qué elegir Cloty?</h5>
            <ul className="mb-0">
              <li>Reducción de pérdidas y reposiciones.</li>
              <li>Aviso inmediato a apoderados vía conserjería.</li>
              <li>Implementación simple y soporte dedicado.</li>
            </ul>
          </div>
        </div>
      </div>
      <form className="row g-3" onSubmit={onSubmit} noValidate>
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Teléfono</label>
          <input className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Asunto</label>
          <input className="form-control" value={subject} onChange={e => setSubject(e.target.value)} />
        </div>
        <div className="col-12">
          <label className="form-label">Mensaje</label>
          <textarea rows={5} className="form-control" value={message} onChange={e => setMessage(e.target.value)} />
        </div>
        <div className="col-12 d-flex gap-2 align-items-center">
          <button type="submit" className="btn btn-primary">Enviar</button>
          {status && <span className={status.startsWith('¡') ? 'text-success' : 'text-danger'}>{status}</span>}
        </div>
      </form>
    </div>
  )
}


