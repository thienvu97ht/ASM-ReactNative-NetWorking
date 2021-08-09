import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import { fetchBills } from "../../app/billsSlice";
import InvoiceItem from "../../components/InvoiceItem";
import EmptyInvoices from "../../assets/empty_invoice.gif";
import COLORS from "../../consts/colors";

export default function InvoiceScreen() {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    const action = fetchBills();
    const resultAction = await dispatch(action);
    const listBills = unwrapResult(resultAction);
    setInvoices(listBills);

    setIsLoading(false);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 14, backgroundColor: COLORS.white }}>
      {invoices.length === 0 ? (
        <ScrollView
          contentContainerStyle={styles.center}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
          }>
          <Image style={styles.img} source={EmptyInvoices} />
          <Text style={styles.textEmpty}>Bạn chưa có đơn hàng nào</Text>
        </ScrollView>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          refreshing={isLoading}
          onRefresh={fetchData}
          data={invoices}
          numColumns={1}
          keyExtractor={(item) => `${item[0].id_bill}`}
          renderItem={({ item }) => <InvoiceItem product={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },

  center: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    height: 200,
    width: 200,
  },

  textEmpty: {
    fontSize: 18,
    marginTop: 20,
  },
});
