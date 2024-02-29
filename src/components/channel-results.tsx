import { Channel } from '@app/types';
import Link from 'next/link';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';

const ChannelResults = (props: any) => {
  const { data } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < (data.length/itemsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Logic to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4 py-4">
        {currentItems.map((channel: Channel) => (
          <Link href={`/channel?id=${channel.user_login}`} key={channel.id}>
            <Card key={channel.id}>
              <CardContent className="p-0 aspect-video">
                <img
                  alt="Stream"
                  className="object-cover w-full h-full"
                  height={225}
                  src={channel.thumbnail_url}
                  style={{
                    aspectRatio: "400/225",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </CardContent>
              <CardHeader className="space-y-0 p-4">
                <div className="flex items-center">
                  <div className="grid text-sm">
                    <h3 className="font-medium">{channel.user_name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{channel.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Playing: {channel.game_name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Viewers: {channel.viewer_count}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <div className="p-4">
        <Paginate
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          paginate={paginate}
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
    </>
  );
}

const Paginate = ({ itemsPerPage, totalItems, paginate, currentPage, handleNextPage, handlePreviousPage }: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePreviousPage} />
        </PaginationItem>
        {pageNumbers.map(number => (
          <PaginationItem key={number}>
            <PaginationLink onClick={() => paginate(number)} isActive={number == currentPage ? true : false}>{number}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ChannelResults;