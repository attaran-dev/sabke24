import PostCard from "../post-card/post-card";

export default function RecomContentPosts(props) {
  const { recomType, allRecomPosts } = props;
  return (
    <div className="flex flex-col gap-2">
      {allRecomPosts.map((post, index) => (
        <PostCard
          key={`${recomType}-${index}`}
          id={post.id}
          url={post.url}
          title={post.title}
          brief={post.brief}
        />
      ))}
    </div>
  );
}
