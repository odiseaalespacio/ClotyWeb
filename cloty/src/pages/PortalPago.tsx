import { useEffect, useState } from 'react'

type Invoice = { id: string; date: string; total: number; items: { name: string; qty: number; unit: number; subtotal: number }[]; payment?: { method: 'card' | 'bank'; last4: string } }
type Order = { id: string; createdAt: string; qty: number; status: 'Preparando' | 'En tránsito' | 'Entregado' }

const INVOICES_BASE = 'cloty_invoices_v1'
const ORDERS_BASE = 'cloty_orders_v1'
const PENDING_BASE = 'cloty_pending_cart_v1'
function userKey(base: string) { const email = localStorage.getItem('cloty_current_email') || 'guest'; return `${base}_${email}` }

function readArray<T>(key: string): T[] { try { return JSON.parse(localStorage.getItem(key) || '[]') as T[] } catch { return [] } }
function writeArray<T>(key: string, value: T[]) { localStorage.setItem(key, JSON.stringify(value)) }

// Validaciones simplificadas: sin Luhn ni proveedores reales

// Se elimina validación de fecha de vencimiento (sin chequeos de MM/YY)

export default function PortalPago() {
  const [pending, setPending] = useState<{ qty: number; unit: number; total: number } | null>(null)
  const [method, setMethod] = useState<'card' | 'bank'>('card')
  // Tarjeta
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardMonth, setCardMonth] = useState('')
  const [cardYear, setCardYear] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  // Se elimina 3D Secure según requerimiento
  const [cardRut, setCardRut] = useState('')
  // Cuenta bancaria
  const [bankName, setBankName] = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [bankRut, setBankRut] = useState('')
  const [bankPassword, setBankPassword] = useState('')
  const [showBankPwd, setShowBankPwd] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    try { const p = JSON.parse(localStorage.getItem(userKey(PENDING_BASE)) || 'null') as { qty: number; unit: number; total: number } | null; if (p) setPending(p) } catch {}
  }, [])

  function onlyDigits(v: string) { return v.replace(/\D/g, '') }
  function formatCard(v: string) { return v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ').trim() }
  function handleCardNumberInput(e: React.ChangeEvent<HTMLInputElement>) { setCardNumber(formatCard(e.target.value)) }

  // Formateo de RUT: solo números + DV (sin validar), cuerpo-DV
  function formatRut(v: string) {
    const clean = v.replace(/[^0-9kK]/g, '').toUpperCase()
    if (clean.length <= 1) return clean
    const body = clean.slice(0, -1)
    const dv = clean.slice(-1)
    return `${body}-${dv}`
  }

  function onCancel(e: React.FormEvent) {
    e.preventDefault()
    window.location.hash = '/dashboard'
  }

  function onPay(e: React.FormEvent) {
    e.preventDefault()
    if (!pending) return setStatus('No hay un carrito pendiente')
    if (method === 'card') {
      const digits = onlyDigits(cardNumber)
      if (digits.length !== 16) return setStatus('Número de tarjeta debe tener 16 dígitos')
      if (cardName.trim().length < 3) return setStatus('Nombre del titular inválido')
      if (!/^\d{3,4}$/.test(cardCvv)) return setStatus('CVV inválido')
    } else {
      if (!bankName.trim()) return setStatus('Selecciona o ingresa un banco')
      if (!/^\d{6,20}$/.test(bankAccount)) return setStatus('Número de cuenta inválido')
      if (!bankPassword) return setStatus('Contraseña bancaria requerida')
    }
    const last4 = method === 'card' ? onlyDigits(cardNumber).slice(-4) : bankAccount.slice(-4)
    const inv: Invoice = {
      id: `BOL-${Date.now()}`,
      date: new Date().toISOString(),
      total: pending.total,
      items: [{ name: 'Tarjeta NFC Cloty', qty: pending.qty, unit: pending.unit, subtotal: pending.total }],
      payment: { method, last4 },
    }
    const ord: Order = { id: `ORD-${Date.now()}`, createdAt: new Date().toISOString(), qty: pending.qty, status: 'Preparando' }
    const invoices = readArray<Invoice>(userKey(INVOICES_BASE))
    const orders = readArray<Order>(userKey(ORDERS_BASE))
    invoices.unshift(inv); writeArray(userKey(INVOICES_BASE), invoices)
    orders.unshift(ord); writeArray(userKey(ORDERS_BASE), orders)
    localStorage.removeItem(userKey(PENDING_BASE))
    setStatus('Pago aprobado. Redirigiendo...')
    setTimeout(() => { window.location.hash = `/boleta?id=${inv.id}` }, 800)
  }

  return (
    <div className="container py-5" style={{ maxWidth: 720 }}>
      <div className="text-center mb-4">
        <div className="fw-bold">Portal de Pagos</div>
        <div className="text-muted small">Proveedor de pagos</div>
      </div>
      {!pending ? (
        <div className="alert alert-warning">No hay un carrito pendiente.</div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row g-4">
              <div className="col-12 col-lg-6">
                <h6 className="mb-3">Resumen</h6>
                <div className="d-flex justify-content-between"><span>Producto</span><span>Tarjeta NFC Cloty</span></div>
                <div className="d-flex justify-content-between"><span>Cantidad</span><span>{pending.qty}</span></div>
                <div className="d-flex justify-content-between"><span>Precio unitario</span><span>${pending.unit.toLocaleString('es-CL')}</span></div>
                <hr />
                <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>${pending.total.toLocaleString('es-CL')}</span></div>
              </div>
              <div className="col-12 col-lg-6">
                <h6 className="mb-3">Datos de pago</h6>
                <form className="row g-3" onSubmit={onPay}>
                  <div className="col-12">
                    <div className="btn-group" role="group">
                      <input type="radio" className="btn-check" name="method" id="methodCard" checked={method==='card'} onChange={() => setMethod('card')} />
                      <label className="btn btn-outline-primary" htmlFor="methodCard">Tarjeta</label>
                      <input type="radio" className="btn-check" name="method" id="methodBank" checked={method==='bank'} onChange={() => setMethod('bank')} />
                      <label className="btn btn-outline-primary" htmlFor="methodBank">Cuenta bancaria</label>
                    </div>
                  </div>

                  {method === 'card' ? (
                    <>
                      <div className="col-12"><label className="form-label">Número de tarjeta</label><input className="form-control" placeholder="xxxx xxxx xxxx xxxx" inputMode="numeric" value={cardNumber} onChange={handleCardNumberInput} /></div>
                      <div className="col-12"><label className="form-label">Titular</label><input className="form-control" placeholder="Como aparece en la tarjeta" value={cardName} onChange={e => setCardName(e.target.value)} /></div>
                      <div className="col-6"><label className="form-label">Mes (MM)</label><input className="form-control" placeholder="MM" inputMode="numeric" maxLength={2} value={cardMonth} onChange={e => setCardMonth(e.target.value.replace(/\D/g,'').slice(0,2))} /></div>
                      <div className="col-6"><label className="form-label">Año (YY)</label><input className="form-control" placeholder="YY" inputMode="numeric" maxLength={2} value={cardYear} onChange={e => setCardYear(e.target.value.replace(/\D/g,'').slice(0,2))} /></div>
                      <div className="col-6"><label className="form-label">CVV</label><input className="form-control" placeholder="3 o 4 dígitos" value={cardCvv} onChange={e => setCardCvv(e.target.value)} /></div>
                      <div className="col-12"><label className="form-label">RUT titular</label><input className="form-control" placeholder="12345678-9" value={cardRut} onChange={e => setCardRut(formatRut(e.target.value))} /></div>
                    </>
                  ) : (
                    <>
                      <div className="col-12"><label className="form-label">Banco</label><input className="form-control" placeholder="Nombre del banco" value={bankName} onChange={e => setBankName(e.target.value)} /></div>
                      <div className="col-12"><label className="form-label">Número de cuenta</label><input className="form-control" placeholder="000123456789" value={bankAccount} onChange={e => setBankAccount(e.target.value)} /></div>
                      <div className="col-12"><label className="form-label">RUT / Cédula</label><input className="form-control" placeholder="12345678-9" value={bankRut} onChange={e => setBankRut(formatRut(e.target.value))} /></div>
                      <div className="col-12"><label className="form-label">Contraseña banca en línea</label><div className="input-group"><input className="form-control" type={showBankPwd ? 'text' : 'password'} value={bankPassword} onChange={e => setBankPassword(e.target.value)} /><button type="button" className="btn btn-outline-secondary" onClick={() => setShowBankPwd(s => !s)}>{showBankPwd ? 'Ocultar' : 'Mostrar'}</button></div></div>
                    </>
                  )}

                  <div className="col-12 d-flex gap-2">
                    <button className="btn btn-success" type="submit">Pagar</button>
                    <button className="btn btn-outline-secondary" onClick={onCancel}>Cancelar</button>
                    {status && <span className={status.startsWith('Pago') ? 'text-success' : 'text-danger'}>{status}</span>}
                  </div>
                </form>
              </div>
            </div>
            <div className="text-muted small mt-3">Transacción segura mediante proveedor de pago.</div>
          </div>
        </div>
      )}
    </div>
  )
}


