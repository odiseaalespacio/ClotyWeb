import { useState } from 'react'

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
}

function validatePhone(v: string) {
  return /^\+?[0-9\s()-]{7,15}$/.test(v)
}

function validatePassword(v: string) {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v)
}

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [rut, setRut] = useState('')
  const [password, setPassword] = useState('')
  const [registerStatus, setRegisterStatus] = useState('')

  function formatRut(v: string) {
    const clean = v.replace(/[^0-9kK]/g, '').toUpperCase()
    if (clean.length <= 1) return clean
    const body = clean.slice(0, -1)
    const dv = clean.slice(-1)
    return `${body}-${dv}`
  }

  function onLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!validateEmail(loginEmail)) return setLoginStatus('Email inválido')
    if (!loginPassword) return setLoginStatus('Contraseña requerida')
    // Demo local: comparar contra localStorage si existe
    const users = JSON.parse(localStorage.getItem('cloty_users_v1') || '[]') as any[]
    const user = users.find(u => (u.email || '').toLowerCase() === loginEmail.toLowerCase())
    if (!user) return setLoginStatus('Usuario no encontrado')
    if ((user.password || '') !== loginPassword) return setLoginStatus('Contraseña incorrecta')
    localStorage.setItem('cloty_isLoggedIn', 'true')
    localStorage.setItem('cloty_current_email', loginEmail)
    window.location.hash = '/dashboard'
  }

  function onRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return setRegisterStatus('Nombre es requerido')
    if (!validateEmail(email)) return setRegisterStatus('Email inválido')
    if (!validatePhone(phone)) return setRegisterStatus('Teléfono inválido')
    if (address.trim().length < 5) return setRegisterStatus('Dirección inválida')
    if (!validatePassword(password)) return setRegisterStatus('Contraseña insegura (min 8, con letras y números)')
    if (!rut || rut.length < 3) return setRegisterStatus('RUT requerido')
    const users = JSON.parse(localStorage.getItem('cloty_users_v1') || '[]') as any[]
    if (users.some(u => (u.email || '').toLowerCase() === email.toLowerCase())) return setRegisterStatus('Email ya registrado')
    users.push({ id: Date.now(), name, email, phone, address, rut, password, createdAt: new Date().toISOString() })
    localStorage.setItem('cloty_users_v1', JSON.stringify(users))
    setRegisterStatus('Registro exitoso. Redirigiendo a login...')
    setName(''); setEmail(''); setPhone(''); setAddress(''); setRut(''); setPassword('')
    setTimeout(() => setMode('login'), 400)
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="m-0">{mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}</h1>
        <div className="btn-group">
          <button className={`btn btn-outline-primary ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>Login</button>
          <button className={`btn btn-outline-primary ${mode === 'register' ? 'active' : ''}`} onClick={() => setMode('register')}>Registro</button>
        </div>
      </div>

      {mode === 'login' ? (
        <form className="row g-3" onSubmit={onLogin} noValidate>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
          </div>
          <div className="col-12 d-flex gap-2 align-items-center">
            <button type="submit" className="btn btn-primary">Entrar</button>
            {loginStatus && <span className={loginStatus.startsWith('¡') ? 'text-success' : 'text-danger'}>{loginStatus}</span>}
          </div>
        </form>
      ) : (
        <form className="row g-3" onSubmit={onRegister} noValidate>
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
            <label className="form-label">Dirección</label>
            <input className="form-control" value={address} onChange={e => setAddress(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">RUT</label>
            <input className="form-control" placeholder="12345678-9" value={rut} onChange={e => setRut(formatRut(e.target.value))} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
            <div className="form-text">Mínimo 8 caracteres, incluir letras y números.</div>
          </div>
          <div className="col-12 d-flex gap-2 align-items-center">
            <button type="submit" className="btn btn-success">Crear cuenta</button>
            {registerStatus && <span className={registerStatus.startsWith('Registro') ? 'text-success' : 'text-danger'}>{registerStatus}</span>}
          </div>
        </form>
      )}
    </div>
  )
}


