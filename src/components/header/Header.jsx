import { NavLink } from "react-router-dom"
import style from './Header.module.css'
import { ToastContainer } from 'react-toastify'

const Header = (props) => {
    return (
        <div className={style.header}>
            {/* <NavLink className={style.link} to="/">Перейти на главную</NavLink>
            <NavLink className={style.link} to="/catalog">Перейти в каталог</NavLink> */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Header