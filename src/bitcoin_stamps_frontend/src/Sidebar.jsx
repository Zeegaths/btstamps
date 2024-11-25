"use client";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { IoMdClock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { getIdentityProvider } from "./helper/auth";
import { useAuthClient } from "./use-auth-client";
import { idlFactory, canisterId } from "../../declarations/backend";

const LinkItems = [
  { name: "Home", icon: FiHome, path: "/" },
  { name: "Create", icon: FaPlus, path: "/upload" },
  { name: "My Timestamps", icon: IoMdClock, path: "/timelist" },
  { name: "Favourites", icon: FiStar, path: "/favourites" },
  { name: "Settings", icon: FiSettings, path: "/settings" },
];

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <Box
      bg="rgba(0, 0, 0, 0.7)" // Set transparency here
      borderRight="1px"
      borderRightColor="rgba(255, 255, 255, 0.2)"
      w={{ base: "full", md: "250px" }}
      pos="fixed"
      h="full"
      backdropFilter="blur(10px)"
      {...rest}
    >
      <Flex h="20" alignItems="" mx="" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color="white"
        >
          <img
            src="/sramp.png"
            alt="Logo"
            style={{ width: "", height: "60px" }}
            className="w-auto h-[80px] animate-stampMove"
          />
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          onClick={() => handleNavigation(link.path)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, onClick, ...rest }) => {
  return (
    <Box
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={onClick}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bgGradient: "linear(to-r, purple.500, pink.500)",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
            color="white" // Set icon color to white
          />
        )}
        <Text color="white">{children}</Text>
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  const identityProvider = getIdentityProvider();

  const { isAuthenticated, login, logout, actor } = useAuthClient({
    loginOptions: {
      identityProvider,
      windowOpenerFeatures: 'width=600,height=600,bottom=100,left=100',
    },
    actorOptions: {
      canisterId,
      idlFactory,
    },
  });

  return (
    <Flex
      ml={{ base: 0, md: "250px" }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg="rgba(0, 0, 0, 0.7)"
      borderBottomWidth="1px"
      borderBottomColor="rgba(255, 255, 255, 0.2)"
      backdropFilter="blur(10px)"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
        color="white" // Ensure icon color is white
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        color="white"
      ></Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
          color="white"
        />{" "}
        {isAuthenticated ? (
          <>
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar size={"sm"} src="/iclogo.png" />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      ml="2"
                    >
                      <>
                        <Text fontSize="sm" color="white">
                          Internet Identity
                        </Text>
                        <Text fontSize="xs" color="white">
                          {isAuthenticated ? "Connected" : "Disconnected"}
                        </Text>
                      </>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown color="white" />{" "}
                      {/* Ensure icon color is white */}
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg="rgba(0, 0, 0, 0.7)"
                  borderColor="rgba(255, 255, 255, 0.2)"
                >
                  <MenuItem color="white">Profile</MenuItem>
                  <MenuItem color="white">Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem color="white" onClick={logout}>
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </>
        ) : (
          <Button leftIcon={<Avatar size={'xs'} src="/iclogo.png" />} onClick={login}>Connect</Button>
        )}
        {/* Set icon color */}
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="rgba(0, 0, 0, 0.7)">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: "250px" }} p=""></Box>
    </Box>
  );
};

export default SidebarWithHeader;
