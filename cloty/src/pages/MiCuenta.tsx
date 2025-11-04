import { useEffect, useState } from 'react'

type User = { id: number; name: string; email: string; phone: string; address: string; rut?: string; password: string; createdAt: string }

export default function MiCuenta() {
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [rut, setRut] = useState('')
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const email = localStorage.getItem('cloty_current_email') || ''
    const users = JSON.parse(localStorage.getItem('cloty_users_v1') || '[]') as User[]
    const u = users.find(x => x.email.toLowerCase() === email.toLowerCase()) || null
    if (u) {
      setUser(u)
      setName(u.name || '')
      setPhone(u.phone || '')
      setAddress(u.address || '')
      setRut(u.rut || '')
    }
  }, [])

  function onSave(e: React.FormEvent) {
    e.preventDefault()
    setStatus('')
    if (!user) return
    const users = JSON.parse(localStorage.getItem('cloty_users_v1') || '[]') as User[]
    const idx = users.findIndex(x => x.id === user.id)
    if (idx === -1) return setStatus('Usuario no encontrado')
    users[idx].name = name.trim()
    users[idx].phone = phone.trim()
    users[idx].address = address.trim()
    // RUT no se modifica
    if (newPwd) {
      if (!currentPwd) return setStatus('Ingresa tu contraseña actual para cambiarla')
      if (currentPwd !== users[idx].password) return setStatus('Contraseña actual incorrecta')
      users[idx].password = newPwd
    }
    localStorage.setItem('cloty_users_v1', JSON.stringify(users))
    if (newPwd) {
      // Si cambió la contraseña, cerrar sesión y volver a login
      localStorage.removeItem('cloty_isLoggedIn')
      localStorage.removeItem('cloty_current_email')
      setStatus('Contraseña actualizada. Redirigiendo a login...')
      setTimeout(() => { window.location.hash = '/auth' }, 500)
    } else {
      setStatus('Datos actualizados')
    }
    setCurrentPwd(''); setNewPwd('')
  }

  if (!user) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">No hay sesión activa.</div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Mi Cuenta</h1>
      <form className="row g-3" onSubmit={onSave}>
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input className="form-control" value={user.email} disabled />
        </div>
        <div className="col-md-6">
          <label className="form-label">Teléfono</label>
          <input className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Dirección</label>
          <input className="form-control" value={address} onChange={e => setAddress(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">RUT</label>
          <input className="form-control" value={rut} disabled />
        </div>
        <div className="col-12"><hr /></div>
        <div className="col-md-6">
          <label className="form-label">Contraseña actual</label>
          <input type="password" className="form-control" value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Nueva contraseña</label>
          <input type="password" className="form-control" value={newPwd} onChange={e => setNewPwd(e.target.value)} />
          <div className="form-text">Déjala en blanco si no deseas cambiarla.</div>
        </div>
        <div className="col-12 d-flex gap-2 align-items-center">
          <button className="btn btn-success" type="submit">Guardar cambios</button>
          {status && <span className={status.startsWith('Datos') ? 'text-success' : 'text-danger'}>{status}</span>}
        </div>
      </form>
    </div>
  )
}


