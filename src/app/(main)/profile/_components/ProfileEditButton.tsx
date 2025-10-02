"use client";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/store/userStore";
import { handleProfileInfoUpdate } from "@/helpers/userHelper";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface User {
  _id: string;
  name: string;
  bio?: string;
  username?: string;
  profileImage?: string;
  email?: string;
}

interface UpdateProfilePayload {
  name: string;
  bio: string;
  userId: string;
}

const ProfileEditButton = ({ user }: { user: User | null }) => {
  const { user: loggedInUser, setUser } = useUserStore();
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      handleProfileInfoUpdate(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      if (user) {
        setUser({ ...user, name, bio, email: user.email || "" });
      }
      setOpen(false);
    },
    onError: (err: unknown) => {
      console.error(err);
      toast.error("Profile update failed");
    },
  });

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <SquarePen />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile Info</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate({ name, bio, userId: loggedInUser?._id || "" });
          }}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
            className='mb-4'
          />
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder='Bio'
            className='mb-4 h-40 resize-none'
          />
          <div className='flex justify-end'>
            <Button
              disabled={!name.trim() || !bio.trim() || mutation.isPending}
            >
              {mutation.isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditButton;
