import React from "react";
import {LogoutBtn,Logo} from '../index';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function HamNav() {
const authStatus=useSelector((state) =>state.auth.status)
  const navigate = useNavigate();
  const navItems = [
    { label: "Home", path: "/", active: true },
    { label: "Signup", path: "/signup", active: !authStatus },
    { label: "Login", path: "/login", active: !authStatus },
    { label: "All Projects", path: "/all-post", active: authStatus },
    { label: "Create Project", path: "/add-post", active: authStatus },
    { label: "My Projects", path: "/myprojects", active: authStatus },
  ];
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <IconButton variant="text" size="sm" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2 text-white" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2 text-white" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer} className="rounded-none bg-black ">
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4 bg-black text-white rounded-none border border-gray-500"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://res.cloudinary.com/dwmpdbsej/image/upload/v1754589246/devspherelogo-removebg-preview_iy3y6h.png"
              alt="brand"
              className="h-10 w-10"
            />
            <Typography variant="p" color="white" className="text-3xl">
                DevSphere
            </Typography>
          </div>
            <hr className="my-2 border-blue-gray-50" />
           <List>
            {navItems
              .filter((item) => item.active)
              .map((item, index) => (
                <ListItem key={index} onClick={() => {
                  navigate(item.path);
                  closeDrawer();
                }}
                  className="hover:bg-gray-800">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-poppins text-xl text-white"
                  >
                    {item.label}
                  </Typography>
                </ListItem>
              ))}

            {/* Logout Button */}
            {authStatus && (
              <ListItem className="hover:bg-red-500 hover:text-white text-red-600" onClick={closeDrawer}>
                <LogoutBtn />
              </ListItem>
            )}
          </List>
        </Card>
      </Drawer>
    </>
  );
}
