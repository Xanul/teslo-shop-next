import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext, UiContext } from "@/context";
import { useRouter } from "next/router";

export const SideMenu = () => {

  const router = useRouter();
  
  
  const {isMenuOpen, toggleSideMenu} = useContext(UiContext);
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return

    navigateTo(`/search/${ searchTerm }`);

  }

  const navigateTo = ( url:string ) => {
    toggleSideMenu();
    router.push(url);

  }

  const inputRef = (input: any) => {
    if (input) {
      setTimeout(() => {
        {input.focus()}
      }, 100);
    }
  }

  const onLogout = () => {

    logout();

  }

  return (
    <Drawer
      open={isMenuOpen}
      onClose={ toggleSideMenu }
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}>
      <Box sx={{ width: 250, paddingTop: 4 }}>
        <List>
          <ListItem>
            <Input
              inputRef={inputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
              type="text"
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton 
                    aria-label="toggle password visibility"
                    onClick={onSearchTerm}
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem 
            button
            sx={{ display: isLoggedIn ? 'none' : '' }}
            onClick={() => navigateTo(`/auth/login?p=${ router.asPath }`)}
          >
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={"Log-In"} />
          </ListItem>    

          <ListItem 
            button
            sx={{ display: isLoggedIn ? '' : 'none' }}
          >
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>

          <ListItem 
            button
            sx={{ display: isLoggedIn ? '' : 'none' }}
          >
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={"My Orders"} />
          </ListItem>

          <ListItem 
            button
            onClick={() => navigateTo('/category/men')} 
            sx={{ display: { xs: "", sm: "none" } }}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Men"} />
          </ListItem>

          <ListItem 
            button
            onClick={() => navigateTo('/category/women')} 
            sx={{ display: { xs: "", sm: "none" } }}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Women"} />
          </ListItem>

          <ListItem 
            button
            onClick={() => navigateTo('/category/kids')} 
            sx={{ display: { xs: "", sm: "none" } }}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={"Kids"} />
          </ListItem>

          <ListItem 
            button
            sx={{ display: isLoggedIn ? '' : 'none' }}
            onClick={onLogout}
          >
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={"Exit"} />
          </ListItem>

          <Divider />

          {/* Admin Panel */}
          {
            user?.role == 'admin'
            ? (
              <>
                <ListSubheader>Admin Panel</ListSubheader>
                <ListItem button>
                  <ListItemIcon>
                    <CategoryOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Products"} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Orders"} />
                </ListItem>

                <ListItem button>
                  <ListItemIcon>
                    <AdminPanelSettings />
                  </ListItemIcon>
                  <ListItemText primary={"Users"} />
                </ListItem>
              </>
            )
            : (
              <></>
            )
          }
        </List>
      </Box>
    </Drawer>
  );
};
