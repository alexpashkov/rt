import React, {Component} from 'react';
import io from 'socket.io-client';

class Lobby extends Component {
  componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => console.log('Connected'));
  }

  render() {
    return <h1>Wellcome to the lobby!</h1>;
  }
}

export default Lobby;
