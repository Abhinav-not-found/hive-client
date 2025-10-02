"use client";
import { Button } from "@/components/ui/button";
import { getProfilePosts, handleDeletePost } from "@/helpers/postHelper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Trash,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { usePathname } from "next/navigation";

type User = {
  userId: string;
};

// Define Post type (adjust based on your API)
export interface Post {
  _id: string;
  userId: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ProfilePost = ({ userId }: User) => {
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery<Post[]>({
    queryKey: ["profilePosts", userId],
    queryFn: () => getProfilePosts(userId),
    enabled: !!userId,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (postId: string) => handleDeletePost(postId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profilePosts", userId] });
      toast.success(data.message);
    },
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>No posts</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-0 gap-y-0 auto-rows-max">
      {posts.map((p, index) => {
        return (
          <Card
            key={p._id || index}
            data={p}
            onDelete={() => deleteMutation.mutate(p._id)}
          />
        );
      })}
    </div>
  );
};

interface CardProps {
  data: Post;
  onDelete: () => void;
}

const Card = ({ data, onDelete }: CardProps) => {
  const [view, setView] = useState(false);
  return (
    <div
      onClick={() => setView(true)}
      className="bg-neutral-50 dark:bg-neutral-900 w-[9rem] h-[12rem] md:w-[18rem] md:h-[24rem] border relative px-2 py-4 md:px-4 md:py-8 cursor-pointer"
    >
      <Menu onDelete={onDelete} />
      <p className="text-xs md:text-[16px] first-letter:uppercase">
        {data?.description}
      </p>
      {view && <View setView={setView} />}
    </div>
  );
};

const Menu = ({ onDelete }: { onDelete: () => void }) => {
  const { user: SavedUser } = useUserStore();
  const path = usePathname();
  const pageId = path.split("/profile/")[1];

  return (
    <div className="absolute top-1 right-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Button variant={"ghost"} className="hidden md:block">
              <Ellipsis className="size-2 md:size-4" />
            </Button>
            <button className="block md:hidden p-1">
              <Ellipsis className="size-3 md:size-4" />
            </button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div>
            {pageId === SavedUser?._id && (
              <Button
                onClick={(e) => {
                  onDelete();
                  e.stopPropagation();
                }}
                variant={"ghost"}
                className="w-full hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-500 dark:hover:text-red-500 "
              >
                <Trash />
                <p>Delete</p>
              </Button>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const View = ({ setView }: { setView: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <div
      onClick={() => setView(false)}
      className="w-screen h-screen bg-neutral-700/80 dark:bg-neutral-900/80 fixed inset-0 z-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex justify-end p-4"
      >
        <button onClick={() => setView(false)} className="cursor-pointer">
          <X className="text-white" />
        </button>
      </div>
      <div className="h-full flex items-center px-4">
        <button className="mb-20 bg-white dark:bg-white/80 rounded-full p-1 cursor-pointer">
          <ChevronLeft className="dark:text-black" />
        </button>
        <div className="bg-white dark:bg-neutral-800 h-[40rem] w-[55rem] m-auto mb-40"></div>
        <button className="mb-20 bg-white dark:bg-white/80 rounded-full p-1 cursor-pointer">
          <ChevronRight className="dark:text-black" />
        </button>
      </div>
    </div>
  );
};

export default ProfilePost;
