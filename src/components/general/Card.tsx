import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserInfoById } from "@/helpers/userHelper";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

interface PostData {
  _id: string;
  userId: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
interface UserInfo {
  _id: string;
  name: string;
  profileImage?: string;
}

interface CardProps {
  data: PostData;
}
const Card = ({ data }: CardProps) => {

  const { data: userInfo, isLoading } = useQuery<UserInfo>({
    queryKey: ["getUserInfoById", data.userId],
    queryFn: () => getUserInfoById(data.userId),
  });
  
  if (isLoading) return <CardSkeleton />;

  return (
    <div className='h-fit w-[19rem] md:w-full max-w-[24rem] bg-neutral-100 dark:bg-neutral-900 rounded-md'>
      <div className='h-12 flex items-center justify-between px-2'>
        <div className='flex gap-2 items-center'>
          <Avatar>
            <AvatarImage src={userInfo?.profileImage} />
            <AvatarFallback className='uppercase bg-neutral-200 dark:bg-neutral-800'>
              {userInfo?.name.slice(0, 1)[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/profile/${userInfo?._id}`}
              className='first-letter:uppercase hover:underline'
            >
              {userInfo?.name}
            </Link>
          </div>
        </div>
        <div>
          <Button variant={"ghost"}>
            <Ellipsis />
          </Button>
        </div>
      </div>
      <div className='w-full h-72 md:h-80 px-4 first-letter:uppercase'>
        {data?.description}
      </div>
      {/* <div className='h-12 px-2 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button variant={"ghost"}>
            <Heart className='size-5' />
          </Button>
          <Button variant={"ghost"}>
            <MessageCircle className='size-5' />
          </Button>
          <Button variant={"ghost"}>
            <Send className='size-5' />
          </Button>
        </div>
      </div> */}
    </div>
  );
};

const CardSkeleton = () => {
  return (
    <>
      <Skeleton className='w-[24rem] h-[370px]' />
    </>
  );
};

export default Card;
