import { login } from './actions'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Admin Girişi</h1>
          <p>Devam etmek için bilgilerinizi girin</p>
        </div>

        {searchParams.error && (
          <div className="error-message">
            Giriş başarısız. Lütfen bilgilerinizi kontrol edin.
          </div>
        )}

        <form action={login}>
          <div className="form-group">
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  )
}
