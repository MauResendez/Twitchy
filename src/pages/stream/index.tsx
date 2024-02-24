import { Icons } from '@app/components/ui/spinner';
import { useQuery } from '@tanstack/react-query';
import { TwitchPlayer } from 'react-twitch-embed';

const Stream = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['stream'],
    queryFn: () => {
      const streams = JSON.parse(sessionStorage.getItem("streams") as any);

      const index = Math.floor(Math.random() * streams.length);

      return streams[index];
    },
    refetchOnWindowFocus: false
  });

  if (isPending) return <Icons.spinner className="h-20 w-20 animate-spin" />

  if (error) return 'An error has occurred: ' + error.message

  if (data.length == 0) return "We're sorry. We couldn't find a stream for you."
  
  return (
    <TwitchPlayer channel={data.user_login} autoplay muted={false} />
  );
}

export default Stream;