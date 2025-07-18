import { useCallback, useEffect, useState, memo } from "react";
import type { cafeAsset, DashboardPageProps } from "./types";
import Slider from "./Slider";
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

export default memo(function Dashboard({
  notify,
  changeName,
  onCheck,
  changeDate,
  cellColor,
  cellCheck,
  changer,
  getResvs,
}: DashboardPageProps) {
  // STATES
  const [asset, setAsset] = useState<cafeAsset>({
    num: "",
  });
  const [date, setDate] = useState("");
  const [all, setAll] = useState<cafeAsset[]>([]);
  const [disabled, setDisabled] = useState(true);
  const [fname, setFname] = useState("admin");
  const [ftp, setFtp] = useState<string[]>([]);
  const [type, setType] = useState("ps");
  const [monitor, setMonitor] = useState(0);
  const monitorCallBack = useCallback(() => {
    setMonitor((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let t = document.querySelectorAll(".tab2") as NodeListOf<HTMLElement>;
    t.forEach((i) => {
      if (i.style.backgroundColor == "rgb(0, 255, 13)") {
        setAsset(JSON.parse(i.slot));
      }
    });
  }, [monitor]);

  useEffect(() => {
    getResvs(setAll, monitorCallBack, notify);
    notify(
      "info",
      "Free version, Loading may take a minute to finish on the first load"
    );
  }, [getResvs, setAll, monitorCallBack, notify]);

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
    (
      document.querySelectorAll("input.tpchb") as NodeListOf<HTMLInputElement>
    ).forEach((i) => {
      i.checked = false;
    });
    (
      document.querySelectorAll(
        "input#nameInput"
      ) as NodeListOf<HTMLInputElement>
    ).forEach((i) => {
      i.value = "";
    });
  }, []);
  return (
    <>
      <Slider
        setType={setType}
        all={all}
        setAsset={setAsset}
        type={type}
        asset={asset}
        numberOfItems={6}
      />
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
            {asset?.Reservations?.[date]?.Resvs?.sort(
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
                            asset.num,
                            i.name,
                            i.tp,
                            date,
                            "red",
                            setAll,
                            monitorCallBack,
                            clear,
                            true,
                            notify,
                            getResvs
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
                            asset.num,
                            i.name,
                            i.tp,
                            date,
                            "yellow",
                            setAll,
                            monitorCallBack,
                            clear,
                            true,
                            notify,
                            getResvs
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
                            asset.num,
                            i.name,
                            i.tp,
                            date,
                            "green",
                            setAll,
                            monitorCallBack,
                            clear,
                            true,
                            notify,
                            getResvs
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
                    pointerEvents: cellCheck(asset, period, date),
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
                      pointerEvents: cellCheck(asset, period, date),
                      backgroundColor: cellColor(asset, period, date),
                    }}
                  />
                  <span
                    className="checkmark"
                    style={{
                      pointerEvents: cellCheck(asset, period, date),
                      backgroundColor: cellColor(asset, period, date),
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
              asset.num,
              fname,
              ftp,
              date,
              "red",
              setAll,
              monitorCallBack,
              clear,
              true,
              notify,
              getResvs
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
              asset.num,
              fname,
              ftp,
              date,
              "yellow",
              setAll,
              monitorCallBack,
              clear,
              true,
              notify,
              getResvs
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
