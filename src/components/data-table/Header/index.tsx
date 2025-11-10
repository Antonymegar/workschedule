"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Priority } from "@/types/work-order";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

const TopHeader = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState( '');
  const [priority, setPriority] = useState<Priority>('Low');
  const [status, setStatus] = useState('Open');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
   setErrors({});
    try {
      const res = await fetch("/api/work-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, priority , status}),
      });

      const result = await res.json();
      if (!res.ok) {
        if (result.fieldErrors) {
          setErrors(result.fieldErrors); 
        } else {
          toast.error(result.error || "Something went wrong");
        }
        return;
      }
      
      toast.success("Work order created successfully!", {
        description: "You can now view it in your dashboard.",
      });
      setOpen(false);
      setTimeout(() => {
        router.refresh();
      }, 300)
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to create work order", {
        description: err?.message ?? "Something went wrong. Try again later.",
      });
    } finally {
      setTitle("");
      setDescription("");
      setPriority("Low");
    }
  };
  return (
     <div className="flex flex-row justify-end px-8 pt-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon className="w-4 h-4 mr-1" />
            New Work Order
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Work Order</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title[0]}</p>}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Type your message here."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description[0]}</p>}
            </div>

            <div className="grid gap-3">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(val: Priority) => setPriority(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              {errors.priority && <p className="text-sm text-red-500">{errors.priority[0]}</p>}
            </div>

            <div className="grid gap-3">
              <Label>Status</Label>
              <Select value={status} onValueChange={(val) => setStatus(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-sm text-red-500">{errors.status[0]}</p>}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TopHeader;
