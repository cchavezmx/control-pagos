import { useState, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import NuevoPoject from 'Modales/NuevoProject'
import Buscador from './Buscador'

// contexto
import { AppContext } from 'context/AppContextProvider'
import ModalAddUserProject from 'Modales/ModalAddUserProject'

const HamburgerButton = () => {

  const { handleModalPago } = useContext(AppContext)

  const location = useLocation()
  const history = useHistory()
  const params = location.pathname.split('/')
  console.log(params)

  const idPoject = () => {
    if (params.includes('proyecto')) {
      return params[params.length - 1]
    }
  }
  
  const [openHamburger, setOpenHAmburger] = useState(true)
  const toggleHaburger = () => setOpenHAmburger(!openHamburger)

  const [openProject, setOpenProject] = useState(false)
  const handleProjectModal = () => setOpenProject(!openProject)

  const [handleAddUser, setHandledAddUser] = useState(false)
  const toogleHandledUser = () => setHandledAddUser(!handleAddUser)

  return (
    <>
      <div 
        id='hamburgerBtn' 
        onClick={toggleHaburger}
        className={ openHamburger ? 'hamburger_btn' : 'hamburger_btn hamburger_btn_open'}>
        <div/>
        <div/>
        <div/>
    </div>
    <div hidden={openHamburger} className="menu__hiden__hamburger">

      <nav className="menu__hamburger">

        <h4>Buscar usuario</h4>
        <Buscador></Buscador>
        <hr/>
        { location.pathname === '/' &&
        <>
          <button className="menu__hamburger__btn__red">
          <div className="ico__user__morosos"></div>
            Usuarios Morosos
          </button>
          <div className="separacion__menu" />
          <button 
            className="btn__esmeralda"
            onClick={() => handleProjectModal()}>
              <div className="ico__proyecto" ></div>
              Añadir Proyecto
          </button>
          <button
            className="btn__esmeralda"
            >
            <div className="ico__editar"></div>
            Editar Proyecto
          </button>        
        </>
        }

        { params.includes('proyecto') && !params.includes('cliente') && 
        <>
          <button
          onClick={() => history.push({ pathname: `/proyecto/${idPoject()}/cliente/nuevo`, state: { proyecto: idPoject() } })}
          className="btn__esmeralda"
          >
          <div className="ico__user"></div>
            Nuevo Cliente
          </button>

          <button
          onClick={toogleHandledUser}
          className="btn__esmeralda"
          >
          <div className="ico__user__normal"></div>
            Agregar Cliente
          </button>
          
          <div className="separacion__menu" />
          <button className="menu__hamburger__btn__red">
            <div className="ico__user__morosos"></div>
              Remover Cliente
          </button>
        </>
        }

        {
          params.includes('cliente') && !params.includes('nuevo') && 
        <>
          <button
            className="btn__esmeralda"
            onClick={() => handleModalPago()}
            >
            <div className="invoice__ico"></div>
            Generar Pago
          </button>

          <div className="separacion__menu" />
        </>
        }

      </nav>
    </div>
    <NuevoPoject visible={openProject} onCancel={handleProjectModal} />
    <ModalAddUserProject visible={handleAddUser} onCancel={setHandledAddUser} />
  </>
  )
}

export default HamburgerButton
