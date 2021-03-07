import React,{useState} from 'react'
// https://api.github.com/user
import './users.css'
function Users() {
    const[data,setData] = useState([])
    const[repos, setRepos] = useState([]);
    const[value, setValue] = useState("");

    const TargetValue = e =>{
        setValue(e.target.value);
    }

    const SubmitHandler =async (e)=>{
        e.preventDefault();
        const users = await fetch(`https://api.github.com/users/${value}`);
        const usersJson = await users.json();
        setData(usersJson);
        
        const repos = await fetch(usersJson.repos_url);
        const reposJson = await repos.json();
        setRepos(reposJson);
     
}
    

    return (
        <div className='Users__cont'>
        <div className='Users'>
            <form onSubmit={SubmitHandler}>
            <input 
                 value={value}
                 type="text"
                 placeholder="Search user..."
                 onChange={TargetValue}
                 />
                <button onClick={SubmitHandler} type="submit">Search</button>
            </form>
               
        </div>
       
         <div className="Users__info">
          <div className="Users__image">
            {data.avatar_url && <img src={data.avatar_url} alt={data.avatar_url}/>}
          </div>
         <div className="Users__info__top">
    <h3>Github Name</h3>
    <h3>Type</h3>
    <h3>Repos</h3>
  </div>
  {!data.login ? <h1>User Not Found</h1> :  <div className="Users__info__user__cont">
      {!data.login ? <h3>???</h3> : <h3>{data.login}</h3>}
      {!data.type ? <h3>???</h3> : <h3>{data.type}</h3>}
       {!repos.length > 0 ? <h3>No repos found</h3> : <h3>{repos.map(repo=>(
           <div className="repos" key={repo.id}>
             <a href={repo.html_url} className="Users__links" target="_blank">
               {repo.name}
             </a>
            
           </div>
       ))}</h3>}  
     
      
      </div>}
    </div>
    </div>
   

    )
}

export default Users
