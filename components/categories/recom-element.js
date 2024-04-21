import Image from "next/image";

export default function RecomElement({ recomType }) {

  return (
    <div className="absolute right-10 bottom-10">
      {recomType === "podcasts" ? (
        <Image src={"/images/pod-mic.svg"} alt="pod-mic" id="element" width={200} height={200} className="animate-[fadein_0.5s]"/>
      ) : recomType === "books" ? (
        <Image src={"/images/book.png"} alt="book" id="element" width={250} height={200} className="animate-[fadein_0.5s]"/>
      ) : recomType === "apps" ? (
        <Image src={"/images/phone-2.png"} alt="phone-2" id="element" width={300} height={200} className="animate-[fadein_0.5s]"/>
      ) : recomType === "groups" ? (
        <Image src={"/images/lightBulb.png"} alt="lightBulb" id="element" width={200} height={200} className="animate-[fadein_0.5s]"/>

      )
      : null}
    </div>
  );
}
