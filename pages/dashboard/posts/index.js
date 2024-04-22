import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Pagination from "@/components/atomic/pagination";
import Modal from "@/components/modal";
import EditPostForm from "@/components/forms/edit-post-form";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { connectToDatabase } from "@/utils/db";

export default function PostsList(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { currentPostsNum, pagePosts, postsTitles, postsUrls } = props;
  const searchParams = useSearchParams();
  const [pagesNumArr, setPagesNumArr] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [editModalState, setEditModalState] = useState("close");
  const [deleteModalState, setDeleteModalState] = useState("close");
  const [postToEdit, setPostToEdit] = useState({});
  const [postIdToDelete, setPostIdToDelete] = useState("");
  useEffect(() => {
    {
      !currentPage && setCurrentPage(1);
    }
    setPagesNumArr(calculatePagesNum(currentPostsNum, 5));
  }, [currentPage, currentPostsNum]);
  useEffect(() => {
    {
      searchParams && setCurrentPage(searchParams.get("page"));
    }
  }, [searchParams]);
  useEffect(() => {}, [
    postToEdit,
    editModalState,
    deleteModalState,
    postIdToDelete,
  ]);

  if (status === "loading") {
    return <div>در حال احراز هویت ...</div>;
  }
  if (status === "unauthenticated") {
    router.replace("/");
    return
  }

  function calculatePagesNum(currentPostsNum, postsPerPage) {
    const pagesNum = Math.ceil(+currentPostsNum / +postsPerPage);
    let pagesNumArr = [];
    for (let i = 0; i < pagesNum; i++) {
      pagesNumArr.push(i + 1);
    }

    return pagesNumArr;
  }
  function openEditModal(event) {
    const editPostIndex = event.target.id.split("-")[1];
    setPostToEdit(pagePosts[+editPostIndex]);
    setEditModalState("open");
  }
  function closeEditModal() {
    setPostToEdit({});
    setEditModalState("close");
  }
  function openDeleteModal(event) {
    const deletePostId = event.target.id.split("-")[1];
    setPostIdToDelete(deletePostId);
    setDeleteModalState("open");
  }
  function closeDeleteModal() {
    setDeleteModalState("close");
  }
  function deletePost(postId) {
    axios
      .delete(`/api/${postId}`)
      .then((response) => toast.success(response.data.message))
      .catch((error) => toast.error(error.response.data.message));
    closeDeleteModal();

    setTimeout(() => {
      router.reload();
    }, 2000);
    return
  }

  return (
    <>
      <div
        className={` ${
          editModalState === "open" || deleteModalState === "open"
            ? "blur-xl"
            : ""
        }`}
      >
        
        {(!currentPage || !pagePosts) && <p>Loading...</p>}
        {pagePosts && (
          <div className="mt-12 flex flex-col items-center gap-4">

              
            <div className="rounded p-1 bg-gray-200">فهرست پست‌ها</div>

            <table className="border-2 md:border-4  border-black  w-11/12 flex flex-col m-auto">
              <thead>
                <tr className="border-2 md:border-4 border-black flex flex-row justify-between p-2 md:p-4 text-sm md:text-base">
                  <th>ردیف</th>
                  <th>اطلاعات مطلب</th>
                  <th><Link href={"/dashboard/posts/new-post"} className="rounded p-1 bg-gray-200 hover:bg-gray-300">ایجاد پست جدید</Link></th>
                </tr>
              </thead>
              <tbody className="flex flex-col  ">
                {pagePosts.map((post, index) => (
                  <tr
                    key={`row-${index + 1}`}
                    className="border-2 md:border-4 border-black flex flex-row justify-between hover:bg-gray-100 items-center px-4"
                  >
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex flex-col p-2">
                        <div>شناسه: {post.id}</div>
                        <div>عنوان: {post.title}</div>
                      </div>
                    </td>
                    <td className="flex flex-row gap-4">
                      <div>
                        <span
                          onClick={(event) => openEditModal(event)}
                          id={`edit-${index}`}
                          className="cursor-pointer rounded p-1 m-1 hover:bg-gray-200"
                        >
                          ویرایش
                        </span>
                      </div>
                      <div>
                        <span
                          id={`delete-${post.id}`}
                          onClick={(event) => openDeleteModal(event)}
                          className="cursor-pointer rounded p-1 m-1 hover:bg-gray-200"
                        >
                          حذف
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
                    {currentPage && (
          <Pagination currentPage={currentPage} pagesNumArr={pagesNumArr} />
        )}                  
        <Link href={'/dashboard'} className="text-center rounded bg-gray-100 hover:bg-gray-200 p-1">بازگشت به داشبورد</Link>

          </div>
        )}


      </div>

      <Modal modalState={editModalState} handleModal={() => closeEditModal()}>
        {!postToEdit && <p>Loading...</p>}
        <EditPostForm
          key={`edit-post-form-${postToEdit.id}`}
          postInfo={postToEdit}
          metaInfo={props}
        />
      </Modal>
      <Modal
        modalState={deleteModalState}
        handleModal={() => closeDeleteModal()}
        key={postIdToDelete}
      >

        {postIdToDelete && (
          <div className="text-lg text-center">
            <p>آیا مطمئنید می‌خواهید این مطلب را حذف کنید؟</p>
            <div className="flex justify-center gap-4 my-6">
              <button
                className="border-2 md:border-4 border-black p-2 font-bold"
                onClick={() => closeDeleteModal()}
              >
                لغو
              </button>
              <button
                className="border-2 md:border-4 border-black p-2 font-bold"
                onClick={() => deletePost(postIdToDelete)}
              >
                حذف
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export async function getServerSideProps(context) {
  const client = await connectToDatabase();
  const db = client.db();
  const metadata = await db.collection("metadata").findOne();
  const {
    totalPostsNum,
    currentPostsNum,
    categories,
    recomTypes,
    postsUrls,
    postsTitles,
  } = metadata;
  async function getPostsByRange(page, range) {
    if (+page === 1) {
      const result = await db
        .collection("posts")
        .find()
        .sort({ creationDate: -1 })
        .limit(+range)
        .toArray();
      return result;
    }
    const result = await db
      .collection("posts")
      .find()
      .sort({ creationDate: -1 })
      .skip((+page - 1) * +range)
      .limit(+range)
      .toArray();

    return result;
  }
  const { query } = context;
  const range = 5;
  let { page } = query;
  if (!page) {
    page = 1;
  }
  const pagePosts = await getPostsByRange(page, range);
  client.close();

  return {
    props: {
      totalPostsNum,
      currentPostsNum,
      categories,
      recomTypes,
      postsUrls,
      postsTitles,
      pagePosts: JSON.parse(JSON.stringify(pagePosts)),
    },
  };
}
