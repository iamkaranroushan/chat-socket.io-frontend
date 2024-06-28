"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Avatar,
  Button,
} from "@nextui-org/react";
import { FiUser } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { RiHome4Line } from "react-icons/ri";
import useSenderId from "@/hooks/getCurrentUser";
import { useRouter } from "next/navigation";

const MainUser = () => {
  const { sender } = useSenderId();
  const router = useRouter();

  const handleNavigate = (e)=>{
    e.preventDefault();
    router.push('/')

  }
  return (
    <div>
      <Card
        className="h-[90vh] rounded-s-xl border-none  shadow-none"
        radius="none"
      >
        <CardHeader className=" flex justify-between items-center bg-black/80">
          <span className="flex items-center gap-1">
            <FiUser className="text-white" />
            <span className="text-white">profile</span>
          </span>

          <Button isIconOnly size="sm" onClick={handleNavigate}>
            <RiHome4Line className="text-lg" />
          </Button>
        </CardHeader>
        <CardBody className="flex flex-col bg-black/80 gap-1 ">
          <div
            className={`flex bg-black/40 justify-between items-center p-4 rounded-xl`}
          >
            {sender && (
              <span className="flex items-center gap-4 ">
                <Avatar
                  isBordered
                  color="Default"
                  showFallback
                  fallback={<FaUserAlt className="text-lg text-stone-600" />}
                ></Avatar>

                <span className="flex flex-col">
                  <p className="text-md font-semibold text-white/80">
                    {sender.username}
                  </p>
                  <p className="text-sm text-white/50">
                    @{sender._id.slice(8)}
                  </p>
                </span>
              </span>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default MainUser;
