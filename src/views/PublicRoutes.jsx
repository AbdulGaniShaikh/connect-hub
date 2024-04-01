import PageLoading from 'components/shared/PageLoading';
import useIsLoggedIn from 'hooks/useIsLoggedIn';
import { Outlet } from 'react-router-dom';

const PublicRoutes = () => {
  const [loading] = useIsLoggedIn();
  return (
    <>
      <PageLoading loading={loading}>
        <Outlet />
      </PageLoading>
    </>
  );
};

export default PublicRoutes;
