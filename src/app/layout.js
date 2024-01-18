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
import { Toaster } from "react-hot-toast";
import 'react-loading-skeleton/dist/skeleton.css'
export const metadata = {
  title: "Linear Hub",
  description: "Linear Hub Gadget & Electronics Shop",
};

export default function RootLayout({ children }) {

  return (
    <StoreProvider>
      <html lang="en" data-theme="light">
        <body className='relative bg-white pb-20'>
          <Topbar />
          <Navbar />
          <Toaster />
          <SpeedInsights />
          <DefaultFatch />
          {children}
          <BottomNavigation />
          <Footer />
          <script
            type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUDmkMGZD5mIPpiGRVQov8aPztKKB5B2c&libraries=places"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js" />
        </body>
      </html>
    </StoreProvider>
  );
}
