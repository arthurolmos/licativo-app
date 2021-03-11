import React from "react";
import Toast, { DURATION } from "react-native-easy-toast";
import emitter from "../../services/emitter";

const DefaulToast = (props) => {
  const toastRef = React.useRef();

  React.useEffect(() => {
    emitter.all.clear();
    emitter.on("showToast", (e) => showToast(e));
    return () => emitter.off("showToast");
  }, []);

  function showToast(e) {
    const { message } = e;

    toastRef.current.show(message);
  }

  return (
    <Toast
      ref={toastRef}
      position="bottom"
      opacity={0.9}
      style={{
        backgroundColor: "gray",
        borderRadius: 50,
        margin: 15,
        padding: 15,
        zIndex: 999,
      }}
      fadeInDuration={750}
      fadeOutDuration={1000}
    />
  );
};
export default DefaulToast;
