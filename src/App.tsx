import { useEffect, lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import api from "./api";
import Loading from "./Loading";
import RouteChangeHandler from "./RouteChangeHandler";
import type { cafeAsset, getAsset, getResvs, notify } from "./types";

const Home = lazy(() => import("./Home"));
const Book = lazy(() => import("./Book"));
const Asset = lazy(() => import("./asset"));
const Dashboard = lazy(() => import("./dashboard"));

const dummy = () => {
  return;
};
const getResvs = async (
  callBack: React.Dispatch<React.SetStateAction<cafeAsset[]>>,
  monitorCallBack: () => void,
  alertCallBack: notify
) => {
  try {
    const { data } = await api.get("/getall");

    if (data?.sts === "ok") {
      callBack(data.all);
      monitorCallBack();
    } else {
      alertCallBack("error", "network error");
    }
  } catch {
    alertCallBack("error", "network error");
  }
};
const getAsset = async (
  type: string | undefined,
  num: string | undefined,
  callBack: React.Dispatch<React.SetStateAction<cafeAsset[]>>,
  alertCallBack: notify
) => {
  if (type === "ps" || type === "pool" || type === "ping") {
    try {
      const { data } = await api.get(`/${type}/${num}`);

      if (data?.sts === "ok") {
        callBack([data.object]);
      } else {
        alertCallBack("error", "network error");
      }
    } catch {
      alertCallBack("error", "network error");
    }
  } else alertCallBack("error", "Room Not Found, Use Available Rooms");
};
const changeName = (
  e: React.ChangeEvent<HTMLInputElement>,
  callBack: React.Dispatch<React.SetStateAction<string>>
) => {
  callBack(e.target.value);
};
const onCheck = (
  e: React.ChangeEvent<HTMLInputElement>,
  tp: string[],
  item: string,
  callBack: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (e.target.checked) {
    e.target.checked = true;
    callBack([...tp, item]);
  } else {
    e.target.checked = false;
    callBack(tp.filter((currItem) => currItem !== item));
  }
};
const changeDate = (
  e: React.ChangeEvent<HTMLInputElement>,
  callBack: React.Dispatch<React.SetStateAction<string>>,
  clearCallBack: () => void
) => {
  callBack(e.target.value);
  clearCallBack();
};
const cellColor = (object: cafeAsset, period: string, date: string) => {
  if (object?.Reservations?.[date]?.yellow?.includes(period)) {
    return "yellow";
  } else if (object?.Reservations?.[date]?.red?.includes(period)) {
    return "red";
  } else {
    return "limegreen";
  }
};
const cellCheck = (object: cafeAsset, period: string, date: string) => {
  if (object?.Reservations?.[date]?.yellow?.includes(period)) {
    return "none";
  } else if (object?.Reservations?.[date]?.red?.includes(period)) {
    return "none";
  } else {
    return "all";
  }
};
const changer = async (
  type: string | undefined,
  num: string | undefined,
  name: string,
  tp: string[],
  date: string,
  color: "red" | "green" | "yellow",
  callBack: React.Dispatch<React.SetStateAction<cafeAsset[]>>,
  monitorCallBack: () => void,
  clearCallBack: () => void,
  admin: boolean,
  alertCallBack: notify,
  getCallBack: getResvs | getAsset
) => {
  try {
    const { data } = await api.put(`/${type}/${color[0]}`, {
      num,
      name,
      tp,
      date,
      color,
      admin,
    });

    if (data?.sts === "ok") {
      getCallBack == getResvs
        ? await getResvs(callBack, monitorCallBack, alertCallBack)
        : await getAsset(type, num, callBack, alertCallBack);
      clearCallBack();
      alertCallBack("success", "Your Reservation Was Saved");

      return;
    }

    if (data?.error === "tp") {
      getCallBack == getResvs
        ? await getResvs(callBack, monitorCallBack, alertCallBack)
        : await getAsset(type, num, callBack, alertCallBack);

      clearCallBack();
      alertCallBack(
        "error",
        "We are sorry, the time periods were just reserved by another user, please try again."
      );
      return;
    }

    alertCallBack("error", data?.error || "Unknown error");
  } catch (error) {
    alertCallBack("error", error.message);
  } finally {
    monitorCallBack();
  }
};

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (navigator.userAgent.match(/samsung/i)) {
      alert(
        "Your browser (Samsung Internet) may not show this website's colors correctly in Dark Mode with setting: 'use dark mode: always/when phone dark mode is on' or when option: 'dark theme sites' is checked. Please choose 'light theme websites' or consider using a standards-compliant browser instead. \n\n" +
          "We recommend Firefox, Microsoft Edge, or Google Chrome."
      );
    }
    window.scrollTo(0, 0);
  }, []);
  const notify = (
    e: "info" | "success" | "warning" | "error" | "default",
    msg: string
  ) => {
    toast[e](msg, {
      position: "top-right",
      autoClose: 2200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };
  return (
    <Router>
      <ToastContainer />
      <RouteChangeHandler setLoading={setLoading} />
      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/book"
              element={
                <Book notify={notify} getResvs={getResvs} dummy={dummy} />
              }
            />
            <Route
              path="/dbrd"
              element={
                <Dashboard
                  notify={notify}
                  changeName={changeName}
                  onCheck={onCheck}
                  changeDate={changeDate}
                  cellColor={cellColor}
                  cellCheck={cellCheck}
                  changer={changer}
                  getResvs={getResvs}
                />
              }
            />
            <Route
              path="/book/:type/:num"
              element={
                <Asset
                  notify={notify}
                  changeName={changeName}
                  onCheck={onCheck}
                  changeDate={changeDate}
                  cellColor={cellColor}
                  cellCheck={cellCheck}
                  changer={changer}
                  getAsset={getAsset}
                  getResvs={getResvs}
                  dummy={dummy}
                />
              }
            />
          </Routes>
        </Suspense>
      )}
    </Router>
  );
}
export default App;
