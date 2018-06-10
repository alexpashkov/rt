import React from 'react';
import { PacmanLoader } from 'react-spinners';

const CenteredSpinner = () => (
  <div
    css={`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    `}
  >
    <PacmanLoader color="red" />
  </div>
);

export default CenteredSpinner;
