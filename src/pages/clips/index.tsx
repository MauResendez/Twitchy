import ClipResults from "@app/components/clip-results";
import Metatags from "@app/components/metatags";
import { Icons } from "@app/components/ui/spinner";
import { Clip } from "@app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Clips = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['clips'],
    queryFn: async () => {
      const response = await axios.get('https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getClips');

      const clips: Clip[] = response.data.clips;
      
      clips.sort(function(a: Clip, b: Clip) {
        let nameA = a.view_count // Ignore case
        let nameB = b.view_count // Ignore case

        if (nameA > nameB) {
          return -1;
        }

        if (nameA < nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });

      return clips;
    }
  })

  if (isPending) return <Icons.spinner className="h-20 w-20 animate-spin" />

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="container mx-auto flex flex-1 flex-col min-h-screen">
      <Metatags title="Twitchy - Clips" description="Find the top Twitch clips of the week" />
      <ClipResults data={data} />
    </div>
  );
}

export default Clips;