import { addProject } from '../actions';

export default function NewProjectPage(): React.JSX.Element {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Add New Project</h1>
        <a
          href="/admin/projects"
          style={{
            color: '#a3a3a3',
            textDecoration: 'none',
            fontSize: '0.9rem',
            padding: '0.5rem 1rem',
            border: '1px solid #333',
            borderRadius: '6px',
          }}
        >
          Cancel
        </a>
      </div>

      <form action={addProject} style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#a3a3a3', fontWeight: 500 }}>
            Project Name
          </label>
          <input
            name="name"
            required
            style={{
              background: '#111111',
              border: '1px solid #222222',
              color: '#ffffff',
              padding: '0.75rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
            }}
          />
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#a3a3a3', fontWeight: 500 }}>
            Description
          </label>
          <textarea
            name="description"
            required
            style={{
              background: '#111111',
              border: '1px solid #222222',
              color: '#ffffff',
              padding: '0.75rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
              minHeight: '120px',
            }}
          />
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#a3a3a3', fontWeight: 500 }}>
            Link (GitHub/Live)
          </label>
          <input
            name="link"
            style={{
              background: '#111111',
              border: '1px solid #222222',
              color: '#ffffff',
              padding: '0.75rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: '#ffffff',
            color: '#000000',
            border: 'none',
            padding: '0.75rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
            marginTop: '1rem',
            transition: 'opacity 0.2s',
          }}
        >
          Save Project
        </button>
      </form>
    </div>
  );
}
