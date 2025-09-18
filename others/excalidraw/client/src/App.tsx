import { useEffect, useRef, useState } from "react";
// import FabricCanvas from "./Draw";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:4000");

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [remoteCursors, setRemoteCursors] = useState<null>(null);
  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      socket.emit("mousemove", { x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    socket.on("remote-mousemove", ({ id, cursor }) => {
      setRemoteCursors((prev: any) => ({
        ...prev,
        [id]: cursor,
      }));
    });

    socket.on("user-disconnected", (id) => {
      setRemoteCursors((prev: any) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      socket.off("remote-mousemove");
      socket.off("user-disconnected");
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {remoteCursors &&
        Object.entries(remoteCursors).map(([id, cursor]: any) => (
          <div
            key={id}
            style={{
              position: "absolute",
              left: cursor.x,
              top: cursor.y,
              width: 10,
              height: 10,
              backgroundColor: "red",
              borderRadius: "50%",
              pointerEvents: "none",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

      <h1 style={{ textAlign: "center" }}>Move your mouse to see cursors</h1>
      {/* <FabricCanvas /> */}

      <button onClick={() => console.log("clicked by other user!!")}>hi</button>
    </div>
  );
};

export default App;
