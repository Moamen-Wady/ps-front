import { useState, useEffect, memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import type { cafeAsset, AssetPageProps } from "./types";

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

//IMPORTANT, DON'T FORGET TO ADD
const dateStr = "2025-07-18";
const formattedDate = dateStr.replace(/-/g, "_");
console.log(formattedDate); // Output: "2025_07_18"

export default memo(function Asset({
  notify,
  changeName,
  onCheck,
  changeDate,
  cellColor,
  cellCheck,
  changer,
  getAsset,
  getResvs,
  dummy,
}: AssetPageProps) {
  //API CALLS
  const [asset, setAsset] = useState<cafeAsset[]>([
    {
      num: "",
    },
  ]);
  const [tp, setTp] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);

  const { type, num } = useParams();
  useEffect(() => setDisabled(tp.length === 0), [tp.length]);

  useEffect(() => {
    getAsset(type, num, setAsset, notify);
  }, [getAsset, type, num, notify]);

  const clear = useCallback(() => {
    setTp([]);
    setName("");
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

  const nameCheck = useCallback(async () => {
    if (date == "" || name == "" || tp.length == 0) {
      notify("error", "please choose date, times and enter your name");
      return;
    }
    //the next filter is for malfunctions or possible walkarounds around the code
    let tpff = tp.filter((i) => {
      return (
        asset[0]?.Reservations?.[date]?.yellow?.includes(i) ||
        asset[0]?.Reservations?.[date]?.red?.includes(i)
      );
    });
    if (tpff.length > 0) {
      await getAsset(type, num, setAsset, notify);
      notify(
        "warning",
        "Chosen time periods are reserved, please rebook your desired times"
      );
      clear();
    } else {
      changer(
        type,
        num,
        name,
        tp.sort(),
        date,
        "yellow",
        setAsset,
        dummy,
        clear,
        false,
        notify,
        getAsset
      );
    }
  }, [
    name,
    tp,
    date,
    asset[0],
    getResvs,
    type,
    num,
    notify,
    clear,
    changer,
    dummy,
  ]);
  console.log(asset);
  console.log(date);
  return (
    <>
      <div className="hicont">
        <img
          loading="eager"
          src="/logoiw.webp"
          alt="logo"
          className="headerimg"
        />
      </div>
      <h1 className="h1">Unlock Your Potential </h1>
      <div className="options">
        <h3 className="h3form">
          Now Choose Your Desired Date & Time Then submit, You will then be
          redirected to payment page
        </h3>
        <input
          type="date"
          className="date1"
          name="date"
          id="date"
          onChange={(e) => changeDate(e, setDate, clear)}
          placeholder="Choose Date"
        />
        <form id="times">
          <div className="timePeriods">
            {timePeriods?.map((period) => {
              return (
                <label
                  className="container"
                  key={period}
                  style={{
                    pointerEvents: cellCheck(asset[0], period, date),
                    backgroundColor: "whitesmoke",
                  }}
                >
                  {" " + period + " "}
                  <input
                    type="checkbox"
                    className="tpchb"
                    disabled={date == "" ? true : false}
                    onChange={(e) => onCheck(e, tp, period, setTp)}
                    style={{
                      pointerEvents: cellCheck(asset[0], period, date),
                      backgroundColor: cellColor(asset[0], period, date),
                    }}
                  />
                  <span
                    className="checkmark"
                    style={{
                      pointerEvents: cellCheck(asset[0], period, date),
                      backgroundColor: cellColor(asset[0], period, date),
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
          placeholder="Name In English"
          onChange={(e) => changeName(e, setName)}
          disabled={disabled}
        />
        <button onClick={nameCheck} className="submit" disabled={disabled}>
          Submit
        </button>
      </div>
    </>
  );
});
