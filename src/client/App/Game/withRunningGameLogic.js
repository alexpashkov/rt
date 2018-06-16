import { compose, lifecycle } from 'recompose';
import socket from '../../socket';
import socketEvents from '../../../shared/socket-events';

export default compose(
  lifecycle({
    componentDidMount() {},
    componentWillUnmount() {}
  })
);
