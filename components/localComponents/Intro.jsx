"use client";
import React from "react";
import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
const Intro = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  const handleJoin = () => {
    router.push("/join");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 bg-black/50 p-20 rounded-lg">
      <h1 className="text-center text-lg">Login or join to coninue</h1>
      <span className="flex gap-4 items-center">
        <Button
          className="bg-stone-400/20 shadow-sm rounded-xl p-2 hover:bg-[#84cc16]/80 text-white"
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          className="bg-stone-400/20 shadow-sm rounded-xl p-2 hover:bg-[#84cc16]/80 text-white"
          onClick={handleJoin}
        >
          join
        </Button>
      </span>
    </div>
  );
};

export default Intro;
