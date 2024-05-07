import Image from "next/image";

export default function CategoryElement({ category }) {
  if (category === "hygiene") {
    return (
        <div className="relative">
          <Image
            alt=""
            src={"/images/washingMachine.svg"}
            width={0}
            height={0}
            className="[user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"
            style={{ width: "160px", height: "auto" }}
          />
          <Image
            alt=""
            src={"/images/clothes.svg"}
            width={0}
            height={0}
            style={{ width: "64px", height: "auto" }}
            className="absolute left-[50px] bottom-[84px] animate-wmspin
           
            [user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]
            "
          />
          <Image
            alt=""
            src={"/images/washingMachineDoor.svg"}
            width={0}
            height={0}
            style={{ width: "72px", height: "auto" }}
            className="absolute left-[44px] bottom-[80px]
           
            [user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"
          />
        </div>
    );
  } else if (category === "thought") {
    return (
      <div className="relative">
        <Image
          alt=""
          src={"/images/book4.svg"}
          width={200}
          height={200}
          className="[user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"
        />
        <Image
          alt=""
          src={"/images/paper.svg"}
          width={15}
          height={15}
          className="absolute left-[87px] bottom-4 animate-bwiggle
             [user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"
        />
      </div>
    );
  } else if (category === "nutrition") {
    return (
      <div className="flex ">
        <Image
          alt=""
          src={"/images/cupOfTea3.png"}
          width={200}
          height={200}
          className="scale-x-[-1] -rotate-2 
           
            [user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"
        />
        <Image
          alt=""
          src={"/images/TEL-fresh-espresso-steam.gif"}
          width={200}
          height={200}
          className="absolute -translate-y-[182px] -translate-x-[23px]       
            [user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"
          unoptimized
        />
      </div>
    );
  } else if (category === "communication") {
    return (
      <div>
        <Image
          alt=""
          src={"/images/telephone.svg"}
          width={200}
          height={200}
          className="[user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"
        />
      </div>
    );
  } else if (category === "recreation") {
    return (
      <div className="flex lg:scale-100 md:scale-75">
        <Image
          alt=""
          src={"/images/parkLamp.svg"}
          width={80}
          height={80}
          className="
            [user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"
        />
        <Image
          alt=""
          src={"/images/bench.svg"}
          width={160}
          height={160}
          className=" -translate-x-4 translate-y-4
            [user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"
        />
      </div>
    );
  } else if (category === "income-expense") {
    return (
      <div id="element" className="relative md:scale-75 lg:scale-100 group">
        <Image
          alt=""
          src={"/images/wallet.png"}
          width={250}
          height={250}
          id="wallet"
          className="absolute bottom-0 z-10
           [user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"
        />
        <Image
          alt=""
          src={"/images/money-quarter.jpg"}
          width={200}
          height={200}
          id="money"
          className="translate-x-[79px] -translate-y-[90px] scale-50 rotate-[24deg] transition duration-700 group-hover:-rotate-[2deg] origin-left
           [user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"
        />
      </div>
    );
  } else if (category === "prayer") {
    return (
      <div className="lg:scale-100 md:scale-75 ">
        <Image
          alt=""
          src={"/images/tasbih.svg"}
          width={120}
          height={120}
          className="animate-twiggle
             [user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"
        />
      </div>
    );
  } else if (category === "sport") {
    return (
      <div>
        <Image
          alt=""
          src={"/images/soccerBall2.svg"}
          width={150}
          height={150}
          className=" transition ease-in-out origin-bottom duration-[1200ms] hover:rotate-6 hover:translate-x-1
             [user-drag:none] [-webkit-user-drag:none]
            [user-select:none]
            [-moz-user-select:none]
            [-webkit-user-select:none]
            [-ms-user-select:none]"
        />
      </div>
    );
  }
}
