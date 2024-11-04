import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { animationDefaultOptions } from "@/lib/utils";
import Lottie from "react-lottie";
import { apiClient } from "@/lib/api-client";
import { HOST, SEARCH_CONTACTS } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";

const NewDM = () => {
  const { setSelectedChatData, setSelectedChatType } = useAppStore();

  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  

  const [searchedContacts, setSearchedContacts] = useState([]);



  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS,
          { searchTerm },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const selectNewContact = (contact) => {
    setOpenNewContactModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    searchContacts([]);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => {
                setOpenNewContactModal(true);
              }}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white text-sm rounded-md">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={openNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-sm">
              Please select a contact
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="bg-[#2c2e3b] border-none rounded-lg p-6"
              onChange={(e) => searchContacts(e.target.value)}
            ></Input>
          </div>
         {
          searchedContacts.length>0 && (
            <ScrollArea className="h-[250px]">
            <div className="flex flex-col gap-5">
              {searchedContacts.map((contacts) => (
                <div
                  key={contacts._id}
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() => selectNewContact(contacts)}
                >
                  <div className="w-12 h-12 relative">
                    <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                      {contacts.image ? (
                        <AvatarImage
                          src={`${HOST}/${contacts.image}`}
                          alt="profile"
                          className="object-cover w-full h-full bg-black"
                        />
                      ) : (
                        <div
                          className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full`}
                        >
                          {contacts.firstName
                            ? contacts.firstName.split("").shift()
                            : contacts.email.split("").shift()}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <span>
                      {contacts.firstName && contacts.lastName
                        ? `${contacts.firstName} ${contacts.lastName}`
                        : contacts.email}
                    </span>
                    <span className="text-xs text-purple-400">
                      {contacts.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          )
         }
          {searchedContacts.length <= 0 && (
            <div className="flex-1 bg-transparent mt-2 md:mt-0 md:flex flex-col justify-center items-center duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              ></Lottie>
              <div className="text-opacity-80 mt-5  text-white flex flex-col gap-5 items-center lg:text-2xl text-xl transition-all duration-300 text-center">
                <h3 className="poppins-extralight">
                  Hi!<span className="text-purple-500"> Search</span> new
                  contacts.
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
