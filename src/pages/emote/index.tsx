import Metatags from "@app/components/metatags";
import { Card, CardContent, CardHeader } from "@app/components/ui/card";
import { Icons } from "@app/components/ui/spinner";
import { Emote as e } from "@app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const Emote = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { isPending, error, data } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const response = await axios.get(`https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getEmote?emote=${id}`);

      const emote: e = response.data.emote;
      return emote;
    },
  })

  if (isPending) return <Icons.spinner className="h-20 w-20 animate-spin" />

  if (error) return 'An error has occurred: ' + error.message

  if (!data || id == null) return "Emote doesn't exist"

  return (
    <div className="container">
      <Metatags title={`Twitchy - ${data.name}'s Emote`} description={`Emote details for ${data.name}`} />
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4 py-6 px-6 md:gap-8 md:py-8 md:px-8">
          <div className="order-2 md:order-1 flex items-center">
            <img
              alt="Avatar"
              className="rounded-full border-4 border-white"
              height="96"
              src={data.images.url_2x}
              style={{
                aspectRatio: "96/96",
                objectFit: "cover",
              }}
              width="96"
            />
            <div className="grid gap-1 ml-4 text-left">
              <h1 className="font-bold text-xl">{data.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {data.name}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 p-6 md:gap-8 md:p-8">
          <div className="grid gap-2">
            <h2 className="font-semibold">Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <div className="font-semibold">Emote ID</div>
                <div className="ml-auto">{data.sk}</div>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <div className="font-semibold">Emote Name</div>
                <div className="ml-auto">{data.name}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    
  );
}

export default Emote;

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


// function CurvedlineChart(props: any) {
//   return (
//     <div {...props}>
//       <ResponsiveLine
//         data={[
//           {
//             id: "Desktop",
//             data: [
//               { x: "Jan", y: 43 },
//               { x: "Feb", y: 137 },
//               { x: "Mar", y: 61 },
//               { x: "Apr", y: 145 },
//               { x: "May", y: 26 },
//               { x: "Jun", y: 154 },
//             ],
//           },
//           {
//             id: "Mobile",
//             data: [
//               { x: "Jan", y: 60 },
//               { x: "Feb", y: 48 },
//               { x: "Mar", y: 177 },
//               { x: "Apr", y: 78 },
//               { x: "May", y: 96 },
//               { x: "Jun", y: 204 },
//             ],
//           },
//         ]}
//         margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
//         xScale={{
//           type: "point",
//         }}
//         yScale={{
//           type: "linear",
//           min: 0,
//           max: "auto",
//         }}
//         curve="monotoneX"
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           tickSize: 0,
//           tickPadding: 16,
//         }}
//         axisLeft={{
//           tickSize: 0,
//           tickValues: 5,
//           tickPadding: 16,
//         }}
//         colors={["#2563eb", "#e11d48"]}
//         pointSize={6}
//         useMesh={true}
//         gridYValues={6}
//         theme={{
//           tooltip: {
//             chip: {
//               borderRadius: "9999px",
//             },
//             container: {
//               fontSize: "12px",
//               textTransform: "capitalize",
//               borderRadius: "6px",
//             },
//           },
//           grid: {
//             line: {
//               stroke: "#f3f4f6",
//             },
//           },
//         }}
//         role="application"
//       />
//     </div>
//   )
// }


function EyeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
