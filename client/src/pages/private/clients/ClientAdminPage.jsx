import useFetchClientAdmin from '../../../hooks/useFetchClientAdmin.js';
import ErrorMessage from '../../../components/ErrorMessage.jsx';

export default function ClientAdminPage() {
  const { user, nowLoading, errorMessage } = useFetchClientAdmin();

  return (
    <>
      {nowLoading ? (
        <>...</>
      ) : (
        <>
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
              {errorMessage && <ErrorMessage message={errorMessage} />}
            </article>
          </div>
        </>
      )}
    </>
  );
}
