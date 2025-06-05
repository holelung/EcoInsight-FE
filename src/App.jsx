import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext";
import HomePage from "./pages/User/HomePage/HomePage";
import AuthListPage from "./components/Board/AuthBoard/AuthListPage";
import MyPage from "./components/MyPage/MyPage";
import Myposts from "./components/MyPage/MyPosts";
import WithdrawalForm from "./components/MyPage/Withdrawal/WithdrawalForm";
import OkWithdrawal from "./components/MyPage/Withdrawal/OkWithdrawal";
import CheckWithdrawal from "./components/MyPage/Withdrawal/CheckWithdrawal";
import EditProfile from "./components/MyPage/EditProfile";
import UserLayout from "./components/Layout/UserLayout";
import AdminRoute from "./components/RouteGuard/AdminRoute";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin.jsx";
import AdminLayout from "./components/Layout/AdminLayout.jsx";
import AdminDashBoard from "./pages/Admin/AdminDashBoard/AdminDashBoard.jsx";
import MainDashBoard from "./pages/User/UserDashBoard/MainDashBoard.jsx";
import Login from "./components/Auth/Login.jsx";
import FrequencyAskPage from "./components/Ask/FrequencyAskPage.jsx";
import PrivateAskPage from "./components/Ask/PrivateAskPage.jsx";
import WriteAuthPage from "./components/Board/AuthBoard/AuthBoardWritePage.jsx";
import AuthBoardWritePage from "./components/Board/AuthBoard/AuthBoardWritePage.jsx";
import CommunityBoardManagementPage from "./pages/Admin/CommunityBoardManagementPage/CommunityBoardManagementPage.jsx";
import PointManagementPage from "./pages/Admin/PointManagementPage/PointManagementPage.jsx";
import AccountManagementPage from "./pages/Admin/AccountManagementPage/AccountManagementPage.jsx";
import AuthBoardManagementPage from "./pages/Admin/AuthBoardManagementPage/AuthBoardManagementPage.jsx";
import NoticeBoardManagementPage from "./pages/Admin/NoticeBoardManagementPage/NoticeBoardManagementPage.jsx";
import SignUp from "./components/Auth/SignUp.jsx";
import FindId from "./components/Auth/FindId.jsx";
import FindPasswordPage from "./components/Auth/FindPassword.jsx";
import ResetPassword from "./components/Auth/ResetPassword.jsx";
import CommunityListPage from "./components/Board/Community/CommunityListPage.jsx";
import CommunityBoardDetail from "./components/Board/Community/CommunityBoardDetail.jsx";
import AuthBoardDetail from "./components/Board/AuthBoard/AuthBoardDetail.jsx";
import ChangePassword from "./components/MyPage/ChangePassword.jsx";
import UserRoute from "./components/RouteGuard/UserRoute.jsx";
import NoticeBoard from "./components/Board/Notice/NoticeBoard.jsx";
import NoticeBoardDetail from "./components/Board/Notice/NoticeBoardDetail.jsx";
import NoticeBoardWrite from "./components/Board/Notice/NoticeBoardWrite.jsx";
import CommunityWritePage from "./components/Board/Community/CommunityWritePage.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NoticeBoardModify from "./components/Board/Notice/NoticeBoardModify.jsx";
import CommunityBoardModify from "./components/Board/Community/CommunityBoardModify.jsx";
import ReportManagementPage from "./pages/Admin/ReportManagementPage/ReportManagementPage.jsx";
import PointDetailPage from "./pages/Admin/PointManagementPage/PointDetailPage.jsx";
import AuthBoardModify from "./components/Board/AuthBoard/AuthBoardModify.jsx";
import MyAuthPosts from "./components/MyPage/MyAuthPosts";



function App() {


  

  return (
    <GoogleOAuthProvider clientId="617855234940-dp6iq2v93alink0ttpmgadohvbhj0fo5.apps.googleusercontent.com">
      <AuthProvider>
        <Routes>
          {/* 사용자 레이아웃 */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<HomePage />} />
            {/* 커뮤니티 */}
            <Route path="/community/:type" element={<CommunityListPage />} />
            <Route path="/write/:type" element={<CommunityWritePage />} />
            <Route
              path="/post/:categoryId/:boardNo"
              element={<CommunityBoardDetail />}
            />
            <Route
              path="/community/modify/:boardNo"
              element={<CommunityBoardModify />}
            />
            {/* 인증게시판 */}
            <Route path="/auth-board" element={<AuthListPage />} />
            <Route path="/auth-board/:categoryId/:no" element={<AuthBoardDetail />} />
            <Route path="/auth-board/write" element={<AuthBoardWritePage />} />
            <Route
              path="/auth-board/modify/:boardNo"
              element={<AuthBoardModify />}
            />
            {/* 공지사항 */}
            <Route path="/notice" element={<NoticeBoard />} />
            <Route path="/notice/detail/:id" element={<NoticeBoardDetail />} />
            {/* 대시보드 */}
            <Route path="/dashboard" element={<MainDashBoard />} />
            {/* 문의하기 */}
            <Route path="/frequencyAskPage" element={<FrequencyAskPage />} />
            <Route path="/privateAskPage" element={<PrivateAskPage />} />
          </Route>

          {/* 로그인 유저 전용 */}
          <Route
            element={
              <UserRoute>
                {" "}
                <UserLayout />{" "}
              </UserRoute>
            }
          >
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/myauthposts" element={<MyAuthPosts />} />
            <Route path="/mypage/myposts" element={<Myposts />} />
            <Route path="/mypage/editprofile" element={<EditProfile />} />
            <Route path="/mypage/changepassword" element={<ChangePassword />} />
            <Route
              path="/mypage/withdrawal/check"
              element={<CheckWithdrawal />}
            />
            <Route
              path="/mypage/withdrawal/form"
              element={<WithdrawalForm />}
            />
            <Route path="/mypage/withdrawal/ok" element={<OkWithdrawal />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findpassword" element={<FindPasswordPage />} />
          <Route
            path="/findPassword/resetpassword"
            element={<ResetPassword />}
          />

          {/* 관리자 전용 */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace /> } />
            <Route path="dashboard" element={<AdminDashBoard />} />
            <Route path="point-manage" element={<PointManagementPage />} />
            <Route
              path="point-detail/:memberNo"
              element={<PointDetailPage />}
            />
            <Route path="account-manage" element={<AccountManagementPage />} />
            <Route
              path="authboard-manage"
              element={<AuthBoardManagementPage />}
            />
            <Route
              path="communityboard-manage"
              element={<CommunityBoardManagementPage />}
            />
            <Route
              path="noticeboard-manage"
              element={<NoticeBoardManagementPage />}
            />
            <Route path="report-manage" element={<ReportManagementPage />} />
            {/*<Route path="notice-write" element={<NoticeWrite />} />*/}
            <Route path="notice-write" element={<NoticeBoardWrite />} />
            <Route
              path="authboard-manage"
              element={<AuthBoardManagementPage />}
            />
            <Route
              path="communityboard-manage"
              element={<CommunityBoardManagementPage />}
            />
            <Route
              path="noticeboard-manage"
              element={<NoticeBoardManagementPage />}
            />
            <Route
              path="notice/modify/:boardNo"
              element={<NoticeBoardModify />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;