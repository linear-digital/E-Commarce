
import MiddleBar from "@/Components/Shared/Bars/MiddleBar";
import "./globals.css";
import Topbar from "@/Components/Shared/Bars/Topbar";
import StoreProvider from "@/redux/StoreProvider";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const metadata = {
  title: "E-Store",
  description: "E-Store",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body >
          <Topbar />
          <MiddleBar />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
