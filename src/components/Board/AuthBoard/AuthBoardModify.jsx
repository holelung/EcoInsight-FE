import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Tiptap from "../TipTap/Tiptap";

const AuthBoardModify = () => {
  const { auth } = useContext(AuthContext);
  const { boardNo } = useParams();
  const navi = useNavigate();
  const location = useLocation();
  const boardData = location.state;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const imageFilesRef = useRef([]);
  const API_URL = window.ENV?.API_URL;

  useEffect(() => {
    if (auth.loginInfo.memberNo != boardData.memberNo) {
      alert("잘못된 접근입니다.")
      return navi("/auth-board");
    }
    setTitle(boardData.boardTitle);
    setContent(boardData.boardContent);
    setCategoryId(boardData.categoryId);
  }, [])

  const handleUpload = () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }
    const imgRegex = /<img [^>]*src="blob:([^"]+)"/g;
    let newContent = content;

    const formData = new FormData();
    formData.append("boardType", boardData.boardType);

    imageFilesRef.current.forEach((file) => {
      formData.append("files", file);
    });

    axios
      .post(`${API_URL}boards/upload`, formData, {
        headers: {
          Authorization: `Bearer ${auth.tokens.accessToken}`,
        },
      })
      .then((response) => {
        const uploadPaths = response.data;
        let index = 0;
        // src 변경
        newContent = newContent.replace(imgRegex, (_, oldSrc) => {
          const newSrc = `${uploadPaths[index++]}`;
          return `<img src="${newSrc}"`;
        });

        axios
          .put(
            `${API_URL}auth-boards`,
            {
              memberNo: auth.loginInfo.memberNo,
              boardNo: boardNo,
              categoryId: categoryId,
              title: title,
              content: newContent,
              boardType: boardData.boardType,
              ...(uploadPaths &&
                uploadPaths.length > 0 && { imageUrls: uploadPaths }),
            },
            {
              headers: {
                Authorization: `Bearer ${auth.tokens.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            if (response.status == 201) {
              alert("게시글 수정 완료");
              navi(`/auth-board/${boardNo}`);
            }
          })
          .catch((error) => {
            console.log("게시글 수정 실패", error);
            alert("게시글 수정실패 😢");
          });
      })
      .catch((error) => {
        console.log("이미지 수정 실패", error);
      });
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <div className="text-xl mb-3 p-2">공지사항 작성</div>
        {/* 제목 입력 */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 mb-3 text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
          placeholder="제목을 입력하세요"
        />
        <div className="text-m mb-3 p-2 ">
          <label htmlFor="noticeType">카테고리</label>
          <select
            selectValue={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
            className="p-3 mx-2 font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <option value="A0001">인증1</option>
            <option value="A0002">인증2</option>
            <option value="A0003">인증3</option>
          </select>
        </div>

        <Tiptap
          prevContent={boardData.boardContent}
          setContent={setContent}
          imageFilesRef={imageFilesRef}
        />

        {/* 업로드 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            onClick={()=>handleUpload()}
            className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-md font-bold transition"
          >
            수정하기
          </button>
        </div>
      </div>
    </>
  );
}

export default AuthBoardModify;