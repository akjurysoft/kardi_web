import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, Grid, DialogContent, DialogContentText, DialogActions, Button, Stepper, Step, StepLabel } from '@mui/material';
import { IoMdClose } from "react-icons/io";

const MyOrdersComponents = ({ orders }) => {
    function formatDate(apiTimestamp) {
        const date = new Date(apiTimestamp);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }


    const [activeTab, setActiveTab] = useState('pending');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filterOrdersByStatus = (status) => {
        return orders.filter(order => order.order_status.status_name.toLowerCase() === status);
    };

    let filteredOrders;
    switch (activeTab) {
        case 'confirmed':
            filteredOrders = orders.filter(order => ['confirmed','packaging', 'out for delivery'].includes(order.order_status.status_name.toLowerCase()));
            break;
        default:
            filteredOrders = filterOrdersByStatus(activeTab);
            break;
    }
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseDialog = () => {
        setSelectedOrder(null);
    };

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">My Orders</h2>
            <div className="flex justify-evenly items-center">
                <button className={`mr-4 ${activeTab === 'pending' ? 'text-blue-500 font-bold' : ''}`} onClick={() => setActiveTab('pending')}>Pending</button>
                <button className={`mr-4 ${activeTab === 'confirmed' ? 'text-blue-500 font-bold' : ''}`} onClick={() => setActiveTab('confirmed')}>Confirmed</button>
                <button className={`mr-4 ${activeTab === 'delivered' ? 'text-blue-500 font-bold' : ''}`} onClick={() => setActiveTab('delivered')}>Completed</button>
                <button className={`mr-4 ${activeTab === 'cancelled' ? 'text-blue-500 font-bold' : ''}`} onClick={() => setActiveTab('cancelled')}>Cancelled</button>
                <button className={`${activeTab === 'returned' ? 'text-blue-500 font-bold' : ''}`} onClick={() => setActiveTab('returned')}>Returned</button>
            </div>
            <div className="mt-4">
                {filteredOrders.length > 0 && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Order Date</TableCell>
                                    <TableCell>Total Paid Amount</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>View</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredOrders.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.order_id}</TableCell>
                                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                                        <TableCell>₹{order.total_paid_amount}</TableCell>
                                        <TableCell>{order.order_status.status_name}</TableCell>
                                        <TableCell>
                                            <span className='cursor-pointer hover:text-blue-500 font-[600]' onClick={() => handleViewOrder(order)}>View</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {filteredOrders.length === 0 && (
                    <div className="flex items-center justify-center h-48">
                        <p>No orders found for {activeTab} status.</p>
                    </div>
                )}
            </div>


            <Dialog open={selectedOrder !== null} onClose={handleCloseDialog} fullScreen>
                <DialogTitle className='flex justify-between items-center'>
                    Order Details
                    <IoMdClose className='cursor-pointer' onClick={handleCloseDialog} />
                </DialogTitle>
                <DialogContent dividers >
                    <DialogContentText className='container mx-auto'>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Product Image</TableCell>
                                                <TableCell>Product Name</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Unit Price</TableCell>
                                                <TableCell>Total Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedOrder && selectedOrder.order_details.map(product => (
                                                <TableRow key={product.id}>
                                                    <TableCell>
                                                        <div className='flex items-center'>
                                                            <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${product.product_images[0]?.image_url}`} alt={product.product.product_name} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {product.product.product_name}
                                                    </TableCell>
                                                    <TableCell>{product.quantity}</TableCell>
                                                    <TableCell>
                                                        {product.product.discount_type === "amount" ? (
                                                            <>
                                                                ₹{(product.product.default_price - product.product.discount).toFixed(2)}
                                                                <span className="text-[#bbb8b8] font-[500] text-[13px] line-through">
                                                                    ₹{product.product.default_price}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                ₹{(product.product.default_price * (1 - product.product.discount / 100)).toFixed(2)}
                                                                <span className="text-[#bbb8b8] font-[500] text-[13px] line-through">
                                                                    ₹{product.product.default_price}
                                                                </span>
                                                            </>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        ₹{(product.quantity * product.product.default_price).toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12}>
                                <div className='flex justify-end py-[20px]'>
                                    <span className='cursor-pointer bg-red-500 text-white px-[15px] py-[8px] rounded hover:bg-red-600 hover:text-white transition duration-300 ease-in'>Cancel Order</span>
                                </div>
                                <div className='flex flex-col py-[20px] space-y-3'>
                                    <h3>Order Status Logs:</h3>
                                    <Stepper activeStep={selectedOrder ? selectedOrder.order_status_logs.length - 1 : 0} alternativeLabel>
                                        {selectedOrder && selectedOrder.order_status_logs.map((log, index) => (
                                            <Step key={index}>
                                                <StepLabel>{log.order_status.status_name}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </div>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MyOrdersComponents
