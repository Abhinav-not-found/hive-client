"use client";
import { getUserInfoById } from "@/helpers/userHelper";
import ProfilePosts from "../_components/ProfilePost";
import ProfileHeader from "../_components/ProfileHeader";
import ProfileStats from "../_components/ProfileStats";
import ProfileSkeleton from "../_components/ProfileSkeleton";
import useAuthRedirect from "@/hooks/authRedirect";
import { useQuery } from "@tanstack/react-query";
import { getProfilePosts } from "@/helpers/postHelper";
import { useParams } from "next/navigation";

const ProfilePage = () => {
  const userId = useParams();

  useAuthRedirect({
    redirectIfNoAuth: "/",
    redirectIfAuth: `/profile/${userId.id}`,
  });

  const { data: profileUser } = useQuery({
    queryKey: ["getUserInfoById", userId.id],
    queryFn: () => getUserInfoById(userId.id),
    enabled: !!userId?.id,
  });

  const { data: posts = [] } = useQuery({
    queryKey: ["profilePosts", profileUser?._id],
    queryFn: () => getProfilePosts(profileUser!._id),
    enabled: !!profileUser?._id,
  });

  if (!profileUser) {
    return <ProfileSkeleton />;
  }

  return (
    <main className='w-full px-4 md:px-10'>
      <ProfileHeader user={profileUser} />
      <div className='flex flex-col md:flex-row gap-6 md:gap-14 mt-6'>
        <ProfileStats posts={posts.length} followers={0} following={0} />
        <ProfilePosts userId={profileUser?._id} />
      </div>
    </main>
  );
};

export default ProfilePage;
