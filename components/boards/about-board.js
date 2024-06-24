import Image from "next/image";
import Link from "next/link";

export default function AboutBoard(){
    return (<div className="flex flex-col gap-4 bg-white p-12">
<Link href={'/contact-me'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
    <Image src="/images/contact-me.jpeg" alt="" width={100} height={100} />

</div>
<div>دربارهٔ من</div>
</Link>
<div className="flex flex-col gap-4 my-12">
    <div className="text-center text-xl text-teal-800 font-bold">مجموعه‌های تحت نظارت من</div>
  <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 bg-white justify-items-center ">
<Link href={'/about'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
<Image src="/images/sabke24.png" alt="" width={100} height={100} />
</div>
<div>سبک ۲۴</div>
</Link>
<Link href={'/andishkadeye-armanshahre-manavi'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
<Image src="/images/andishkade.png" alt="" width={100} height={100} />
</div>
<div>اندیشکدهٔ آرمان‌شهر معنوی</div>
</Link>
<Link href={'/armanshahre-zendegi-pub'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
    <Image src="/images/armanshahre-zendegi-pub.png" alt="" width={100} height={100} />
    </div>
<div className="justify-self-end">انتشارات آرمان‌شهر زندگی</div>
</Link>
<Link href={'/ghebragh-group'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
<Image src="/images/ghebragh.png" alt="" width={100} height={100} />
</div>
<div>گروه قبراق</div>
</Link>
<Link href={'/hayate-tayyebe-group'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
<Image src="/images/hayate-tayyebe.png" alt="" width={100} height={100} />
</div>
<div>گروه حیات طیبه</div>
</Link>
<Link href={'/lezzate-zendegi-group'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
<Image src="/images/lezzate-zendegi.png" alt="" width={100} height={100} />
</div>
<div>گروه لذت زندگی </div>
</Link>
<Link href={'/exir-app'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
    <Image src="/images/exir.png" alt="" width={100} height={100} className="" />
    </div>
<div className="">اپلیکیشن اکسیر</div>
</Link>
<Link href={'/shamime-nabe-zendegi'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
<Image src="/images/shamim.png" alt="" width={100} height={100} />
</div>
<div>مؤسسهٔ شمیم ناب زندگی</div>
</Link>
<Link href={'/patoghe-andishe'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
    <Image src="/images/patogh.png" alt="" width={100} height={100} className="" />
    </div>
<div className="">گروه پاتوق اندیشه</div>
</Link>
<Link href={'/hekmat-tour'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
    <Image src="/images/hekmat.png" alt="" width={100} height={100} className="" />
    </div>
<div className="">گروه بینافرهنگی حکمت تور</div>
</Link>

</div>  
</div>

    </div>)
}