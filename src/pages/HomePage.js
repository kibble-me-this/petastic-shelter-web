import { Helmet } from 'react-helmet-async';
// sections
import HomeView from 'src/sections/_home/view';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>The Web3 Ecosystem for all Animals | ANYMALS</title>
      </Helmet>

      <HomeView />
    </>
  );
}
