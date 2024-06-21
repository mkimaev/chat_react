
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <ToastContainer autoClose={500} position='top-right' hideProgressBar  />
        <App />
    </>

)
