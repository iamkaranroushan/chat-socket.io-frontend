"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Badge,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  ButtonGroup,
  user,
} from "@nextui-org/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import useAllUsers from "@/hooks/getAllUsers";
import { FiUsers } from "react-icons/fi";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
const Users = ({
  startConversation,
  leaveRoom,
  recName,
  getRecipient,
  selectedUser,
}) => {
  // const [isOpen, setIsOpen] = useState(true);
  const { users, loading } = useAllUsers();
  // const toggleVisibility = () => {
  //   setIsOpen(!isOpen);
  // };

  const router = useRouter();

  const handleClick = async (userId, username, email) => {
    startConversation(userId, username);
    getRecipient(email);
  };
  // useEffect(()=>{
  //   leaveRoom();
  // },[])

  const handleNavigate = (e)=>{
    e.preventDefault();
    router.push('/profile')

  }

  return (
    <div>
      {
        <Card
          className="h-[90vh] rounded-s-xl border-none  shadow-none"
          radius="none"
        >
          <CardHeader className=" flex gap-1 bg-black/80 p-5">
            <FiUsers className="text-white" />
            <span className="text-white">people</span>
          </CardHeader>

          <CardBody className="flex flex-col bg-black/80 gap-1 ">
            {users &&
              users.map((user, index) => (
                <div
                  key={index}
                  className={`flex hover:bg-white/20 ${
                    selectedUser == user.username && `bg-white/20`
                  } justify-between items-center p-4 rounded-xl
              `}
                >
                  <span className="flex items-center gap-2 ">
                    <Badge content="" color="success">
                      <Avatar
                        isBordered
                        color="Default"
                        showFallback
                        fallback={
                          <FaUserAlt className="text-lg text-stone-600" />
                        }
                      ></Avatar>
                    </Badge>
                    <span className="flex flex-col">
                      <p className="text-small text-white">{user.username}</p>
                      <p className="text-tiny text-white/50">
                        @{user._id.slice(8)}
                      </p>
                    </span>
                  </span>
                  <Button
                    className="bg-stone-400/20 shadow-sm rounded-xl p-2 hover:bg-[#84cc16]/80 text-white"
                    onClick={() =>
                      handleClick(user._id, user.username, user.email)
                    }
                  >
                    message
                  </Button>
                </div>
              ))}
          </CardBody>
          <CardFooter className="flex bg-black/70 p-8">
            <div className="flex justify-between w-full">
              <Badge content="" color="success">
                <Avatar
                  isBordered
                  color="Default"
                  showFallback
                  fallback={<FaUserAlt className="text-lg text-stone-600" />}
                ></Avatar>
                </Badge>
                <Button className="bg-stone-400/20 shadow-sm rounded-xl p-2 hover:bg-[#84cc16]/80 text-white"
                onClick={handleNavigate}>
                  profile
                </Button>
            </div>
          </CardFooter>
        </Card>
      }
    </div>
  );
};

export default Users;
