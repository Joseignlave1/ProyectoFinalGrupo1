import Login from "../components/Login";

const LoginView = ({onLogin}) => {
    return (
      <div className="container">
        <Login onLogin={onLogin} />
      </div>
    );
}

export default LoginView;