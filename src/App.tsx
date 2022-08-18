import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ReadyPage,
  notificationProvider,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import "@pankod/refine-antd/dist/styles.min.css";
import { BookingList, BookShow, BookEdit } from "pages/bookings";
import { UserList, UserShow } from "pages/users";
import { authProvider, axiosInstance } from "authProvider";
import { Login } from "pages/login";
import { PostCreate, PostEdit, PostList, PostShow } from "pages/posts";

const BOOKING_URL: string = process.env.REACT_APP_BOOKING_URL as string;
const USERS_URL: string = process.env.REACT_APP_USERS_URL as string;
// const LOCAL= "https://localhost:7074/api/Booking";
// const DEV = "https://api.fake-rest.refine.dev";
const App: React.FC = () => {
  return (
    <Refine
      authProvider={authProvider}
      routerProvider={routerProvider}
      dataProvider={{
        default: dataProvider(BOOKING_URL, axiosInstance),
        users: dataProvider(USERS_URL, axiosInstance),
        // dev: dataProvider(DEV)
      }}
      Layout={Layout}
      LoginPage={Login}
      ReadyPage={ReadyPage}
      notificationProvider={notificationProvider}
      catchAll={<ErrorComponent />}
      resources={[
        { name: "books", list: BookingList, edit: BookEdit, show: BookShow },
        { name: "users", list: UserList, show: UserShow },
        { name: "posts", list: PostList, show: PostShow, edit: PostEdit, create: PostCreate}
      ]}
    />
  );
};

export default App;
