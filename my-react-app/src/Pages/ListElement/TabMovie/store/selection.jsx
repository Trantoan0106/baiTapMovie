
import { createContext, useContext, useState } from "react";

const Ctx = createContext(null);

export function MovieSelectionProvider({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Ctx.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </Ctx.Provider>
  );
}

export const useMovieSelection = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMovieSelection must be inside provider");
  return ctx;
};
