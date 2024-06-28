
import MainUser from "@/components/localComponents/MainUser";
import Media from "@/components/localComponents/Media";
import React from "react";

const Profile = () => {
  return (
    <div>
      <div className="grid grid-cols-12 items-center align-center my-12 ml-12">
        <div className="col-span-6 md:col-span-5 lg:col-span-4 xl:col-span-3 3xl:col-span-2">
          <MainUser/>
        </div>
        <div className="col-span-6 md:col-span-7 lg:col-span-8 xl:col-span-9 3xl:col-span-10">
         <Media />
        </div>
      </div>
    </div>
  );
};


export default Profile;