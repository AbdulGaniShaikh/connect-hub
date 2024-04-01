import React from 'react';
import './../../css/pageLoading.css';
const PageLoading = ({ loading = false, children }) => {
  return (
    <>
      {loading && (
        <div className="h-screen w-screen">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div style={{ borderColor: '#66DFDF transparent' }} className="size-[32px] loader spin" />
          </div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div style={{ borderColor: '#DF6688 transparent' }} className="size-[64px] loader counter-spin" />
          </div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div style={{ borderColor: '#66DF96 transparent' }} className="size-[96px] loader spin" />
          </div>
        </div>
      )}
      <div className={loading ? 'hidden' : ''}>{children}</div>
    </>
  );
};

export default PageLoading;
