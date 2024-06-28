import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
  } from "@nextui-org/react";
  import { RxExit } from "react-icons/rx";
  import React from "react";
  import Users from "./Users";
  
  const Nav = ({ startConversation }) => {
    return (
      <div>
        <Navbar  shouldHideOnScroll>
          <NavbarContent className="fixed">
            <NavbarItem>
              <Button isIconOnly>
                <RxExit />
              </Button>
            </NavbarItem>
            <NavbarItem>
              
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    );
  };
  
  export default Nav;
  