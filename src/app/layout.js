import 'animate.css';
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Footer from "@/Components/Shared/Footer/Footer";
import Navbar from "@/Components/Shared/Bars/Navbar";
import Topbar from "@/Components/Shared/Bars/Topbar";
import BottomNavigation from '@/Components/Shared/Bars/BottomNavigation';
import DefaultFatch from '@/Components/Shared/DefaultFatch';
import {Toaster} from "react-hot-toast";

export const metadata = {
  title: "Linear Hub",
  description: "Linear Hub Gradget & Electronics Shop",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en" data-theme="light">
        <body className='relative bg-white pb-20'>
        <SpeedInsights />
          <DefaultFatch />
          <Toaster />
          <Topbar />
          <Navbar />
          {children}
          <BottomNavigation />
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
