import { injectGlobal } from 'react-emotion';
import 'normalize.css/normalize.css';

injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Bowlby+One+SC');
    *, *::after, *::before {
      box-sizing: border-box;
      letter-spacing: .04em;
    }
    html {
      font-size: 62.5%;  
    }
    body {
      margin: 0; 
      font-family: 'Bowlby One SC', cursive;
      font-size: 1.4rem;
    } 
`;
