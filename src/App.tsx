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
import { BookingList } from "pages/bookings";
import { BookShow } from "pages/bookings/show";

const Book_URL = "https://bookingsystemrestapi.herokuapp.com/api/Booking";
const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(Book_URL)}
      Layout={Layout}
      ReadyPage={ReadyPage}
      notificationProvider={notificationProvider}
      catchAll={<ErrorComponent />}
      resources={[{ name: "books", list: BookingList, show: BookShow }]}
    />
  );
};

export default App;
