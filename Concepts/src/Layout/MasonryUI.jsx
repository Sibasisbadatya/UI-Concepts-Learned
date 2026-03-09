import React, { useState, useEffect } from 'react'
import Masonry from '@mui/lab/Masonry';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
const MasonryUI = () => {
    const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];
    console.log("SIBASS");

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(0.5),
        textAlign: 'center',
        color: (theme.vars || theme).palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    return (
        <>
            <Box sx={{ width: 500, minHeight: 900 }}>
                <Masonry columns={4} spacing={2}>
                    {heights.map((height, index) => (
                        <Item key={index} sx={{ height }}>
                            {index + 1}
                        </Item>
                    ))}
                </Masonry>
            </Box>
        </>
    )
}

export default MasonryUI