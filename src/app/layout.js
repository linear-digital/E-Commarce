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
import DeviceIdentifire from '@/Components/Shared/DeviceIdentifire';


export const metadata = {
  title: 'Linear Hub | Online Shopping BD | Home Page',
  description: "Linear Hub is the Best Electronics Accessories, and Gadgets &amp; Online shop in Bangladesh. We the Latest Tech products with the most competitive price in BD.",
  metadataBase: new URL('https://linearhub.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
}
export default function RootLayout({ children }) {

  return (
    <StoreProvider>
      <html lang="en" data-theme="light">
        {/* Meta Tags for SEO */}

        <meta name='title' content='Linear Hub | Online Shopping BD' />
        <meta name="keywords" content="Electric Gadgets in Bangladesh, Gadget shop in bd, PC accessories shop in Bangladesh, best computer shop in Bangladesh, Gadget shop in bd, Gadget Shop in Bangladesh, Online Shop in BD, online computer shop in bd, computer accessories online shop in Bangladesh, computer, gaming, desktop, monitor, Star Tech, computer accessories, Desktop accessories, Laptop accessories, Laptop Online Store in BD, adata, apacer, apple, asus, bangladesh, baseus, belkin, benq, best, boya, brother, cable, camera, canon, GPU, graphics card, Star Tech &amp; Engineering Ltd, Mouse , Keyboard, Headphone, Powerbank, Speaker, Juicer, Rice Cooker, Washing Machine, Vaccum Cleaner," />
        <meta property="og:type" content="og:product" />
        <meta property="og:title" content="Linear Hub | Online Shopping BD | YouTube Gadget &amp; Electric Gadgets Shop" />
        <meta property="og:description" content="Online Shopping BD" />
        <meta property="og:url" content="https://www.linearhub.com/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="linearhub" />
        <meta name="twitter:title" content="Linear Hub | Online Shopping BD | Electric Gadget &amp; Gear Shop" />
        <meta name="twitter:description" content="Online Shopping Electric Gadgets" />

        <body className='relative bg-white pb-10 w-full overflow-x-hidden'>
          <Topbar />
          <Navbar />
          <Toaster />

          <SpeedInsights />
          <DefaultFatch />
          <DeviceIdentifire />
          {children}
          <Footer />
          <BottomNavigation />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js" />
        </body>
      </html>
    </StoreProvider>
  );
}
