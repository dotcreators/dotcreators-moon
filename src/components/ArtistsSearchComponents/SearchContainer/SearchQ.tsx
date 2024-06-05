import useDebounce from '@/utils/hooks/useDebounce';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import RiSearch2Line from '~icons/ri/search-2-line';

interface Props {
  onQChanges: (query: string) => void;
}

export const SearchQ: FC<Props> = ({ onQChanges }) => {
  const [searchQ, setSearchQ] = useState<string>('');
  const debouncedValue = useDebounce(searchQ, 300);
  const router = useRouter();

  useEffect(() => {
    const updateSearchQFromRouter = () => {
      if (!router.isReady) return;

      const username = router.query.username as string;
      if (username !== undefined) {
        setSearchQ(username);
      }
    };

    updateSearchQFromRouter();
  }, [router.isReady, router.query.username]);

  useEffect(() => {
    onQChanges(searchQ);
  }, [debouncedValue, onQChanges]);

  return (
    <section className="h-15 flex flex-row items-center gap-5 rounded-3xl bg-dot-primary p-4 px-5 outline-dot-primary focus-within:outline focus-within:outline-2 focus-within:outline-dot-rose">
      <RiSearch2Line />
      <input
        onChange={e => setSearchQ(e.target.value)}
        type="search"
        placeholder="Input artist @tag..."
        value={searchQ}
        className="h-full bg-transparent outline-none placeholder:text-sm placeholder:text-zinc-400"
      />
    </section>
  );
};