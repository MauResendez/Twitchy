import { TwitchEmbed } from 'react-twitch-embed';

const TwitchPlayer = (props: any) => {
  const { channel } = props;

  return (
    // <div className="w-full md:w-3/4 mx-auto">
    //   <TwitchEmbed
    //     channel={channel} 
    //     autoplay
    //     muted={false}
    //     width="100%"
    //     height="auto"
    //   />
    // </div>

    <div className="w-full">
      <TwitchEmbed
        channel={channel} 
        autoplay
        muted={false}
        width="100%"
        height="auto"
      />
    </div>
  );
};

export default TwitchPlayer;
