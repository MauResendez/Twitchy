import { Card, CardContent, CardFooter, CardHeader } from "@app/components/ui/card";
import { Badge } from "@app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const Badges = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['badges'],
    queryFn: () =>
      axios.get('https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getBadges').then((response) => {
        response.data.badges.sort(function(a: Badge, b: Badge) {
          var nameA = a.name.toUpperCase(); // Ignore case
          var nameB = b.name.toUpperCase(); // Ignore case
          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          // names must be equal
          return 0;
        });
  
        return response.data.badges;
      }),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <main className="flex-1">
      <div className="container mx-auto grid gap-4 md:grid-cols-4 xl:grid-cols-6 p-4">
        {data.map((badge: Badge) => (
          <Link href={"/badges/" + badge.sk} key={badge.sk}>
            <Card key={badge.sk}>
              <CardContent className="p-4 aspect-video">
                <Image
                  alt={badge.name}
                  className="object-cover w-full h-full"
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
    </main>
  );
}

export default Badges;