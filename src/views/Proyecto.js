import { Table } from 'antd'
import { clientes } from 'Models/clients'
import { useParams, useHistory } from 'react-router-dom'

const Proyecto = () => {
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'clientName',
      key: 1
    },
    {
      title: 'Lote',
      dataIndex: 'lote',
      key: 2
    },
    {
      title: 'Manzana',
      dataIndex: 'mzn',
      key: 3
    },
    {
      title: 'Precio Total',
      dataIndex: 'precioTotal',
      key: 4
    },
    {
      title: 'Financiamiento pendiente',
      dataIndex: 'mensaalidad',
      key: 5
    }
  ]

  const { slug } = useParams()
  const { push, goBack } = useHistory()

  return (
        <div className="proyecto__container">
            <section className="proyecto__header">
                <h3>Proyecto: { slug }</h3>
                <button onClick={() => goBack() }>Regresar</button>
                <section>

                  <span>
                    <p>Ventas Totales:</p>
                    <p>$15,838,779.00</p>
                  </span>

                  <span>
                  <p>Total Financiado:</p>
                  <p> $15,838,779.00 </p>
                  </span>

                  <span>
                  <p>Cobranza del mes:</p>
                  <p> $15,838,779.00 </p>
                  </span>

                  <span>
                  <p>Financimiento Pendiente:</p>
                  <p> $15,838,779.00 </p>
                  </span>

                </section>
            </section>
            <section className="proyecto__table">
                <Table
                  dataSource={clientes}
                  columns={columns}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => push({ pathname: `/cliente/${record.clientName}` })
                    }
                  }}

                  ></Table>
            </section>

        </div>
  )
}

export default Proyecto
