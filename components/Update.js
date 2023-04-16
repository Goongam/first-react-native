import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';

export default function UserInfoForm({ userId, password, name, gender, phone, email, onSubmit }) {
  const [newPassword, setNewPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [address, setAddress] = useState('');
    const [speAddress, setSpeAddress] = useState('');
  const handleSubmit = () => {
    onSubmit({
      userId,
      password: newPassword || password,
      name,
      gender,
      phone,
      email,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.fieldValue}>{userId}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>새 비밀번호:</Text>
        <TextInput
          style={styles.input}
          placeholder="새 비밀번호 입력"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>새 비밀번호:</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>이름:</Text>
        <TextInput style={styles.input} value={name} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>성별:</Text>
        <TextInput style={styles.input} value={gender} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>전화번호:</Text>
        <TextInput style={styles.input} value={phone} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>이메일:</Text>
        <TextInput style={styles.input} value={email} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>주소</Text>
        <TextInput style={styles.input} value={address} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>상세주소</Text>
        <TextInput style={styles.input} value={speAddress} onChangeText={setSpeAddress}/>
      </View>

{/* 주소창 */}
      <>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modal}>
        <View style={styles.postcode}>
            <Postcode
            style={{ width: 'auto', height: 400 }}
            jsOptions={{ animation: true, hideMapBtn: true }}
            onSelected={data => {
                setAddress(data.address);
                setModalVisible(false);
            }}
            />
        </View>
        <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>닫기</Text>
        </TouchableOpacity>
        </View>

        
      </Modal>
      {/* <Button onClick={() => setModalVisible(true)}>주소찾기</Button> */}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>주소찾기</Text>
      </TouchableOpacity>
    </>

    
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>수정</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 32,
    },
    fieldContainer: {
        marginBottom: 16,},
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
        fieldValue: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        width: 300,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    modalClose:{
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        // marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modal:{
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    postcode:{
        borderWidth: 1,
        borderColor: '#ccc',
    }
});