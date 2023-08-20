import axios from "axios";
import { useEffect, useState } from "react";
import './posts.css';

export function PostPage(){

    const [posts , setPosts] =useState([]);

    const [page, setPage] = useState(1);
    

    useEffect(()=>{
        axios({
            method:"get",
            url:"https://jsonplaceholder.typicode.com/posts"
        })
        .then(response=>{
            setPosts(response.data);
            
        })
    },[]);

    function PageClick(selectedPage){
        if(selectedPage >= 1 && selectedPage <= posts.length / 10 && selectedPage !== page)
        setPage(selectedPage);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});        
    }
    return(
        <div className="container-fluid">
            
            <div className="d-flex flex-wrap w-100 justify-content-center">
                {
                     posts.slice(page * 10 - 10 , page * 10).map((item)=>
                        <div className="card m-2 p-2"style={{height:"380px",width:"350px"}} key={item.id}>
                            
                            <div className="card-body ms-4">
                                <dl>
                                    <dt>Posts ID</dt>
                                    <dd>{item.id}</dd>
                                    <dt>Posts Title</dt>
                                    <dd>{item.title}</dd>
                                    <dt>Message</dt>
                                    <dd>{item.body}</dd>
                                </dl>
                            </div>
                        </div>
                    )
                }
            </div>
            <nav className="pagination justify-content-center mt-4">
                <button className="btn btn-primary" onClick={()=>PageClick(page-1)}>Prev</button>
                {
                    [...Array(posts.length / 10)].map((_,i)=>{
                        return <button className={`btn btn-warning ${page===i+1 ? "active":""}`} onClick={()=>PageClick(i+1)} key={i}>{i + 1}</button>
                    })
                }
                
                <button className="btn btn-primary" onClick={()=>PageClick(page+1)}>Next</button>
            </nav>
        </div>
    )
}