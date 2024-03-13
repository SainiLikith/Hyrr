import axios from "axios";
 
 const login = ()=>{

 async function onSubmit(e){
    e.preventDefault();
    const res = await axios.post('http://localhost:9000/login', formData);
    if (res.data.status === 'success') {
    //   setResponseMessage(res.data.msg);
    } else {
      alert(res.data.msg);
    }
 }
    return(
        <>

  <div className="container">
    <div className="loginbox">
      <img
        src="https://tse1.mm.bing.net/th?id=OIP.Vzu9LsVapjfVOcPQ0YolxgHaHa&pid=Api&P=0&h=220"
        className="avatar"
      />
      <h1>Login Page</h1>
      <form onSubmit={onSubmit}>
        <p>Email:</p>
        <input type="text" name="email" placeholder="Enter User Name" />
        <p>Password:</p>
        <input
          type="Password"
          name="password"
          placeholder="Enter User Password"
        />
        <input type="submit" defaultValue="Login" />
        <a href="#">Forget Password</a>
        <div className="new-user">
          <a href="form.html">New User</a>
        </div>
      </form>
    </div>
  </div>
</>

    )
 }

 export default login