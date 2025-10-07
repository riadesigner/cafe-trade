import { Link } from 'react-router-dom';

import useFetchDesignerAdmin from '../../../hooks/useFetchDesignerAdmin.js';

import Breadcrumb from '../../../components/Breadcrumb.jsx';
import NotifsLast from '../../../components/NotifsLast.jsx';

export default function DesignerAdminPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '#', title: 'Панель управления', isActive: true },
  ];

  const { user, notifications, nowLoading } = useFetchDesignerAdmin();

  return (
    <>
      <div className="container is-max-desktop desktop-only">        
          <Breadcrumb links={links} />        
      </div>

      <div className="container">        
          <div className="banner is-primary">
            <div className="banner-body">
              <h1 className="sub-title is-size-5-mobile mb-0">
                Добро, пожаловать <nobr>{user && user.name}!</nobr>
              </h1>
            </div>
          </div>        
      </div>

      <div className="container">
      <article>
        123
      </article>        
      </div>
    </>
  );
}
