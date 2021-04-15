/** @jsxRuntime classic */
/** @jsx jsx */
import { Box } from '@material-ui/core';
import { css, jsx } from '@emotion/react';
import QueryCard from './components/QueryCard'

const App = () => {
  return (
    <Box
      className="App"
      clone
      css={css`
        text-align: center;
      `}
    >
      <header
        className="App-header"
        css={css`
          background-color: #282c34;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: calc(10px + 2vmin);
          color: white;
        `}
      >
        <QueryCard />
      </header>
    </Box>
  );
}

export default App;
