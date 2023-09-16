"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updatePersonalInfo } from "../_actions/update-info-action";

const formSchema = z.object({
  name: z.string(),
  last_name: z.string(),
});

export function PersonalInfo({ session }: { session: Session }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    //@ts-ignore
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "" + session.user.name,
      last_name: "" + session.user.last_name,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updatePersonalInfo(values.name, values.last_name);
    toast({
      title: "Updated",
      description: "You have successfully changed your personal information",
      variant: "default",
    });
    router.refresh();
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start gap-8 sm:flex-row">
            <div className="flex flex-col shrink-0 sm:w-[250px]">
              <p className="pb-2 text-sm font-medium leading-none">
                Profile picture
              </p>

              <div className="flex items-center gap-8">
                <Image
                  src={"" + session.user.image}
                  alt="Profile Picture"
                  className="w-20 h-20 rounded-md aspect-square"
                />
                <div className="px-6 py-4 text-sm border border-dashed rounded-md dark:border-zinc-800 border-zinc-200">
                  <UploadButton
                    className="shrink-0"
                    endpoint="profilePictureUploader"
                    onClientUploadComplete={(res) => {
                      toast({
                        title: "Profile picture changed",
                        description: "You now have a new profile picture",
                        variant: "default",
                      });
                      router.refresh();
                    }}
                    onUploadError={(error: Error) => {
                      toast({
                        title: "Error",
                        description:
                          "There was an error chaning your profile picture",
                        variant: "destructive",
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size={"sm"}>
                  Save
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
  );
}
