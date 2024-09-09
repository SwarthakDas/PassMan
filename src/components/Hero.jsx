import { useRef,useState,useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Hero = () => {
  const ref=useRef();
  const passwordRef=useRef();
  const [form, setForm] = useState({site:"",username:"",password:""})
  const [passwordArray, setPasswordArray] = useState([])
  useEffect(() => {
    let passwords=localStorage.getItem("passwords");
    if(passwords){
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])
  
  const showPassword=()=>{
    passwordRef.current.type="password";
    if(ref.current.src.includes("icons/eye.png")){
      ref.current.src="icons/eyeClosed.png";
      passwordRef.current.type="password";
    }
    else{
      ref.current.src="icons/eye.png";
      passwordRef.current.type="text";
    }
  }
  
  const savePassword=()=>{
    
    setPasswordArray([...passwordArray,{...form,id:uuidv4()}]);
    localStorage.setItem("passwords",JSON.stringify([...passwordArray,{...form,id:uuidv4()}]));
    setForm({site:"",username:"",password:""})
    console.log(passwordArray);
  }
  const deletePassword=(id)=>{
    
    let c=confirm("Do you really want to delete this Password?");
    if(c){
      setPasswordArray(passwordArray.filter(item=>item.id!==id))
      localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    }
  }
  const editPassword=(id)=>{
    
    setForm(passwordArray.filter(item=>item.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
  }
  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }
  const copyText = (e) => {
    toast.success('Copied to Clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
      });
    const textToCopy = `Site: ${e.site}, Username: ${e.username}, Password: ${e.password}`;
    navigator.clipboard.writeText(textToCopy);
};

  return (
    <div>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition= "Bounce"
/>
{/* Same as */}
<ToastContainer />
      <div className="flex flex-col items-center justify-center py-12 pb-4 gap-2">
      <h1 className="text-3xl font-bold pl-2">
            <span className="">!Pass</span>
            <span className="text-[#10b981]">Man~\</span>
        </h1>
        <p className="text-base font-semibold">Secure Every Key with PassMan</p>
      </div>
      <div className="flex flex-col justify-center items-center px-8 py-4">
        <input type="text" className=" border border-[#10b981] w-full px-4 py-1 rounded-full md:w-1/2 hover:cursor-pointer" placeholder="Enter website URL" value={form.site} onChange={handleChange} name="site"/>
        <div className="flex justify-between items-center pt-4 gap-2 w-full md:w-1/2">
          <input type="text" className=" border border-[#10b981] w-full px-4 py-1 rounded-full hover:cursor-pointer" placeholder="Enter Username" value={form.username} onChange={handleChange} name="username"/>
          <input ref={passwordRef} type="password" className=" border border-[#10b981] w-full px-4 py-1 rounded-full hover:cursor-pointer" placeholder="Enter Password" value={form.password} onChange={handleChange} name="password"/>
          <span className="absolute cursor-pointer right-12 md:w-3/12" onClick={showPassword}>
            <img ref={ref} src="icons/eyeClosed.png" alt="eye" className="h-5" />
          </span>
        </div>
      </div>

      <div className="flex items-center flex-col px-4">
        <button className="flex items-center justify-between bg-[#34d399] rounded-full px-3 py-1 font-semibold gap-3 hover:bg-[#6ee7b7]" onClick={savePassword}>
        
        <lord-icon
         src="https://cdn.lordicon.com/zrkkrrpl.json"
         trigger="hover"
         stroke="bold"
        colors="primary:#121331,secondary:#0a4e5c"
         state="hover-swirl">
        </lord-icon>
        <p>Save Password</p>
      </button>
      </div>
      <div className="flex flex-col justify-center p-6 ">
        <h1 className="text-xl font-bold pb-4 md:w-1/2 md:self-center">Your Passwords</h1>
        {passwordArray.length===0 && <div className="text-lg font-medium md:w-1/2 md:self-center"> No Passwords to Show</div>}
        {passwordArray.length!==0 && 
        <table className="table-auto w-full rounded-md overflow-hidden md:w-1/2 self-center">
          <thead className="bg-[#34d399] text-lg">
            <tr>
              <th className="py-2">Website URL</th>
              <th className="py-2">Username</th>
              <th className="py-2">Password</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#d1fae5]">
            {passwordArray.map((e,idx)=>{

              return <tr key={idx}>
              <td className="border border-white text-center font-medium py-2"><a href={e.site} target="_ ">{e.site}</a></td>
              <td className="border border-white text-center font-medium py-2">{e.username}</td>
              <td className="border border-white text-center font-medium py-2">{e.password}</td>
              <td className="border border-white text-center font-medium py-3 flex justify-center align-center gap-2 ">
                <img src="/icons/copy.svg" alt="copy" onClick={()=>{copyText(e)}} className="h-5 hover:cursor-pointer"/>
                <img src="/icons/edit.svg" alt="edit" className="h-5 hover:cursor-pointer" onClick={()=>editPassword(e.id)}/>
                <img src="/icons/delete.svg" alt="delete" className="h-5 hover:cursor-pointer"onClick={()=>deletePassword(e.id)}/>
              </td>
              
            </tr>
            })}
            
          </tbody>
        </table>
        }
      </div>
    </div>
  )
}

export default Hero
