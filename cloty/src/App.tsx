import './App.css'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">Cloty</a>
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
              <a className="nav-link" href="/nosotros">Nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/preguntas-frecuentes">Preguntas frecuentes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contacto">Contáctanos</a>
            </li>
            <li className="nav-item">
              <a className="btn btn-primary ms-lg-3" href="/auth">Login / Regístrate</a>
            </li>
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
            <a href="/auth" className="btn btn-primary btn-lg">Comenzar</a>
          </div>
          <div className="col-12 col-lg-6">
            <img src="/images/rfid-u8-pps-tag-vidalanabilir-d4c-19.jpg" className="img-fluid rounded-4 shadow-sm" alt="Etiqueta NFC en prenda" />
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
          <li className="nav-item"><a className="nav-link px-2 text-light" href="/nosotros">Nosotros</a></li>
          <li className="nav-item"><a className="nav-link px-2 text-light" href="/preguntas-frecuentes">Preguntas frecuentes</a></li>
          <li className="nav-item"><a className="nav-link px-2 text-light" href="/contacto">Contáctanos</a></li>
        </ul>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main>
        <HeroCarousel />
        <FeatureSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
