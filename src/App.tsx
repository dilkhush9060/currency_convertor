import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, Pressable } from "react-native";
import "./global.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [amount, setAmount] = useState("0");
  const [total, setTotal] = useState(0);
  const [rate, setRate] = useState(83);

  const fetchRate = async () => {
    try {
      const response = await axios.get(
        "https://api.frankfurter.app/latest?from=USD"
      );
      setRate(response.data.rates.INR);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };
  useEffect(() => {
    fetchRate();
  }, []);

  const convertedAmount = () => {
    const numericAmount = parseFloat(amount);
    setTotal(numericAmount * rate);
  };

  return (
    <>
      <StatusBar style="auto" />
      <View className="flex-1 items-center justify-center">
        <View className="flex flex-col justify-center items-center gap-5 w-full p-5">
          <Text className="text-3xl font-bold text-gray-700">
            Current Price: {rate} INR
          </Text>
          <Text className="text-3xl font-bold text-gray-700">
            {total.toFixed(2)} INR
          </Text>
          <TextInput
            value={amount}
            onChange={(e) => setAmount(e.nativeEvent.text)}
            keyboardType="numeric"
            className="border border-gray-300 rounded-md p-3 w-full"
            placeholder="Enter amount in USD"
          />
          <Pressable className="w-full" onPress={convertedAmount}>
            <View>
              <Text className="bg-blue-500 text-white text-center py-3 rounded-md w-full">
                Convert to INR
              </Text>
            </View>
          </Pressable>
          2
        </View>
      </View>
    </>
  );
}
