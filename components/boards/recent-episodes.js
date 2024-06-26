import EpisodeCard from "../cards/episode-card/episode-card";

export default function RecentEpisodes(props) {
  const { episodes } = props;

  return (
    <div className="md:border-l-2 md:h-[440px] overflow-auto md:pl-8">
      {episodes.length === 0 && (
        <p className="text-center m-6">هنوز اپیزودی ثبت نشده است.</p>
      )}
      {episodes.length > 0 && (<>
        <p className="m-6 text-teal-800 text-xl font-bold md:hidden block">اپیزودهای اخیر</p>
          <div className="flex w-screen md:w-auto flex-row md:flex-col md:flex-wrap md:gap-4 justify-center items-center md:m-4">
            <p className=" text-teal-800 text-xl font-bold m-6 hidden md:block">اپیزودهای اخیر</p>
            {episodes.map((episode) => (
              <EpisodeCard
                key={`episode-${episode.id}`}
                id={episode.id}
                url={episode.url}
                title={episode.title}
                brief={episode.brief}
                permanentLink={episode.permanentLink}
              />
            ))}
          </div></>
      )}
    </div>
  );
}
