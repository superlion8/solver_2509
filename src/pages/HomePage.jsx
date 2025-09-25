import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EXTENSION_PATH = '/downloads/solver-extension.zip';

const HomePage = () => {
  const [extensionReady, setExtensionReady] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(EXTENSION_PATH, { method: 'HEAD' })
      .then((response) => {
        if (!cancelled) {
          setExtensionReady(response.ok);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setExtensionReady(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleMissingExtension = () => {
    window.alert('Run "npm run package-extension" before deploying so the browser extension zip is available.');
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Verified answers. Actionable steps.</p>
          <h1>
            Bring AI superpowers and expert certainty together inside one workspace.
          </h1>
          <p className="lead">
            Solver connects Gemini 2.5 Pro with operators who have shipped GTM, analytics, compliance, and ops programs.
            Validate responses instantly, then retain the same expert to own the follow-through.
          </p>

          <div className="cta-row">
            <Link className="cta" to="/chat">
              Launch Solver Chat
            </Link>

            {extensionReady ? (
              <a className="cta ghost" href={EXTENSION_PATH}>
                Download browser extension
              </a>
            ) : (
              <button type="button" className="cta ghost" onClick={handleMissingExtension}>
                Package browser extension
              </button>
            )}
          </div>

          <div className="hero-metrics" role="presentation">
            <div>
              <strong>50+</strong>
              <span>engagement-ready experts</span>
            </div>
            <div>
              <strong>&lt;4h</strong>
              <span>average fact check turnaround</span>
            </div>
            <div>
              <strong>92%</strong>
              <span>clients retain for deeper work</span>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <h3>How Solver keeps you moving</h3>
          <ol>
            <li>Chat with Gemini 2.5 Pro to draft strategies, plans, and analysis.</li>
            <li>Tap “double check with an expert” to validate or redline the output.</li>
            <li>Spin up scoped engagements with the same expert directly from Solver.</li>
          </ol>
        </div>
      </section>

      <section className="value-grid">
        <article className="value-card">
          <h3>Accuracy that unlocks action</h3>
          <p>
            Every answer is paired with human oversight. Experts annotate Gemini responses with citations, risk call-outs,
            and concrete next steps.
          </p>
        </article>
        <article className="value-card">
          <h3>Where you already work</h3>
          <p>
            Highlight a paragraph inside ChatGPT or Gemini and the Solver extension surfaces escalation buttons without
            breaking your flow.
          </p>
        </article>
        <article className="value-card">
          <h3>Operators on standby</h3>
          <p>
            From TNS compliance to analytics hiring plans, Solver matches you with practitioners who have done the work –
            not generic freelancers.
          </p>
        </article>
      </section>

      <section className="two-column">
        <div className="feature">
          <strong>Solver Chat</strong>
          <p>
            Persisted conversations, one-click export, and escalation buttons keep discovery and execution in the same
            thread. <Link to="/chat">Jump into a chat</Link> and try it.
          </p>
        </div>
        <div className="feature">
          <strong>Become an expert</strong>
          <p>
            Monetise your operator playbooks. Share your specialty, LinkedIn, and contact information to join the expert
            roster and receive qualified leads.
          </p>
          <Link className="inline-cta" to="/become-expert">
            Sign up for Solver Expert →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
