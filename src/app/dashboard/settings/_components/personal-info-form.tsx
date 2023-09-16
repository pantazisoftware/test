"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { updatePersonalInfo } from "../_actions/update-info-action";
import { Session } from "next-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <div className="flex flex-col shrink-0 sm:w-[250px]">
              <p className="text-sm pb-2 font-medium leading-none">
                Profile picture
              </p>

              <div className="flex items-center gap-8">
                <img
                  src={"" + session.user.image}
                  className="w-20 h-20 rounded-md"
                />
                <div className="rounded-md dark:border-zinc-800 border-zinc-200 border border-dashed px-6 py-4 text-sm">
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
                className="space-y-4 w-full"
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
