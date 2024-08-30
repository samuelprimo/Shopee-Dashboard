import "./style.scss";
import { useRef } from 'react';
import {} from '../../contexts/Auth/Auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/Auth/Auth";

export function Login() {
  const login = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const context = useAuth();

  async function handleLogin() {
    const result = await context.Login(login.current.value, password.current.value);
    if (result){
      navigate('/Home/Dashboard');
    }
  }
  return (
    <main>
      <div className="card">
      <span>

      <h2> 
      Email
      </h2>
      <input placeholder="email" ref={login} />
      </span>
      <span>

      <h2> 
      Senha
      </h2>
      <input placeholder="senha" type="password" ref={password} />
      </span>

      <button onClick={handleLogin}>Login</button>
      </div>

    </main>
  );
}

