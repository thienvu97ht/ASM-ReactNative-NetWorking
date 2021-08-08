import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { fetchBills } from "../../app/billsSlice";
import InvoiceItem from "../../components/InvoiceItem";
import COLORS from "../../consts/colors";

export default function InvoiceScreen() {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ]);
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

    listBills.forEach((bill) => {
      console.log(bill);
    });

    setIsLoading(false);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        refreshing={isLoading}
        onRefresh={fetchData}
        data={invoices}
        numColumns={1}
        keyExtractor={(item) => `${item.id}`}
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
