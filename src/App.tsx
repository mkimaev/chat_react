
import './App.css'
import { NavLink, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Icon, Menu, MenuItem } from 'semantic-ui-react'

function App() {

  return (
    <>
      <ToastContainer position='top-right' hideProgressBar theme='colored' />
      <Menu fixed='top' color='teal' stackable>
        <MenuItem as={NavLink} to='/'>
          <img alt='logo' src='nix_logo.png' />
        </MenuItem>

        <MenuItem as={NavLink} to='/chat' >
          <Icon name='chat' size='large' />
        </MenuItem>

      </Menu>

      <main style={{ marginTop: '50px' }}>
        <Outlet />
      </main>

    </>
  )
}

export default App
