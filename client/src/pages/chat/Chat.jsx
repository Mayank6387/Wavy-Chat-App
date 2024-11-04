import { useAppStore } from "@/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./components/contacts-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatsContainer from "./components/chat-container";

const Chat = () => {
  
  const {userInfo,selectedChatType}=useAppStore();

  const navigate=useNavigate();
  
  useEffect(() => {
    if(!userInfo.profileSetup){
      toast("Please setup your profile to continue")
      navigate("/profile")
    }
  }, [userInfo,navigate])
  
  return (
    <div className="flex h-[100vh] text-white overflow-hidden bg-[#1b1c24]">
      <ContactsContainer/>
      {selectedChatType===undefined?(<EmptyChatContainer/>):(<ChatsContainer/>)}
    </div>
  )
}

export default Chat