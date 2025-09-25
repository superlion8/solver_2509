import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [extensionAvailable, setExtensionAvailable] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch('/downloads/solver-extension.zip', { method: 'HEAD' })
      .then((response) => {
        if (!cancelled) {
          setExtensionAvailable(response.ok);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setExtensionAvailable(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleExtensionInfo = () => {
    window.alert('Run "npm run package-extension" to generate public/downloads/solver-extension.zip before deploying.');
  };

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
            {extensionAvailable ? (
              <a className="cta secondary" href="/downloads/solver-extension.zip">
                Download Browser Extension
              </a>
            ) : (
              <button className="cta secondary" type="button" onClick={handleExtensionInfo}>
                Package Browser Extension
              </button>
            )}
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
              Invite seasoned specialists to audit AI answers. Receive redlines, risk callouts, and citations so you can
              act with confidence.
            </p>
          </div>
          <div className="card">
            <h3>Actionable plans</h3>
            <p>
              Experts transform AI drafts into workback schedules, hiring plans, or compliance playbooks without leaving
              the workspace.
            </p>
          </div>
          <div className="card">
            <h3>Seamless everywhere</h3>
            <p>
              Highlight any response in ChatGPT or Gemini and the Solver extension will route it to the right expert in
              two clicks.
            </p>
          </div>
        </div>
      </section>

      <section className="two-column">
        <div className="feature">
          <strong>Stay in the loop</strong>
          <p>
            Continue any chat right here on the site or drop back in later – conversations persist locally so you can pick
            up where you left off.
          </p>
        </div>
        <div className="feature">
          <strong>Instant browser access</strong>
          <p>
            Install the extension to surface Solver actions on top of ChatGPT or Gemini responses without breaking your
            research flow. If the download is missing, run <code>npm run package-extension</code> to rebuild it.
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
