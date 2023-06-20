import { Box } from "@mui/system";
import Head from "next/head"
import { FC, ReactNode } from "react";


interface Props {
  title: string,
  children?: ReactNode,
  fullHeight?: boolean
}

export const AuthLayout: FC<Props> = ({children, title, fullHeight =  false}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems='center' 
          height={fullHeight? '100vh' : 'calc(100vh - 150px)'}
          >
            { children }
        </Box>
      </main>
    </> 
  )
}
