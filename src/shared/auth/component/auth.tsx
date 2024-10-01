import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState } from "../../../store/app.store";
import { notification } from "antd";
interface Props {
  children: any;
  role?: string[];
}
function AuthGuard(props: Props) {
  const { children, role } = props;
  const navigate = useNavigate();
  const currentRole = useSelector((state: RootState) => state.authReducer.role);

  function authenticate() {
    if (localStorage.userInfo !== undefined) {
      return true;
    } else {
      return false;
    }
  }
  function userInfo() {
    if (localStorage.userInfo !== undefined) {
      return localStorage.userInfo;
    } else {
      return undefined;
    }
  }

  if (authenticate()) {
    if (role !== undefined) {
      if (role.includes(`${currentRole?.key}`)) return children;
      else {
        notification.error({
          message: "Error",
          description: `You need to have these roles ${role?.join()}`,
        });
        navigate(-1);
      }
    } else return children;
  } else {
    const truth = authenticate();
    if (!truth) {
      return <Navigate to="/login" />;
    }
  }
}

export default AuthGuard;
