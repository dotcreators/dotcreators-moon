import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
  user: {
    username: string;
    name: string;
  };
  avatar: string;
  followers: number;
  posts: number;
  className?: string;
}

export const SuggestArtistCard: FC<Props> = props => {
  function formatValue(value: number): string {
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}.${Math.floor((value % 1000) / 100)}K`;
    } else {
      return value.toString();
    }
  }
  return (
    <section
      className={classNames(
        'animation-all grid h-28 w-full grid-cols-2 gap-5 rounded-2xl bg-dark-inner-hover p-5 duration-200 ease-in-out md:hover:cursor-pointer md:hover:bg-dark-double-inner',
        props.className
      )}
    >
      <div className="flex flex-row items-center gap-5">
        <Image
          alt="img"
          src={props.avatar}
          width={75}
          height={75}
          draggable={false}
          className="rounded-2xl"
        />
        <div className="max-w-28">
          <h1 className="truncate text-ellipsis font-hubot-sans text-2xl font-black">
            {props.user.name}
          </h1>
          <p className="truncate text-ellipsis text-zinc-400">
            @{props.user.username}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-end gap-5">
        <div>
          <h1 className="font-hubot-sans text-2xl font-black">
            {formatValue(props.followers)}
          </h1>
          <p className="text-zinc-400">followers</p>
        </div>
        <div>
          <h1 className="font-hubot-sans text-2xl font-black">
            {formatValue(props.posts)}
          </h1>
          <p className="text-zinc-400">posts</p>
        </div>
      </div>
    </section>
  );
};