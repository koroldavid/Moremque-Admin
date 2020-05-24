import { createBrowserHistory } from 'history';
import qhistory                 from 'qhistory';
import { parse, stringify }     from 'query-string';
import config                   from './config';


const history = qhistory(
    createBrowserHistory({ basename: config.basename }),
    stringify,
    parse
);

export default history;