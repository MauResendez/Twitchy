import Metatags from "@app/components/metatags";
import { Icons } from "@app/components/ui/spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TwitchClip } from 'react-twitch-embed';

const Clip = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady){
      setLoading(false);
    }
  }, [router.isReady]);

  if (loading) return <Icons.spinner className="h-20 w-20 animate-spin" />

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Metatags title={`Twitchy - ${id}`} description={`View clip ${id} from Twitch`} />
      <TwitchClip clip={id as string} autoplay />
    </div>
  );
}

export default Clip;