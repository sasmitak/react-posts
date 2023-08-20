import { BrowserRouter, Route, Routes,Link} from "react-router-dom";
import { HomeComponent } from "./home";
import { Login } from "./login-component";
import { Register } from "./register-component";
import { PostPage } from "./posts";
import { ErrorPage } from "./error-component";


export function LoginRegisterIndex() {
    return (
        <div className="container-fluid">
            <BrowserRouter>
                <header className="bg-dark text-white p-2 mt-2 d-flex justify-content-between">
                    <div>Posts</div>
                    <div>
                        <span className="me-3"><Link to="home" className="text-white text-decoration-none">Home</Link></span>
                        <span className="me-3"><Link to="login" className="text-white text-decoration-none">Login</Link></span>
                        <span className="me-3"><Link to="register" className="text-white text-decoration-none">Register</Link></span>
                        <span className="me-3"><Link to="login" className="text-white text-decoration-none">Posts</Link></span>
                    </div>
                    <div>
                        <span className="bi bi-person-fill me-2"></span>
                        <span className="bi bi-search me-2"></span>
                    </div>
                </header>
                <section className="mt-3" style={{height:'700px'}}>
                    <Routes>
                        <Route path="/" element={<HomeComponent /> } />
                        <Route path="home" element={<HomeComponent />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="posts" element={<PostPage />} />
                        <Route path="error" element={<ErrorPage />} />
                        <Route path="*" element={<div><h2 className="text-danger">Requested Path Not Found.</h2></div>} />
                    </Routes>
                </section>
            </BrowserRouter>
        </div>
    )
}