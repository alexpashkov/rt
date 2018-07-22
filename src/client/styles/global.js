import { injectGlobal } from 'react-emotion';
import 'normalize.css/normalize.css';

injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Changa+One');
    *, *::after, *::before {
      box-sizing: border-box;
    }
    html {
      font-family: 'Changa One', cursive;
      font-size: 62.5%;
    }
    body {
      margin: 0; 
      font-size: 1.6rem;
      * {
        letter-spacing: 0.03em !important;
      }
    } 
`;
