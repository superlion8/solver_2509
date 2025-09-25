import React from 'react';
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import BecomeExpertPage from './pages/BecomeExpertPage.jsx';
import RequestExpertPage from './pages/RequestExpertPage.jsx';

const navLinkClassName = ({ isActive }) => (isActive ? 'active' : undefined);

const Layout = ({ children }) => (
  <>
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary">
        <a href="#/" className="brand" aria-label="Solver home">
          <span className="brand-mark" aria-hidden>◆</span>
          <span className="brand-word">solver</span>
        </a>

        <div className="nav-links">
          <NavLink to="/" end className={navLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/chat" className={navLinkClassName}>
            Solver Chat
          </NavLink>
          <NavLink to="/become-expert" className={navLinkClassName}>
            Become an Expert
          </NavLink>
        </div>

        <a className="nav-cta" href="#/chat">
          Launch chat
        </a>
      </nav>
    </header>

    <main>{children}</main>

    <footer className="footer">
      © {new Date().getFullYear()} Solver · Verified answers. Actionable steps.
    </footer>
  </>
);

const App = () => (
  <HashRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/request-expert" element={<RequestExpertPage />} />
        <Route path="/become-expert" element={<BecomeExpertPage />} />
      </Routes>
    </Layout>
  </HashRouter>
);

export default App;
