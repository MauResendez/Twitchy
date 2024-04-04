// StreamerChart.js
import { Channel } from '@app/types';
import { Bar } from 'react-chartjs-2';

const StreamerChart = ({ channels }: any) => {
  console.log("Channels: " + channels);
  const data = {
    labels: channels.map((channel: Channel) => channel.user_login),
    datasets: [
      {
        label: 'Average Viewers',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: 774
      },
      {
        label: 'Followers Gained',
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: 500
      },
      {
        label: 'Hours Streamed',
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: 201
      }
    ]
  };

  return <Bar data={data} />;
};

export default StreamerChart;
