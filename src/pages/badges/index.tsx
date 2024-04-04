import Metatags from "@app/components/metatags";
import { Card, CardContent, CardHeader } from "@app/components/ui/card";
import { Icons } from "@app/components/ui/spinner";
import { Badge } from "@app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

const Badges = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['badges'],
    queryFn: async () => {
      const response = await axios.get('https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getBadges');

      const badges: Badge[] = response.data.badges;
      
      badges.sort(function(a: Badge, b: Badge) {
        let nameA = a.name.toUpperCase(); // Ignore case
        let nameB = b.name.toUpperCase(); // Ignore case

        if (nameA < nameB) {
          return -1;
        }
        
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });

      return badges;
    }
  });

  if (isPending) return <Icons.spinner className="h-20 w-20 animate-spin" />

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="container mx-auto flex flex-1 flex-col min-h-screen">
      <Metatags title="Twitchy - Badges" description="View all global badges from Twitch" />
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-6 py-4">
        {data.map((badge: Badge) => (
          <Link href={`/badge?id=${badge.sk}`} key={badge.sk}>
            <Card key={badge.sk}>
              <CardContent className="p-2 aspect-video">
                <img
                  alt={badge.name}
                  className="object-cover w-full"
                  height={225}
                  src={badge.versions[0].image_url_4x}
                  style={{
                    aspectRatio: "400/225",
                    objectFit: "contain",
                  }}
                  width={400}
                />
              </CardContent>
              <CardHeader className="space-y-0 p-4">
                <div className="flex items-center justify-center">
                  <div className="grid text-sm">
                    <h3 className="font-medium">{badge.name}</h3>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Badges;