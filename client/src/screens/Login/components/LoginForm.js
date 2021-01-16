import * as React from 'react';

function LoginForm({run, errorMsg, error, loading}) {
  const [activated, setActivated] = React.useState(true);
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });
  const {email, password} = data;

  function handleChange(event) {
    const {name, value} = event.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    run('login', data);
  }

  React.useEffect(() => {
    if (email === '' || password === '') {
      setActivated(true);
    } else {
      setActivated(false);
    }
    if (loading) {
      setActivated(true);
    }
  }, [loading, email, password]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-input-text-form">
        <div className="input-field-form-special">
          <label htmlFor="name">Correo</label>
          <input type="email" name="email" id="name" onChange={handleChange} />
        </div>
      </div>
      <div className="field-input-text-form">
        <div className="input-field-form-special">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
      </div>
      <button type="submit" disabled={activated}>
        Log in
      </button>
      {error && <span className="alert-error-log-in">{errorMsg}</span>}
    </form>
  );
}

export default LoginForm;
