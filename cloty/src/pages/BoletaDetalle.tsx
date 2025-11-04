import { useEffect, useMemo, useState } from 'react'

type Invoice = { id: string; date: string; total: number; items: { name: string; qty: number; unit: number; subtotal: number }[]; payment?: { method: 'card' | 'bank'; last4: string } }
const INVOICES_BASE = 'cloty_invoices_v1'
function userKey(base: string) { const email = localStorage.getItem('cloty_current_email') || 'guest'; return `${base}_${email}` }

function readArray<T>(key: string): T[] { try { return JSON.parse(localStorage.getItem(key) || '[]') as T[] } catch { return [] } }

function useInvoiceFromHash(): Invoice | null {
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  useEffect(() => {
    function parse() {
      const hash = window.location.hash
      const queryIndex = hash.indexOf('?')
      let id = ''
      if (queryIndex >= 0) {
        const params = new URLSearchParams(hash.slice(queryIndex + 1))
        id = params.get('id') || ''
      }
      if (!id) return setInvoice(null)
      const invoices = readArray<Invoice>(userKey(INVOICES_BASE))
      const found = invoices.find(i => i.id === id) || null
      setInvoice(found)
    }
    parse()
    window.addEventListener('hashchange', parse)
    return () => window.removeEventListener('hashchange', parse)
  }, [])
  return invoice
}

export default function BoletaDetalle() {
  const invoice = useInvoiceFromHash()
  const summary = useMemo(() => {
    if (!invoice) return null
    const item = invoice.items?.[0]
    return {
      qty: item?.qty ?? 0,
      unit: item?.unit ?? 0,
      subtotal: item?.subtotal ?? 0,
    }
  }, [invoice])

  if (!invoice) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">No se encontró la boleta. Vuelve a <a href="#/dashboard">Dashboard</a>.</div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="m-0">Boleta {invoice.id}</h1>
        <a className="btn btn-outline-secondary" href="#/dashboard">Volver</a>
      </div>
      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Detalle de compra</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead><tr><th>Producto</th><th>Cantidad</th><th>Unitario</th><th>Subtotal</th></tr></thead>
                  <tbody>
                    {invoice.items.map((it, idx) => (
                      <tr key={idx}><td>{it.name}</td><td>{it.qty}</td><td>${it.unit.toLocaleString('es-CL')}</td><td>${it.subtotal.toLocaleString('es-CL')}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end fw-bold">Total: ${invoice.total.toLocaleString('es-CL')}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Pago</h5>
              {invoice.payment ? (
                <>
                  <div className="d-flex justify-content-between"><span>Método</span><span>{invoice.payment.method === 'card' ? 'Tarjeta' : 'Cuenta bancaria'}</span></div>
                  <div className="d-flex justify-content-between"><span>Últimos dígitos</span><span>***{invoice.payment.last4}</span></div>
                </>
              ) : (
                <div className="text-muted">Sin información de método (compra previa).</div>
              )}
              <hr />
              <div className="d-flex justify-content-between"><span>Fecha</span><span>{new Date(invoice.date).toLocaleString()}</span></div>
              {summary && <div className="d-flex justify-content-between"><span>Tarjetas totales</span><span>{summary.qty}</span></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


