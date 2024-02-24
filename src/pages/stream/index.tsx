import Metatags from '@app/components/metatags';
import { Button } from '@app/components/ui/button';
import { Icons } from '@app/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import { ExternalLinkIcon, PlayIcon, UserIcon } from 'lucide-react';
import { TwitchEmbed } from 'react-twitch-embed';

const Stream = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['stream'],
    queryFn: () => {
      const streams = JSON.parse(sessionStorage.getItem("streams") as any);

      const index = Math.floor(Math.random() * streams.length);

      return streams[index];
    },
    refetchOnWindowFocus: false
  });

  if (isPending) return <Icons.spinner className="h-20 w-20 animate-spin" />

  if (error || !data) return "We're sorry. We couldn't find a stream for you."
  
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-4">
      <Metatags title="Twitchy - Stream" description="View a random stream based on the parameters that you've set" />
      <TwitchEmbed channel={data.user_login} autoplay muted={false} />
      <div className="flex items-center space-x-4">
        <Button size="sm" variant="default" onClick={() => refetch()}>
          <PlayIcon className="mr-2 h-4 w-4" />
          Find a new stream
        </Button>
        <a href={`channels/${data.user_login}`} target="_blank">
          <Button size="sm" variant="default">
            <UserIcon className="mr-2 h-4 w-4" />
            View Channel
          </Button>
        </a>
        <a href={`https://www.twitch.tv/${data.user_login}`} target="_blank">
          <Button size="sm" variant="default">
            <ExternalLinkIcon className="mr-2 h-4 w-4" />
            Open on Twitch
          </Button>
        </a>
      </div>
    </div>
  );
}

export default Stream;