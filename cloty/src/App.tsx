import './App.css'
import { useEffect, useState } from 'react'
import Nosotros from './pages/Nosotros'
import PreguntasFrecuentes from './pages/PreguntasFrecuentes'
import Contacto from './pages/Contacto'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import PortalPago from './pages/PortalPago'
import MiCuenta from './pages/MiCuenta'
import BoletaDetalle from './pages/BoletaDetalle'
import Terminos from './pages/Terminos'

function Navbar() {
  const isLoggedIn = localStorage.getItem('cloty_isLoggedIn') === 'true'
  function handleLogout(e: React.MouseEvent) {
    e.preventDefault()
    localStorage.removeItem('cloty_isLoggedIn')
    localStorage.removeItem('cloty_current_email')
    window.location.hash = '/'
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top cloty-navbar">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#/">Cloty</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#/nosotros">Nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/preguntas-frecuentes">Preguntas frecuentes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/contacto">Contáctanos</a>
            </li>
            {isLoggedIn ? (
              <li className="nav-item d-flex align-items-center gap-2">
                <a className="nav-link" href="#/dashboard">Dashboard</a>
                <a className="nav-link" href="#/mi-cuenta">Mi cuenta</a>
                <a className="btn btn-outline-danger ms-lg-1" href="#/" onClick={handleLogout}>Salir</a>
              </li>
            ) : (
              <li className="nav-item">
                <a className="btn btn-primary ms-lg-3" href="#/auth">Login / Regístrate</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

function HeroCarousel() {
  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/istockphoto-1340779171-612x612.jpg" className="d-block w-100" alt="Niños en colegio" style={{objectFit: 'cover', maxHeight: '60vh'}} />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3">
            <h5>Recupera prendas perdidas en tu colegio</h5>
            <p>Con Cloty, tus prendas tienen identidad gracias a etiquetas NFC.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/images/rfid-u8-pps-tag-vidalanabilir-d4c-19.jpg" className="d-block w-100" alt="Etiqueta NFC" style={{objectFit: 'cover', maxHeight: '60vh'}} />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3">
            <h5>Conserjes que ayudan</h5>
            <p>Un toque con el lector y avisamos al apoderado en segundos.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/images/1734679466405_副本.png" className="d-block w-100" alt="Cloty etiqueta" style={{objectFit: 'contain', maxHeight: '60vh', backgroundColor: '#f8f9fa'}} />
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3">
            <h5>Simple, rápido y seguro</h5>
            <p>Diseñado para colegios, apoderados y estudiantes.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
        </button>
    </div>
  )
}

function FeatureSection() {
  return (
    <section className="py-5 bg-light border-top border-bottom">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-6">
            <h2 className="fw-bold mb-3">¿Qué es Cloty?</h2>
            <p className="lead mb-3">Un servicio para recuperar ropa perdida en colegios mediante etiquetas NFC cosidas en las prendas.</p>
            <ul className="list-unstyled mb-4">
              <li className="mb-2">✔ Alertas instantáneas al apoderado</li>
              <li className="mb-2">✔ Lectura NFC por el conserje del colegio</li>
              <li className="mb-2">✔ Gestión simple desde tu celular</li>
            </ul>
            <a href="#/auth" className="btn btn-primary btn-lg">Comenzar</a>
          </div>
          <div className="col-12 col-lg-6">
            <img src="/images/rfid-u8-pps-tag-vidalanabilir-d4c-19.jpg" className="img-fluid rounded-4 shadow-sm" alt="Etiqueta NFC en prenda" />
          </div>
        </div>
      </div>
    </section>
  )
}

function GlobalStats() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4 text-center">
          <div className="col-6 col-lg-3">
            <div className="p-4 border rounded-4">
              <div className="display-6 fw-bold">+120</div>
              <div className="text-muted">Colegios usando Cloty</div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="p-4 border rounded-4">
              <div className="display-6 fw-bold">+38K</div>
              <div className="text-muted">Prendas recuperadas</div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="p-4 border rounded-4">
              <div className="display-6 fw-bold">98%</div>
              <div className="text-muted">Casos resueltos</div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="p-4 border rounded-4">
              <div className="display-6 fw-bold">24h</div>
              <div className="text-muted">Tiempo medio de aviso</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-4 bg-dark text-light mt-auto">
      <div className="container d-flex flex-column flex-lg-row justify-content-between align-items-center gap-3">
        <span>© {new Date().getFullYear()} Cloty. Todos los derechos reservados.</span>
        <ul className="nav">
          <li className="nav-item"><a className="nav-link px-2 text-light" href="#/nosotros">Nosotros</a></li>
          <li className="nav-item"><a className="nav-link px-2 text-light" href="#/preguntas-frecuentes">Preguntas frecuentes</a></li>
          <li className="nav-item"><a className="nav-link px-2 text-light" href="#/contacto">Contáctanos</a></li>
          <li className="nav-item"><a className="nav-link px-2 text-light" href="#/terminos">Términos y condiciones</a></li>
        </ul>
      </div>
    </footer>
  )
}

function App() {
  const [route, setRoute] = useState<string>(window.location.hash.replace('#', '') || '/')

  useEffect(() => {
    function onHashChange() {
      setRoute(window.location.hash.replace('#', '') || '/')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function renderRoute() {
    const path = route.split('?')[0]
    switch (path) {
      case '/':
        return (
          <>
            <HeroCarousel />
            <FeatureSection />
            <GlobalStats />
          </>
        )
      case '/nosotros':
        return <Nosotros />
      case '/preguntas-frecuentes':
        return <PreguntasFrecuentes />
      case '/contacto':
        return <Contacto />
      case '/auth':
        return <Auth />
      case '/dashboard': {
        const isLoggedIn = localStorage.getItem('cloty_isLoggedIn') === 'true'
        if (!isLoggedIn) {
          window.location.hash = '/auth'
          return null
        }
        return <Dashboard />
      }
      case '/portal-pagos': {
        const isLoggedIn = localStorage.getItem('cloty_isLoggedIn') === 'true'
        if (!isLoggedIn) {
          window.location.hash = '/auth'
          return null
        }
        return <PortalPago />
      }
      case '/boleta': {
        const isLoggedIn = localStorage.getItem('cloty_isLoggedIn') === 'true'
        if (!isLoggedIn) {
          window.location.hash = '/auth'
          return null
        }
        return <BoletaDetalle />
      }
      case '/mi-cuenta': {
        const isLoggedIn = localStorage.getItem('cloty_isLoggedIn') === 'true'
        if (!isLoggedIn) {
          window.location.hash = '/auth'
          return null
        }
        return <MiCuenta />
      }
      case '/terminos':
        return <Terminos />
      default:
        return <Nosotros />
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main>
        {renderRoute()}
      </main>
      <Footer />
    </div>
  )
}

export default App
