export default function Loading() {
  const styles = {
    container: {
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
    },
    vid: {
      width: "12vw",
      height: "12vw",
      display: "block",
      margin: "auto",
    },
  };
  return (
    <div style={styles.container}>
      <video autoPlay loop muted playsInline style={styles.vid}>
        <source src="/loading.webm" type="video/webm" alt="" />
      </video>
    </div>
  );
}
