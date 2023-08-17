import { ErrorPage } from '../pages/error';
import { ForumActionCreate } from '../fuature/forum/actions/create';
import { ForumAnswers } from '../fuature/forum/components/answers';
import { ForumEventsPage } from '../pages/forum/id';
import { ForumPage } from '../pages/forum';
import { ForumTopics } from '../fuature/forum/components/topics';
import { GamePage } from '../pages/game';
import { LeadersPage } from '../pages/leaders';
import { LoginPage } from '../pages/login';
import { NoMatchPage } from '../pages/nomatch/NoMatch';
import { ProfileLayout } from '../layouts/ProfileLayout';
import { ProfilePage } from '../pages/profile';
import { ProgressPage } from '../pages/progress';
import { RegistrationPage } from '../pages/registration';
import { RouteNames } from './routeNames';
import { StartPage } from '../pages/start';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ReactElement } from 'react';
import { useAppDispatch } from '@store/hooks';
import { useQuery } from 'react-query';
import userService from '@services/user.service';
import { setUserAC } from '@store/actions/userAction';

type PrivateRouteProps = {
  children: ReactElement;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(['user'], () => userService.getUser(), {
    enabled: true,
    onSuccess: (data) => {
      dispatch(setUserAC(data));
    },
  });

  const previousPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const authPath = ['/login', '/registration'];
  const isExcludePath: boolean = authPath.includes(previousPath);

  if (isSuccess && isExcludePath && !isLoading) {
    return <Navigate to="/" />;
  } else if (!isSuccess && !isExcludePath && !isLoading) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

type Params = {
  layout?: boolean;
  priv?: boolean;
};

export const SSRRouters = () => {
  const privatRouter = (route: ReactElement, params: Params) => {
    const { layout = false, priv = false } = params;

    if (layout && priv) {
      return (
        <PrivateRoute>
          <ProfileLayout>{route}</ProfileLayout>
        </PrivateRoute>
      );
    } else if (layout && !priv) {
      return <ProfileLayout>{route}</ProfileLayout>;
    } else {
      return { route };
    }
  };

  return (
    <Routes>
      <Route path={RouteNames.START} element={privatRouter(<StartPage />, { layout: true })} />
      <Route path={RouteNames.PROFILE} element={privatRouter(<ProfilePage />, { layout: true })} />
      <Route path={RouteNames.LEADERS} element={privatRouter(<LeadersPage />, { layout: true })} />
      <Route path={RouteNames.FORUM} element={privatRouter(<ForumPage />, { layout: true })} />
      <Route path={RouteNames.FORUM_EVENTS} element={privatRouter(<ForumEventsPage />, { layout: true })} />
      <Route path={RouteNames.PROGRESS} element={privatRouter(<ProgressPage />, { layout: true })} />
      <Route path={RouteNames.NOMATCH} element={privatRouter(<NoMatchPage />, { layout: true })} />
      <Route path={RouteNames.FORUM_TOPICS} element={privatRouter(<ForumTopics />, { layout: true })} />
      <Route path={RouteNames.FORUM_ANSWERS} element={privatRouter(<ForumAnswers />, { layout: true })} />
      <Route path={RouteNames.FORUM_CREATE} element={privatRouter(<ForumActionCreate />, { layout: true })} />
      <Route path={RouteNames.LOGIN} element={privatRouter(<LoginPage />, {})} />
      <Route path={RouteNames.REGISTRATION} element={privatRouter(<RegistrationPage />, {})} />
      <Route path={RouteNames.GAME} element={privatRouter(<GamePage />, {})} />
      <Route path={RouteNames.ERROR} element={<ErrorPage />} />
      <Route path={RouteNames.NOMATCH} element={<NoMatchPage />} />
    </Routes>
  );
};
