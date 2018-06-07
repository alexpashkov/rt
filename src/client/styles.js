import { injectGlobal } from 'react-emotion';
import 'normalize.css/normalize.css';

injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Passion+One');    
    *, *::after, *::before {
      box-sizing: border-box;
      letter-spacing: .02em;
    }
    body {
      font-family: 'Passion One', sans-serif;
      color: white;
      background-color: #19141a;
      margin: 0; 
    }
    h1, h2, h3, h4, h5, h6 {
      color: red;
    }
`;
