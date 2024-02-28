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
import { useRouter } from "next/router";

const Channels = () => {
  const { push } = useRouter();
  const { isPending, error, data } = useQuery({
    queryKey: ['channels'],
    queryFn: async () => {
      const response = await axios.get('https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getChannels');

      // Define width and height
      var width = 400;
      var height = 225;

      // Iterate over each object in the array
      response.data.channels.forEach(function(channel: Channel) {
        // Replace {width} and {height} with actual values in thumbnail_url
        channel.thumbnail_url = channel.thumbnail_url.replace(/{width}/g, width as any).replace(/{height}/g, height as any);
      });

      return response.data.channels;
    },
  });

  const FormSchema = z.object({
    channel: z.string().min(2, {
      message: "Channel must be at least 2 characters.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      channel: "",
    },
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>, e: any) {
    e.preventDefault();
    
    push(`/channel?id=${data.channel}`);
  }

  if (isPending) return <Icons.spinner className="h-20 w-20 animate-spin" />

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="container mx-auto flex flex-1 flex-col min-h-screen">
      <Metatags title="Twitchy - Channels" description="Find details and statistics about any Twitch channel" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
          <FormField
            control={form.control}
            name="channel"
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
    </div>
  );
}

export default Channels;