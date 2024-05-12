import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
} from "@nextui-org/react";

import RoundedLogoNoname from "../assets/rounded-kelayo-noname.png";
import { NavLink } from "react-router-dom";

export default function NavBar(props) {
  const { className = "" } = props;
  return (
    <Navbar
      className={`${className}`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <NavbarBrand className="">
        <Image src={RoundedLogoNoname} width={50} height={50} />
        <p className="font-semibold text-inherit text-white ml-2">KELAYO</p>
      </NavbarBrand>

      <NavbarContent
        className="hidden sm:flex flex-grow-0 gap-14"
        justify="center"
      >
        <NavbarItem>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending text-white"
                : isActive
                ? "active border-b-2 border-primary-text text-white"
                : "text-white"
            }
            to="/"
          >
            Beranda
          </NavLink>
        </NavbarItem>
        <NavbarItem isActive>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending text-white"
                : isActive
                ? "active border-b-2 border-primary-text text-white"
                : "text-white"
            }
            to="/login"
            aria-current="page"
            color="primary"
          >
            Pemesanan
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending text-white"
                : isActive
                ? "active border-b-2 border-primary-text text-white"
                : "text-white"
            }
            color="foreground"
            to="/tes"
          >
            Tentang Kami
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="" as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Masuk sebagai</p>
              <p className="font-semibold">nusantarabyte@support.com</p>
            </DropdownItem>
            <DropdownItem key="tes">tes</DropdownItem>
            <DropdownItem key="tes">tes</DropdownItem>
            <DropdownItem key="tes">tes</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Keluar
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
