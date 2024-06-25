import EditContentForm from "@/components/forms/edit-content-form";
import Modal from "@/components/modal";
import { categoryFa } from "@/pages/category/[categoryid]";
import { recomTypeFa } from "@/pages/recommendations";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { connectToDatabase } from "@/utils/db";

export default function PagesList(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [pageType, setPageType] = useState("");
  const [pagesContentsByType, setPagesContentsByType] = useState([]);
  const [pageToEdit, setPageToEdit] = useState({});
  const [editModalState, setEditModalState] = useState("close");

  useEffect(() => {
    const { category, recom, about } = props.pagesContents;
    // console.log("props:", props);
    if (!pageType) {
      setPageType("category");
      // setPagesContentsByType(category);
    }
    // console.log("pageType:", pageType);
    // console.log("pagesContentsByType:", pagesContentsByType);
    if (pageType) {
      pageType === "recom"
        ? setPagesContentsByType(recom)
        : pageType === "about"
        ? setPagesContentsByType(about)
        : pageType === "category"
        ? setPagesContentsByType(category)
        : null;
    }
  }, [props, pagesContentsByType, pageType]);

  function openEditModal(event) {
    const editPageName = event.target.id;
    // console.log(editPageName);
    const result = pagesContentsByType.find(
      (page) => page.name === editPageName
    );
    // console.log(result);
    setPageToEdit({ pageType: pageType, ...result });
    setEditModalState("open");
  }
  function closeEditModal() {
    setPageToEdit({});
    setEditModalState("close");
  }
  if (status === "loading") {
    return <div>در حال احراز هویت ...</div>;
  }
  if (status === "unauthenticated") {
    router.replace("/");
    return;
  }

  return (
    <>
      {!pagesContentsByType && <p>Loading...</p>}
      {pagesContentsByType && (
        <div className="mt-12 flex flex-col items-center gap-8">
          <div className="rounded p-1 bg-gray-200">فهرست صفحات</div>
          <table className="border-2 md:border-4  border-black md:w-8/12 flex flex-col m-auto">
            <thead>
              <tr className="border-2 md:border-4 border-black flex flex-row justify-between p-4">
                <th>ردیف</th>
                <th>اطلاعات مطلب</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="flex flex-col  ">
              {/* {!props.pagesContents.pageType && <div>Loading...</div>} */}
              {pagesContentsByType.map((type, index) => (
                <tr
                  key={`row-${type.name}`}
                  className="border-2 md:border-4 border-black flex flex-row justify-between hover:bg-gray-100 items-center px-4 py-2"
                >
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex flex-col p-2">
                      <div>
                        عنوان:{" "}
                        {pageType === "category"
                          ? categoryFa(type.name)
                          : pageType === "recom"
                          ? recomTypeFa(type.name)
                          : pageType === "about"
                          ? (type.name==="about"
                          ?"درباره"
                          : type.name==="contact-me"
                          ? "تماس با من"
                          : type.name==="andishkadeye-armanshahre-manavi"
                          ? "اندیشکدهٔ آرمانشهر معنوی"
                          : type.name==="armanshahre-zendegi-pub"
                          ? "انتشارات آرمانشهر زندگی"
                          : type.name==="ghebragh-journal"
                          ? "گروه قبراق"
                          : type.name==="hayate-tayyebe-group"
                          ? "گروه حیات طیبه"
                          : type.name==="lezzate-zendegi-group"
                          ? "گروه لذت زندگی"
                          : type.name==="exir-app"
                          ? "گروه اکسیر"
                          : type.name==="shamime-nabe-zendegi"
                          ? "مؤسسهٔ شمیم ناب زندگی"
                          : type.name==="patoghe-andishe"
                          ? "گروه پاتوق اندیشه"
                          : type.name==="hekmat-tour"
                          ? "گروه بینافرهنگی حکمت تور"
                          : null
                        )
                          : null}
                      </div>
                    </div>
                  </td>
                  <td className="flex flex-row gap-4">
                    <div>
                      <span
                        onClick={(event) => openEditModal(event)}
                        id={type.name}
                        className="cursor-pointer rounded p-1 m-1 hover:bg-gray-200"
                      >
                        ویرایش
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-4 justify-center">
            <button
              key={"category"}
              id="category"
              onClick={(e) => setPageType(e.target.id)}
              className={`rounded p-1 hover:bg-gray-200 ${
                pageType === "category" ? "bg-gray-300" : "bg-gray-100"
              }`}
            >
              صفحات دسته‌بندی
            </button>
            <button
              key={"recom"}
              id="recom"
              onClick={(e) => setPageType(e.target.id)}
              className={`rounded p-1 hover:bg-gray-200 ${
                pageType === "recom" ? "bg-gray-300" : "bg-gray-100"
              }`}
            >
              صفحات معرفی
            </button>
            <button
              key={"about"}
              id="about"
              onClick={(e) => setPageType(e.target.id)}
              className={`rounded p-1 hover:bg-gray-200 ${
                pageType === "about" ? "bg-gray-300" : "bg-gray-100"
              }`}
            >
              صفحه‌ی درباره
            </button>
          </div>
          <Link
            href={"/dashboard"}
            className="text-center rounded bg-gray-100 hover:bg-gray-200 p-1 mb-6"
          >
            بازگشت به داشبورد
          </Link>
        </div>
      )}

      <Modal modalState={editModalState} handleModal={() => closeEditModal()}>
        {!pageToEdit && <p>Loading...</p>}
        {pageToEdit && (
          <EditContentForm
            key={pageToEdit.name}
            id={pageToEdit.name}
            pageInfo={pageToEdit}
          />
        )}
      </Modal>
    </>
  );
}

export async function getServerSideProps(context) {
  const client = await connectToDatabase();
  const db = client.db();
  const pagesContents = await db.collection("pagesContents").findOne();
  client.close();

  return {
    props: {
      pagesContents: JSON.parse(JSON.stringify(pagesContents)),
    },
  };
}
