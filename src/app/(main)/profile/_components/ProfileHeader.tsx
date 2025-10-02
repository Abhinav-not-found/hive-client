"use client";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ProfileEditButton from "./ProfileEditButton";
import { handleChange } from "@/helpers/userHelper";
import { useUserStore } from "@/store/userStore";

type User = {
  _id: string;
  username?: string;
  name: string;
  bio?: string;
  profileImage?: string;
};

type Props = {
  user: User | null;
};

const ProfileHeader: React.FC<Props> = ({ user }) => {
  const { user: SavedUser } = useUserStore();
  const path = usePathname();
  const pageId = path.split("/profile/")[1];

  const [preview, setPreview] = useState<String | undefined>(
    user?.profileImage
  );

  return (
    <div className='w-full flex gap-6 md:gap-8'>
      <div>
        <label
          htmlFor='fileInput'
          className='size-20 md:size-36 bg-neutral-100 dark:bg-neutral-800 rounded-full cursor-pointer flex items-center justify-center dark:brightness-90'
          style={{
            backgroundImage: preview ? `url(${preview})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></label>
        <input
          id='fileInput'
          type='file'
          className='hidden'
          accept='image/*'
          onChange={(e) => handleChange({ e, setPreview })}
        />
        <div className='block md:hidden mt-1'>
          {pageId === SavedUser?._id ? (
            <ProfileEditButton user={user} />
          ) : (
            <Button>Follow</Button>
          )}
        </div>
      </div>

      <div className='w-full leading-4 md:mt-2'>
        <p className='text-muted-foreground text-xs md:text-sm mb-1'>
          @{user?.username}
        </p>
        <div className='w-full flex flex-row gap-2 justify-between'>
          <p className='text-xl md:text-3xl leading-6 font-medium first-letter:uppercase'>
            {user?.name}
          </p>
          <div className='hidden md:block'>
            {pageId === SavedUser?._id ? (
              <ProfileEditButton user={user} />
            ) : (
              <Button>Follow</Button>
            )}
          </div>
        </div>
        <p className='text-sm md:text-[18px] mt-2 md:mt-1'>{user?.bio}</p>
      </div>
    </div>
  );
};
export default ProfileHeader;
