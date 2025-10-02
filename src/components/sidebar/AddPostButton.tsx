"use client";
import { Button } from "../ui/button";
import { Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { useState, useRef } from "react";
import { createPost } from "@/helpers/postHelper";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";

const AddPostButton = () => {
  const { user } = useUserStore();
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      description,
      files,
    }: {
      description: string;
      files: File[];
    }) => createPost(description, files, user?._id),
    onSuccess: (data) => {
      toast.success(data.message);
      setDesc("");
      setImages([]);
      setPreviews([]);
      setOpen(false);
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
    },
    onError: (err: unknown) => {
      console.error(err);
      toast.error("Failed to create post");
    },
  });

  const handlePost = () => {
    if (!desc.trim() && images.length === 0) {
      toast.error("Post cannot be empty");
      return;
    }
    mutate({ description: desc, files: images });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    if (images.length + filesArray.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...filesArray]);
    const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };
  const characterCount = 150 - desc.length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='w-full flex justify-start py-6 items-center gap-2'
        >
          <Plus className='size-5' />
          <p className='text-lg'>Post</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='h-fit'>
          <Textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className='h-20 w-[45rem] border-none'
            placeholder='Enter message here'
          />
          <div className='flex justify-end'>
            <p
              className={`text-muted-foreground text-xs ${
                characterCount < 0 && "text-red-500"
              }`}
            >
              Limit: {characterCount}
            </p>
          </div>

          <div className='my-2 flex gap-2 flex-wrap'>
            {previews.map((src, index) => (
              <div
                key={index}
                className='relative w-20 h-20 bg-red-50 rounded-md overflow-hidden'
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Button
                  variant='destructive'
                  className='absolute top-0 right-0 rounded-full size-6'
                  onClick={() => removeImage(index)}
                >
                  <X size={4} />
                </Button>
              </div>
            ))}
          </div>

          <input
            type='file'
            accept='image/*'
            multiple
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <div className='flex justify-end mt-4 pt-2'>
            {/* <Button
              variant={"ghost"}
              onClick={() => fileInputRef.current?.click()}
            >
              <Image />
            </Button> */}
            <Button onClick={handlePost} disabled={desc.trim().length > 150}>
              {isPending ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostButton;
