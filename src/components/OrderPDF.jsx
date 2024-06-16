import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { formatNumberWithSeparator } from '../utils/numberConverter';
import { formatDateToDDMMYYYY } from '../utils/dateConverter';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    color: '#1d2d50',
  },
  textInfo: { fontSize: 16, color: '#686D76' },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: '#1d2d50',
    color: 'white',
    padding: 10,
  },
  orderInfo: {
    marginBottom: 20,
  },
  orderId: {
    color: '#686D76',
    fontSize: 16,
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 14,
    color: 'grey',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColLarge: {
    width: '75%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  address: {
    fontSize: 12,
    marginBottom: 10,
  },
  note: {
    fontSize: 12,
    marginTop: 20,
    textAlign: 'center',
  },
});

const OrderPDF = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Image src="/images/rounded-kelayo-logo.png" style={styles.logo} />
        <Text style={styles.header}>Kelayo</Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.textInfo}>Silahkan berikan tiket ini pada penyedia</Text>
      </View>
      <Text style={styles.title}>Tiket: #{order.id}</Text>
      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>
          Halo{' '}
          <Text style={{ color: 'black' }}>
            {(order.first_name ?? '') + ' ' + (order.last_name ?? '')}
          </Text>
          , berikan tiket ini kepada <Text style={{ color: 'black' }}>{order.product.title}</Text>:
        </Text>
        <Text style={styles.orderDate}>Tanggal Transaksi: {formatDateToDDMMYYYY(order.trans)}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Produk</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Mulai</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Berakhir</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCellHeader}>Harga</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{order.product.title}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{formatDateToDDMMYYYY(order.start)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{formatDateToDDMMYYYY(order.end)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Rp {formatNumberWithSeparator(order.total_price)}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableColLarge}>
            <Text style={styles.tableCellHeader}>Subtotal:</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Rp {formatNumberWithSeparator(order.total_price)}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableColLarge}>
            <Text style={styles.tableCellHeader}>Pajak:</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Rp 0</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableColLarge}>
            <Text style={styles.tableCellHeader}>Total:</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Rp {formatNumberWithSeparator(order.total_price)}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.address}>{order.customerName}</Text>
      <Text style={styles.address}>{order.address}</Text>
      <Text style={styles.address}>{order.city}</Text>
      <Text style={styles.address}>{order.zipCode}</Text>
      <Text style={styles.address}>{order.country}</Text>
      <Text style={styles.note}>Terima kasih telah menggunakan layanan</Text>
      <View style={[styles.headerContainer, { marginTop: 8 }]}>
        <Image src="/images/rounded-kelayo-logo.png" style={styles.logo} />
        <Text style={styles.header}>Kelayo</Text>
      </View>
    </Page>
  </Document>
);

export default OrderPDF;
