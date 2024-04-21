import PostCard from "../post-card/post-card";

export default function RecentPosts(props) {
  const { posts } = props;
  return (
    <div className="">
      {posts.length === 0 && (
        <p className="text-center m-6">در این دسته هنوز مطلبی نیست.</p>
      )}
      {posts.length > 0 && (
        <>
          <p className="text-center font-bold m-6">مطالب اخیر</p>

          <div className="flex flex-row flex-wrap gap-4 justify-center m-4">
            {posts.map((post) => (
              <PostCard
                key={`post-${post.id}`}
                id={post.id}
                url={post.url}
                title={post.title}
                brief={post.brief}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
