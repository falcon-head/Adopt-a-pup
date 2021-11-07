import React from 'react';
import { ScrollView, View, Box, useToast, Toast } from 'native-base';
import { StyleSheet, Text, Linking, Platform, Share } from 'react-native';
import { Colors } from '../../Styles/Colors';
import { StatusBar } from 'expo-status-bar';
import { CommonStrings } from '../../Styles/CommonStrings';
import { SettingItem } from '../Individuals/SettingItem';

export default function Settings() {
  // Toast hook from native base
  const toast = useToast();

  //Open playstore
  const openPlaystore = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('market://details?id=com.stonecoldstudios.projectnaruto');
    } else {
      Linking.openURL('itms-apps://itunes.apple.com/app/id1435694583');
    }
  };

  // Open send Email intent
  const sendEmail = (number) => {
    if (1 == number) {
      Linking.openURL(
        'mailto:stonecoldstudios@gmail.com?subject=List a pup&body='
      );
    } else if (2 == number) {
      Linking.openURL(
        'mailto:stonecoldstudios@gmail.com?subject=Request&body='
      );
    } else {
      Linking.openURL(
        'mailto:stonecoldstudios@gmail.com?subject=Feedback&body='
      );
    }
  };

  // Handle all the browser Actions
  const openBrowser = (num) => {
    //https://falcon-head.gitlab.io/stonecoldstudiosprivacypolicy/
    if (1 === num) {
      Linking.openURL(
        'https://falcon-head.gitlab.io/stonecoldstudiosprivacypolicy/'
      );
    } else {
      Linking.openURL(
        'https://falcon-head.gitlab.io/stonecoldstudiosprivacypolicy/privacy.html'
      );
    }
  };

  // Share app link

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message:
          'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=com.stonecoldstudios.projectnaruto&hl=en_IN&gl=US',
        url: 'https://play.google.com/store/apps/details?id=com.stonecoldstudios.projectnaruto&hl=en_IN&gl=US',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <ScrollView
        style={styles.settingsScrollView}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar />
        <Box style={styles.contentContainer} safeAreaTop>
          <Text style={styles.heading}> {CommonStrings.setting} </Text>
          <Box style={styles.settingView}>
            <Text style={styles.smallHeading}>{CommonStrings.account}</Text>
            <SettingItem
              name={CommonStrings.listYourPup}
              icon={CommonStrings.paw}
              settingPressed={() => sendEmail(1)}
            />
            <SettingItem
              name={CommonStrings.toTheReader}
              icon={CommonStrings.people}
            />
          </Box>
          <Box style={styles.settingView}>
            <Text style={styles.smallHeading}>{CommonStrings.support}</Text>
            <SettingItem
              name={CommonStrings.rate}
              icon={CommonStrings.playstore}
              settingPressed={() => openPlaystore()}
            />
            <SettingItem
              name={CommonStrings.share}
              icon={CommonStrings.shareIcon}
              settingPressed={() => onShare()}
            />
            <SettingItem
              name={CommonStrings.contact}
              icon={CommonStrings.mail}
              settingPressed={() => sendEmail(2)}
            />
            <SettingItem
              name={CommonStrings.softwareVersion}
              icon={CommonStrings.softIcons}
              settingPressed={() => {
                toast.show({
                  description: 'Software version is 1.0.0',
                });
              }}
            />
            <SettingItem
              name={CommonStrings.feedback}
              icon={CommonStrings.feedbackIcon}
              settingPressed={() => sendEmail(2)}
            />
          </Box>
          <Box style={styles.settingView}>
            <Text style={styles.smallHeading}>{CommonStrings.Legal}</Text>
            <SettingItem
              name={CommonStrings.terms}
              settingPressed={() => openBrowser(1)}
            />
            <SettingItem
              name={CommonStrings.privacy}
              icon={CommonStrings.privacyIcon}
              settingPressed={() => openBrowser(2)}
              extraStyle={{ borderBottomWidth: 0 }}
            />
          </Box>
        </Box>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  settingsScrollView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  heading: {
    fontSize: 32,
    fontFamily: 'Bold',
    paddingTop: 20,
    marginLeft: -8,
  },
  smallHeading: {
    paddingTop: 10,
    fontFamily: 'Bold',
    fontSize: 14,
    color: Colors.foggy,
  },
  settingView: {
    paddingTop: 20,
  },
});
