export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        backgroundColor: "transparent",
        padding: "0 ",
        flexDirection: "column",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "12vw",
          height: "12vw",
          display: "block",
          margin: "auto",
        }}
      >
        <source src="/loading.webm" type="video/webm" />
      </video>
    </div>
  );
}
