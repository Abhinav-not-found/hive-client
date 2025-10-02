import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className='w-full px-4 md:px-10'>
      <div className='w-full flex gap-6 md:gap-8'>
        <div>
          <Skeleton className='size-20 md:size-36 rounded-full' />
        </div>
        <div className='w-full md:mt-2'>
          <Skeleton className='h-5 w-[10rem]' />
          <Skeleton className='h-10 w-[20rem] mt-2' />
          <Skeleton className='h-18 w-[25rem] mt-2' />
        </div>
      </div>
      <div className='flex gap-18 mt-4'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-[4rem] ml-4' />
          <Skeleton className='h-6 w-[6rem] ml-4' />
          <Skeleton className='h-6 w-[6rem] ml-4' />
        </div>
        <div>{/* <Skeleton className='h-6 w-[6rem]' /> */}</div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
