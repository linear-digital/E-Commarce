import 'animate.css';
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Footer from "@/Components/Shared/Footer/Footer";
import Navbar from "@/Components/Shared/Bars/Navbar";
import Topbar from "@/Components/Shared/Bars/Topbar";

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
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
