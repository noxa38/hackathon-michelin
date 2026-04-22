import { useState } from 'react'
import { Mail, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import * as authService from '../services/auth.service'
import { useAuth } from '../contexts/AuthContext'
import styles from './AuthPage.module.css'

type AuthMode = 'login' | 'register'

interface LoginForm {
  email: string
  password: string
}

interface RegisterForm {
  email: string
  username: string
  password: string
  passwordConfirm: string
  firstName: string
  lastName: string
}

export default function AuthPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  })

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
  })

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.login({
        email: loginForm.email,
        password: loginForm.password,
      })

      login(response.token)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.register({
        email: registerForm.email,
        username: registerForm.username,
        password: registerForm.password,
        passwordConfirm: registerForm.passwordConfirm,
        firstName: registerForm.firstName,
        lastName: registerForm.lastName,
      })

      login(response.token)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault()
    if (!forgotEmail) {
      setError('Veuillez entrer votre email')
      return
    }
    // Simuler un envoi d'email
    setError('')
    alert(`Instructions de réinitialisation envoyées à ${forgotEmail}`)
    setShowForgotPassword(false)
    setForgotEmail('')
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          {!showForgotPassword ? (
            <>
              {/* Tabs de sélection */}
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
                  onClick={() => {
                    setMode('login')
                    setError('')
                  }}
                >
                  Se connecter
                </button>
                <button
                  className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`}
                  onClick={() => {
                    setMode('register')
                    setError('')
                  }}
                >
                  S'inscrire
                </button>
              </div>

              {/* Affichage du formulaire */}
              {mode === 'login' ? (
                <>
                  <h1 className={styles.title}>Bienvenue</h1>
                  <p className={styles.subtitle}>Connectez-vous à votre compte</p>

                  <form onSubmit={handleLogin} className={styles.form}>
                    {error && (
                      <div className={styles.errorBox}>
                        <AlertCircle size={16} />
                        {error}
                      </div>
                    )}

                    <div className={styles.inputGroup}>
                      <label htmlFor="email" className={styles.label}>
                        Email
                      </label>
                      <div className={styles.inputWrapper}>
                        <Mail size={18} className={styles.icon} />
                        <input
                          id="email"
                          type="email"
                          className={styles.input}
                          placeholder="votre@email.com"
                          value={loginForm.email}
                          onChange={e =>
                            setLoginForm({ ...loginForm, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="password" className={styles.label}>
                        Mot de passe
                      </label>
                      <div className={styles.inputWrapper}>
                        <Lock size={18} className={styles.icon} />
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          className={styles.input}
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={e =>
                            setLoginForm({ ...loginForm, password: e.target.value })
                          }
                          required
                        />
                        <button
                          type="button"
                          className={styles.eyeButton}
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <button type="submit" className={styles.submitButton} disabled={loading}>
                      {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                  </form>

                  <button
                    type="button"
                    className={styles.forgotButton}
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Mot de passe oublié ?
                  </button>
                </>
              ) : (
                <>
                  <h1 className={styles.title}>Créer un compte</h1>
                  <p className={styles.subtitle}>Rejoignez la communauté Michelin Guide</p>

                  <form onSubmit={handleRegister} className={styles.form}>
                    {error && (
                      <div className={styles.errorBox}>
                        <AlertCircle size={16} />
                        {error}
                      </div>
                    )}

                    <div className={styles.twoColumns}>
                      <div className={styles.inputGroup}>
                        <label htmlFor="firstName" className={styles.label}>
                          Prénom
                        </label>
                        <div className={styles.inputWrapper}>
                          <User size={18} className={styles.icon} />
                          <input
                            id="firstName"
                            type="text"
                            className={styles.input}
                            placeholder="Jean"
                            value={registerForm.firstName}
                            onChange={e =>
                              setRegisterForm({ ...registerForm, firstName: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label htmlFor="lastName" className={styles.label}>
                          Nom
                        </label>
                        <div className={styles.inputWrapper}>
                          <User size={18} className={styles.icon} />
                          <input
                            id="lastName"
                            type="text"
                            className={styles.input}
                            placeholder="Dupont"
                            value={registerForm.lastName}
                            onChange={e =>
                              setRegisterForm({ ...registerForm, lastName: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="reg-email" className={styles.label}>
                        Email
                      </label>
                      <div className={styles.inputWrapper}>
                        <Mail size={18} className={styles.icon} />
                        <input
                          id="reg-email"
                          type="email"
                          className={styles.input}
                          placeholder="votre@email.com"
                          value={registerForm.email}
                          onChange={e =>
                            setRegisterForm({ ...registerForm, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="username" className={styles.label}>
                        Nom d'utilisateur
                      </label>
                      <div className={styles.inputWrapper}>
                        <User size={18} className={styles.icon} />
                        <input
                          id="username"
                          type="text"
                          className={styles.input}
                          placeholder="jeandupont"
                          value={registerForm.username}
                          onChange={e =>
                            setRegisterForm({ ...registerForm, username: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.twoColumns}>
                      <div className={styles.inputGroup}>
                        <label htmlFor="reg-password" className={styles.label}>
                          Mot de passe
                        </label>
                        <div className={styles.inputWrapper}>
                          <Lock size={18} className={styles.icon} />
                          <input
                            id="reg-password"
                            type={showPassword ? 'text' : 'password'}
                            className={styles.input}
                            placeholder="••••••••"
                            value={registerForm.password}
                            onChange={e =>
                              setRegisterForm({ ...registerForm, password: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label htmlFor="reg-confirm" className={styles.label}>
                          Confirmer
                        </label>
                        <div className={styles.inputWrapper}>
                          <Lock size={18} className={styles.icon} />
                          <input
                            id="reg-confirm"
                            type={showPassword ? 'text' : 'password'}
                            className={styles.input}
                            placeholder="••••••••"
                            value={registerForm.passwordConfirm}
                            onChange={e =>
                              setRegisterForm({
                                ...registerForm,
                                passwordConfirm: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.showPasswordButton}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Masquer les mots de passe' : 'Afficher les mots de passe'}
                    </button>

                    <button type="submit" className={styles.submitButton} disabled={loading}>
                      {loading ? 'Création en cours...' : 'Créer mon compte'}
                    </button>
                  </form>
                </>
              )}
            </>
          ) : (
            <>
              <h1 className={styles.title}>Réinitialiser votre mot de passe</h1>
              <p className={styles.subtitle}>Entrez votre email pour recevoir les instructions</p>

              <form onSubmit={handleForgotPassword} className={styles.form}>
                {error && (
                  <div className={styles.errorBox}>
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <div className={styles.inputGroup}>
                  <label htmlFor="forgot-email" className={styles.label}>
                    Email
                  </label>
                  <div className={styles.inputWrapper}>
                    <Mail size={18} className={styles.icon} />
                    <input
                      id="forgot-email"
                      type="email"
                      className={styles.input}
                      placeholder="votre@email.com"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className={styles.submitButton}>
                  Envoyer les instructions
                </button>
              </form>

              <button
                type="button"
                className={styles.backButton}
                onClick={() => {
                  setShowForgotPassword(false)
                  setError('')
                }}
              >
                Retour
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
