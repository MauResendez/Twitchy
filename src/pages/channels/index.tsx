import ChannelResults from "@app/components/channel-results";
import Metatags from "@app/components/metatags";
import { Icons } from "@app/components/ui/spinner";
import { Channel } from "@app/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/components/ui/form";
import { Input } from "@app/components/ui/input";
import { toast } from "@app/types/use-toast";
import { useRouter } from "next/router";

const Channels = () => {
  const { push } = useRouter();
  const { isPending, error, data } = useQuery({
    queryKey: ['channels'],
    queryFn: () =>
      axios.get('https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getChannels').then((response) => {
        // Define width and height
        var width = 400;
        var height = 225;
  
        // Iterate over each object in the array
        response.data.channels.forEach(function(channel: Channel) {
          // Replace {width} and {height} with actual values in thumbnail_url
          channel.thumbnail_url = channel.thumbnail_url.replace(/{width}/g, width as any).replace(/{height}/g, height as any);
        });
  
        return response.data.channels;
      }),
  });

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

    push(`/channels/${data.username}`)
  }

  if (isPending) return <Icons.spinner className="h-20 w-20 animate-spin" />

  if (error) return 'An error has occurred: ' + error.message

  return (
    <main className="flex-1">
      <Metatags title="Twitchy - Channels" description="Find details and statistics about any Twitch channel" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search</FormLabel>
                <FormControl>
                  <Input placeholder="Example: xQc, Jynxzi, KaiCenat, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <ChannelResults data={data} />
    </main>
  );
}

export default Channels;