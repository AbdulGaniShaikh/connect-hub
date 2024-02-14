import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ProfileSkeleton = () => {
  return (
    <>
      <div className="rounded-3xl bg-white p-5 flex flex-col gap-y-5">
        <div className="cover-photo relative inline-block h-52 w-full rounded-md">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="grid grid-flow-col gap-5 ">
          <div className="ml-3 absolute -translate-y-1/2">
            <Skeleton circle height={128} width={128} />
          </div>
          <div className="ml-36">
            <Skeleton />
          </div>
          <div className="flex flex-col justify-center items-start">
            <Skeleton />
          </div>
          <Skeleton count={2} />
          <Skeleton count={2} />
        </div>
        <Skeleton height={100} />
      </div>

      <div className="rounded-3xl bg-white p-5">
        <Skeleton width={100} />
        <Skeleton count={2} />
      </div>
    </>
  );
};

export default ProfileSkeleton;
