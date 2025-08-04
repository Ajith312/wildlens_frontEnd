import React from 'react';
import { Button, Form, InputGroup, Badge, Container } from 'react-bootstrap';
import { BsSearch, BsThreeDots, BsArrowDownUp } from 'react-icons/bs';
import DataTable from 'react-data-table-component';

const orders = [
  {id: '#ORD0001', product: 'wild tour', date: '01-01-2025', price: 49.99, paid: true, status: 'completed'},
  { id: '#ORD0001', product: "wild tour", date: '01-01-2025', price: 14.99, paid: false, status: 'pending',  },
  { id: '#ORD0001', product: "wild tour", date: '01-01-2025', price: 49.99, paid: true, status: 'cancelled',  },
  {id: '#ORD0001', product: 'wild tour', date: '01-01-2025', price: 49.99, paid: true, status: 'completed'},
  { id: '#ORD0001', product: "wild tour", date: '01-01-2025', price: 14.99, paid: false, status: 'pending',  },
  { id: '#ORD0001', product: "wild tour", date: '01-01-2025', price: 49.99, paid: true, status: 'cancelled',  },
  {id: '#ORD0001', product: 'wild tour', date: '01-01-2025', price: 49.99, paid: true, status: 'completed'},
  { id: '#ORD0001', product: "wild tour", date: '01-01-2025', price: 14.99, paid: false, status: 'pending',  },
  { id: '#ORD0001', product: "wild tour", date: '01-01-2025', price: 49.99, paid: true, status: 'cancelled',  },
];

const statusVariant = {
  completed: 'success',
  pending: 'warning',
  cancelled: 'danger',
};

const columns = [
  {
    name: 'No.',
    selector: (_row, index) => index + 1,
    width: '70px',
    center: true,
    compact: true
  },
  {
    name: 'Booking Id',
    selector: row => row.id,
    sortable: true,
    minWidth: '120px'
  },
  {
    name: 'Tour Name',
    selector: row => row.product,
    sortable: true,
    wrap: true,
    minWidth: '120px'
  },
  {
    name: 'Tour Date',
    selector: row => row.date,
    sortable: true,
    minWidth: '100px'
  },
  {
    name: 'Price',
    selector: row => `$${row.price.toFixed(2)}`,
    sortable: true,
    right: true,
    minWidth: '100px'
  },
  {
    name: 'Payment',
    selector: row => row.paid ? <Badge bg="success">Paid</Badge> : <Badge bg="danger">Unpaid</Badge>,
    center: true,
    minWidth: '100px'
  },
  {
    name: 'Status',
    selector: row => <Badge bg={statusVariant[row.status]}>{row.status}</Badge>,
    center: true,
    minWidth: '100px'
  }
];

const OrdersTable = () => {
  return (
    <Container fluid className="p-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
        <InputGroup className="w-100 w-md-50">
          <InputGroup.Text><BsSearch /></InputGroup.Text>
          <Form.Control placeholder="Search order report" />
        </InputGroup>
        <div className="d-flex gap-2 w-100 justify-content-end">
          <Button variant="outline-secondary"><BsArrowDownUp /></Button>
          <Button variant="outline-secondary"><BsThreeDots /></Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent="No orders found"
        fixedHeader
        fixedHeaderScrollHeight="400px"
      />
    </Container>
  )
}

export default OrdersTable;