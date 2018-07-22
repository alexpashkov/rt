import { injectGlobal } from 'react-emotion';
import 'normalize.css/normalize.css';

injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Comfortaa:700|Passion+One');
    *, *::after, *::before {
      box-sizing: border-box;
    }
    html {
      font-size: 62.5%;  
    }
    body {
      margin: 0; 
      font-size: 1.5rem;
      line-height: 1.5;
      font-family: 'Comfortaa', cursive;
      font-weight: 700;
    } 
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Passion One', cursive;
      letter-spacing: 0.05em;
    }
`;
