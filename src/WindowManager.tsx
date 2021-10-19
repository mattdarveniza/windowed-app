import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

type WindowProps = {
  w: Window;
  children: ReactNode;
};

const Window = ({ w, children }: WindowProps) => {
  const rootNode = w.document.getElementById("root");
  if (!rootNode) {
    throw Error("No root node found");
  }

  return createPortal(children, rootNode);
};

export const WindowManager = () => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [list, setList] = useState<string[]>([]);
  const [textField, setText] = useState<string>("");

  const addToList = () => setList((list) => [...list, textField]);

  const removeFromList = (item: string) =>
    setList(list.filter((i) => i !== item));

  const createWindow = () => {
    const newWindow = window.open(
      "",
      `popout${windows.length}`,
      "height=500,width=500,left=500,top=100"
    );
    if (newWindow === null) {
      window.alert("enable popups or something");
      return;
    }

    newWindow.document.body.innerHTML = '<div id="root"></div>';

    setWindows([...windows, newWindow]);
  };

  return (
    <>
      {windows.map((w) => (
        <Window w={w}>
          <ul>
            {list.map((item) => (
              <li>
                {item}
                <button onClick={() => removeFromList(item)}>x</button>
              </li>
            ))}
          </ul>
        </Window>
      ))}
      <div>
        <button type="button" onClick={createWindow}>
          New Window
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addToList();
        }}
      >
        <input type="text" onChange={(e) => setText(e.target.value)} />
        <button type="submit" disabled={!textField}>
          +
        </button>
      </form>
    </>
  );
};
