import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material";
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UiContext } from '@/context';

export const Navbar = () => {

  const { asPath } = useRouter();
  const router = useRouter();
  const { toggleSideMenu } = useContext(UiContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return

    router.push(`/search/${ searchTerm }`);

  }

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref legacyBehavior>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{ml: 0.5}}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1}/>

        <Box  className= "fadeIn" sx={{ display: isSearchVisible ? "none" : { xs: 'none', sm: 'block' } }}>
          <NextLink href='/category/men' passHref legacyBehavior>
            <Link>
              <Button
                color={ asPath === '/category/men' ? 'primary' : 'info'}
              >Men</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref legacyBehavior>
            <Link>
              <Button
                color={ asPath === '/category/women' ? 'primary' : 'info'}
              >Women</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kids' passHref legacyBehavior>
            <Link>
              <Button
                color={ asPath === '/category/kids' ? 'primary' : 'info'}
              >Kids</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1}/>

        {
          isSearchVisible
            ? (
              <Input
                sx={{ display:{ xs: 'none', sm: 'flex' } }}
                autoFocus
                className='fadeIn'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                type="text"
                placeholder="Search..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={() => setIsSearchVisible(false)}
                    >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
                />
            )
            : (
              <IconButton
                sx={{display: {xs: 'none', sm: 'flex'}}}
                onClick={() => setIsSearchVisible(true)}
                className='fadeIn'
              >
                <SearchOutlined />
              </IconButton>
            )
        }

        

        <IconButton
          sx={{display: {xs: 'flex', sm: 'none'}}}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href='/cart' passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge badgeContent={ 2 } color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button
          onClick={toggleSideMenu}
        >
          Menu
        </Button>

      </Toolbar>
    </AppBar>
  )
}
