/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, Button, Avatar} from 'react-native-paper';
import {
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/AntDesign';

function Detail(props) {
  const {
    recipe: {currentRecipe, recipeList},
  } = useSelector(state => state);
  const {navigation} = props;
  const [detailRecipe, setDetailRecipe] = React.useState(null);

  const [type, setType] = React.useState('ingridients');

  React.useEffect(() => {
    if (currentRecipe) {
      setDetailRecipe(recipeList.find(res => res.id === currentRecipe));
    }
  }, [currentRecipe, recipeList]);

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
        }}>
        {/* Header Background */}
        <View
          style={{
            flex: 0.8,
            width: '100%',
            // backgroundColor: 'gray',
          }}>
          <ImageBackground
            source={{uri: detailRecipe?.image}}
            resizeMode="cover"
            style={{
              height: '100%',
              justifyContent: 'flex-end',
              width: '100%',
            }}
            imageStyle={{
              borderRadius: 6,
              resizeMode: 'cover',
              position: 'absolute',
              top: 0,
            }}>
            <View style={{position: 'absolute', top: 20, marginLeft: 20}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrowleft" size={30} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={{marginBottom: 25, padding: 20}}>
              <Text
                variant="titleLarge"
                style={{
                  color: '#fff',
                  fontSize: 30,
                  marginBottom: 2,
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: {width: -1, height: 1},
                  textShadowRadius: 10,
                }}
                numberOfLines={1}>
                {detailRecipe?.name}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 100,
                  marginBottom: 10,
                  color: '#fff',
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: {width: -1, height: 1},
                  textShadowRadius: 10,
                }}
                numberOfLines={1}>
                {detailRecipe?.created ?? 'unknown'}
              </Text>
            </View>
          </ImageBackground>
        </View>
        {/* End of Header Background */}

        {/* Main Content */}
        <View
          style={{
            flex: 1,
            minWidth: '100%',
            backgroundColor: 'white',
            marginTop: -20,
            borderRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}>
          {/* Button Switch */}
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Button
              labelStyle={
                type === 'ingridients'
                  ? styles.buttonActive
                  : styles.buttonNonActive
              }
              onPress={() => setType('ingridients')}>
              Ingredients
            </Button>
            <Button
              labelStyle={
                type === 'video' ? styles.buttonActive : styles.buttonNonActive
              }
              onPress={() => setType('video')}>
              Video Step
            </Button>
          </View>

          <ScrollView>
            {/* Ingridients View */}
            {type === 'ingridients' ? (
              <View
                style={{
                  backgroundColor: '#FAF7ED',
                  borderRadius: 10,
                  padding: 20,
                }}>
                <Text>
                  {detailRecipe?.ingridients ?? 'Ingridients not found'}
                </Text>
              </View>
            ) : (
              <>
                {/* Video Step View */}
                <TouchableOpacity onPress={() => Linking.openURL(detailRecipe?.video_step)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#FAF7ED',
                      padding: 10,
                      borderRadius: 15,
                      alignItems: 'center',
                      gap: 25,
                      marginBottom: 15,
                    }}>
                    <Avatar.Image
                      size={60}
                      source={require('../assets/play_icon.png')}
                      style={{borderRadius: 20, backgroundColor: '#efc81a'}}
                    />

                    <View>
                      <Text style={{fontSize: 18, color: '#B6B6B6'}}>
                        Step 1
                      </Text>
                      <Text>Click for video step</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
        {/* End Of Main Content */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonActive: {
    color: '#18172B',
    borderBottomWidth: 2,
    borderBottomColor: '#EEC302',

    fontSize: 16,
  },
  buttonNonActive: {color: '#666666', fontSize: 16},
});

export default Detail;
