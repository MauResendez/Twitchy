import StreamerChart from "@app/components/chart";
import Metatags from "@app/components/metatags";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/components/ui/form";
import { Input } from "@app/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [channels, setChannels] = useState(generateRandomData());

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'bottom' as const,
  //     },
  //     title: {
  //       display: true,
  //       text: 'Twitch Channel Statistics',
  //     },
  //   },
  // };
    
  // const data = {
  //   labels: channels.map(channel => channel.user_login),  
  //   datasets: [
  //     {
  //       label: 'Average Viewers',
  //       data: channels.map(channel => channel.avg_viewers),
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //       borderWidth: 2,
  //     },
  //     {
  //       label: 'Followers Gained',
  //       data: channels.map(channel => channel.followers),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //       borderWidth: 2,
  //     },
  //     {
  //       label: 'Hours Streamed',
  //       data: channels.map(channel => channel.hours_watched),
  //       backgroundColor: 'rgba(101, 245, 142, 0.5)',
  //       borderWidth: 2,
  //     },
  //   ],
  // };

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
 
  async function onSubmit(data: z.infer<typeof FormSchema>, e: any) {
    e.preventDefault();
    
    // Call API here and save it on a state

    const response = await axios.get(`https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getChannel?user=${data.channel}`);

    console.log(response);

    if (response.status == 404) {
      // Set error message on search bar
    } else if (response.status == 200) {
      console.log("In here");

      const channel = response.data.channel;
      setChannels([...channels, channel]);

      console.log(channels);
    }
  }

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
      <StreamerChart channels={channels} />
    </div>
  );
}

const generateRandomData = () => {
  const streamers = [];
  const names = ["Streamer1", "Streamer2", "Streamer3", "Streamer4", "Streamer5"];
  
  for (let i = 0; i < 5; i++) {
    const streamer = {
      name: names[i],
      averageViewers: Math.floor(Math.random() * 1000),
      followersGained: Math.floor(Math.random() * 10000),
      hoursStreamed: Math.floor(Math.random() * 100)
    };
    streamers.push(streamer);
  }

  return streamers;
};

export default Statistics;