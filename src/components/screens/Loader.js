import _ from 'lodash'
import React from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'

const Loader = ({loadingFromReducer, loading: isLoadingFromGraphql, error}) => {
  console.log('Loader error', error)
    const isLoadingFromReducer = _.some(Object.keys(loadingFromReducer), (loadingKey) => {
    return loadingFromReducer[loadingKey]
  })

  if (isLoadingFromGraphql || isLoadingFromReducer) {
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
  return { loadingFromReducer: loading }
}

export default connect(mapStateToProps)(Loader)