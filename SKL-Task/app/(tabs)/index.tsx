import * as DocumentPicker from 'expo-document-picker';
import moment from 'moment';
import { useState } from 'react';
import { Alert, Keyboard, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function HomeScreen() {
  const [license, setLicense] = useState('')
  const [dob, setDOB] = useState('')
  const [driverName, setDriverName] = useState('')
  const [licenseExpiryDate, setLicenseExpiryDate] = useState('')
  const [mobile, setMobile] = useState('')
  const [isDriverDobPickerVisible, setIsDriverDobPickerVisibility] = useState(false);
  const [isLicenseExpiryPickerVisible, setIsLicenseExpiryPickerVisible] = useState(false);
  const [licenseFile, setLicenseFile] = useState('No File Chosen')
  const [aadharFile, setAadharFile] = useState('No File Chosen')

  const handleLicense = (text: string) => {
    setLicense(text)
  }

  const showDriverDobPicker = () => {
    setIsDriverDobPickerVisibility(true)
  }

  const hideDriverDobPicker = () => {
    setIsDriverDobPickerVisibility(false)
  }

  const handleDriverDobConfirm = (date: Date) => {
    const formatted = moment(date).utc().format('DD-MM-YYYY');
    setDOB(formatted)
    hideDriverDobPicker()
  }

  const handleMobile = (number: string) => {
    setMobile(number)
  }

  const handleDriverName = (name: string) => {
    setDriverName(name)
  }

  const showLicenseExpiryPicker = () => {
    setIsLicenseExpiryPickerVisible(true)
  }

  const hideLicenseExpiryPicker = () => {
    setIsLicenseExpiryPickerVisible(false)
  }

  const handleLicenseExpiryConfirm = (date: Date) => {
    const formatted = moment(date).utc().format('DD-MM-YYYY');
    setLicenseExpiryDate(formatted)
    hideLicenseExpiryPicker()
  }

  const pickLicenseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '/',
        multiple: false,
      })
      if (result.assets != null) {
        setLicenseFile(result.assets[0].name)
      }
    } catch (error) {
      console.error("File License Pick Err: ", error)
    }
  }

  const pickAadharFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '/',
        multiple: false,
      })
      if (result.assets != null) {
        setAadharFile(result.assets[0].name)
      }
    } catch (error) {
      console.error("File Aadhar Pick Err: ", error)
    }
  }

  const handleSubmit = () => {
    if (!license) {
      alert("Please provide License Number")
    } else if (!dob ) {
      alert("Please provide DOB")
    } else if (!driverName) {
      alert("Please provide Driver Name")
    } else if (!licenseExpiryDate) {
      alert("Please provide License Expiry Date")
    } else if (!mobile || mobile.length < 10) {
      alert("Please provide Valid Mobile No.")
    } else {
      const birthDate = moment(dob, "DD-MM-YYYY");
      const isAbove18 = birthDate.isSameOrBefore(moment().subtract(18, 'years'));
      if(!isAbove18) {
        alert("Your age must be above 18")
      } else {
        Alert.alert("Form Submit Successfully.")
        setLicense('')
        setDOB('')
        setDriverName('')
        setLicenseExpiryDate('')
        setMobile('')
        setLicenseFile('No File Chosen')
        setAadharFile('No File Chosen')
      }
    }
  }

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 20, marginTop:40 }}>

        <View style={{ backgroundColor: 'darkblue', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 6, marginBottom: 20 }}>
          <Text style={{ color: 'white', fontSize: 16 }}>New Indent Details</Text>
        </View>

        <View style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 5, padding: 10 }}>
          <Text style={{ fontWeight: '700', fontSize: 16 }}>License Number <Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput
            style={{ borderWidth: 1, borderRadius: 5, height: 40, marginTop: 6, marginBottom: 20, paddingLeft: 8 }}
            placeholder='Enter License Number'
            value={license}
            onChangeText={handleLicense}
            maxLength={50}
          />

          <Text style={{ fontWeight: '700', fontSize: 16 }}>Driver DOB <Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput
            style={{ borderWidth: 1, borderRadius: 5, height: 40, marginTop: 6, marginBottom: 20, paddingHorizontal: 8 }}
            placeholderTextColor={"black"}
            placeholder='dd-mm-yyyy'
            value={dob}
            onPress={showDriverDobPicker}
            onFocus={() => { Keyboard.dismiss() }}
          />

          <DateTimePickerModal
            isVisible={isDriverDobPickerVisible}
            mode='date'
            onConfirm={handleDriverDobConfirm}
            onCancel={hideDriverDobPicker}
          />

          <Text style={{ fontWeight: '700', fontSize: 16 }}>Driver Name <Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput
            style={{ borderWidth: 1, borderRadius: 5, height: 40, marginTop: 6, marginBottom: 20, paddingLeft: 8 }}
            placeholder='Enter Driver Name'
            value={driverName}
            onChangeText={handleDriverName}
            maxLength={60}
          />

          <Text style={{ fontWeight: '700', fontSize: 16 }}>License Expiry Date <Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput
            style={{ borderWidth: 1, borderRadius: 5, height: 40, marginTop: 6, marginBottom: 20, paddingHorizontal: 8 }}
            placeholderTextColor={"black"}
            placeholder='dd-mm-yyyy'
            value={licenseExpiryDate}
            onPress={showLicenseExpiryPicker}
            onFocus={() => { Keyboard.dismiss() }}
          />

          <DateTimePickerModal
            isVisible={isLicenseExpiryPickerVisible}
            mode='date'
            onConfirm={handleLicenseExpiryConfirm}
            onCancel={hideLicenseExpiryPicker}
          />

          <Text style={{ fontWeight: '700', fontSize: 16 }}>Mobile Number <Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput
            style={{ borderWidth: 1, borderRadius: 5, height: 40, marginTop: 6, marginBottom: 20, paddingLeft: 8 }}
            placeholder='Enter Mobile Number'
            keyboardType='number-pad'
            value={mobile}
            onChangeText={handleMobile}
            maxLength={10}
          />

          <Text style={{ fontWeight: '700', fontSize: 16 }}>License Upload</Text>
          <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, height: 40, marginTop: 6, marginBottom: 20, paddingLeft: 8, flexWrap: 'wrap' }}>
            <Pressable onPress={pickLicenseFile}>
              <Text style={{ borderWidth: 1, height: 35, fontWeight: '700', paddingRight: 10, backgroundColor: 'lightgrey', paddingVertical: 5, paddingLeft: 2, marginVertical: 2 }}>Choose File</Text>
            </Pressable>
            <Text style={{ marginLeft: 10, alignSelf: 'center' }}>{licenseFile}</Text>
            {licenseFile != "No File Chosen" && <TouchableOpacity onPress={() => setLicenseFile('No File Chosen')}><Text style={{ color: 'red', marginLeft: 10, marginVertical: 10 }}>Remove</Text></TouchableOpacity>}
          </View>

          <Text style={{ fontWeight: '700', fontSize: 16 }}>Aadhar Upload</Text>
          <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 5, height: 40, marginTop: 6, marginBottom: 20, paddingLeft: 8 }}>
            <Pressable onPress={pickAadharFile}>
              <Text style={{ borderWidth: 1, height: 35, fontWeight: '700', paddingRight: 10, backgroundColor: 'lightgrey', paddingVertical: 5, paddingLeft: 2, marginVertical: 2 }}>Choose File</Text>
            </Pressable>
            <Text style={{ marginLeft: 10, alignSelf: 'center' }}>{aadharFile}</Text>
            {aadharFile != "No File Chosen" && <TouchableOpacity onPress={() => setAadharFile('No File Chosen')}><Text style={{ color: 'red', marginLeft: 10, marginVertical: 10 }}>Remove</Text></TouchableOpacity>}
          </View>

          <Pressable onPress={handleSubmit}>
            <View style={{ backgroundColor: '#0b4b85', height: 40, borderRadius: 6, width: '40%', justifyContent: 'center', alignSelf: 'center' }}>
              <Text style={{ alignSelf: 'center', color: 'white', fontWeight: '600', fontSize: 16 }}>Submit</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}