import React from "react";
import { LogoutBtn, Logo } from '../index';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  Drawer,
  Card,
} from "@material-tailwind/react";

import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function HamNav() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();
  
  const navItems = [
    { label: "Home", path: "/", active: true },
    { label: "Signup", path: "/signup", active: !authStatus },
    { label: "Login", path: "/login", active: !authStatus },
    { label: "All Projects", path: "/all-post", active: authStatus },
    { label: "Create Project", path: "/add-post", active: authStatus },
    { label: "My Projects", path: "/myprojects", active: authStatus },
  ];

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      {/* Modern Toggle Button */}
      <IconButton 
        variant="text" 
        size="lg" 
        onClick={openDrawer}
        className="hover:bg-white/10 transition-colors duration-300"
      >
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2 text-white" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2 text-white" />
        )}
      </IconButton>

      <Drawer 
        open={isDrawerOpen} 
        onClose={closeDrawer} 
        className="bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-white/10"
      >
        <Card
          color="transparent"
          shadow={false}
          className="h-full w-full p-6 text-white rounded-none"
        >
          {/* Header / Brand Section */}
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                <img
                  src="https://res.cloudinary.com/dwmpdbsej/image/upload/v1754589246/devspherelogo-removebg-preview_iy3y6h.png"
                  alt="brand"
                  className="h-8 w-8 object-contain"
                />
            </div>
            <Typography variant="h5" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                DevSphere
            </Typography>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent mb-6" />

          {/* Navigation List */}
          <List className="p-0 gap-2">
            {navItems
              .filter((item) => item.active)
              .map((item, index) => (
                <ListItem 
                  key={index} 
                  onClick={() => {
                    navigate(item.path);
                    closeDrawer();
                  }}
                  className="group py-4 px-4 rounded-xl hover:bg-white/5 active:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/5"
                >
                  <Typography
                    className="font-medium text-lg text-gray-400 group-hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Typography>
                </ListItem>
              ))}

            {/* Logout Section at Bottom */}
            {authStatus && (
              <div className="mt-auto pt-6 border-t border-white/10">
                <ListItem 
                   className="py-4 px-4 rounded-xl hover:bg-red-500/10 transition-colors duration-200"
                   onClick={closeDrawer}
                >
                  <div className="w-full flex items-center gap-2 text-red-500 font-semibold italic">
                    <LogoutBtn />
                  </div>
                </ListItem>
              </div>
            )}
          </List>

          {/* Optional Sidebar Footer */}
          <div className="mt-auto text-center">
             <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-bold">
                Orbiting Since 2024
             </p>
          </div>
        </Card>
      </Drawer>
    </>
  );
}