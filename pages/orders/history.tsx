import { ShopLayout } from '../../components/layout/ShopLayout';
import { Button, Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid';
import NextLink from 'next/link';

const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID', width: 100},
  {field: 'fullname', headerName: 'Name', width: 300},
  {
    field: 'paid',
    headerName: "Order Paid",
    description: "Show if order is already paid",
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return (
        params.row.paid
          ? <Chip color="success" label="Paid" variant='outlined'/>
          : <Chip color="error" label="Pending Payment" variant='outlined'/>
      )
    }
  },
  {
    field: 'linkPage', 
    headerName: 'Order', 
    description: 'Go to order', 
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
          <Link>
            <Button>{ params.row.id }</Button>
          </Link>
        </NextLink>
      )
    }
  }
]

const rows: GridRowsProp = [
  {id: 1, paid: true, fullname:'Rodrigo Rivas'},
  {id: 2, paid: false, fullname:'Jorge Perez'},
  {id: 3, paid: true, fullname:'Emin Reyes'},
  {id: 4, paid: false, fullname:'Eduardo Rios'},
  {id: 5, paid: false, fullname:'Natalia Herrera'},
]


const HistoryPage = () => {
  return (
    <ShopLayout title='Order History' pageDescription='Order History'>
      <Typography variant='h1' component='h1'>Order History</Typography>
      <Grid container>
        <Grid item xs={12} sx={{height: 650, width: '100%'}}>
          <DataGrid 
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {pageSize: 5}
              }
            }}
            pageSizeOptions={[5,10,25]}
          />
        </Grid>
      </Grid>    
    </ShopLayout>
  )
}

export default HistoryPage