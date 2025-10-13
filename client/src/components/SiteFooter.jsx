import { Link, NavLink, useLocation } from 'react-router-dom';

export default function SiteFooter(){
    // const location = useLocation();
    return (
        <>
        
        <div className="section container is-max-desktop mt-6">
            
                <div className="level mt-6">
                    <div className="level-item is-left">
                        <Link to="/">
                            <div style={{
                                padding:'10px',
                                display:'inline-block',                                                                
                                background:'#eaeaea',
                                margin:'0 auto',
                            }}>LOGO</div>
                        </Link>
                    </div>
                    <hr className="mobile-only" />
                    <div className="level-item is-right yo-footer-menu">                
                        
                        <NavLink to="/about"
                        className={({ isActive }) => isActive ? "level-item nav-link is-active mb-4-mobile mr-4 mr-0-mobile" : "level-item nav-link mb-4-mobile mr-4 mr-0-mobile" }
                        >О бирже</NavLink>

                        <NavLink to="/login" 
                        className={({ isActive }) => isActive ? "level-item nav-link is-active mb-4-mobile " : "level-item nav-link mb-4-mobile " }
                        >Войти</NavLink>

                    </div>                
                </div>
            
        </div>

        <div className="site-footer mt-5">
            <br/>
        </div>       

        </>
    )
} 