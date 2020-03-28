import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Hello ${incident.name}, I want to help you on the case of "${incident.title}" sponsoring with ${Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(incident.value)}`

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Hero of the case: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    })
  }

  function sendWhats() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity
          onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentProperty, { marginTop: 0 }}>NPO:</Text>
        <Text style={styles.incidentValue}>{incident.name} - {incident.city} / {incident.uf} </Text>

        <Text style={styles.incidentProperty}>Issue:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>Description:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>Value Requested:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: 'CAD'
          }).format(incident.value)}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero of this case.</Text>
        <Text style={styles.heroDescription}>Contact us:</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.action}
            onPress={sendWhats}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.action}
            onPress={sendMail} >
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}