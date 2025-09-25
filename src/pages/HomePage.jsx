 codex/create-react-project-for-solver-platform-s7b4z0
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
              <a className="cta download" href={EXTENSION_PATH}>
                <span className="cta-icon" aria-hidden>
                  ↓
                </span>
                <span className="cta-text">
                  <span className="cta-title">Download browser extension</span>
                  <span className="cta-subtitle">Chrome &amp; Edge · packaged zip</span>
                </span>
              </a>
            ) : (
              <button type="button" className="cta download outline" onClick={handleMissingExtension}>
                <span className="cta-icon" aria-hidden>
                  ⚙
                </span>
                <span className="cta-text">
                  <span className="cta-title">Package browser extension</span>
                  <span className="cta-subtitle">Run npm run package-extension</span>
                </span>
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
 main
    </div>
  );
};

export default HomePage;
