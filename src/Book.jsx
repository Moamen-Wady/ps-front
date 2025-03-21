import { useEffect, useState, memo, useCallback } from "react";
import { Outlet, Link } from "react-router-dom";
export default memo(function Book({ notify, getResvs, dummy }) {
  useEffect(() => {
    getResvs(setAll, dummy, notify);
    notify(
      "info",
      "Free version, Loading may take a minute to finish on the first load"
    );
  }, [dummy, getResvs, notify]);
  const [all, setAll] = useState([]);
  const [type, setType] = useState("ps");
  const typerr = useCallback(
    (e) => {
      setType(e.target.slot);
    },
    [type]
  );
  return (
    <main>
      <h1>Welcome, Gamer...</h1>
      <h1>
        <i className="rnb">Are</i> <i className="rnb">You</i>
        <i className="rnb"> Ready</i>?
      </h1>
      <h3 className="h3">Choose Your Desired Game & Room</h3>
      <div className="fulltablecont">
        <div className="tabs">
          <div
            className="tab"
            onClick={typerr}
            slot="ps"
            style={type == "ps" ? { backgroundColor: "rgb(0, 255, 13)" } : {}}
          >
            <h2 className="h2" slot="ps">
              play station
            </h2>
          </div>
          <div
            className="tab"
            onClick={typerr}
            slot="pool"
            style={type == "pool" ? { backgroundColor: "rgb(0, 255, 13)" } : {}}
          >
            <h2 className="h2" slot="pool">
              pool
            </h2>
          </div>
          <div
            className="tab"
            onClick={typerr}
            slot="ping"
            style={type == "ping" ? { backgroundColor: "rgb(0, 255, 13)" } : {}}
          >
            <h2 className="h2" slot="ping">
              ping pong
            </h2>
          </div>
        </div>
        <div className="assets">
          {all[type]
            ?.sort((a, b) => a.num - b.num)
            .map((item) => {
              return (
                <Link
                  to={"/book/" + type + "/" + item.num}
                  className="asset"
                  key={item.num}
                >
                  <div key={type.toString() + " no. " + item.num}>
                    <h4 className="h4">
                      {type.toString() + " no. " + item.num}
                    </h4>
                    <img
                      loading="lazy"
                      className="assetimg"
                      src="/pst.webp"
                      alt="ps"
                    />
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <Outlet />
    </main>
  );
});
