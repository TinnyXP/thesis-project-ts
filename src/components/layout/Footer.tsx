"use client";

import React from "react"
import Image from "next/image";
import { Input, Link } from "@heroui/react"

import { Button } from "@heroui/react";

import { FaFacebook, FaYoutube } from "react-icons/fa6";
import { BsLine } from "react-icons/bs";

const footerNavigation = {
  services: [
    { name: "Branding", href: "#" },
    { name: "Data Analysis", href: "#" },
    { name: "E-commerce Solution", href: "#" },
    { name: "Market Research", href: "#" }
  ],
  supportOptions: [
    { name: "Pricing Plans", href: "#" },
    { name: "User Guides", href: "#" },
    { name: "Tutorials", href: "#" },
    { name: "Service Status", href: "#" },
  ],
  aboutUs: [
    { name: "Our Story", href: "#" },
    { name: "Latest News", href: "#" },
    { name: "Career Opportunities", href: "#" },
    { name: "Media Enquiries", href: "#" },
    { name: "Collaborations", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "User Agreement", href: "#" },
  ],
  social: [
    {
      name: "Facebook", href: "#",
      className: "hover:bg-blue-600 hover:text-white",
      icon: <FaFacebook size={18} />,
      color: "text-blue-600"
    },
    {
      name: "Youtube", href: "#",
      className: "hover:bg-red-600 hover:text-white",
      icon: <FaYoutube size={18} />,
      color: "text-red-600"
    },
    {
      name: "Line", href: "#",
      className: "hover:bg-green-500 hover:text-white",
      icon: <BsLine size={18} />,
      color: "text-green-500"
    },
  ],
}

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center bg-white dark:bg-black">
      <FooterBorder />
      <FooterContent />
      <div className="w-full flex justify-center items-center py-1.5 bg-black border-t-small border-default-200/70 rounded-t-2xl">
        <span className="text-xs font-medium flex leading-none text-zinc-200">&copy; 2024 Bangkrajao. All rights reserved.</span>
      </div>
    </footer>
  )
}

const FooterContent = () => {

  const renderList = React.useCallback(
    ({ title, items }: { title: string; items: { name: string; href: string }[] }) => (
      <div>
        <h3 className="text-small font-semibold text-default-600">{title}</h3>
        <ul className="mt-6 space-y-4">
          {items.map((item) => (
            <li key={item.name}>
              <Link className="text-default-400" href={item.href} size="sm">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ),
    [],
  );

  return (
    <footer className="flex w-full flex-col">
      <div className="mx-auto max-w-[1536px] px-6 py-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="flex flex-col items-center md:items-start space-y-6 md:pr-8">
            <div className="flex items-center justify-start">
              <Link href="/">
                <Image
                  width={0}
                  height={0}
                  src="/Bkj_logo.svg"
                  className="w-[80px] h-[40px]"
                  alt="Website Logo"
                />
              </Link>
            </div>
            <p className="text-small text-default-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique
            </p>
            <div className="flex space-x-3">
              {footerNavigation.social.map((item) => (
                <a key={item.name} href={item.href} target="blank">
                  <Button className={`button ${item.className}`} isIconOnly radius="full" size="sm">{item.icon}</Button>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>{renderList({ title: "Services", items: footerNavigation.services })}</div>
              <div className="mt-10 md:mt-0">
                {renderList({ title: "Support", items: footerNavigation.supportOptions })}
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>{renderList({ title: "About Us", items: footerNavigation.aboutUs })}</div>
              <div className="mt-10 md:mt-0">
                {renderList({ title: "Legal", items: footerNavigation.legal })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-medium bg-default-200/20 p-4 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-2">
          <div>
            <h3 className="text-small font-semibold text-default-600">
              Subscribe to our newsletter
            </h3>
            <p className="mt-2 text-small text-default-400">
              Receive weekly updates with the newest insights, trends, and tools, straight to your
              email.
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <Input
              isRequired
              aria-label="Email"
              autoComplete="email"
              id="email-address"
              labelPlacement="outside"
              name="email-address"
              placeholder="johndoe@email.com"
              type="email"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <Button color="primary" type="submit">
                Subscribe
              </Button>
            </div>
          </form>
        </div>
        
      </div>
    </footer>
  );
}

const FooterBorder = () => {
  return (
    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary-color to-transparent"></div>
  )
}


// "use client"

// import React from "react"
// import Image from "next/image";
// import { Card, CardBody, Divider, Input, Link, Tooltip } from "@heroui/react"

// import { Button } from "@heroui/react";

// import { FaEye, FaFacebook, FaYoutube } from "react-icons/fa6";
// import { BsLine } from "react-icons/bs";

// const footerNavigation = {
//   services: [
//     { name: "Branding", href: "#" },
//     { name: "Data Analysis", href: "#" },
//     { name: "E-commerce Solution", href: "#" },
//     { name: "Market Research", href: "#" }
//   ],
//   supportOptions: [
//     { name: "Pricing Plans", href: "#" },
//     { name: "User Guides", href: "#" },
//     { name: "Tutorials", href: "#" },
//     { name: "Service Status", href: "#" },
//   ],
//   aboutUs: [
//     { name: "Our Story", href: "#" },
//     { name: "Latest News", href: "#" },
//     { name: "Career Opportunities", href: "#" },
//     { name: "Media Enquiries", href: "#" },
//     { name: "Collaborations", href: "#" },
//   ],
//   legal: [
//     { name: "Claim", href: "#" },
//     { name: "Privacy", href: "#" },
//     { name: "Terms", href: "#" },
//     { name: "User Agreement", href: "#" },
//   ],
//   social: [
//     {
//       name: "Facebook", href: "#",
//       className: "hover:bg-blue-600 hover:text-white",
//       icon: <FaFacebook size={18} />,
//       color: "text-blue-600"
//     },
//     {
//       name: "Youtube", href: "#",
//       className: "hover:bg-red-600 hover:text-white",
//       icon: <FaYoutube size={18} />,
//       color: "text-red-600"
//     },
//     {
//       name: "Line", href: "#",
//       className: "hover:bg-green-500 hover:text-white",
//       icon: <BsLine size={18} />,
//       color: "text-green-500"
//     },
//   ],
// }

// export default function Footer() {
//   return (
//     <footer className="w-full flex flex-col items-center justify-center bg-white dark:bg-black">
//       <FooterBorder />
//       <FooterContent />
//       <div className="w-full flex justify-center items-center py-1.5 bg-black border-t-small border-default-200/70 rounded-t-2xl mt-5">
//         <span className="text-xs font-medium flex leading-none text-zinc-200">&copy; 2024 Bangkrajao. All rights reserved.</span>
//       </div>
//     </footer>
//   )
// }

// const FooterContent = () => {

//   const renderList = React.useCallback(
//     ({ title, items }: { title: string; items: { name: string; href: string }[] }) => (
//       <div>
//         <h3 className="text-small font-semibold text-default-600">{title}</h3>
//         <ul className="mt-6 space-y-4">
//           {items.map((item) => (
//             <li key={item.name}>
//               <Link className="text-default-400" href={item.href} size="sm">
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     ),
//     [],
//   );

//   return (
//     <footer className="flex w-full flex-col">
//       <div className="mx-auto max-w-7xl px-4 pb-8 pt-8">
//         <div className="xl:grid xl:grid-cols-3 xl:gap-8">
//           <div className="space-y-6 md:pr-8">
//             <div className="flex items-center justify-start">
//               <Link href="/">
//                 <Image
//                   width={0}
//                   height={0}
//                   src="/Bkj_logo.svg"
//                   className="w-[80px] h-[40px]"
//                   alt="Website Logo"
//                 />
//               </Link>
//             </div>
//             <p className="text-small text-default-500">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique
//             </p>
//             <div className="flex flex-row gap-4 xl:flex-col">
//               <div className="flex space-x-3">
//                 {footerNavigation.social.map((item) => (
//                   <a key={item.name} href={item.href} target="blank">
//                     <Button className={`button ${item.className}`} isIconOnly radius="full" size="sm">{item.icon}</Button>
//                   </a>
//                 ))}
//               </div>
//               <VisitCouterCard />
//             </div>
//           </div>

//           <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
//             <div className="md:grid md:grid-cols-2 md:gap-8">
//               <div>{renderList({ title: "ประวัติความเป็นมา", items: footerNavigation.services })}</div>
//               <div className="mt-10 md:mt-0">
//                 {renderList({ title: "สถานที่ท่องเที่ยว", items: footerNavigation.supportOptions })}
//               </div>
//             </div>
//             <div className="md:grid md:grid-cols-2 md:gap-8">
//               <div>{renderList({ title: "ข่าวสาร", items: footerNavigation.aboutUs })}</div>
//               <div className="mt-10 md:mt-0">
//                 {renderList({ title: "ข้อมูล & สถิติ", items: footerNavigation.legal })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// const FooterBorder = () => {
//   return (
//     <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary-color to-transparent"></div>
//   )
// }

// const VisitCouterCard = () => {
//   return (
//     <div className="h-[35px] w-[120px] bg-primary-color text-white flex items-center justify-between px-2 rounded-md">
//       <FaEye size={20} />
//       <div className="bg-background rounded-md px-2 py-1">
//         <p className="text-black dark:text-white font-bold text-sm">1k</p>
//       </div>
//       <p className="text-White text-sm">View</p>
//     </div>
//   )
// }