import { toast } from "react-toastify";

export function Logout(props) {
  try {
    localStorage.removeItem("authorization");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    toast("Loged Out");
    window.location.href = "http://localhost:3000/";
  } catch (error) {
    toast("Not Loged In");
  }

  return (
    <div className="wrapper">
      <h4>Returning to Login Page</h4>
    </div>
  );
}

export default Logout;
