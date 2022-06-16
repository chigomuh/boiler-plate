import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../_actions/user_action";

export default function CheckAuth(
  SpecificComponent,
  option,
  adminRoute = null
) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        if (!response.payload.isAuth) {
          if (option) {
            navigator("/login");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            navigator("/");
          } else {
            if (!option) {
              navigator("/");
            }
          }
        }
      });
    });

    return <SpecificComponent />;
  }

  return <AuthenticationCheck />;
}
