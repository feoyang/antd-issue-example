import { AutoLogin } from '../../../../authorization/AutoLogin';
import { LoginForm } from '../../components/LoginForm';

export const Login = () => {
  return (
    <AutoLogin>
      <LoginForm />
    </AutoLogin>
  );
};
