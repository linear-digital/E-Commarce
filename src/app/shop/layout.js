import Footer from "@/Components/Shared/Footer/Footer";
import Navbar from "@/Components/Shared/Bars/Navbar";
import Topbar from "@/Components/Shared/Bars/Topbar";
import BottomNavigation from "@/Components/Shared/Bars/BottomNavigation";

export const metadata = {
  title: "Linear Hub Shop",
  description: "Linear Hub Gadget & Electronics Shop",
};

export default function layout({ children }) {
  return (
    <div>
      <Topbar />
      <Navbar />
      {children}
      <BottomNavigation />
      <Footer />
    </div>
  );
}
