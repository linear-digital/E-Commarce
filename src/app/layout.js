// app/layout.tsx

import 'animate.css';
import './globals.css';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Toaster } from 'react-hot-toast';
import 'react-loading-skeleton/dist/skeleton.css';

import { ConfigProvider } from 'antd';
import Topbar from '@/Components/Shared/Bars/Topbar';
import Navbar from '@/Components/Shared/Bars/Navbar';
import Footer from '@/Components/Shared/Footer/Footer';
import BottomNavigation from '@/Components/Shared/Bars/BottomNavigation';
import DefaultFatch from '@/Components/Shared/DefaultFatch';
import DeviceIdentifire from '@/Components/Shared/DeviceIdentifire';
import StoreProvider from '@/redux/StoreProvider';


export const metadata = {
  title: 'Oftech Gadget | Online Shopping BD | Home Page',
  description: 'Oftech Gadget is the Best Electronics Accessories, and Gadgets & Online shop in Bangladesh. We the Latest Tech products with the most competitive price in BD.',
  metadataBase: new URL('https://oftechgadget.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  keywords: [
    "Electric Gadgets in Bangladesh", "Gadget shop in bd", "PC accessories shop in Bangladesh",
    "best computer shop in Bangladesh", "Gadget Shop in Bangladesh", "Online Shop in BD",
    "online computer shop in bd", "computer accessories online shop in Bangladesh", "computer",
    "gaming", "desktop", "monitor", "Star Tech", "computer accessories", "Laptop accessories",
    "Laptop Online Store in BD", "adata", "apacer", "apple", "asus", "bangladesh", "baseus", "belkin",
    "benq", "boya", "brother", "cable", "camera", "canon", "GPU", "graphics card", "Mouse", "Keyboard",
    "Headphone", "Powerbank", "Speaker", "Juicer", "Rice Cooker", "Washing Machine", "Vaccum Cleaner"
  ],
  openGraph: {
    type: 'website',
    title: 'Oftech Gadget | Online Shopping BD | YouTube Gadget & Electric Gadgets Shop',
    description: 'Online Shopping BD',
    url: 'https://www.oftechgadget.com/',
  },
  twitter: {
    card: 'summary',
    site: 'oftechgadget',
    title: 'Oftech Gadget | Online Shopping BD | Electric Gadget & Gear Shop',
    description: 'Online Shopping Electric Gadgets',
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5H7T1ZQXJ0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5H7T1ZQXJ0');
            `,
          }}
        />
      </head>
      <body className="relative bg-white pb-10 w-full overflow-x-hidden">
        <StoreProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#e30613',
              },
            }}
          >
            <Topbar />
            <Navbar />
            <Toaster />
            <DefaultFatch />
            <DeviceIdentifire />
            <div className="lg:px-5">{children}</div>
            <Footer />
            <BottomNavigation />
          </ConfigProvider>
        </StoreProvider>
      </body>
    </html>
  );
}