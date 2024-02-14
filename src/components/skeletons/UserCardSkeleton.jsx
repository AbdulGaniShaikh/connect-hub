import React from 'react';
import Skeleton from 'react-loading-skeleton';

const UserCardSkeleton = () => {
  return (
    <div className="w-full p-2 rounded-md">
      <div className="flex overflow-hidden items-center">
        <Skeleton circle height={36} width={36} />
        <div className="grow text-sm px-2.5 overflow-hidden">
          <Skeleton count={2} />
        </div>
      </div>
    </div>
  );
};

export default UserCardSkeleton;
