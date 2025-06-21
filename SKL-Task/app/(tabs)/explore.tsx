import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import React, { useState } from 'react';
import { Alert, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Provider as PaperProvider, Text as T } from 'react-native-paper';

const TabTwoScreen = () => {

  const [dropdownValue, setDropdownValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isFromPickerVisible, setIsFromPickerVisible] = useState(false)
  const [isToPickerVisible, setIsToPickerVisible] = useState(false)
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromTosearch, setFromToSearch] = useState(false);

  const tableData = [
    {
      driverName: 'Rajesh Kumar',
      mobileNumber: '9876543210',
      licenseNumber: 'DL1234567890',
      licenseExpiry: '2026-08-15',
      licenseUpload: 'license_rajesh.pdf',
      aadharUpload: 'aadhar_rajesh.pdf',
    },
    {
      driverName: 'Sunita Sharma',
      mobileNumber: '9123456789',
      licenseNumber: 'MH0987654321',
      licenseExpiry: '2025-12-31',
      licenseUpload: 'license_sunita.jpg',
      aadharUpload: 'aadhar_sunita.jpg',
    },
    {
      driverName: 'Amit Verma',
      mobileNumber: '9988776655',
      licenseNumber: 'KA5678123456',
      licenseExpiry: '2027-04-20',
      licenseUpload: 'license_amit.png',
      aadharUpload: 'aadhar_amit.pdf',
    },
    {
      driverName: 'Priya Singh',
      mobileNumber: '9090909090',
      licenseNumber: 'TN4455667788',
      licenseExpiry: '2024-11-10',
      licenseUpload: 'license_priya.pdf',
      aadharUpload: 'aadhar_priya.pdf',
    },
    {
      driverName: 'Vikram Chauhan',
      mobileNumber: '9811122233',
      licenseNumber: 'GJ1122334455',
      licenseExpiry: '2028-01-05',
      licenseUpload: 'license_vikram.jpeg',
      aadharUpload: 'aadhar_vikram.jpeg',
    },
    {
      driverName: 'Neha Yadav',
      mobileNumber: '9345678910',
      licenseNumber: 'RJ9988776655',
      licenseExpiry: '2025-07-19',
      licenseUpload: 'license_neha.png',
      aadharUpload: 'aadhar_neha.jpg',
    },
    {
      driverName: 'Arjun Mehra',
      mobileNumber: '8800556677',
      licenseNumber: 'HR1234987654',
      licenseExpiry: '2026-03-30',
      licenseUpload: 'license_arjun.pdf',
      aadharUpload: 'aadhar_arjun.pdf',
    },
    {
      driverName: 'Kavita Nair',
      mobileNumber: '7890123456',
      licenseNumber: 'KL5566778899',
      licenseExpiry: '2024-09-12',
      licenseUpload: 'license_kavita.jpg',
      aadharUpload: 'aadhar_kavita.jpg',
    },
    {
      driverName: 'Ramesh Patel',
      mobileNumber: '9753108642',
      licenseNumber: 'GJ9080706050',
      licenseExpiry: '2027-10-08',
      licenseUpload: 'license_ramesh.pdf',
      aadharUpload: 'aadhar_ramesh.pdf',
    },
    {
      driverName: 'Anjali Gupta',
      mobileNumber: '8888888888',
      licenseNumber: 'MP1212121212',
      licenseExpiry: '2026-02-17',
      licenseUpload: 'license_anjali.pdf',
      aadharUpload: 'aadhar_anjali.pdf',
    },
    {
      driverName: 'Suresh Raina',
      mobileNumber: '7777777777',
      licenseNumber: 'UP3434343434',
      licenseExpiry: '2029-05-01',
      licenseUpload: 'license_suresh.jpg',
      aadharUpload: 'aadhar_suresh.jpg',
    },
    {
      driverName: 'Meena Rathi',
      mobileNumber: '9663322110',
      licenseNumber: 'PB2323232323',
      licenseExpiry: '2025-08-21',
      licenseUpload: 'license_meena.jpeg',
      aadharUpload: 'aadhar_meena.jpeg',
    },
    {
      driverName: 'Mohit Sharma',
      mobileNumber: '9432109876',
      licenseNumber: 'BR1111222233',
      licenseExpiry: '2026-06-10',
      licenseUpload: 'license_mohit.png',
      aadharUpload: 'aadhar_mohit.png',
    },
    {
      driverName: 'Sneha Joshi',
      mobileNumber: '9123901283',
      licenseNumber: 'CH5566443322',
      licenseExpiry: '2024-12-25',
      licenseUpload: 'license_sneha.pdf',
      aadharUpload: 'aadhar_sneha.pdf',
    },
    {
      driverName: 'Gaurav Thakur',
      mobileNumber: '9091987876',
      licenseNumber: 'JH1234432112',
      licenseExpiry: '2027-07-07',
      licenseUpload: 'license_gaurav.jpg',
      aadharUpload: 'aadhar_gaurav.jpg',
    },
  ];

  const filteredData = tableData.filter(item => {
    if(dropdownValue == 'name') {
      return item.driverName.toLowerCase().includes(searchText.toLowerCase())
    } else if(dropdownValue == 'mobile') {
      return item.mobileNumber.includes(searchText)
    } else if(dropdownValue == 'license') {
      return item.licenseNumber.toLowerCase().includes(searchText.toLowerCase())
    } else if(fromTosearch && fromDate && toDate) {
      console.log("fromDate",fromDate)
      console.log("toDate",toDate)
      console.log("item.licenseExpiry",item.licenseExpiry)
      return moment(item.licenseExpiry).format('DD-MM-YYYY') >= fromDate && item.licenseExpiry <= toDate
    } else if(dropdownValue == '' && searchText == '') {
      return item
    } 
  })

  const showFromPicker = () => {
    setIsFromPickerVisible(true)
  }

  const hideFromPicker = () => {
    setIsFromPickerVisible(false)
  }

  const handleFromPickerConfirm = (date: Date) => {
    const formatted = moment(date).format('DD-MM-YYYY');
    setFromDate(formatted)
    hideFromPicker()
  }

  const showToPicker = () => {
    setIsToPickerVisible(true)
  }

  const hideToPicker = () => {
    setIsToPickerVisible(false)
  }

  const handleToPickerConfirm = (date: Date) => {
    const formatted = moment(date).format('DD-MM-YYYY');
    if(formatted < fromDate) {
      Alert.alert('Invalid Date', '"To Date" must be after "From Date"');
      setToDate(moment().format('DD-MM-YYYY'))
    } else {
      setToDate(formatted)
    }
    setDropdownValue("")
    hideToPicker()
  }

  const handleSearchInput = (text: string) => {
    setSearchText(text)
  }

  const handleFromToSearch = () => {
    if(!fromDate || !toDate) {
      Alert.alert("Date Range Issue", "Please select license date range!")
    }
    setFromToSearch(true)
  }

  return (
    <PaperProvider>
      <View style={styles.container}>

        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
          <Picker
            mode='dropdown'
            selectedValue={dropdownValue}
            onValueChange={(value) => {setDropdownValue(value); setSearchText(''); setFromDate(''); setToDate('');}}
          >
            <Picker.Item label='Select' value="" />
            <Picker.Item label='Driver Name' value="name" />
            <Picker.Item label='Mobile Number' value="mobile" />
            <Picker.Item label='License Number' value="license" />
          </Picker>
        </View>


        <TextInput
          editable={dropdownValue ? true : false}
          placeholder='Search here..'
          placeholderTextColor={'grey'}
          value={searchText}
          maxLength={dropdownValue == 'mobile' ? 10 : 50}
          keyboardType={dropdownValue == 'mobile' ? 'number-pad' : 'default'}
          onChangeText={handleSearchInput}
          style={{ borderWidth: 1, borderColor: '#ccc', backgroundColor: dropdownValue ? '#fff' : '#f0f0f0', borderRadius: 6, marginVertical: 14, height: 50, paddingLeft: 10 }}
        />

        <View style={{ flexDirection: 'row', flex:0, marginBottom: 16, paddingHorizontal: 6, alignItems: 'center',}}>

          <View style ={{flexDirection: 'row', flex: 0.9}}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{ fontWeight: '400', fontSize: 16, color: 'gray' }}>From:</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, height: 40, width: 100, marginHorizontal: 4, paddingHorizontal: 8 }}
              placeholderTextColor={"black"}
              placeholder='dd-mm-yyyy'
              value={fromDate}
              onPress={showFromPicker}
              onFocus={() => { Keyboard.dismiss() }}
            />
            <DateTimePickerModal
            isVisible={isFromPickerVisible}
            mode='date'
            onConfirm={handleFromPickerConfirm}
            onCancel={hideFromPicker}
            maximumDate={new Date()}
            />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{ fontWeight: '400', fontSize: 16, color: 'gray' }}>To:</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, height: 40, width: 100, marginHorizontal: 4, paddingHorizontal: 8, backgroundColor: fromDate ? '#fff' : '#f0f0f0' }}
              placeholderTextColor={"black"}
              placeholder='dd-mm-yyyy'
              value={toDate}
              onPress={fromDate ? showToPicker : () => {}}
              onFocus={() => { Keyboard.dismiss() }}
              editable={fromDate ? true : false}
            />
            <DateTimePickerModal
            isVisible={isToPickerVisible}
            mode='date'
            onConfirm={handleToPickerConfirm}
            onCancel={hideToPicker}
            />
          </View>

          </View>

          <View style={{flex:0.1}}>
            <TouchableOpacity style={{height: 38, width: 42, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0b4b85'}} onPress={handleFromToSearch}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>🔍</Text>
            </TouchableOpacity>
          </View>

        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1, borderRadius: 2}}>
          <ScrollView horizontal style={{ flex:1 }}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <T style={styles.headerCell}>Driver Name</T>
                <T style={styles.headerCell}>Mobile Number</T>
                <T style={styles.headerCell}>License Number</T>
                <T style={styles.headerCell}>License Expiry Date</T>
                <T style={styles.headerCell}>License Upload</T>
                <T style={styles.headerCell}>Aadhar Upload</T>
                <T style={styles.headerCell}>Action</T>
              </View>

              {filteredData.length > 0 ? filteredData.map((item, index) =>
                <View key={index} style={{ flexDirection: 'row' }}>
                  <T style={styles.cell}>{item.driverName}</T>
                  <T style={styles.cell}>{item.mobileNumber}</T>
                  <T style={styles.cell}>{item.licenseNumber}</T>
                  <T style={styles.cell}>{item.licenseExpiry}</T>
                  <T style={styles.cell}>{item.licenseUpload}</T>
                  <T style={styles.cell}>{item.aadharUpload}</T>
                  <T onPress={() => alert("Coming Soon!")} style={[styles.cell, {color: 'skyblue'}]}>{"View Docs"}</T>
                </View>
              ): <Text style={{fontSize:18, marginLeft:4}}>No Records Found.</Text>}
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default TabTwoScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 50
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    backgroundColor: 'darkblue',
    color: '#fff',
    width: 110,
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    width: 110,
  },
});
