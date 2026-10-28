import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import './styles.css';
import './pages.css';
import './product-gallery.css';
import './homepage-refinement.css';
import './typography.css';
import './category-navigation.css';
import App from './App.jsx';

// Hash routing lets shared interior links reload on GitHub's static hosting.
const Router = import.meta.env.VITE_GITHUB_PAGES === 'true' ? HashRouter : BrowserRouter;
createRoot(document.getElementById('root')).render(<React.StrictMode><Router><App /></Router></React.StrictMode>);
