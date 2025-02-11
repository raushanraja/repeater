/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App, { TabGrid } from './App';
import { Route, Router } from '@solidjs/router';
import Problems from './Pages/Problem';
import { Comparision } from './Pages/Comparision';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
    );
}

render(
    () => (
        <Router root={App}>
            <Route path='/' component={TabGrid} />
            <Route
                path='/hello-world'
                component={() => <h1>Hello World!</h1>}
            />
            <Route path='/practice/:item' component={Problems} />
            <Route path='/comparision' component={Comparision} />
            <Route path='/about' component={() => <h1>About Page!</h1>} />
        </Router>
    ),
    root!
);
