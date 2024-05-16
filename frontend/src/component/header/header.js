import { useNavigate } from "../../libraries/libraries.js";
import { Header } from "../../pages/index.js"
import { signIn } from "../../routes/route";

export const HeaderLogic = () =>{
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");
    const handleLogout = () =>{
        localStorage.clear();
        navigate(signIn);
    }

    return<>
        <Header handleLogout={handleLogout} userName={userName} /> 
    </>
}