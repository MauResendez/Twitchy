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

  if (loading) return "Loading..."

  return (
    <TwitchClip clip={id as string} autoplay />
  );
}

export default Clip;