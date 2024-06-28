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
const Login = ({ handleLogin }) => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleJoin=(e)=>{
    e.preventDefault()
    router.push('/join')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(user);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="flex flex-col  w-[400px] sm:w-[500px] h-[600px]">
        <CardHeader className="p-4 flex flex-col items-start">
          <h1 className="text-[#84cc16]/80 text-3xl font-bold">Login</h1>
          <p className="text-[#4b4b4b] text-md mt-2 ">
            Enter your details below to log in to your account
          </p>
        </CardHeader>
        <CardBody className="p-4 my-4 ">
          <Input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            label="email"
            className="mb-2"
          />
          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            label="password"
            className="mb-2"
          />
          <Button onClick={handleSubmit} className="my-2 w-full">
            Login
          </Button>

          <Divider className="my-4" />
          <p className="text-center text-sm text-[#4b4b4b]">or continue with</p>

          <span className="flex my-4 items-center justify-center">
            <Button onClick={handleJoin} size="md">Join</Button>
          </span>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
