import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const TabTwoScreen = () => {
  const [searchField, setSearchField] = useState('');
  const [searchText, setSearchText] = useState('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const formatDate = (date: Date) => {
    if (!date) return 'dd-mm-yyyy';
    return new Intl.DateTimeFormat('en-GB').format(date); // dd-mm-yyyy
  };

  const sectionData = [
    {
      title: "Driver Name",
      data: ["Jitendar Malviya", "FARMAAN", "BALVEER SINGH", "GOVIND MOPGAR"]
    },
    {
      title: "Mobile Number",
      data: ["8770868609", "9166432034", "9929868036", "9867211176"]
    },
    {
      title: "License Number",
      data: ["MP04R20200262329", "RJ3620120049323", "RJ3620130050997", "MH0320080039075"]
    },
    {
      title: "License Expiry Date",
      data: ["2030-03-28", "2032-10-24", "2033-03-07", "2029-12-17"]
    },
    {
      title: "License Upload",
      data: [...Array(4)].map((_, i) => `../UPLOADS/DRIVERS/${1750054175 + i * 2}_WHATSAPP_IMAGE.jpeg`)
    },
    {
      title: "Aadhar Upload",
      data: new Array(4).fill("").map((_, i) => `../UPLOADS/DRIVERS/${1750060278 + i}_WHATSAPP_IMAGE.jpeg`)
    },
    {
      title: "Action",
      data: Array.from({ length: 4 }, (_) => "View Docs")
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.dropdown}>
          <Picker
            mode={'dropdown'}
            selectedValue={searchField}
            onValueChange={(itemValue) => setSearchField(itemValue)}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="apple" value="a" />
            <Picker.Item label="banana" value="b" />
            <Picker.Item label="orange" value="c" />
            <Picker.Item label="mango" value="d" />
            <Picker.Item label="grape" value="e" />
          </Picker>
        </View>


        <TextInput
          placeholder="Please Enter"
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.row}>
        <Text>From:</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowFromPicker(true)}
        >
          <Text> {formatDate(new Date())}</Text>
        </TouchableOpacity>
        <Text>To:</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowToPicker(true)}
        >
          <Text>{formatDate(new Date())}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>🔍</Text>
        </TouchableOpacity>
      </View>

      {showFromPicker && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowFromPicker(false);
            if (selectedDate) setFromDate(selectedDate);
          }}
        />
      )}
      {showToPicker && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowToPicker(false);
            if (selectedDate) setToDate(selectedDate);
          }}
        />
      )}

      <FlatList
        data={sectionData}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.title}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            {item.data.map((d, i) => {
              if (d == "View Docs") {
                return <Text key={i} style={[{ backgroundColor: 'darkblue', color: 'white' }, styles.itemText]}>{d}</Text>
              }
              return <Text key={i} style={styles.itemText}>{d.toUpperCase()}</Text>
            }
            )}
          </View>
        )}
      />
    </View>
  );
};

export default TabTwoScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    flex: 1,
    marginTop: 50
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginRight: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
  },
  datePicker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  searchBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  sectionContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  sectionTitle: {
    height: 40,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#0b4b85',
    paddingVertical: 5,
    borderWidth: 1,
    color: 'white'
  },
  itemText: {
    height: 40,
    fontSize: 18,
    paddingVertical: 4,
    borderWidth: 1,
  },
})