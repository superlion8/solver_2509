import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const handleExtensionDownload = useCallback((event) => {
    event.preventDefault();
    fetch('/downloads/solver-extension.zip', { method: 'HEAD' })
      .then((response) => {
        if (response.ok) {
          window.location.assign('/downloads/solver-extension.zip');
        } else {
          throw new Error('Missing archive');
        }
      })
      .catch(() => {
        window.alert(
          'Run "npm run package-extension" to generate public/downloads/solver-extension.zip, or load the extension/ folder directly via chrome://extensions.'
        );
      });
  }, []);

  return (
    <div className="home">
    <section className="hero">
      <div>
        <p className="eyebrow">Verified answers. Actionable steps.</p>
        <h1>Bring AI speed and human certainty together.</h1>
        <p>
          Solver pairs Gemini 2.5 Pro with proven operators. Explore ideas with AI, then invite domain experts to
          validate the output, stress-test the plan, and stay on to execute.
        </p>
        <div className="cta-row">
          <Link className="cta" to="/chat">
            Launch Solver Chat
          </Link>
          <button className="cta secondary" type="button" onClick={handleExtensionDownload}>
            Download Browser Extension
          </button>
        </div>
      </div>
      <div className="card">
        <h3>How Solver works</h3>
        <ol>
          <li>Ask a question inside Solver Chat powered by Gemini 2.5 Pro.</li>
          <li>Tap “double check with an expert” to validate facts and fill gaps.</li>
          <li>Kick off deeper engagements with the same vetted operator.</li>
        </ol>
      </div>
    </section>

    <section>
      <h2 className="section-title">For leaders shipping real work</h2>
      <p className="section-subtitle">
        Solver is built for operators owning GTM, analytics, compliance, finance, and product launch programs. Every
        answer comes with a path to accountable delivery.
      </p>
      <div className="card-grid">
        <div className="card">
          <h3>Trusted validation</h3>
          <p>
            Invite seasoned specialists to audit AI answers. Receive redlines, risk callouts, and citations so you can act
            with confidence.
          </p>
        </div>
        <div className="card">
          <h3>Actionable plans</h3>
          <p>
            Experts transform AI drafts into workback schedules, hiring plans, or compliance playbooks without leaving the
            workspace.
          </p>
        </div>
        <div className="card">
          <h3>Seamless everywhere</h3>
          <p>
            Highlight any response in ChatGPT or Gemini and the Solver extension will route it to the right expert in two
            clicks.
          </p>
        </div>
      </div>
    </section>

    <section className="two-column">
      <div className="feature">
        <strong>Solver Chat</strong>
        <p>
          Access the in-browser experience right here or continue the conversation at{' '}
          <a href="https://solver.chat" target="_blank" rel="noreferrer">
            solver.chat
          </a>
          .
        </p>
      </div>
      <div className="feature">
        <strong>Work with experts</strong>
        <p>
          Ready for a human in the loop?{' '}
          <Link to="/request-expert">Share your brief</Link> and we will match you with a vetted operator in hours, not
          weeks.
        </p>
      </div>
      <div className="feature">
        <strong>Join the network</strong>
        <p>
          Operators with deep domain expertise can{' '}
          <Link to="/become-expert">apply here</Link> to earn from rapid fact-checks and scoped projects.
        </p>
      </div>
    </section>
    </div>
  );
};

export default HomePage;
