import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {Launch} from 'models';
import {Colors} from 'styles';
import {ImgRocket} from 'assets/pngs';
import {format} from 'date-fns';

const IMAGE_SIZE = (Dimensions.get('window').width - 44) / 2;
const DTIME_FORMAT = 'yyyy.MM.dd HH:mm';

interface LaunchItemProps {
  launch: Launch;
}

const LaunchItem = (props: LaunchItemProps): React.ReactElement => {
  const {launch} = props;

  const launchDate = format(launch.launch_date_utc, DTIME_FORMAT);

  return (
    <View style={styles.container}>
      <Image
        style={styles.missionImage}
        source={
          launch.links.flickr_images.length > 0
            ? {uri: launch.links.flickr_images[0]}
            : ImgRocket
        }
      />
      <View style={styles.missionInfoContainer}>
        <Text style={styles.launchDateText}>{launchDate}</Text>
        <Text style={styles.missionNameText}>{launch.mission_name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  missionImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
  },
  missionInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 12,
    width: '100%',
  },
  launchDateText: {
    color: Colors.primary,
    fontSize: 11,
  },
  missionNameText: {
    color: Colors.primary,
    marginTop: 4,
  },
});

export default LaunchItem;
