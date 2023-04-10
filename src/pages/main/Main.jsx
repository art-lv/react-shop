import logo from '../../images/logo.svg';
import style from './Main.module.css'
import { NavLink } from 'react-router-dom'


const Main = () => {
    return (
        <div className={style.main}>
            <img src={logo} className={style.AppLogo} />
            <NavLink to="/category" className={style.link}>
                Перейти в каталог
            </NavLink>
        </div>
    )
}



export default Main