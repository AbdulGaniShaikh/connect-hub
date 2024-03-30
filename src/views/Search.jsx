import { Pagination } from '@mui/material';
import UserProfileRectangle from 'components/home/friend-sidebar/UserProfileRectangle';
import NoData from 'components/shared/NoData';
import UserCardSkeleton from 'components/skeletons/UserCardSkeleton';
import useErrorBehavior from 'hooks/useErrorBehavior';
import { useEffect, useState } from 'react';
import { userService } from 'service';

const Search = () => {
  const [search, setSearch] = useState('');

  const [searchRes, setSearchRes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({ pageNumber: 1, totalPages: 0 });
  const [resultSize, setResultSize] = useState(0);
  const defaultErrorBehavior = useErrorBehavior();

  const onChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const onKeyUp = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    if (search.trim().length < 3) {
      setSearchRes([]);
      return;
    }
    setPage({ ...page, pageNumber: 1 });
    fetchSearchResults();
  };

  useEffect(() => {
    if (search.trim().length < 3) {
      return;
    }
    const getData = setTimeout(() => {
      setPage({ ...page, pageNumber: 1 });
      fetchSearchResults();
    }, 2000);

    return () => clearTimeout(getData);
  }, [search]);

  useEffect(() => {
    if (search.trim().length < 3) {
      setSearchRes([]);
      return;
    }
    fetchSearchResults();
  }, [page]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const res = await userService.search(search, Math.max(0, page.pageNumber - 1));

      setSearchRes(res.data.content);
      var { totalPages, totalElements } = res.data;
      setResultSize(totalElements);
      if (page.totalPages !== totalPages) setPage({ ...page, totalPages });
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full grid grid-flow-row p-5 gap-y-5">
      <div>
        <div className="flex items-center px-3 border border-lightHover dark:border-darkHover  text-sm rounded-lg focus:ring-4 ring-lightHover dark:ring-darkHover focus:border-transparent focus:outline-none hover:ring-4 ease-linear duration-200">
          <input
            alt="search"
            type="text"
            name="search"
            id="search"
            placeholder="Search---->Press 'Enter' to get results."
            autoComplete="off"
            value={search}
            onChange={onChange}
            className="px-3 py-2.5 focus:outline-none w-full bg-lightBg dark:bg-darkBg"
            onKeyUp={onKeyUp}
          />
          <i className="fa-solid fa-magnifying-glass cursor-pointer"></i>
        </div>
        {!loading && searchRes.length !== 0 && <p className="text-sm">Your search returned {resultSize} results</p>}
        <div className="h-full">
          {!loading && searchRes.map((user) => <UserProfileRectangle key={user.userId} {...user} />)}
          {loading &&
            Array(5)
              .fill(1)
              .map((_, i) => <UserCardSkeleton key={i} />)}
        </div>
      </div>
      {!loading && searchRes.length === 0 && (
        <div className="grid grid-flow-row   p-4 ">
          <NoData message="Oops! No results found. Try a different search term." />
        </div>
      )}
      {!loading && searchRes.length !== 0 && (
        <div className="z-20 flex flex-col justify-center items-center">
          <Pagination
            count={page.totalPages}
            variant="outlined"
            shape="rounded"
            size="large"
            page={page.pageNumber}
            onChange={(_, i) => {
              setPage({ ...page, pageNumber: i });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
