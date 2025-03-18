"use client";

import Image from "next/image";

import { useTheme } from "next-themes";

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Link, Button, Divider, Tabs, Tab } from "@heroui/react";

import { ToggleTheme } from "@/components"

import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, DropdownSection } from "@heroui/dropdown";
import { Avatar, AvatarIcon } from "@heroui/avatar";

import { FiArrowUpRight, FiCodesandbox, FiLogIn, FiLogOut } from "react-icons/fi";

import { Key } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/app/translation/languageSelector';
import i18n from '@/app/i18n'; // Import the i18n configuration

interface ProfileAvatarProps {
  size?: "md" | "sm" | "lg";
}

export default function Component() {

  const { theme } = useTheme(); // ดึงค่าธีมปัจจุบัน (light หรือ dark)

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // สถานะสำหรับการล็อกอิน

  const handleLoginToggle = () => {
    // จำลองการเปลี่ยนสถานะ
    setIsLoggedIn(!isLoggedIn);
  };
  const { t } = useTranslation();
  const menuItems = [
    {
      label: t('history'),
      href: "/test/download"
      // href: "/history"
    },
    {
      label: t('place'),
      href: "/test/download"
      // href: "/attractions"
    },
    {
      label: t('news'),
      href: "/test/download"
      // href: "#"
    },
    {
      label: t('static'),
      href: "/test/download"
      // href: "/statistics"
    },
  ];

  return (
    <Navbar
      height="60px"
      maxWidth="2xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      shouldHideOnScroll
      className="bg-white/90 dark:bg-black/90 shadow-sm backdrop-blur-md backdrop-saturate-150 font-[family-name:var(--font-line-seed-sans)]"
    >
      {/* Left Content */}
      <NavbarBrand>
        <Link href="/">
          <Image
            width={0}
            height={0}
            src="/Bkj_logo.svg"
            className="w-[80px] h-[40px]"
            alt="Website Logo"
          />
        </Link>
        <Button isIconOnly variant="light" onPress={handleLoginToggle}>
          <FiCodesandbox size={22} />
        </Button>
      </NavbarBrand>

      {/* Center Content */}
      <NavbarContent className="hidden md:flex gap-5" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link color="foreground" className="text-default-500 font-[family-name:var(--font-line-seed-sans)]" href={item.href} size="md">{item.label}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right Content */}
      <NavbarContent className="hidden md:flex" justify="end">
        <NavbarItem>
          {isLoggedIn ? (
            <ProfileAvatar size="md" />
          ) : (
            <Button
              className="text-medium border-1.5 border-default-200 dark:border-default-200"
              color="default"
              variant="flat"
              endContent={<FiLogIn />}
              radius="full"
              as={Link}
              href="/auth/login"
              size="md"
            >
              {t('login')}
            </Button>
          )}
        </NavbarItem>
        <Divider orientation="vertical" className="h-5" />
        <NavbarItem>
          <ToggleTheme className="border-1.5 border-default-200 dark:border-default-200" />
        </NavbarItem>
        <NavbarItem>
          {/* <LanguagesButton /> */}
          <LanguageSelector />
        </NavbarItem>
      </NavbarContent>

      {/* Right Content (NavBar Toggle) */}
      <NavbarContent className="flex md:hidden" justify="end">
        <NavbarItem>
          {isLoggedIn ? (
            <ProfileAvatar size="md" />
          ) : (
            <Button
              className="text-medium border-1.5 border-default-200 dark:border-default-200"
              color="default"
              endContent={<FiLogIn />}
              radius="full"
              variant="flat"
              as={Link}
              href="/auth/login"
              size="md"
            >
              <p className="font-[family-name:var(--font-line-seed-sans)]">เข้าสู่ระบบ</p>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-white/90 py-5 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-black/90">
        <div className="grid grid-flow-col justify-stretch">
          {/* เมนูด้านซ้าย */}
          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color="foreground"
                  className="w-full font-[family-name:var(--font-line-seed-sans)]"
                  href={item.href}
                  size="md"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>

          {/* Divider ตรงกลาง */}
          <Divider orientation="vertical" />

          <div>
            <LanguagesTab />
          </div>

          <Divider orientation="vertical" />

          {/* ToggleTheme ด้านขวา */}
          <div className="flex items-center">
            <NavbarMenuItem className="flex flex-col items-center">
              <ToggleTheme size="lg" iconSize={30} />
              <div className="flex flex-col items-center text-zinc-400 dark:text-zinc-400 mt-2">
                <p className="text-xs">ธีมปัจจุบัน</p>
                <p className="text-sm font-bold">{theme === "dark" ? "Dark" : "Light"}</p>
              </div>
            </NavbarMenuItem>
          </div>

        </div>

      </NavbarMenu>
    </Navbar>
  );
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ size = "sm" }) => {

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            as="button"
            classNames={{
              base: "transition-transform bg-transparent border-1.5 border-default-200 dark:border-default-200",
              icon: "text-zinc-400 dark:text-zinc-400",
            }}
            size={size}
            src="https://images.unsplash.com/broken"
            icon={<AvatarIcon />}
            showFallback
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="solid" className="font-[family-name:var(--font-line-seed-sans)]">
          <DropdownSection showDivider>
            <DropdownItem
              key="profile"
              className="h-14 gap-2"
            >
              <p className="font-regular text-default-500">
                ลงชื่อด้วย
              </p>
              <p className="font-semibold">
                thetinny.xp@zzz.com
              </p>
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            key="help_and_feedback"
            startContent={<FiArrowUpRight />}
          >ช่วยเหลือ & ฟีดแบ็ค
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            startContent={<FiLogOut />}
          >
            ออกจากระบบ
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

const LanguagesButton = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState("TH");

  const languages = [
    { key: "th", display: "TH", name: "ไทย" },
    { key: "en", display: "EN", name: "English" },
    { key: "zh", display: "CN", name: "中文" },
  ];

  return (
    <Dropdown
      classNames={{
        content: " min-w-[90px] p-1 font-[family-name:var(--font-line-seed-sans)]",
      }}
    >
      <DropdownTrigger>
        <Button
          radius="full"
          size="md"
          isIconOnly
          className="bg-transparent border-1.5 border-default-200 dark:border-default-200 text-zinc-400 dark:text-zinc-400 font-bold"
        >
          {selectedLanguage}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        color="primary"
        onAction={(key) => setSelectedLanguage(languages.find(lang => lang.key === key)?.display || "TH")}
        classNames={{
          base: "w-[80px]",
        }}
        itemClasses={{
          base: "text-center"
        }}
      >
        {languages.map((lang) => (
          <DropdownItem key={lang.key}>{lang.name}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

const LanguagesTab = () => {

  return (
    <Tabs aria-label="Tabs colors" color="primary" variant="underlined" placement="start"
      classNames={{
        tabContent: "font-[family-name:var(--font-line-seed-sans)] text-md roup-data-[selected=true]:text-[#06b6d4]",
      }}
    >
      <Tab key="photos" title="ไทย" />
      <Tab key="music" title="English" />
      <Tab key="videos" title="中文" />
    </Tabs>
  )
}