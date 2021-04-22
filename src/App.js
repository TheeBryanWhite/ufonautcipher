/** @jsxRuntime classic */
/** @jsx jsx */
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { css, jsx } from '@emotion/react';
import Header from './components/Header';
import QueryCard from './components/QueryCard';
import Footer from './components/Footer';

const App = () => {
  return (
    <Box
      className="App"
      clone
      css={css`
        text-align: center;
      `}
    >
      <Container 
        css={css`
          margin: 1rem;
          @media (min-width: 768px) {
            margin: 2rem;
          }
        `}
      >
        <Header />
        <QueryCard />
        <Footer />
      </Container>
    </Box>
  );
}

export default App;