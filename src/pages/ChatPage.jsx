import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const GEMINI_MODEL = 'models/gemini-2.0-pro-exp-02-05';
const DEFAULT_API_KEY = 'AIzaSyC2PQUCIxM_iH0ZEX0I8pkLm9HcLP5NCTI';

const parseSearch = (search) => {
  const params = new URLSearchParams(search);
  return Object.fromEntries(params.entries());
};

const MessageActions = ({ question, answer }) => {
  const doubleCheckParams = new URLSearchParams({
    mode: 'double-check',
    question,
    answer,
    source: 'chat',
  });

  const consultancyParams = new URLSearchParams({
    mode: 'consultancy',
    question,
    answer,
    source: 'chat',
  });

  return (
    <div className="actions" role="group" aria-label="Escalate this answer">
      <Link className="cta" to={`/request-expert?${doubleCheckParams.toString()}`}>
        double check the answer with an expert
      </Link>
      <Link
        className="cta secondary"
        to={`/request-expert?${consultancyParams.toString()}`}
      >
        find an expert for consultancy
      </Link>
    </div>
  );
};

const ChatPage = () => {
  const location = useLocation();
  const searchParams = useMemo(() => parseSearch(location.search), [location.search]);
  const [messages, setMessages] = useState(() => [
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content:
        "Hi, I'm Solver. Ask anything about GTM, analytics, or operations and I'll answer with Gemini 2.5 Pro. Tap the buttons under any answer to bring a human expert into the loop.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (searchParams.prefill) {
      setInput(searchParams.prefill);
    }
  }, [searchParams.prefill]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const question = input.trim();
    const apiKey = window.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || DEFAULT_API_KEY;

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: question }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join('\n\n') ||
        'I could not generate a confident answer. Please try again.';

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: text,
        },
      ]);
    } catch (apiError) {
      console.error(apiError);
      setError(
        'We could not reach Gemini. Provide a valid key via window.GEMINI_API_KEY or a VITE_GEMINI_API_KEY environment variable and try again.'
      );
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            'I ran into an issue contacting Gemini. Please confirm window.GEMINI_API_KEY is set and resend your prompt.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat">
      <div className="chat-container">
        <div className="messages" aria-live="polite">
          {messages.map((message, index) => {
            const previousUser = messages
              .slice(0, index)
              .reverse()
              .find((item) => item.role === 'user');

            return (
              <div key={message.id} className={`message ${message.role}`}>
                <div className="bubble">{message.content}</div>
                {message.role === 'assistant' && previousUser && index !== 0 && (
                  <MessageActions question={previousUser.content} answer={message.content} />
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <textarea
            placeholder="Ask Solver anything..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Message Solver"
          />
          <button onClick={sendMessage} disabled={isLoading}>
            {isLoading ? 'Thinking…' : 'Send'}
          </button>
        </div>
      </div>
      {error ? (
        <p className="status-text" role="alert">
          {error}
        </p>
      ) : (
        <p className="status-text">
          Solver Chat uses Google Gemini 2.5 Pro. Set <code>window.GEMINI_API_KEY = 'your-key'</code> in the browser
          console, add <code>VITE_GEMINI_API_KEY</code> to a <code>.env</code> file locally, or configure the same variable in
          your hosting provider before redeploying.
        </p>
      )}
    </div>
  );
};

export default ChatPage;
