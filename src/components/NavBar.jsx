import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
} from "@nextui-org/react";

import RoundedLogoNoname from "../assets/rounded-kelayo-noname.png";

export default function App() {
  return (
    <Navbar style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <NavbarBrand>
        <Image src={RoundedLogoNoname} width={50} height={50} />
        <p className="font-bold text-inherit">KELAYO</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Beranda
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="primary">
            Pemesanan
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Tentang Kami
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
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
              Keluar{" "}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
