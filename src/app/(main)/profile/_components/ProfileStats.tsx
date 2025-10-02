import React from "react";

type ProfileStatsProps = {
  posts: number;
  followers: number;
  following: number;
};

const ProfileStatsComponent = ({ posts, followers, following }: ProfileStatsProps) => (
  <div className='md:px-4 flex flex-row md:flex-col gap-2 text-sm md:text-base'>
    <p className='text-muted-foreground'>
      <span className='text-black dark:text-white font-medium'>{posts}</span>{" "}
      Posts
    </p>
    <p className='text-muted-foreground'>
      <span className='text-black dark:text-white font-medium'>{followers}</span>{" "}
      Followers
    </p>
    <p className='text-muted-foreground'>
      <span className='text-black dark:text-white font-medium'>{following}</span>{" "}
      Following
    </p>
  </div>
);

const ProfileStats = React.memo(ProfileStatsComponent);

export default ProfileStats;
