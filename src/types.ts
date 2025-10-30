type singleReservation = {
  name: string;
  tp: string[];
  color: "yellow" | "red" | "green";
  index: number;
};

type DateReservations = {
  yellow?: string[];
  red?: string[];
  Resvs: singleReservation[];
};

type ReservationsData = {
  [date: string]: DateReservations;
};

export type cafeAsset = {
  num: string;
  Reservations?: ReservationsData;
};

export type notify = (
  e: "info" | "success" | "warning" | "error" | "default",
  msg: string
) => void;

type dummy = () => void;

export type getResvs = (
  callBack: React.Dispatch<React.SetStateAction<cafeAsset[]>>,
  monitorCallBack: () => void,
  alertCallBack: (
    e: "info" | "success" | "warning" | "error" | "default",
    msg: string
  ) => void
) => Promise<void>;

export type getAsset = (
  type: string | undefined,
  num: string | undefined,
  callBack: React.Dispatch<React.SetStateAction<cafeAsset[]>>,
  alertCallBack: notify
) => Promise<void>;

type changeName = (
  e: React.ChangeEvent<HTMLInputElement>,
  callBack: React.Dispatch<React.SetStateAction<string>>
) => void;

type onCheck = (
  e: React.ChangeEvent<HTMLInputElement>,
  tp: string[],
  item: string,
  callBack: React.Dispatch<React.SetStateAction<string[]>>
) => void;

type changeDate = (
  e: React.ChangeEvent<HTMLInputElement>,
  callBack: React.Dispatch<React.SetStateAction<string>>,
  clearCallBack: () => void
) => void;

type cellColor = (
  object: cafeAsset,
  period: string,
  date: string
) => "yellow" | "red" | "limegreen";

type cellCheck = (
  object: cafeAsset,
  period: string,
  date: string
) => "none" | "all";

type changer = (
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
) => Promise<void>;

export type BookPageProps = {
  notify: notify;
  dummy: dummy;
  getResvs: getResvs;
};

export type AssetPageProps = {
  notify: notify;
  changeName: changeName;
  onCheck: onCheck;
  changeDate: changeDate;
  cellColor: cellColor;
  cellCheck: cellCheck;
  changer: changer;
  getAsset: getAsset;
  getResvs: getResvs;
  dummy: dummy;
};

export type DashboardPageProps = {
  notify: notify;
  changeName: changeName;
  onCheck: onCheck;
  changeDate: changeDate;
  cellColor: cellColor;
  cellCheck: cellCheck;
  changer: changer;
  getResvs: getResvs;
};
