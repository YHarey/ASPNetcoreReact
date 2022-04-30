import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

export default function AppPagination({metaData, onPageChange}: Props) {
    const {currentPage, totalPages, pageSize, totalItemCnt} = metaData;
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
                      <Typography>
                          Displaying {(currentPage-1)*pageSize+1}-
                          {currentPage*pageSize > totalItemCnt 
                          ? totalItemCnt 
                          : currentPage*pageSize} of {totalItemCnt} items
                      </Typography>
                      <Pagination 
                        color="secondary"
                        size="large"
                        count={totalPages}
                        page={currentPage}
                        onChange={(e, page) => onPageChange(page)}
                      />
                  </Box>
    )
}