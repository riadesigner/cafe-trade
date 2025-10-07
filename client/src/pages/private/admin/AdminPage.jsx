import { Link } from 'react-router-dom';

import Breadcrumb from '../../../components/Breadcrumb.jsx';
import NotifsLast from '../../../components/NotifsLast.jsx';

import useFetchAdmin from '../../../hooks/useFetchAdmin.jsx';

export default function DesignerAdminPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '#', title: 'Панель управления', isActive: true },
  ];

  const { user, notifications, nowLoading } = useFetchAdmin();

  return (
    <>

      <div className="container is-max-desktop desktop-only">        
          <Breadcrumb links={links} />        
      </div>

      <div className="container">        
          <div className="banner is-primary">
            <div className="banner-body">
              <h1 className="sub-title is-size-5-mobile mb-0">
                Добро, пожаловать Администратор{' '}
                <nobr>{user && user.name}!</nobr>
              </h1>
            </div>
          </div>      
      </div>
      
    </>
  );
}
