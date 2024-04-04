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

      <div className="flex md:hidden w-full">
        <TwitchEmbed id="mobile" channel={data.user_login} autoplay muted={true} width={"100%"} className="h-full" />
      </div>

      <div className="hidden md:flex">
        <TwitchEmbed id='web' channel={data.user_login} autoplay muted={true} className="w-1/2 h-full mx-auto" />
      </div>


      <div className="flex flex-col gap-4 w-full sm:w-auto sm:flex-row sm:items-center">        
        <Button className='w-full sm:w-auto' size="sm" variant="default" onClick={() => refetch()}>
          <PlayIcon className="mr-2 h-4 w-4" />
          Find a new stream
        </Button>
        <a href={`channel?id=${data.user_login}`} target="_blank">
          <Button className='w-full sm:w-auto' size="sm" variant="default">
            <UserIcon className="mr-2 h-4 w-4" />
            View Channel
          </Button>
        </a>
        <a href={`https://www.twitch.tv/${data.user_login}`} target="_blank">
          <Button className='w-full sm:w-auto' size="sm" variant="default">
            <ExternalLinkIcon className="mr-2 h-4 w-4" />
            Open on Twitch
          </Button>
        </a>
      </div>
    </div>
  );
}

export default Stream;