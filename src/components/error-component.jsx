import { Link } from "react-router-dom";


export function ErrorPage(){
    return(
        <div className="container-fluid">
            <h2>UserName / Password is not correct.Try Again</h2>
            <h2>Login <Link to="/login"><span className="bi bi-arrow-right-square-fill"></span></Link></h2>
        </div>
    )
}