import { useEffect, useMemo, useState } from 'react'

type ReadStat = { date: string; count: number }
type BillingData = { schoolName: string; taxId: string; bank: string; account: string; address: string; city: string; contactEmail: string }
type Invoice = { id: string; date: string; total: number; items: { name: string; qty: number; unit: number; subtotal: number }[]; payment?: { method: 'card' | 'bank'; last4: string } }
type Order = { id: string; createdAt: string; qty: number; status: 'Preparando' | 'En tránsito' | 'Entregado' }

const READS_KEY = 'cloty_reads_v1'
const BILLING_BASE = 'cloty_billing_v1'
const INVOICES_BASE = 'cloty_invoices_v1'
const ORDERS_BASE = 'cloty_orders_v1'
const PENDING_BASE = 'cloty_pending_cart_v1'
function userKey(base: string) { const email = localStorage.getItem('cloty_current_email') || 'guest'; return `${base}_${email}` }

function readArray<T>(key: string): T[] {
  try { return JSON.parse(localStorage.getItem(key) || '[]') as T[] } catch { return [] }
}
function writeArray<T>(key: string, value: T[]) { localStorage.setItem(key, JSON.stringify(value)) }

function ensureSampleReads() {
  const existing = readArray<ReadStat>(READS_KEY)
  if (existing.length) return existing
  const today = new Date()
  const sample: ReadStat[] = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (13 - i))
    return { date: d.toISOString().slice(0, 10), count: Math.floor(5 + Math.random() * 40) }
  })
  writeArray(READS_KEY, sample)
  return sample
}

function BarChart({ data }: { data: ReadStat[] }) {
  const max = Math.max(...data.map(d => d.count), 1)
  return (
    <div className="d-flex align-items-end gap-2" style={{ height: 160 }}>
      {data.map((d, idx) => (
        <div key={idx} className="bg-primary" title={`${d.date}: ${d.count}`}
          style={{ width: 16, height: Math.round((d.count / max) * 150) }} />
      ))}
    </div>
  )
}

function StatsPanel() {
  const [reads, setReads] = useState<ReadStat[]>([])
  useEffect(() => { setReads(ensureSampleReads()) }, [])
  const total = useMemo(() => reads.reduce((a, b) => a + b.count, 0), [reads])
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title m-0">Estadísticas de lecturas (14 días)</h5>
        </div>
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded-3">
              <div className="text-muted">Lecturas totales</div>
              <div className="fs-3 fw-bold">{total}</div>
            </div>
          </div>
          <div className="col-12 col-md-8">
            <BarChart data={reads} />
          </div>
        </div>
      </div>
    </div>
  )
}

function parseCsvNames(content: string): string[] {
  return content
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean)
    .map(l => l.split(',')[0].trim())
}

function CartPanel() {
  const [csvText, setCsvText] = useState('')
  const [students, setStudents] = useState<string[]>([])
  const TAG_PRICE = 1200 // CLP por tarjeta (ejemplo)
  const qty = students.length * 6
  const total = qty * TAG_PRICE

  function importCsv() {
    const names = parseCsvNames(csvText)
    setStudents(names)
  }

  function goToPayment() {
    if (!qty) return
    localStorage.setItem(userKey(PENDING_BASE), JSON.stringify({ qty, unit: TAG_PRICE, total }))
    window.location.hash = '/portal-pagos'
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Comprar tarjetas</h5>
        <p className="text-muted">Sube un CSV con una columna de nombres (una fila por alumno). Se generan 6 tarjetas por alumno.</p>
        <div className="mb-3">
          <textarea className="form-control" rows={6} placeholder="Ejemplo:\nJuan Pérez\nMaría López" value={csvText} onChange={e => setCsvText(e.target.value)} />
        </div>
        <div className="d-flex gap-2 mb-3">
          <button className="btn btn-outline-secondary" onClick={importCsv}>Generar carrito</button>
          <button className="btn btn-primary" disabled={!qty} onClick={goToPayment}>Comprar</button>
        </div>
        <div className="row g-3">
          <div className="col-12 col-lg-6">
            <h6>Alumnos ({students.length})</h6>
            <ul className="list-group small">
              {students.map((s, i) => <li key={i} className="list-group-item d-flex justify-content-between"><span>{s}</span><span className="text-muted">x6</span></li>)}
            </ul>
          </div>
          <div className="col-12 col-lg-6">
            <h6>Resumen</h6>
            <div className="p-3 bg-light rounded-3">
              <div className="d-flex justify-content-between"><span>Tarjetas</span><span>{qty}</span></div>
              <div className="d-flex justify-content-between"><span>Precio unitario</span><span>${TAG_PRICE.toLocaleString('es-CL')}</span></div>
              <hr />
              <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>${total.toLocaleString('es-CL')}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BillingPanel() {
  const [data, setData] = useState<BillingData>({ schoolName: '', taxId: '', bank: '', account: '', address: '', city: '', contactEmail: '' })
  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem(userKey(BILLING_BASE)) || 'null') as BillingData | null; if (saved) setData(saved) } catch {}
  }, [])
  function save(e: React.FormEvent) {
    e.preventDefault()
    localStorage.setItem(userKey(BILLING_BASE), JSON.stringify(data))
    alert('Datos guardados')
  }
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Datos bancarios y de facturación</h5>
        <form className="row g-3" onSubmit={save}>
          <div className="col-md-6"><label className="form-label">Colegio</label><input className="form-control" value={data.schoolName} onChange={e => setData({ ...data, schoolName: e.target.value })} /></div>
          <div className="col-md-6"><label className="form-label">RUT / Tax ID</label><input className="form-control" value={data.taxId} onChange={e => setData({ ...data, taxId: e.target.value })} /></div>
          <div className="col-md-6"><label className="form-label">Banco</label><input className="form-control" value={data.bank} onChange={e => setData({ ...data, bank: e.target.value })} /></div>
          <div className="col-md-6"><label className="form-label">Cuenta</label><input className="form-control" value={data.account} onChange={e => setData({ ...data, account: e.target.value })} /></div>
          <div className="col-md-8"><label className="form-label">Dirección</label><input className="form-control" value={data.address} onChange={e => setData({ ...data, address: e.target.value })} /></div>
          <div className="col-md-4"><label className="form-label">Ciudad</label><input className="form-control" value={data.city} onChange={e => setData({ ...data, city: e.target.value })} /></div>
          <div className="col-md-6"><label className="form-label">Email de contacto</label><input type="email" className="form-control" value={data.contactEmail} onChange={e => setData({ ...data, contactEmail: e.target.value })} /></div>
          <div className="col-12"><button className="btn btn-success" type="submit">Guardar</button></div>
        </form>
      </div>
    </div>
  )
}

function InvoicesPanel() {
  const invoices = readArray<Invoice>(userKey(INVOICES_BASE))
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Boletas</h5>
        {invoices.length === 0 ? (
          <div className="text-muted">Aún no hay boletas.</div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead><tr><th>ID</th><th>Fecha</th><th>Total</th><th>Ítems</th><th></th></tr></thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv.id}>
                    <td>{inv.id}</td>
                    <td>{new Date(inv.date).toLocaleString()}</td>
                    <td>${inv.total.toLocaleString('es-CL')}</td>
                    <td>{inv.items.map(i => `${i.name} x${i.qty}`).join(', ')}</td>
                    <td className="text-end"><a className="btn btn-sm btn-outline-primary" href={`#/boleta?id=${inv.id}`}>Ver</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function ShippingPanel() {
  const [orders, setOrders] = useState<Order[]>([])
  useEffect(() => { setOrders(readArray<Order>(userKey(ORDERS_BASE))) }, [])
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Estado de envío</h5>
        {orders.length === 0 ? <div className="text-muted">No hay envíos registrados.</div> : (
          <div className="table-responsive">
            <table className="table">
              <thead><tr><th>Orden</th><th>Creada</th><th>Cantidad</th><th>Estado</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{new Date(o.createdAt).toLocaleString()}</td>
                    <td>{o.qty}</td>
                    <td><span className="badge text-bg-secondary">{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [tab, setTab] = useState<'stats' | 'cart' | 'billing' | 'invoices' | 'shipping'>('stats')
  return (
    <div className="container py-4">
      <h1 className="mb-3">Dashboard del colegio</h1>
      <ul className="nav nav-pills mb-3 gap-2">
        <li className="nav-item"><button className={`btn btn-sm ${tab==='stats'?'btn-primary':'btn-outline-primary'}`} onClick={() => setTab('stats')}>Estadísticas</button></li>
        <li className="nav-item"><button className={`btn btn-sm ${tab==='cart'?'btn-primary':'btn-outline-primary'}`} onClick={() => setTab('cart')}>Comprar tarjetas</button></li>
        <li className="nav-item"><button className={`btn btn-sm ${tab==='billing'?'btn-primary':'btn-outline-primary'}`} onClick={() => setTab('billing')}>Datos de facturación</button></li>
        <li className="nav-item"><button className={`btn btn-sm ${tab==='invoices'?'btn-primary':'btn-outline-primary'}`} onClick={() => setTab('invoices')}>Boletas</button></li>
        <li className="nav-item"><button className={`btn btn-sm ${tab==='shipping'?'btn-primary':'btn-outline-primary'}`} onClick={() => setTab('shipping')}>Estado de envío</button></li>
      </ul>
      {tab === 'stats' && <StatsPanel />}
      {tab === 'cart' && <CartPanel />}
      {tab === 'billing' && <BillingPanel />}
      {tab === 'invoices' && <InvoicesPanel />}
      {tab === 'shipping' && <ShippingPanel />}
    </div>
  )
}


