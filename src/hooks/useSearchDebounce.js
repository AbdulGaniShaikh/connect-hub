import { useEffect, useState } from 'react';

export function useSearchDebounce(delay = 350) {
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const delayFn = setTimeout(() => {
      setSearch(searchQuery);
    }, delay);
    return () => clearTimeout(delayFn);
  }, [searchQuery, delay]);

  return [search, setSearchQuery];
}
