export type Channel = {
  id: string,
  game_id: string,
  game_name: string,
  is_mature: boolean
  language: string,
  started_at: string,
  tag_ids: [],
  tags: string[],
  thumbnail_url: string,
  title: string,
  type: string,
  user_id: string,
  user_login: string,
  user_name: string,
  viewer_count: number,
}

export type Badge = {
  pk: string;
  sk: string;
  name: string;
  versions: object[];
}

export type Emote = {
  pk: string,
  sk: string,
  format: string[],
  images: object,
  name: string,
  scale: string[]
  themes: string[],
}

export type Clip = {
  pk: string,
  sk: string,
  broadcaster_id: string,
  broadcaster_name: string,
  created_at: string,
  creator_id: string,
  creator_name: string,
  embed_url: string,
  game_id: string
  language: string,
  thumbnail_url: string,
  title: string,
  url: string,
  video_id: string,
  view_count: number,
}

export type Stream = {
  id: string,
  game_id: string,
  game_name: string,
  is_mature: boolean
  language: string,
  started_at: string,
  tag_ids: string[],
  tags: string[],
  thumbnail_url: string,
  title: string,
  type: string,
  user_id: string,
  user_login: string,
  user_name: string,
  viewer_count: number,
}