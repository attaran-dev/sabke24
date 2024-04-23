import Image from "next/image";

export default function CategoryElement({ category }) {
  if (category === "hygiene") {
    return (
      <div className="absolute lg:left-10 lg:bottom-6 lg:scale-100 md:left-8 md:-bottom-8 md:scale-[0.65]">
        <div className="relative ">
          <Image
            alt=""
            src={"/images/washingMachine.svg"}
            width={0}
            height={0}
            style={{ width: "200px", height: "auto" }}
          />
          <Image
            alt=""
            src={"/images/clothes.svg"}
            width={0}
            height={0}
            style={{ width: "90px", height: "auto" }}
            className="absolute left-14 bottom-[100px] animate-wmspin"
          />
          <Image
            alt=""
            src={"/images/washingMachineDoor.svg"}
            width={0}
            height={0}
            style={{ width: "90px", height: "auto" }}
            className="absolute left-14 bottom-[100px]"
          />
        </div>
      </div>
    );
  } else if (category === "thought") {
    return (
      <div className="absolute left-8 bottom-14">
        <div>
          <Image alt="" src={"/images/book4.svg"} width={200} height={200} />
          <Image
            alt=""
            src={"/images/paper.svg"}
            width={15}
            height={15}
            className="absolute left-[87px] bottom-4 animate-bwiggle"
          />
        </div>
      </div>
    );
  } else if (category === "nutrition") {
    return (
      <div className="absolute lg:left-12 lg:bottom-12 md:left-8 md:bottom-4">
        <div>
          <Image
            alt=""
            src={"/images/cupOfTea3.png"}
            width={200}
            height={200}
            className="scale-x-[-1] -rotate-2"
          />
          <Image
            alt=""
            src={"/images/TEL-fresh-espresso-steam.gif"}
            width={200}
            height={200}
            className="absolute -left-6 bottom-[92px]"
          />
        </div>
      </div>
    );
  } else if (category === "communication") {
    return (
      <div className="absolute left-10 bottom-6 ">
        <div className="relative ">
          <Image
            alt=""
            src={"/images/telephone.svg"}
            width={200}
            height={200}
            
          />
        </div>
      </div>
    );
  } else if (category === "recreation") {
    return (
      <div className="absolute lg:left-16 lg:bottom-8 lg:scale-100 md:scale-75 md:left-8 md:bottom-0">
        <div className="relative ">
          <Image
            alt=""
            src={"/images/parkLamp.svg"}
            width={80}
            height={80}
            className="absolute left-32 bottom-[110px]"
          />
          <Image
            alt=""
            src={"/images/bench.svg"}
            width={160}
            height={160}
            className=""
          />
        </div>
      </div>
    );
  } else if (category === "income-expense") {
    return (
      <div className="absolute md:left-2 md:bottom-2 md:scale-75 lg:scale-100">
        <div className="relative ">
          <Image
            alt=""
            src={"/images/wallet.png"}
            width={250}
            height={250}
            
          />
        </div>
      </div>
    );
  } else if (category === "prayer") {
    return (
      <div className="absolute md:left-24 md:bottom-6 lg:scale-100 md:scale-75">
        <div className="relative ">
          <Image
            alt=""
            src={"/images/tasbih.svg"}
            width={120}
            height={120}
            className="animate-twiggle"
          />
        </div>
      </div>
    );
  } else if (category === "sport") {
    return (
      <div className="absolute left-16 bottom-12 ">
        <div className="">
          <Image
            alt=""
            src={"/images/soccerBall2.svg"}
            width={150}
            height={150}
            className=" transition ease-in-out origin-bottom duration-[1200ms] hover:rotate-6 hover:translate-x-1 "
          />
        </div>
      </div>
    );
  }
}
