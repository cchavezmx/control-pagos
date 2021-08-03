import { useState } from 'react'
import { Modal } from 'antd'

const Cliente = ({ history, location }) => {

  const [expediente, setExpediente] = useState(false)
  const handleModal = () => setExpediente(!expediente)

  console.log(history, location)

  return (
        <div className="cliente__App__container">
            <section className="cliente__App__header">
                {/* <button onClick={() => goBack() }>Regresar</button> */}
            </section>

            <section className="cliente__App__body">
                    <h3>Nombre del Cliente</h3>
                    <button onClick={handleModal}>
                        Ver Expediente
                    </button>

                <div>
                      TABLA DE DATOS DEL LOTES
                </div>
                <section className="cliente__App__pagos">
                    <h3> PAGOS </h3>
                    <p>ESTATUS DE PAGO 8/60</p>
                    <div>
                        TABLA DE PAGOS
                    </div>
                </section>
            </section>
            <Modal
                title="Expediente del Cliente"
                visible={expediente}
                onOk={handleModal}

            >
                <p>Nombre: NOMBRE DEL CLIENTE</p>
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
