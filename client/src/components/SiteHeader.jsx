import { Link, NavLink, useLocation } from 'react-router-dom';
import SiteMobileMenu from '../components/SiteMobileMenu'

export default function SiteHeader() {    
  
    return (
        <>
        <SiteMobileMenu />
        <section className="container is-fluid">        
        <div className="section">

            <NavLink to="/">
            <div className="logo">
                Кофейная биржа
            </div>
            </NavLink>      
                  
        </div>            
        </section>
        </>
  )
}
