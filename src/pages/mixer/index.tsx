import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Metatags from "@app/components/metatags";
import { Button } from "@app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@app/components/ui/form";
import { Input } from "@app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select";
import { Icons } from "@app/components/ui/spinner";
import { saveStreams } from "@app/slices/streams";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

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
  const [loading, setLoading] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const response = await axios.get('https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getGames');

      console.log(response.data.games);

      return response.data.games;
    }
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      game: "",
      language: "",
      viewers: 10
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    const response = await axios.get(`https://okh8af2rdg.execute-api.us-east-1.amazonaws.com/api/getStreams?game=${data["game"]}&language=${data["language"]}&viewers=${data["viewers"]}`);

    const streams = response.data.streams;
    dispatch(saveStreams(streams));
    sessionStorage.setItem("streams", JSON.stringify(streams));
    push("/stream");
  }

  if (isPending) return <Icons.spinner className="h-20 w-20 animate-spin" />

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Metatags title="Twitchy - Mixer" description="Find new streams based on you're looking for" />
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
                        {data.map((game: any) => (
                          <SelectItem value={game.id}>{game.name}</SelectItem>
                        ))}
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
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Start Searching"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Mixer;