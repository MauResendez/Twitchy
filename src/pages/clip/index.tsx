import Metatags from "@app/components/metatags";
import { useSearchParams } from 'next/navigation';
import { TwitchClip } from 'react-twitch-embed';

const Clip = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  if (!id) return "No ID for clip provided"

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Metatags title={`Twitchy - ${id}`} description={`View clip ${id} from Twitch`} />
      <TwitchClip clip={id as string} autoplay />
    </div>
  );
}

export default Clip;