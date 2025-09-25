import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const parseSearch = (search) => {
  const params = new URLSearchParams(search);
  return Object.fromEntries(params.entries());
};

const getHeadline = (mode) => {
  switch (mode) {
    case 'double-check':
      return 'Double-check an AI answer';
    case 'consultancy':
      return 'Find the right expert partner';
    default:
      return 'Work with a Solver expert';
  }
};

const RequestExpertPage = () => {
  const location = useLocation();
  const searchParams = useMemo(() => parseSearch(location.search), [location.search]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [context, setContext] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (searchParams.question || searchParams.answer) {
      const details = [
        searchParams.question ? `Question: ${searchParams.question}` : null,
        searchParams.answer ? `AI answer: ${searchParams.answer}` : null,
      ]
        .filter(Boolean)
        .join('\n\n');
      setContext(details);
    }
  }, [searchParams.question, searchParams.answer]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="request-expert">
      <section className="hero request-hero">
        <div>
          <p className="eyebrow">Verified answers. Actionable steps.</p>
          <h1>{getHeadline(searchParams.mode)}</h1>
          <p>
            Share the context behind your challenge and we will match you with a vetted expert in the Solver network. Most
            intros happen within hours, not weeks.
          </p>
        </div>
        <div className="card">
          <h3>What to expect</h3>
          <ul>
            <li>We review your brief and identify the best-fit operators.</li>
            <li>Experts fact-check the AI draft, flag risks, and add citations.</li>
            <li>You can spin up paid deep-dive projects with the same partner.</li>
          </ul>
        </div>
      </section>

      <div className="form-card">
        {submitted ? (
          <div className="success-banner" role="status">
            Thanks! A member of the Solver concierge team will reach out shortly with expert recommendations.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="stack">
            <label>
              Your name
              <input
                type="text"
                required
                placeholder="Jane founder"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label>
              Work email
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label>
              Company or team (optional)
              <input
                type="text"
                placeholder="Acme Analytics"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />
            </label>
            <label>
              Context for our experts
              <textarea
                required
                placeholder="Paste the AI answer you'd like reviewed, plus any additional nuance."
                value={context}
                onChange={(event) => setContext(event.target.value)}
              />
            </label>
            <button type="submit">Request expert support</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequestExpertPage;
