import { ArtistSuggestionProfile } from '@/utils/models/ArtistSuggestionProfile';
import Image from 'next/image';
import useSWR from 'swr';

export default function LiveArtistsFeed() {
  const { data: artists, isLoading } = useSWR<{
    status: String;
    response: { data: ArtistSuggestionProfile[]; has_next: boolean };
  }>(
    `${process.env.API_URL}suggestions?page=1&limit=8&requestStatus=suggested`,
    async (input: RequestInfo, init: RequestInit) => {
      const res = await fetch(input, init);
      return res.json();
    },
    {}
  );

  return (
    <section className="flex w-full flex-row items-center justify-start gap-5 overflow-hidden">
      <div className="flex flex-row items-center gap-2">
        <div className="mx-auto flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-[#7BEF44]/10">
          <div className="h-2 w-2 rounded-full bg-[#7BEF44]/80" />
        </div>
        <p>Live</p>
      </div>
      <section className="flex flex-row gap-3">
        {isLoading ? (
          <>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dark-inner"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dark-inner"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dark-inner"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dark-inner"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dark-inner"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dark-inner"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dark-inner"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dark-inner"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dark-inner"></div>
            <div className="h-10 w-32 animate-pulse rounded-full bg-dark-inner"></div>
          </>
        ) : (
          artists &&
          artists.response.data.map(artist => (
            <div
              key={artist.requestId}
              className="flex h-10 min-w-max flex-row items-center gap-2 rounded-full bg-dark-inner p-1 px-4 text-sm"
            >
              <Image
                alt={'Avatar for ' + artist.username}
                src={artist.avatarUrl}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
              />
              <p className="text-yellow-300">{artist.requestStatus}</p>
              <p>{artist.username}</p>
            </div>
          ))
        )}
      </section>
    </section>
  );
}