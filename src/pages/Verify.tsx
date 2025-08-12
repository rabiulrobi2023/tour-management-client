import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Verify = () => {
  const location = useLocation();
  const email = location.state;

  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  },[email]);

  return (
    <div>
      <p>Write your OTP: _ _ _ _ _ _ _ _</p>
    </div>
  );
};

export default Verify;
