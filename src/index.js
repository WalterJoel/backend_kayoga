//No uso {} porque es un import default
import app from './app.js';

import {PORT} from './config.js';

app.listen(PORT);
console.log('listening on http://localhost: ',PORT);
