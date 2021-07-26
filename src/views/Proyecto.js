import { Table } from 'antd';
import { clientes } from 'Models/clients'
import { useParams } from 'react-router-dom'


const Proyecto = () => {

    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'clientName',
          key: 1,
        },
        {
          title: 'Lote',
          dataIndex: 'lote',
          key: 2,
        },
        {
          title: 'Manzana',
          dataIndex: 'mzn',
          key: 3,
        },
        {
          title: 'Precio Total',
          dataIndex: 'precioTotal',
          key: 4,
        },
        {
          title: 'Financiamiento pendiente',
          dataIndex: 'mensaalidad',
          key: 5,
        },
      ];

    const { slug } = useParams()

       return (
        <div className="proyecto__container">
            <section className="proyecto__header">
                <h3>Proyecto: { slug }</h3>
            </section>
            <section className="proyecto__table">
                <Table dataSource={clientes} columns={columns}></Table>
            </section>

        </div>
    )
}

export default Proyecto