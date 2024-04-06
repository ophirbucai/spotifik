import { useEffect, useMemo, useRef, useState } from "react";

export const useColumnCount = (minWidth = 180) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState();
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const cssProperty = useMemo(() => ({
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
  }), [minWidth]);
  return [
    containerRef,
    cssProperty
  ];
};
