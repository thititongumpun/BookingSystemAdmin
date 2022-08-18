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

const BOOKING_URL: string = process.env.REACT_APP_BOOKING_URL as string;
const USERS_URL: string = process.env.REACT_APP_USERS_URL as string;
const App: React.FC = () => {
  return (
    <Refine
      authProvider={authProvider}
      routerProvider={routerProvider}
      dataProvider={{
        default: dataProvider(BOOKING_URL, axiosInstance),
        users: dataProvider(USERS_URL, axiosInstance),
      }}
      Layout={Layout}
      LoginPage={Login}
      ReadyPage={ReadyPage}
      notificationProvider={notificationProvider}
      catchAll={<ErrorComponent />}
      resources={[
        { name: "books", list: BookingList, edit: BookEdit, show: BookShow },
        { name: "users", list: UserList, show: UserShow },
      ]}
    />
  );
};

export default App;
