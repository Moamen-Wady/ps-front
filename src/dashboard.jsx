import { useCallback, useEffect, useState, memo } from "react";
const timePeriods = [
  "12:00",
  "12:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
];
// PROPERTIES AND STATES MODIFIERS
const typerr = (e, callBack1, callBack2) => {
  callBack1(e.target.slot);
  callBack2({
    Reservations: {},
    num: 0,
  });
};
const Objecter = (item, callBack) => {
  callBack(item);
};
export default memo(function Dashboard({
  notify,
  changeName,
  onCheck,
  changeDate,
  cellColor,
  cellCheck,
  changer,
  getResvs,
  getObject,
}) {
  // STATES
  const [object, setObject] = useState({
    Reservations: {},
    num: 0,
  });
  const [date, setDate] = useState("");
  const [all, setall] = useState([]);
  const [go, setGo] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [fname, setFname] = useState("admin");
  const [ftp, setFtp] = useState([]);
  const [type, setType] = useState("ps");
  const [cli, setCli] = useState(1);
  const [monitor, setMonitor] = useState(0);
  const monitorCallBack = useCallback(() => {
    setMonitor((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let t = document.querySelectorAll(".tab2");
    t.forEach((i) => {
      if (i.style.backgroundColor == "rgb(0, 255, 13)") {
        setObject(JSON.parse(i.slot));
      }
    });
  }, [monitor]);

  useEffect(() => {
    getResvs(setall, monitorCallBack, notify);
    notify(
      "info",
      "Free version, Loading may take a minute to finish on the first load"
    );
  }, [getResvs, setall, monitorCallBack, notify]);

  useEffect(() => {
    if (ftp.length == 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [ftp.length]);

  //Clear CallBack
  const clear = useCallback(() => {
    setFtp([]);
    setFname("admin");
    document.querySelectorAll("input.tpchb").forEach((i) => {
      i.checked = false;
    });
    document.querySelectorAll("input#nameInput").forEach((i) => {
      i.value = "";
    });
  }, []);
  //SLIDER
  const cliprv = useCallback(() => {
    if (cli == 1) {
      document.getElementById(`sslide8`).style.animationName = "gotoleft";
    } else {
      document.getElementById(`sslide${cli - 1}`).style.animationName =
        "gotoleft";
    }
  }, [cli]);
  const clinxt = useCallback(() => {
    if (cli == 7) {
      document.getElementById(`sslide${cli}`).style.animationName = "midtoleft";
      document.getElementById(`sslide${cli + 1}`).style.animationName =
        "righttomid";
      document.getElementById(`sslide${1}`).style.animationName =
        "comefromright";
    } else if (cli == 8) {
      document.getElementById(`sslide${cli}`).style.animationName = "midtoleft";
      document.getElementById(`sslide${1}`).style.animationName = "righttomid";
      document.getElementById(`sslide${2}`).style.animationName =
        "comefromright";
    } else {
      document.getElementById(`sslide${cli}`).style.animationName = "midtoleft";
      document.getElementById(`sslide${cli + 1}`).style.animationName =
        "righttomid";
      document.getElementById(`sslide${cli + 2}`).style.animationName =
        "comefromright";
    }
  }, [cli]);
  const nclincr = useCallback(() => {
    if (cli == 8) {
      setCli(1);
    } else {
      setCli(cli + 1);
    }
  }, [cli]);
  const xcliprv = useCallback(() => {
    if (cli == 8) {
      document.getElementById(`sslide1`).style.animationName = "gotoright";
    } else {
      document.getElementById(`sslide${cli + 1}`).style.animationName =
        "gotoright";
    }
  }, [cli]);
  const xclinxt = useCallback(() => {
    if (cli == 1) {
      document.getElementById(`sslide7`).style.animationName = "comefromleft";
      document.getElementById(`sslide8`).style.animationName = "lefttomid";
      document.getElementById(`sslide1`).style.animationName = "midtoright";
    } else if (cli == 2) {
      document.getElementById(`sslide8`).style.animationName = "comefromleft";
      document.getElementById(`sslide1`).style.animationName = "lefttomid";
      document.getElementById(`sslide2`).style.animationName = "midtoright";
    } else {
      document.getElementById(`sslide${cli - 2}`).style.animationName =
        "comefromleft";
      document.getElementById(`sslide${cli - 1}`).style.animationName =
        "lefttomid";
      document.getElementById(`sslide${cli}`).style.animationName =
        "midtoright";
    }
  }, [cli]);
  const nclidcr = useCallback(() => {
    if (cli == 1) {
      setCli(8);
    } else {
      setCli(cli - 1);
    }
  }, [cli]);
  const clifwd = useCallback(() => {
    cliprv();
    clinxt();
    nclincr();
  }, [cli]);
  const clibwd = useCallback(() => {
    xcliprv();
    xclinxt();
    nclidcr();
  }, [cli]);

  //SLIDER
  const sslider = useCallback(() => {
    setTimeout(() => {
      clifwd();
    }, 100);
  }, [cli]);

  return (
    <>
      <div className="fulltablecont">
        <div className="tabs" style={{ position: "static" }}>
          <div
            className="tab"
            onClick={(e) => typerr(e, setType, setObject)}
            slot="ps"
            style={type == "ps" ? { backgroundColor: "rgb(0, 255, 13)" } : {}}
          >
            <h2 className="h2" slot="ps">
              play station
            </h2>
          </div>
          <div
            className="tab"
            onClick={(e) => typerr(e, setType, setObject)}
            slot="pool"
            style={type == "pool" ? { backgroundColor: "rgb(0, 255, 13)" } : {}}
          >
            <h2 className="h2" slot="pool">
              pool
            </h2>
          </div>
          <div
            className="tab"
            onClick={(e) => typerr(e, setType, setObject)}
            slot="ping"
            style={type == "ping" ? { backgroundColor: "rgb(0, 255, 13)" } : {}}
          >
            <h2 className="h2" slot="ping">
              ping pong
            </h2>
          </div>
        </div>
        <div className="fulltablecont">
          <div className="tabs2">
            <button
              id="sleft"
              className="homebtn"
              onClick={() => clifwd(cli, setCli)}
            >
              <img loading="eager" src="/l.webp" alt="l" />
            </button>
            {all?.[type]
              ?.sort((a, b) => a.num - b.num)
              .map((item, index) => {
                if (index + 1 == all?.[type]?.length) {
                  if (!go) {
                    setGo(true);
                    sslider();
                  }
                }
                return (
                  <button
                    className="tab2 sslide"
                    id={"sslide" + (index + 1)}
                    slot={JSON.stringify(item)}
                    key={item.num}
                    onClick={() => Objecter(item, setObject)}
                    style={
                      object.num == item.num
                        ? { backgroundColor: "rgb(0, 255, 13)", zIndex: 1 }
                        : {}
                    }
                  >
                    <h2 className="h22">
                      {type.toString() + " no. " + item.num}
                    </h2>
                  </button>
                );
              })}
            <button
              id="sright"
              className="homebtn"
              onClick={() => clibwd(cli, setCli)}
            >
              <img loading="eager" src="/r.webp" alt="r" />
            </button>
          </div>
        </div>
      </div>
      <div className="options">
        <input
          type="date"
          className="date1"
          name="date"
          id="date"
          onChange={(e) => changeDate(e, setDate, clear)}
          placeholder="Choose Date"
        />
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Reservations</td>
              <td>Options</td>
            </tr>
          </thead>
          <tbody>
            {object?.Reservations?.[date]?.Resvs?.sort(
              (a, b) => a.index - b.index
            ).map((i) => {
              return (
                <tr key={i.name + i.tp}>
                  <td>{i.name}</td>
                  <td>{i.tp.sort().toString().replace(",", ", ")}</td>
                  <td>
                    <span
                      style={{
                        all: "unset",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <button
                        className="opbt"
                        onClick={() =>
                          changer(
                            type,
                            object.num,
                            i.name,
                            i.tp,
                            date,
                            "red",
                            setall,
                            monitorCallBack,
                            clear,
                            1,
                            notify
                          )
                        }
                        style={{ display: "inline" }}
                      >
                        Confirm
                      </button>
                      <button
                        className="opbt"
                        onClick={() =>
                          changer(
                            type,
                            object.num,
                            i.name,
                            i.tp,
                            date,
                            "yellow",
                            setall,
                            monitorCallBack,
                            clear,
                            1,
                            notify
                          )
                        }
                        style={{ display: "inline" }}
                      >
                        Hold
                      </button>
                      <button
                        className="opbt"
                        onClick={() =>
                          changer(
                            type,
                            object.num,
                            i.name,
                            i.tp,
                            date,
                            "green",
                            setall,
                            monitorCallBack,
                            clear,
                            1,
                            notify
                          )
                        }
                        style={{ display: "inline" }}
                      >
                        Cancel
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <form id="times">
          <div className="timePeriods">
            {timePeriods.map((period) => {
              return (
                <label
                  className="container"
                  key={period}
                  style={{
                    pointerEvents: cellCheck(object, period, date),
                    backgroundColor: "whitesmoke",
                  }}
                >
                  {" " + period + " "}
                  <input
                    type="checkbox"
                    className="tpchb"
                    disabled={date == "" ? true : false}
                    onChange={(e) => onCheck(e, ftp, period, setFtp)}
                    style={{
                      pointerEvents: cellCheck(object, period, date),
                      backgroundColor: cellColor(object, period, date),
                    }}
                  />
                  <span
                    className="checkmark"
                    style={{
                      pointerEvents: cellCheck(object, period, date),
                      backgroundColor: cellColor(object, period, date),
                    }}
                  ></span>
                </label>
              );
            })}
          </div>
        </form>
        <input
          type="text"
          className="nameInput"
          id="nameInput"
          placeholder="admin"
          onChange={(e) => changeName(e, setFname)}
          disabled={disabled}
        />
        <button
          className="opbt"
          onClick={() =>
            changer(
              type,
              object.num,
              fname,
              ftp,
              date,
              "red",
              setall,
              monitorCallBack,
              clear,
              1,
              notify
            )
          }
          style={{ display: "inline" }}
        >
          Confirm
        </button>
        <button
          className="opbt"
          onClick={() =>
            changer(
              type,
              object.num,
              fname,
              ftp,
              date,
              "yellow",
              setall,
              monitorCallBack,
              clear,
              1,
              notify
            )
          }
          style={{ display: "inline" }}
        >
          Hold
        </button>
      </div>
    </>
  );
});
