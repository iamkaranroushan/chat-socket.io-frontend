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
  Image,
} from "@nextui-org/react";
import { IoMdClose } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import useFetchMedia from "@/hooks/useFetchMedia";

const Media = () => {
  const { media } = useFetchMedia();
  //   console.log(media);
  return (
    <div>
      <Card className="h-[90vh]" radius="none">
        <CardHeader className="flex justify-center p-4 bg-black/80">
          <span className="flex gap-2 justify-center items-center">
            <span className="text-white/60">All media</span>
          </span>
        </CardHeader>
        <CardBody className=" bg-black/70">
          <div className="grid grid-cols-3 gap-4">
            {media &&
              media.map((img, index) => (
                <span key={index} className="w-auto h-auto">
                <Image
                 
                  width={420}
                  height={420}
                  src={img} // Assuming the images are in JPEG format
                  alt={`Media`}
                />
                </span>
              ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Media;
