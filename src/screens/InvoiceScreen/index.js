import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { fetchBills } from "../../app/billsSlice";
import InvoiceItem from "../../components/InvoiceItem";
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

    // listBills.forEach((bill) => {
    //   console.log(bill);
    // });
    setInvoices(listBills);

    setIsLoading(false);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 14, backgroundColor: COLORS.light }}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
