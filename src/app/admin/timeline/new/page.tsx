import { addTimelineItem, seedTimeline } from '../actions';

export default function NewTimelineItemPage(): React.JSX.Element {
  return (
    <div style={{ maxWidth: '600px', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Add Timeline Item</h1>
        <a
          href="/admin/timeline"
          style={{
            color: '#a3a3a3',
            textDecoration: 'none',
            fontSize: '0.9rem',
          }}
        >
          ← Back to Timeline
        </a>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <form action={seedTimeline}>
          <button
            type="submit"
            style={{
              backgroundColor: 'rgba(124, 58, 237, 0.1)',
              color: 'var(--accent)',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            Import from Frontend (Seed)
          </button>
        </form>
      </div>

      <form
        action={addTimelineItem}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          backgroundColor: '#111111',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #222222',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="role" style={{ fontSize: '0.9rem', color: '#e5e5e5' }}>
            Role / Title
          </label>
          <input
            type="text"
            id="role"
            name="role"
            required
            placeholder="e.g. Independent Developer"
            style={{
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #333',
              backgroundColor: '#0a0a0a',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="company" style={{ fontSize: '0.9rem', color: '#e5e5e5' }}>
            Company / Organization
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            placeholder="e.g. 42 Istanbul"
            style={{
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #333',
              backgroundColor: '#0a0a0a',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="date" style={{ fontSize: '0.9rem', color: '#e5e5e5' }}>
            Date
          </label>
          <input
            type="text"
            id="date"
            name="date"
            required
            placeholder="e.g. 2024 – PRESENT"
            style={{
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #333',
              backgroundColor: '#0a0a0a',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="type" style={{ fontSize: '0.9rem', color: '#e5e5e5' }}>
            Type
          </label>
          <select
            id="type"
            name="type"
            required
            style={{
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #333',
              backgroundColor: '#0a0a0a',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <option value="experience">Experience</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="description" style={{ fontSize: '0.9rem', color: '#e5e5e5' }}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            placeholder="Describe what you did..."
            style={{
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #333',
              backgroundColor: '#0a0a0a',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              resize: 'vertical',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Save Timeline Item
        </button>
      </form>
    </div>
  );
}
