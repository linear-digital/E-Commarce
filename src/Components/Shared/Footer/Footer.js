import React from "react";
import Logo from "../Logo";
import {
  Apple,
  Facebook,
  HeadPhone,
  Instagram,
  Linkedin,
  PlayStore,
  Twitter,
  YoutubeIcon,
} from "../../../assets/icons";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-screen">
      <footer className="footer  lg:p-10 mt-10 p-4 text-base-content container mx-auto">
        <nav>
          <Logo />
          <p className="lg:w-[390px]  text-black text-opacity-50 text-lg font-normal  leading-7 mt-5">
            Stay at the forefront of technology with Linear Hub's exclusive electric gadget launches.
            Get Home Delivery
          </p>
          <div className="flex mt-8 items-center">
            <Link href={"/"} className="mr-3">
              <YoutubeIcon />
            </Link>
            <Link href={"/"} className="mr-3">
              <Linkedin />
            </Link>
            <Link href={"/"} className="mr-3">
              <Twitter />
            </Link>
            <Link href={"/"} className="mr-3">
              <Facebook />
            </Link>
            <Link href={"/"}>
              <Instagram />
            </Link>
          </div>
        </nav>
        <nav>
          <header className="footer-title">
            <h2 className="text-black text-xl font-bold">QUICK LINKS</h2>
          </header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <Link href={'/categories'} className="link link-hover">Products</Link>
          <Link href={'/login'} className="link link-hover">Login</Link>
          <Link href={'/signup'} className="link link-hover">Sign Up</Link>
        </nav>
        <nav>
          <header className="footer-title">
            <h2 className="text-black text-xl font-bold">CUSTOMER AREA</h2>
          </header>
          <Link href={'/me/profile'} className="link link-hover" >My Account</Link>
          <Link href={'/me/orders'} className="link link-hover">Orders</Link>
          <Link href={'//track-order'} className="link link-hover">Tracking List</Link>
          <Link className="link link-hover" href="/terms-condition">Terms & Condition</Link>
          <Link href={'/privacy-policy'} className="link link-hover">Privacy Policy</Link>
          <Link href={'/cart'} className="link link-hover">My Cart</Link>
        </nav>
        <nav>
          <header className="footer-title">
            <h2 className="text-black text-xl font-bold">CONTACT</h2>
          </header>
          <div className="lg:w-[390px] text-black text-base font-normal  leading-normal  capitalize">
            Whether you have a question, feedback, or just want to say hello, we'd love to hear from you! Our dedicated team is here to assist you.
          </div>
          <div className="mt-7 flex lg:flex flex-col lg:flex-row items-center">
            <div className="flex items-center">
              <HeadPhone />
              <div className="ml-5">
                <h4 className="text-black text-sm font-normal leading-normal">
                  Have any question?
                </h4>
                <a href="tel:+8801867717496" className="text-orange-500 text-lg font-extrabold  leading-normal">+8801867717496</a>
              </div>
            </div>
            <a target="_blank" rel="noreferrer" href="https://wa.me/qr/5RUA5LK5ETDFM1"
              className="lg:mt-0 mt-5 ml-20 btn text-xl px-6 font-medium border-2">
              Live Chat
            </a>
          </div>
          <div className="flex lg:flex-row flex-col items-center mt-5 w-full lg:w-auto">
            <button className="btn bg-black lg:w-[231px] w-[300px] h-[76px] flex items-center hover:bg-black">
              <Apple />
              <div className="ml-5">
                <h5 className="text-white text-xs font-normal leading-normal">Download on the</h5>
                <h3 className="text-white text-xl font-black leading-normal">App Store</h3>
              </div>
            </button>
            <button className="btn bg-black lg:w-[231px] w-[300px] h-[76px] flex items-center hover:bg-black lg:ml-5 mt-5 lg:mt-0">
              <PlayStore />
              <div className="ml-5">
                <h5 className="text-white text-xs font-normal leading-normal">Download on the</h5>
                <h3 className="text-white text-xl font-black leading-normal">App Store</h3>
              </div>
            </button>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
