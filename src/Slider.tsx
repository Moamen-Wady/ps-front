import React, { useCallback, useState } from "react";
import { cafeAsset } from "./types";

const typerr = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  callBack1: React.Dispatch<React.SetStateAction<string>>,
  callBack2: React.Dispatch<React.SetStateAction<cafeAsset>>
) => {
  callBack1((e.target as HTMLElement).slot);
  callBack2({
    Reservations: {},
    num: "0",
  });
};

type SliderProps = {
  all: cafeAsset[];
  type: string;
  asset: cafeAsset;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setAsset: React.Dispatch<React.SetStateAction<cafeAsset>>;
  numberOfItems: number;
};

export default function Slider({
  all,
  setType,
  setAsset,
  type,
  asset,
  numberOfItems,
}: SliderProps) {
  const [cli, setCli] = useState(1);
  const [go, setGo] = useState(false);
  //SLIDER
  const prevPanel = useCallback(() => {
    if (cli == 1) {
      (
        document.getElementById(`sslide${numberOfItems}`) as HTMLElement
      ).style.animationName = "gotoleft";
    } else {
      (
        document.getElementById(`sslide${cli - 1}`) as HTMLElement
      ).style.animationName = "gotoleft";
    }
  }, [cli]);
  const nextPanel = useCallback(() => {
    if (cli == numberOfItems - 1) {
      (
        document.getElementById(`sslide${cli}`) as HTMLElement
      ).style.animationName = "midtoleft";
      (
        document.getElementById(`sslide${cli + 1}`) as HTMLElement
      ).style.animationName = "righttomid";
      (
        document.getElementById(`sslide${1}`) as HTMLElement
      ).style.animationName = "comefromright";
    } else if (cli == numberOfItems) {
      (
        document.getElementById(`sslide${cli}`) as HTMLElement
      ).style.animationName = "midtoleft";
      (
        document.getElementById(`sslide${1}`) as HTMLElement
      ).style.animationName = "righttomid";
      (
        document.getElementById(`sslide${2}`) as HTMLElement
      ).style.animationName = "comefromright";
    } else {
      (
        document.getElementById(`sslide${cli}`) as HTMLElement
      ).style.animationName = "midtoleft";
      (
        document.getElementById(`sslide${cli + 1}`) as HTMLElement
      ).style.animationName = "righttomid";
      (
        document.getElementById(`sslide${cli + 2}`) as HTMLElement
      ).style.animationName = "comefromright";
    }
  }, [cli]);
  const incrementCurrItem = useCallback(() => {
    if (cli == numberOfItems) {
      setCli(1);
    } else {
      setCli(cli + 1);
    }
  }, [cli]);
  const xprevPanel = useCallback(() => {
    if (cli == numberOfItems) {
      (document.getElementById(`sslide1`) as HTMLElement).style.animationName =
        "gotoright";
    } else {
      (
        document.getElementById(`sslide${cli + 1}`) as HTMLElement
      ).style.animationName = "gotoright";
    }
  }, [cli]);
  const xnextPanel = useCallback(() => {
    if (cli == 1) {
      (
        document.getElementById(`sslide${numberOfItems-1}`) as HTMLElement
      ).style.animationName = "comefromleft";
      (
        document.getElementById(`sslide${numberOfItems}`) as HTMLElement
      ).style.animationName = "lefttomid";
      (document.getElementById(`sslide1`) as HTMLElement).style.animationName =
        "midtoright";
    } else if (cli == 2) {
      (
        document.getElementById(`sslide${numberOfItems}`) as HTMLElement
      ).style.animationName = "comefromleft";
      (document.getElementById(`sslide1`) as HTMLElement).style.animationName =
        "lefttomid";
      (document.getElementById(`sslide2`) as HTMLElement).style.animationName =
        "midtoright";
    } else {
      (
        document.getElementById(`sslide${cli - 2}`) as HTMLElement
      ).style.animationName = "comefromleft";
      (
        document.getElementById(`sslide${cli - 1}`) as HTMLElement
      ).style.animationName = "lefttomid";
      (
        document.getElementById(`sslide${cli}`) as HTMLElement
      ).style.animationName = "midtoright";
    }
  }, [cli]);
  const decrementCurrItem = useCallback(() => {
    if (cli == 1) {
      setCli(numberOfItems);
    } else {
      setCli(cli - 1);
    }
  }, [cli]);
  const slideForward = useCallback(() => {
    prevPanel();
    nextPanel();
    incrementCurrItem();
  }, [cli]);
  const slideBackward = useCallback(() => {
    xprevPanel();
    xnextPanel();
    decrementCurrItem();
  }, [cli]);
  const sslider = useCallback(() => {
    setTimeout(() => {
      slideForward();
    }, 100);
  }, [cli]);

  console.log(all);

  return (
    <div className="fulltablecont">
      <div className="tabs" style={{ position: "static" }}>
        <div
          className="tab"
          onClick={(e) => typerr(e, setType, setAsset)}
          slot="ps"
          style={type == "ps" ? { backgroundColor: "rgb(0, 255, 13)" } : {}}
        >
          <h2 className="h2" slot="ps">
            play station
          </h2>
        </div>
        <div
          className="tab"
          onClick={(e) => typerr(e, setType, setAsset)}
          slot="pool"
          style={type == "pool" ? { backgroundColor: "rgb(0, 255, 13)" } : {}}
        >
          <h2 className="h2" slot="pool">
            pool
          </h2>
        </div>
        <div
          className="tab"
          onClick={(e) => typerr(e, setType, setAsset)}
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
          <button id="sleft" className="homebtn" onClick={() => slideForward()}>
            <img loading="eager" src="/l.webp" alt="l" />
          </button>
          {all?.[type]
            ?.sort(
              (a: cafeAsset, b: cafeAsset) => Number(a.num) - Number(b.num)
            )
            .map((item: cafeAsset, index: number) => {
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
                  onClick={() => setAsset(item)}
                  style={
                    asset.num == item.num
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
            onClick={() => slideBackward()}
          >
            <img loading="eager" src="/r.webp" alt="r" />
          </button>
        </div>
      </div>
    </div>
  );
}
