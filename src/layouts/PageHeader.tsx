import React, { useState } from "react";
import logo from "../assets/logo.png";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import { Button } from "../components/Button";
import { useSidebarContext } from "../contexts/SidebarContext";

export default function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  const { toggle } = useSidebarContext();

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      <form
        className={`md:flex  gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        } `}
      >
        {showFullWidthSearch && (
          <Button
            size="icon"
            className="flex-shrink-0"
            variant="ghost"
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="runded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button size="icon" className="flex-shrink-0" type="button">
          <Mic />
        </Button>
      </form>
      <div
        className={` flex-shrink-0 md:gap-2  ${
          showFullWidthSearch ? "hidden md:flex" : "flex"
        }`}
      >
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => setShowFullWidthSearch(true)}
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
}

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();
  return (
    <div
      className={`gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden md:flex" : "flex"
      }`}
    >
      <Button variant="ghost" size="icon" className="" onClick={toggle}>
        <Menu />
      </Button>
      <a href="/">
        <img src={logo} alt="h-6" />
      </a>
    </div>
  );
}
