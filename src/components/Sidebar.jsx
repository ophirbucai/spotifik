import { useResize } from "../hooks/useResize";
import { Navigation } from "./Navigation.jsx";
import { Library } from "./Library.jsx";
import { useCallback, useEffect, useState } from "react";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [width, handleMouseDown] = useResize();

  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-width", `${width}px`);

  }, [width]);

  const onCollapse = useCallback(() => {
    setCollapsed(!collapsed);
    document.documentElement.style.setProperty("--sidebar-width", collapsed ? "240px" : "60px");
  }, [collapsed]);

  return (
    <nav className="sidebar">
      <Navigation />
      <Library onCollapse={onCollapse} />
      <button className={"resize-handle"} tabIndex={-1} onMouseDown={handleMouseDown}></button>
    </nav>
  );
};
