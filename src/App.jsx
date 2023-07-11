import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { loader as LandingLoader } from './pages/Landing';
import { loader as singleCocktailLoader } from './pages/Cocktail';
import { action, action as newsletterAction } from './pages/Newsletter';
import {
  About,
  HomeLayout,
  Newsletter,
  Cocktail,
  Landing,
  Error,
  SinglePageError,
} from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/about',
        element: <About />,
      },
      {
        // path: '/landing',
        // index true krdia to path ki zaroorat ni
        element: <Landing />,
        index: true,
        loader: LandingLoader(queryClient),
        errorElement: <SinglePageError />,
      },
      {
        path: '/cocktail/:id',
        element: <Cocktail />,
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
      },
      {
        path: '/newsletter',
        element: <Newsletter />,
        action: action,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
