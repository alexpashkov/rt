import { injectGlobal } from 'react-emotion';
import 'normalize.css/normalize.css';

injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Passion+One');    
    *, *::after, *::before {
      box-sizing: border-box;
      letter-spacing: .02em;
    }
    body {
      margin: 0; 
    } 
`;
