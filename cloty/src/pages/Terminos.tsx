export default function Terminos() {
  return (
    <div className="container py-5">
      <h1 className="mb-3">Términos y Condiciones</h1>
      <p className="text-muted">Última actualización: {new Date().toLocaleDateString()}</p>
      <h5>1. Aceptación</h5>
      <p>Al usar Cloty, aceptas estos términos. Si no estás de acuerdo, no utilices el servicio.</p>
      <h5>2. Servicio</h5>
      <p>Cloty facilita la identificación y recuperación de prendas en colegios mediante etiquetas NFC y notificaciones a apoderados.</p>
      <h5>3. Uso permitido</h5>
      <p>El servicio debe utilizarse conforme a la normativa del establecimiento y a las leyes vigentes.</p>
      <h5>4. Privacidad</h5>
      <p>Las etiquetas no contienen datos personales; se utilizan identificadores para gestionar la recuperación de prendas.</p>
      <h5>5. Responsabilidad</h5>
      <p>Cloty no garantiza la recuperación de todas las prendas; el servicio se presta de buena fe y esfuerzo razonable.</p>
      <h5>6. Compras de tarjetas</h5>
      <p>Las compras de tarjetas se procesan mediante un proveedor de pago. Los montos, plazos y estados pueden variar según disponibilidad y logística.</p>
      <h5>7. Soporte</h5>
      <p>Para ayuda, contáctanos en soporte@cloty.example.</p>
    </div>
  )
}


