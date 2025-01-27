import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store"
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { FiEdit2 } from "react-icons/fi";
import { IoPower } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
    const {userInfo,setUserInfo}=useAppStore();
    const navigate=useNavigate();

    const logOut=async()=>{
        try {
            const response=await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true})
            if(response.status===200){
                navigate("/auth");
                setUserInfo(null);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-4 w-full bg-[#2a2b33]">
        <div className="flex gap-3 items-center justify-center">
            <div className="w-12 h-12 relative">
            <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                {userInfo.image?(
                  <AvatarImage
                    src={`${HOST}/${userInfo.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black rounded-full"
                  />
                ):(
                  <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full`}>
                  {userInfo.firstName?userInfo.firstName.split("").shift():userInfo.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            </div>
            <div>
                {
                    userInfo.firstName && userInfo.lastName?`${userInfo.firstName} ${userInfo.lastName}`:""
                }
            </div>
        </div>
        <div className="flex gap-5">
        <TooltipProvider>
         <Tooltip>
         <TooltipTrigger>
            <FiEdit2 onClick={()=>navigate("/profile")} className="text-purple-500 text-md font-medium"/>
         </TooltipTrigger>
         <TooltipContent className="bg-[#1c1b1e] border-none text-sm rounded-md p-2 text-white">
           Edit Profile Info
         </TooltipContent>
         </Tooltip>
         </TooltipProvider>
         <TooltipProvider>
         <Tooltip>
         <TooltipTrigger>
            <IoPower onClick={logOut} className="text-red-500 text-md font-medium"/>
         </TooltipTrigger>
         <TooltipContent className="bg-[#1c1b1e] border-none text-sm rounded-md p-2 text-white">
           Log Out
         </TooltipContent>
         </Tooltip>
         </TooltipProvider>
        </div>
    </div>
  )
}

export default ProfileInfo