import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { View, Image } from 'react-native'

const Loader = ({loading}) => {
  console.log('loading', loading) //  for easy dev
  
  const isLoading = _.some(Object.keys(loading), (loadingKey) => {
    return loading[loadingKey]
  })

  if (isLoading) {
    return (
      <View style={{
        zIndex: 9999,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <Image
          style={{
            width: 100,
            aspectRatio: 1,
          }}
          source={require('../../images/loading.gif')}/>
      </View>
    )
  } else {
    return null
  }
  
}

function mapStateToProps({ loading }) {
  return { loading }
}

export default connect(mapStateToProps)(Loader)