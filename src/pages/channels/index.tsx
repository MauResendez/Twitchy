import { Card, CardContent, CardFooter, CardHeader } from "@app/components/ui/card";
import { Channel } from "@app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

const Channels = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['channels'],
    queryFn: () =>
      axios.get('https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getChannels').then((response) => {
        // Define width and height
        var width = 400;
        var height = 225;
  
        // Iterate over each object in the array
        response.data.channels.forEach(function(channel: any) {
          // Replace {width} and {height} with actual values in thumbnail_url
          channel.thumbnail_url = channel.thumbnail_url.replace(/{width}/g, width).replace(/{height}/g, height);
        });
  
        return response.data.channels;
      }),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <main className="flex-1">
      <div className="container mx-auto grid gap-4 md:grid-cols-2 xl:grid-cols-4 p-4">
        {data.map((channel: Channel) => (
          <Link href={"/channels/" + channel.user_id}>
            <Card key={channel.id}>
              <CardContent className="p-0 aspect-video">
                <img
                  alt="Stream"
                  className="object-cover w-full h-full"
                  height={225}
                  src={channel.thumbnail_url}
                  style={{
                    aspectRatio: "400/225",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </CardContent>
              <CardHeader className="space-y-0 p-4">
                <div className="flex items-center">
                  <div className="grid text-sm">
                    <h3 className="font-medium">{channel.user_name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{channel.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Playing: {channel.game_name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Viewers: {channel.viewer_count}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
          
        ))}
        
      </div>
    </main>
  );
}

export default Channels;