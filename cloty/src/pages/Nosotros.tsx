export default function Nosotros() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Nosotros</h1>
      <p className="lead">Cloty nace para ayudar a colegios y familias a recuperar prendas extraviadas.</p>
      <p>Integramos etiquetas NFC resistentes a lavado y un flujo simple para alertar al apoderado cuando una prenda es encontrada.</p>

      <div className="row g-4 mt-2">
        <div className="col-12 col-lg-4">
          <div className="p-4 border rounded-4 h-100">
            <h5>Misión</h5>
            <p className="mb-0">Reducir al mínimo la pérdida de prendas en colegios, conectando rápidamente a conserjería con apoderados mediante tecnología NFC.</p>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="p-4 border rounded-4 h-100">
            <h5>Visión</h5>
            <p className="mb-0">Convertirnos en el estándar de identificación de prendas escolares en Latinoamérica, con procesos simples y seguros.</p>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="p-4 border rounded-4 h-100">
            <h5>Valores</h5>
            <ul className="mb-0">
              <li>Seguridad y privacidad</li>
              <li>Simpleza y rapidez</li>
              <li>Compromiso con la comunidad escolar</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-12 col-lg-6">
          <div className="p-4 bg-light rounded-4 h-100">
            <h5>Impacto</h5>
            <ul className="mb-0">
              <li>+120 colegios usando Cloty</li>
              <li>+38.000 prendas recuperadas</li>
              <li>98% de casos resueltos</li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="p-4 bg-light rounded-4 h-100">
            <h5>Cómo funciona</h5>
            <ol className="mb-0">
              <li>Cosido de etiqueta NFC en la prenda</li>
              <li>Lectura por conserjería al encontrarla</li>
              <li>Alerta inmediata al apoderado</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}


