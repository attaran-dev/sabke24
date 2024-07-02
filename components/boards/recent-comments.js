import Image from "next/image";
import CommentCard from "../cards/comment-card/comment-card";

export default function RecentComments({ comments }) {
  return (
    <div
      className="flex flex-col gap-4 items-center h-full w-full bg-white p-4 rounded-lg text-right"
      dir="rtl"
    >
      <h2 className="text-sm text-white p-2 rounded bg-teal-800">نظرات</h2>
      <div className="w-full flex flex-col gap-6">
        {comments?.length === 0 && <div>هنوز نظری ثبت نشده است.</div>}
        {comments?.length > 0 &&
          comments.map((comment, index) => (
            <>
                        <CommentCard
              key={`comment-${comment.commentId}`}
              user={comment.username}
              creationDate={comment.creationDate}
              comment={comment.comment}
            />
            {index !== comments.length-1 &&
                <Image alt="" src={'/images/divider-4.svg'} width={250} height={100} className="[filter:invert(26%)sepia(11%)saturate(7092%)hue-rotate(143deg)brightness(90%)contrast(87%)]"/>
            }
            </>

            
          ))}
      </div>
    </div>
  );
}
