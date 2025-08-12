import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ICommonLayout {
  children: ReactNode;
}
const CommonLayout = ({ children }: ICommonLayout) => {
  return (
    <div className="flex flex-col mx-auto container min-h-screen">
      <Navbar></Navbar>
      <div className="grow-1">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default CommonLayout;
