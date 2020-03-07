import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from 'shared/App';

export default function Root() {
    return (
        <BrowserRouter>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </BrowserRouter>
    );
}