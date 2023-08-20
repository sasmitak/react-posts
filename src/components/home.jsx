import { Link } from "react-router-dom";


export function HomeComponent() {
    return (
        <div className="container-fluid">
            <div className="mt-4">
                <h2>Please Login to access the Posts 
                    <button className="btn btn-danger ms-4"><Link to="/login" className="text-dark text-decoration-none" >Login</Link></button>
                </h2>
            </div>
            <div className="mt-4">
                <h2>New User Please Register
                <button className="btn btn-danger ms-4"><Link to="/register" className="text-dark text-decoration-none" >Register</Link></button>
                </h2>
            </div>
        </div>

    )
}