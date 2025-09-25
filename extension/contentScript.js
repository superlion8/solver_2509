(() => {
  const getBaseUrl = () => {
    try {
      const stored = window.localStorage.getItem('solverBaseUrl');
      if (stored) {
        return stored.replace(/\/$/, '');
      }
    } catch (error) {
      console.warn('Solver extension could not read custom base URL from localStorage.', error);
    }
    return 'https://solver.chat';
  };

  const buildSolverUrl = (path, params = {}) => {
    const base = getBaseUrl().replace(/\/$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const hashRoute = `/#${normalizedPath}`;
    const search = new URLSearchParams(params);
    return `${base}${hashRoute}${search.toString() ? `?${search.toString()}` : ''}`;
  };

  const createButton = (label, variant, onClick) => {
    const button = document.createElement('button');
    button.className = `solver-extension-button ${variant}`;
    button.textContent = label;
    button.addEventListener('mousedown', (event) => event.preventDefault());
    button.addEventListener('click', onClick);
    return button;
  };

  let popover;

  const removePopover = () => {
    if (popover) {
      popover.remove();
      popover = null;
    }
  };

  const showPopover = (selection) => {
    const text = selection.toString().trim();
    if (!text) {
      removePopover();
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    removePopover();

    popover = document.createElement('div');
    popover.className = 'solver-extension-popover';

    const doubleCheck = createButton('double check the answer with an expert', 'primary', () => {
      const url = buildSolverUrl('/request-expert', {
        mode: 'double-check',
        answer: text,
        source: 'extension',
      });
      window.open(url, '_blank');
      removePopover();
    });

    const findExpert = createButton('find an expert for consultancy', 'secondary', () => {
      const url = buildSolverUrl('/request-expert', {
        mode: 'consultancy',
        question: text,
        source: 'extension',
      });
      window.open(url, '_blank');
      removePopover();
    });

    popover.appendChild(doubleCheck);
    popover.appendChild(findExpert);

    document.body.appendChild(popover);

    const top = window.scrollY + rect.bottom + 8;
    const left = window.scrollX + rect.left;
    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
  };

  document.addEventListener('click', () => removePopover());
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      removePopover();
    }
  });

  document.addEventListener('selectionchange', () => {
    const selection = document.getSelection();
    if (!selection || selection.rangeCount === 0) {
      removePopover();
      return;
    }

    const text = selection.toString().trim();
    if (!text) {
      removePopover();
      return;
    }

    showPopover(selection);
  });
})();
