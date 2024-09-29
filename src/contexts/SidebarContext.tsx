import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type SidebarProviderProps = {
  children: ReactNode;
};

type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const sidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebarContext() {
  const value = useContext(sidebarContext);
  if (value == null) throw Error("Cannot use outside of Sidebar Provider");
  return value;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setIsSmallOpen(false);
    };

    window.addEventListener("resize", handler);
  }, []);

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isScreenSmall()) {
      setIsSmallOpen((s: boolean) => !s);
    } else {
      setIsLargeOpen((s: boolean) => !s);
    }
  }

  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }
  return (
    <sidebarContext.Provider
      value={{ isLargeOpen, isSmallOpen, toggle, close }}
    >
      {children}
    </sidebarContext.Provider>
  );
}
