import { NavLink, useNavigate } from 'react-router-dom';
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
  Button,
  DropdownSection,
} from '@nextui-org/react';
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from '../assets/NavBarIcon.jsx';
import RoundedLogoNoname from '../assets/rounded-kelayo-noname.png';
import { useAuth } from '../hook/auth/Auth.jsx';
const icons = {
  chevron: <ChevronDown fill="currentColor" size={16} />,
  scale: <Scale className="text-warning" fill="currentColor" size={30} />,
  lock: <Lock className="text-success" fill="currentColor" size={30} />,
  activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
  flash: <Flash className="text-primary" fill="currentColor" size={30} />,
  server: <Server className="text-success" fill="currentColor" size={30} />,
  user: <TagUser className="text-danger" fill="currentColor" size={30} />,
};
export default function NavBar(props) {
  const { className = '', style = '' } = props;
  const navigate = useNavigate();
  const { logout } = useAuth();
  const userInfo = JSON.parse(localStorage.getItem('user'));

  return (
    <Navbar
      maxWidth="xl"
      className={`${className}`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', ...style }}
    >
      <NavbarBrand className="">
        <Image src={RoundedLogoNoname} width={50} height={50} />
        <p className="font-semibold text-inherit text-white ml-2">KELAYO</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex flex-grow-0 gap-14" justify="center">
        <NavbarItem>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? 'pending text-white'
                : isActive
                ? 'active border-b-2 border-primary-text text-white'
                : 'text-white'
            }
            to="/"
          >
            Beranda
          </NavLink>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white font-medium"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Fitur
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: 'gap-4',
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="Jelajahi berbagai jenis destinasi wisata di Yogyakarta"
              startContent={icons.scale}
              onPress={() => navigate('/tourist-destination')}
            >
              Destinasi Wisata
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Cari penginapan favorit dan ternyamanmu disini. Badan fit, liburan tenang"
              startContent={icons.activity}
              onPress={() => navigate('/lodging-reservation')}
            >
              Pemesanan Penginapan
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="Carilah transportasi pilihanmu untuk mengelilingi indah dan nyamannya Yogyakarta"
              startContent={icons.flash}
              onPress={() => navigate('/rent-transportation')}
            >
              Penyewaan Transportasi
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Temukan pemandu wisatamu disini untuk kesan dan pengalaman perjalanan yang menyenangkan"
              startContent={icons.user}
              onPress={() => navigate('/tour-guide')}
            >
              Pemandu Wisata
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? 'pending text-white'
                : isActive
                ? 'active border-b-2 border-primary-text text-white'
                : 'text-white'
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
            <DropdownSection showDivider>
              <DropdownItem isReadOnly key="profile" className="h-14 gap-2">
                <p className="font-semibold ">{userInfo?.name ?? 'Guest'}</p>
                <p className="text-slate-500">{userInfo?.email ?? ''}</p>
              </DropdownItem>
            </DropdownSection>

            <DropdownItem className="sm:hidden" key="beranda" onPress={() => navigate('/')}>
              Beranda
            </DropdownItem>
            <DropdownItem
              className="sm:hidden"
              key="destinasi-wisata"
              onPress={() => navigate('/tourist-destination')}
            >
              Destinasi Wisata
            </DropdownItem>
            <DropdownItem
              className="sm:hidden"
              key="pemesanan-penginapan"
              onPress={() => navigate('/lodging-reservation')}
            >
              Pemesanan Penginapan
            </DropdownItem>
            <DropdownItem
              className="sm:hidden"
              key="penyewaan-transportasi"
              onPress={() => navigate('/rent-transportation')}
            >
              Penyewaan Transportasi
            </DropdownItem>
            <DropdownItem
              className="sm:hidden"
              key="pemandu-wisata"
              onPress={() => navigate('/tour-guide')}
            >
              Pemandu Wisata
            </DropdownItem>
            <DropdownItem className="sm:hidden" key="tentang-kami" onPress={() => navigate('/')}>
              Tentang Kami
            </DropdownItem>
            <DropdownItem key="dashboard" color="foreground" onPress={() => navigate('/setting')}>
              Dashboard
            </DropdownItem>
            <DropdownItem className="text-danger" key="logout" color="danger" onPress={logout}>
              Keluar
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
