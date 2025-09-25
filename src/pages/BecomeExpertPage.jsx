import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const parseSearch = (search) => {
  const params = new URLSearchParams(search);
  return Object.fromEntries(params.entries());
};

const BecomeExpertPage = () => {
  const location = useLocation();
  const searchParams = useMemo(() => parseSearch(location.search), [location.search]);
  const [specialty, setSpecialty] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [email, setEmail] = useState('');
  const [motivation, setMotivation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (searchParams.inquiry) {
      setMotivation(`A user requested help with: ${searchParams.inquiry}`);
    }
  }, [searchParams.inquiry]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section className="hero expert-hero">
        <div>
          <p className="eyebrow">Earn by validating mission-critical work</p>
          <h1>Become a Solver expert</h1>
          <p>
            You have built revenue engines, analytics programs, and compliance frameworks. Solver connects you with
            AI-native operators who already scoped their needs and are ready to engage specialists.
          </p>
          <ul>
            <li>Receive qualified requests that include AI drafts and context.</li>
            <li>Bill for rapid fact-checks or expand into multi-week retainers.</li>
            <li>Stay selective—choose engagements that align with your expertise and bandwidth.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Expert spotlight</h3>
          <p>
            “Solver sends founders who already know what they need. I spend time tailoring execution plans instead of
            doing discovery.” — Ops & Analytics Lead
          </p>
        </div>
      </section>

      <div className="form-card">
        {submitted ? (
          <div className="success-banner" role="status">
            Thanks for applying! Our team will review your background and reach out within two business days.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="stack">
            <label>
              Specialty focus
              <input
                type="text"
                required
                placeholder="e.g. Analytics leadership, TNS launches, RevOps transformation"
                value={specialty}
                onChange={(event) => setSpecialty(event.target.value)}
              />
            </label>
            <label>
              LinkedIn profile
              <input
                type="url"
                required
                placeholder="https://www.linkedin.com/in/your-profile"
                value={linkedin}
                onChange={(event) => setLinkedin(event.target.value)}
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
              Why Solver?
              <textarea
                required
                placeholder="Tell us about your track record, industries served, and the type of support you love providing."
                value={motivation}
                onChange={(event) => setMotivation(event.target.value)}
              />
            </label>
            <button type="submit">Sign up for Solver Expert</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BecomeExpertPage;
