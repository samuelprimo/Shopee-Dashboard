import { NavLink, Outlet } from "react-router-dom";
import "./style.scss"
import { GoHomeFill } from "react-icons/go";
import { GoGraph } from "react-icons/go";
import { HiDatabase } from "react-icons/hi";
import { LuLogOut, LuUserCircle2 } from "react-icons/lu";
import {useAuth} from '../../contexts/Auth/Auth'


export function Sidebar() {
    const { Logout, user } = useAuth();
    return ( 
        <div className="page">  
            <aside className="Sidebar">
            <img src="../assets/Icon-Shopee.webp"/> 
            <hr color="#F1F1F1" />
                <nav>
                    <NavLink className={({isActive})=> `navlink ${isActive ? "active" : ""}`} to={"/Home/Dashboard"}><GoHomeFill size={24}/> Dashboard</NavLink>
                    <NavLink className={({isActive})=> `navlink ${isActive ? "active" : ""}`} to={"/Home/Graficos"}><GoGraph size={24}/>Gráficos</NavLink>
                    {user.access_level == 1 && (<NavLink className={({isActive})=> `navlink ${isActive ? "active" : ""}`}   to={"/Home/Usuarios"}><HiDatabase size={24}/>Usuários</NavLink>)}
                    <hr color="#f1f1f1"/>
                    <NavLink className={({isActive})=> `navlink ${isActive ? "active" : ""}`} to={"/Home/Perfil"}><LuUserCircle2 size={24}/>Perfil</NavLink>
                    <button onClick={() =>{Logout()}}><LuLogOut size={24}/> Logout</button>
                </nav>
            </aside>
            <Outlet />
        </div>
    );
}