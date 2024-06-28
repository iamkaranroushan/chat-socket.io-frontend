import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Badge,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@nextui-org/react";
import { IoIosSend } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import useSenderId from "@/hooks/getCurrentUser";
import { MdOutlineAlternateEmail, MdOutlineAdd } from "react-icons/md";
import { RiFolderAddLine } from "react-icons/ri";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
const ChatWindow = ({
  sendMessage,
  leaveRoom,
  messages,
  recName,
  sendMail,
}) => {
  const { sender } = useSenderId();
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  const [switchChat, setSwitchChat] = useState(false);
  const [switchMedia, setSwitchMedia] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, switchMedia, switchChat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = message.trim();
    const isImage = false;
    if (data !== "") {
      console.log(data);
      sendMessage(data, isImage);
      setMessage("");
    }
  };

  const handleRemoveSelect = (e) => {
    e.preventDefault();
    setSelectedFile("");
    setSwitchMedia(false);
  };

  const base64Image = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
    return data;
  };

  const handleFileSelect = async (e) => {
    e.preventDefault();
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = async (event) => {
      event.preventDefault();
      const file = event.target.files[0];
      if (file) {
        // Check if the selected file is an image

        const image = await base64Image(file);
        setSelectedFile(image);
        // Upload the image file (you need to implement this)
        setSwitchMedia(true);
      }
    };
    input.click();
  };

  const handleImageSend = (e) => {
    // setMessage(selectedFile);
    e.preventDefault();
    if (selectedFile !== "") {
      console.log(`${selectedFile} sent`);
      const image = selectedFile;
      const isImage = true;
      sendMessage(image, isImage);
      setSelectedFile("");
      setSwitchMedia(false);
    }
  };

  const handleMailSubmit = () => {
    if (subject && mailMessage) {
      let sub = subject.trim();
      let mailMsg = mailMessage.trim();
      if (subject !== "" && mailMessage != "") {
        let mailData = { subject: sub, mailMessage: mailMsg };
        // console.log(mailData);
        sendMail(mailData);
        setMailMessage("");
        setSubject("");
      }
    }
  };

  // useEffect(() => {
  //   setMessage("")
  //   setMessages([]); // Clear the message input field
  // }, [recName]);

  const handleLeave = (e) => {
    e.preventDefault();
    leaveRoom();
  };

  const handleSaveImage = async (msg) => {
    try {
      const image = msg;
      const response = await axios.post(
        "http://localhost:8000/media/saveMedia",
        {
          image: image
        },
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSwitch = (e) => {
    e.preventDefault;
    setSwitchChat((prev) => !prev);
  };
  return (
    <div>
      {switchMedia ? (
        <Card className="h-[90vh]  " radius="none">
          <CardHeader className="flex justify-between bg-black/80">
            <span className="flex gap-2 justify-center items-center">
              <Badge content="" color="success">
                <Avatar
                  isBordered
                  color="Default"
                  showFallback
                  fallback={<FaUserAlt className="text-lg text-stone-600" />}
                ></Avatar>
              </Badge>
              <span className="text-white">{recName}</span>
            </span>

            <span className="flex gap-2">
              <Button
                isIconOnly
                onClick={handleRemoveSelect}
                title="leave the room"
              >
                <IoMdClose />
              </Button>
            </span>
          </CardHeader>
          <CardBody className=" bg-black/70">
            <div className="flex justify-center items-center flex-col gap-1">
              {selectedFile ? (
                <div>
                  <Image
                    width={420}
                    height={420}
                    src={selectedFile}
                    alt="NextUI Album Cover"
                    className="h-full flex m-5 bg-black/30 rounded-md"
                  />
                </div>
              ) : (
                "no image"
              )}
            </div>
          </CardBody>
          <CardFooter className=" flex flex-col gap-2 bg-black/80 p-8">
            <div className="flex gap-2 w-full">
              <Button
                onClick={handleImageSend}
                isIconOnly
                aria-label="send"
                title="send message"
              >
                <IoIosSend className="text-lg" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : !switchChat ? (
        <Card className="h-[90vh]  " radius="none">
          <CardHeader className="flex justify-between bg-black/80">
            <span className="flex gap-2 justify-center items-center">
              <Badge content="" color="success">
                <Avatar
                  isBordered
                  color="Default"
                  showFallback
                  fallback={<FaUserAlt className="text-lg text-stone-600" />}
                ></Avatar>
              </Badge>
              <span className="text-white">{recName}</span>
            </span>

            <span className="flex gap-2">
              <Button isIconOnly onClick={handleSwitch} title="switch to mail">
                <MdOutlineAlternateEmail className="text-lg" />
              </Button>
              <Button isIconOnly onClick={handleLeave} title="leave the room">
                <RxExit />
              </Button>
            </span>
          </CardHeader>
          <CardBody className=" bg-black/70 h-[720px]">
            <div className="flex justify-center flex-col gap-1">
              {messages &&
                messages.map((msg, index) => (
                  <span
                    className={` flex flex-row items-center  text-white my-1 text-sm rounded-xl max-w-[480px] ${
                      msg.sender === "Bot" &&
                      "self-center bg-black/40 text-white/50 rounded-sm text-tiny p-2"
                    }  ${
                      sender && msg.sender === sender._id
                        ? "self-end"
                        : "self-start"
                    }`}
                    key={index}
                  >
                    <span>
                      {msg.isImage ? (
                        <div className="flex gap-1 items-center justify-center">
                          <Dropdown>
                            <DropdownTrigger>
                              <Button
                                isIconOnly
                                radius="full"
                                size="sm"
                                className="bg-white/30"
                              >
                                <RiArrowDropDownLine className="text-xl" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              aria-label="image options"
                              disabledKeys={["delete"]}
                              onAction={(key) => {
                                if (key === "save") {
                                  handleSaveImage(msg.message);
                                }
                              }}
                            >
                              <DropdownItem key="save">save image</DropdownItem>
                              <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                              >
                                Delete image
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>

                          <Image
                            width={240}
                            height={240}
                            className=" flex rounded-md"
                            src={msg.message}
                            alt="image"
                          />
                        </div>
                      ) : (
                        <p
                          className={`${
                            msg.sender != "Bot" && "bg-black/40 p-2 rounded-xl"
                          }`}
                        >
                          {msg.message}
                        </p>
                      )}
                    </span>
                  </span>
                ))}
              <span ref={messagesEndRef} />
            </div>
          </CardBody>
          <CardFooter className=" flex flex-col gap-2 bg-black/80 p-8">
            <div className="flex gap-2 w-full">
              <Button
                onClick={handleFileSelect}
                isIconOnly
                aria-label="send"
                title="Attachments"
              >
                <MdOutlineAdd className="text-lg" />
              </Button>
              <Input
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                type="text"
                placeholder="send messages"
              />

              <Button
                onClick={handleSubmit}
                isIconOnly
                aria-label="send"
                title="send message"
              >
                <IoIosSend className="text-lg" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className="h-[90vh]  " radius="none">
          <CardHeader className="flex justify-between bg-black/80">
            <span className="flex gap-2 justify-center items-center">
              <Badge content="" color="success">
                <Avatar
                  isBordered
                  color="Default"
                  showFallback
                  fallback={<FaUserAlt className="text-lg text-stone-600" />}
                ></Avatar>
              </Badge>
              <span className="text-white">{recName}</span>
            </span>

            <span className="flex gap-2">
              <Button
                isIconOnly
                onClick={handleSwitch}
                title="switch to message"
              >
                <FaMessage className="text-lg" />
              </Button>

              <Button isIconOnly onClick={handleLeave} title="leave the room">
                <RxExit />
              </Button>
            </span>
          </CardHeader>
          <CardBody className=" bg-black/70">
            <div className="flex justify-center items-center flex-col gap-1">
              <Input
                label="subject"
                placeholder="type subject..."
                className=" my-2 w-full"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <textarea
                className="h-[610px] rounded-xl text-sm w-full p-4"
                placeholder="type message..."
                value={mailMessage}
                onChange={(e) => setMailMessage(e.target.value)}
              />
            </div>
          </CardBody>
          <CardFooter className="bg-black/80 p-8">
            <span className="">
              <Button
                onClick={handleMailSubmit}
                isIconOnly
                aria-label="send"
                className="self-end"
              >
                <IoIosSend />
              </Button>
            </span>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ChatWindow;

{
  /**<Button onClick={handleSubmit} isIconOnly>
                <BsEmojiSmile className="text-lg" />
              </Button> */
}
