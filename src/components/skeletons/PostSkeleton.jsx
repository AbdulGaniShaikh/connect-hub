import React from 'react';
import Skeleton from 'react-loading-skeleton';

const PostSkeleton = () => {
  return (
    <div className="grid grid-flow-row   p-4  w-full">
      <div className="flex overflow-hidden items-center">
        <Skeleton circle height={36} width={36} />
        <div className="grow text-sm px-2.5 overflow-hidden">
          <Skeleton count={2} width={250} />
        </div>
      </div>
      <div className="my-2">
        <Skeleton count={3} />
      </div>
      <Skeleton style={{ height: '50vh', width: '100%' }} />
    </div>
  );
};

export default PostSkeleton;
