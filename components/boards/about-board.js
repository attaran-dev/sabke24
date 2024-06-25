import Image from "next/image";
import Link from "next/link";

export default function AboutBoard(){
    return (<div className="flex flex-col gap-4 bg-white p-12">
<Link href={'/contact-me'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
    <Image src="/images/contact-me.jpeg" alt="" width={100} height={100} />

</div>
<div className="text-xl text-center">دربارهٔ من</div>
</Link>
<div className="flex flex-col gap-4 my-12">
    <div className="text-center text-xl text-teal-800 font-bold">مجموعه‌های من</div>
  <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 bg-white justify-items-center ">
<Link href={'/about'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
<Image src="/images/sabke24.png" alt="" width={100} height={100} />
</div>
<div className="text-center">سبک ۲۴</div>
</Link>
<Link href={'/about/andishkadeye-armanshahre-manavi'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
<Image src="/images/andishkade.png" alt="" width={100} height={100} />
</div>
<div className="text-center">اندیشکدهٔ آرمان‌شهر معنوی</div>
</Link>
<Link href={'/about/armanshahre-zendegi-pub'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
    <Image src="/images/armanshahre-zendegi-pub.png" alt="" width={100} height={100} />
    </div>
<div className="text-center">انتشارات آرمان‌شهر زندگی</div>
</Link>
<Link href={'/about/ghebragh-journal'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
<Image src="/images/ghebragh.png" alt="" width={100} height={100} />
</div>
<div className="text-center">نشریهٔ الکترونیکی قبراق</div>
</Link>
<Link href={'/about/hayate-tayyebe-group'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
<Image src="/images/hayate-tayyebe.png" alt="" width={100} height={100} />
</div>
<div className="text-center">گروه حیات طیبه</div>
</Link>
<Link href={'/about/lezzate-zendegi-group'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
<Image src="/images/lezzate-zendegi.png" alt="" width={100} height={100} />
</div>
<div className="text-center">گروه لذت زندگی </div>
</Link>
<Link href={'/about/exir-app'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
    <Image src="/images/exir.png" alt="" width={100} height={100} className="" />
    </div>
<div className="text-center">اپلیکیشن اکسیر</div>
</Link>
<Link href={'/about/shamime-nabe-zendegi'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
<Image src="/images/shamim.png" alt="" width={100} height={100} />
</div>
<div className="text-center">مؤسسهٔ شمیم ناب زندگی</div>
</Link>
<Link href={'/about/patoghe-andishe'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
    <Image src="/images/patogh.png" alt="" width={100} height={100} className="" />
    </div>
<div className="text-center">گروه پاتوق اندیشه</div>
</Link>
<Link href={'/about/hekmat-tour'} className="flex flex-col gap-2 justify-between items-center">
<div className="flex-1 flex items-center">
    <Image src="/images/hekmat.png" alt="" width={100} height={100} className="" />
    </div>
<div className="text-center">گروه بینافرهنگی حکمت تور</div>
</Link>

</div>  
</div>

    </div>)
}