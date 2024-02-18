import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@app/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select"
import { toast } from "@app/components/ui/use-toast"
import { Input } from "@app/components/ui/input";
import { useRouter } from "next/router";
import { MultiSelect } from "@app/components/ui/multi-select";
import axios from "axios";
import Metatags from "@app/components/metatags";
import { useDispatch } from "react-redux";
import { saveStreams } from "@app/slices/streams";

const GameSchema = z.object({
  id: z.string(),
  name: z.string(),
})

const FormSchema = z.object({
  game: z.string({
    required_error: "Please select a game to display.",
  }),
  language: z.string({
    required_error: "Please select an language to display.",
  }),
  viewers: z.number({
    required_error: "Please input a minimum number of viewers",
  })
})

const Mixer = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      game: "",
      language: "",
      viewers: 100
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

    const response = await axios.get(`https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getStreams?game=${data["game"]}&language=${data["language"]}&viewers=${data["viewers"]}`);

    const streams = response.data.streams;
    dispatch(saveStreams(streams));
    sessionStorage.setItem("streams", JSON.stringify(streams));
    push("/stream");
  }

  return (
    <div className="flex flex-col p-4 flex-1 items-center justify-center">
      <Metatags title="Twitchy" description="Discover the best streams, analyze statistics, and compare your favorite streamers" />
      <div className="flex items-center justify-center p-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Stream Mixer</h1>
          <p className="max-w-[600px] text-gray-500 md:text-base/relaxed lg:text-sm/relaxed xl:text-base/relaxed dark:text-gray-400">
            Find new streamers to watch based on your language, game, and viewers!
          </p>
        </div>
      </div>
      <div className="space-y-4 w-full max-w-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
            <div className="relative">
              <FormField
                control={form.control}
                name="game"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full form-select">
                          <SelectValue placeholder="Game" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="lol">League of Legends</SelectItem>
                        <SelectItem value="33214">Fortnite</SelectItem>
                        <SelectItem value="csgo">CS:GO</SelectItem>
                        <SelectItem value="dota2">Dota 2</SelectItem>
                        <SelectItem value="minecraft">Minecraft</SelectItem>
                        <SelectItem value="overwatch">Overwatch</SelectItem>
                        <SelectItem value="fifa">FIFA</SelectItem>
                        <SelectItem value="pubg">PUBG</SelectItem>
                        <SelectItem value="hearthstone">Hearthstone</SelectItem>
                        <SelectItem value="rocketleague">Rocket League</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <MultiSelect
                      selected={field.value}
                      options={[
                        {
                          value: "next.js",
                          label: "Next.js",
                        },
                        {
                          value: "sveltekit",
                          label: "SvelteKit",
                        },
                        {
                          value: "nuxt.js",
                          label: "Nuxt.js",
                        },
                        {
                          value: "remix",
                          label: "Remix",
                        },
                        {
                          value: "astro",
                          label: "Astro",
                        },
                        {
                          value: "wordpress",
                          label: "WordPress",
                        },
                        {
                          value: "express.js",
                          label: "Express.js",
                        }
                      ]}
                      {...field}
                    /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full form-select">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                        <SelectItem value="ko">Korean</SelectItem>
                        <SelectItem value="ru">Russian</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative">
              <FormField
                control={form.control}
                name="viewers"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="w-full" min="0" placeholder="Viewers" type="number" onChange={event => field.onChange(+event.target.value)} defaultValue={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full" type="submit">
              Start Searching
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Mixer;