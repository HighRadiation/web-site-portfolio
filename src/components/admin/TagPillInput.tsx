'use client';

import { useState } from 'react';

interface TagPillInputProps {
  name: string;
  initial?: string[];
  placeholder?: string;
  help?: string;
}

export const TagPillInput = ({
  name,
  initial = [],
  placeholder,
  help,
}: TagPillInputProps): React.JSX.Element => {
  const [tags, setTags] = useState<string[]>(initial);
  const [draft, setDraft] = useState('');

  function commit(): void {
    const v = draft.trim().replace(/,$/, '');
    if (v && !tags.includes(v)) setTags([...tags, v]);
    setDraft('');
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Backspace' && !draft && tags.length) {
      setTags(tags.slice(0, -1));
    }
  }

  return (
    <>
      <div className="tag-input">
        {tags.map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
            <button
              type="button"
              className="x"
              onClick={() => setTags(tags.filter((t) => t !== tag))}
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKey}
          onBlur={commit}
          placeholder={tags.length ? 'Add another…' : placeholder}
        />
      </div>
      {help && <div className="form-help">{help}</div>}
      <input type="hidden" name={name} value={tags.join(', ')} />
    </>
  );
};
