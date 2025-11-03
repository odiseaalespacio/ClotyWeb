export default function PreguntasFrecuentes() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Preguntas frecuentes</h1>
      <div className="accordion" id="faq">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">¿Cómo funciona Cloty?</button>
          </h2>
          <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faq">
            <div className="accordion-body">Etiquetas NFC cosidas a la prenda. El conserje las lee y se notifica al apoderado.</div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">¿Sirve con lavado?</button>
          </h2>
          <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faq">
            <div className="accordion-body">Sí, las etiquetas son resistentes al uso y lavado estándar.</div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">¿Necesito instalar una app?</button>
          </h2>
          <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faq">
            <div className="accordion-body">No, todo se gestiona desde el navegador.</div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">¿Qué pasa con la privacidad?</button>
          </h2>
          <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faq">
            <div className="accordion-body">Cloty no expone datos personales en las etiquetas. Solo se usan para identificar la prenda y avisar al apoderado.</div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">¿Cuánto demora un envío de tarjetas?</button>
          </h2>
          <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faq">
            <div className="accordion-body">Generalmente entre 3 y 7 días hábiles, dependiendo de la ciudad.</div>
          </div>
        </div>
      </div>
    </div>
  )
}


