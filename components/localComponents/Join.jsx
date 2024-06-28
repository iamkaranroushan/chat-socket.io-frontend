import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Divider,
  ButtonGroup,
  CardFooter,
} from "@nextui-org/react";
import React, { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
const Join = ({ handleJoin }) => {
  const router = useRouter()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const handleLogin=(e)=>{
    e.preventDefault()
    router.push('/login')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onJoin function passed from the parent component
    handleJoin(userData);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="flex flex-col  w-[400px] sm:w-[500px] h-[600px]">
        <CardHeader className="p-4 flex flex-col items-start">
          <h1 className="text-[#84cc16]/80 text-3xl font-bold">Join</h1>
          <p className="text-[#4b4b4b] text-md mt-2 ">
            Enter your details below to join
          </p>
        </CardHeader>
        <CardBody className="p-4 my-4 ">
          <Input
            type="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            label="username"
            className="mb-2"
          />
          <Input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            label="email"
            className="mb-2"
          />
          <Input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            label="password"
            className="mb-2"
          />
          <Button onClick={handleSubmit} className="my-2 w-full">
            Join
          </Button>

          <Divider className="my-4" />
          <p className="text-center text-sm text-[#4b4b4b]">or continue with</p>

          <span className="flex my-4 items-center justify-center">
            <Button onClick={handleLogin} size="md">Login</Button>
          </span>
        </CardBody>
      </Card>
    </div>
  );
};

export default Join;
