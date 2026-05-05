import { makeMeAdmin } from './actions';

export default function FixAdminPage(): React.JSX.Element {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Admin Yetkisi Onarımı</h1>
      <p>Mevcut hesabınızı admin yetkisine yükseltmek için aşağıdaki butona tıklayın.</p>
      <form action={makeMeAdmin}>
        <button
          type="submit"
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#ffffff',
            color: '#000000',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          Beni Admin Yap
        </button>
      </form>
    </div>
  );
}
