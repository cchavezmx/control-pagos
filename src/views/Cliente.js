import { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Table, Modal } from 'antd'
import { clientes } from 'Models/clients'

const columns = [
  {
    title: 'Enganche',
    dataIndex: 'enganche',
    key: 10
  },
  {
    title: 'Financiamiento',
    dataIndex: 'financiamiento',
    key: 20
  },
  {
    title: 'Proyecto',
    dataIndex: 'proyecto',
    key: 20
  },
  {
    title: 'Lote',
    dataIndex: 'lote',
    key: 40
  },
  {
    title: 'Manzana',
    dataIndex: 'mzn',
    key: 50
  },
  {
    title: 'Plazo',
    dataIndex: 'plazo',
    key: 60
  },
  {
    title: 'Precio Total',
    dataIndex: 'precioTotal',
    key: 70
  },
  {
    title: 'Termino',
    dataIndex: 'termino',
    key: 80
  },
  {
    title: 'Mesualidad',
    dataIndex: 'mensaalidad',
    key: 90
  }
]

const Cliente = () => {
  const { goBack } = useHistory()
  const { slug } = useParams()
  const dataClient = clientes.filter((cliente) => cliente.clientName === slug)

  const [expediente, setExpediente] = useState(false)
  const handleModal = () => setExpediente(!expediente)

  const pagosColumns = [
    {
      title: 'Mes',
      dataIndex: 'mes',
      key: 100
    },
    {
      title: 'Pago',
      dataIndex: 'pago',
      key: 200
    },
    {
      title: 'Referencia Pago',
      dataIndex: 'refpago',
      key: 300
    }

  ]
  const pagos = [
    {
      mes: 'Abril',
      pago: '$ 3500',
      refpago: 'KUXTAL_03424457'
    },
    {
      mes: 'Mayo',
      pago: '$ 3500',
      refpago: 'KUXTAL_03424457'
    },
    {
      mes: 'Junio',
      pago: '$ 3500',
      refpago: 'KUXTAL_03424457'
    },
    {
      mes: 'Julio',
      pago: '$ 3500',
      refpago: 'KUXTAL_03424457'
    }
  ]

  return (
        <div className="cliente__App__container">
            <section className="cliente__App__header">
                <button onClick={() => goBack() }>Regresar</button>
            </section>

            <section className="cliente__App__body">
                    <h3>{ slug }</h3>
                    <button onClick={handleModal}>
                        Ver Expediente
                    </button>

                <div>
                    <Table
                        dataSource={dataClient}
                        columns={columns}
                        scroll={true}
                        />
                </div>
                <section className="cliente__App__pagos">
                    <h3> PAGOS </h3>
                    <p>ESTATUS DE PAGO 8/60</p>
                    <div>
                        <Table
                            dataSource={pagos}
                            columns={pagosColumns}
                        />
                    </div>
                </section>
            </section>
            <Modal
                title="Expediente del Cliente"
                visible={expediente}
                onOk={handleModal}

            >
                <p>Nombre: { slug }</p>
                <p>INE</p>
                <p>DIRRECCIÓN</p>
                <p>REFERENCIA</p>
                <p>BANCO</p>
                <p>CUENTA</p>
            </Modal>

        </div>
  )
}

export default Cliente
