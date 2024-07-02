import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function CommentCard(props){
const {creationDate, user, comment} = props;
const date = new DateObject({
    date: creationDate,
    format: "DD MMMM YYYY",
    calendar: persian,
    locale: persian_fa,
  });

return(
    <div className="text-sm flex flex-col w-full gap-4">
        <div className="flex justify-between gap-4">
        <div className="text-teal-800">{user}</div>
        <div className="text-teal-800">{date.toString()}</div>
            
        </div>
        <div>{comment}</div>
    </div>
)
}