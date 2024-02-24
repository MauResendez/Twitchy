import ClipResults from "@app/components/clip-results";
import Metatags from "@app/components/metatags";
import { Card, CardContent, CardFooter, CardHeader } from "@app/components/ui/card";
import { Icons } from "@app/components/ui/spinner";
import { Clip } from "@app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Clips = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['clips'],
    queryFn: () =>
      axios.get('https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getClips').then((response) => {
        response.data.clips.sort(function(a: Clip, b: Clip) {
          var nameA = a.view_count // Ignore case
          var nameB = b.view_count // Ignore case

          if (nameA > nameB) {
              return -1;
          }

          if (nameA < nameB) {
              return 1;
          }
          // names must be equal
          return 0;
        });
  
        return response.data.clips;
      }),
  })

  if (isPending) return <Icons.spinner className="h-20 w-20 animate-spin" />

  if (error) return 'An error has occurred: ' + error.message

  return (
    <main className="flex-1">
      <Metatags title="Twitchy - Clips" description="Find details and statistics about any Twitch channel" />
      <ClipResults data={data} />
    </main>
  );
}

export default Clips;