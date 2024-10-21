import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import Victory from "../../assets/victory.svg"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { apiClient } from "@/lib/api-client"
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "@/store"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate=useNavigate();
  const {setUserInfo}=useAppStore();
  const validateLogin=()=>{
    if(!email.length){
      toast.error("Email is required")
      return false;
    }
    if(!password.length){
      toast.error("Password is required")
      return false;
    }
    return true;
  }
  const
   validateSignup=()=>{
    if(!email.length){
      toast.error("Email is required")
      return false;
    }
    if(!password.length){
      toast.error("Password is required")
      return false;
    }
    if(password!=confirmPassword){
      toast.error("Password & confirm password should be same")
      return false;
    }
    return true;
  }

    const handleLogin=async()=>{
      if(validateLogin()){
        try {
          const response=await apiClient.post(LOGIN_ROUTE,{email,password},{withCredentials:true})

          if(response.data.user.id){
            if(response.data.user.profileSetup){
              setUserInfo(response.data.user)
              navigate('/chat')
            }else{
              navigate('/profile');
            }
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    }

    const handleSignup=async()=>{
      if(validateSignup()){
        try {
          const response=await apiClient.post(SIGNUP_ROUTE,{email,password},{withCredentials:true})
          if(response.status===201){
            setUserInfo(response.data.user)
            navigate('/profile');
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    }

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-[url('https://media.istockphoto.com/id/1403848173/vector/vector-online-chatting-pattern-online-chatting-seamless-background.jpg?s=612x612&w=0&k=20&c=W3O15mtJiNlJuIgU6S9ZlnzM_yCE27eqwTCfXGYwCSo=')] bg-fit bg-center">
      <div className="h-[90vh] bg-gray-50 border-2 border-black text-opacity-90 shadow-2xl w-[80vw]
      md:w-[90vw] lg:w-[70vw] xl:w-[60vw] grid xl:gride-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-xl font-medium tracking-tight md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]"/>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">

          <Tabs className="w-3/4" defaultValue="login">
            <TabsList className="bg-transparent rounded-none w-full flex">
              <TabsTrigger value="login"
              className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none data-[state=active]:text-black w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all">Login</TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none data-[state=active]:text-black w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all" value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-col gap-5 mt-5" value="login">
              <Input placeholder="Email"
              type="email"
              className="rounded-full p-6"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}></Input>
               <Input placeholder="Password"
              type="password"
              className="rounded-full p-6"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}></Input>


              <Button className="p-6 rounded-full" onClick={handleLogin}>Login</Button>
            
            
            </TabsContent>
             <TabsContent className="flex flex-col gap-5" value="signup">
             <Input placeholder="Email"
              type="email"
              className="rounded-full p-6"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}></Input>
               <Input placeholder="Password"
              type="password"
              className="rounded-full p-6"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}></Input>
              <Input placeholder="Confirm Password"
              type="password"
              className="rounded-full p-6"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}></Input>

              <Button className="p-6 rounded-full" onClick={handleSignup}>Signup</Button>

             </TabsContent>
          </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth