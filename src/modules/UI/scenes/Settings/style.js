import React, {StyleSheet, Dimensions, Platform} from 'react-native'

module.exports = StyleSheet.create({
    unlockRow: {
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 50
    },
    accountBoxHeaderTextWrap: {
      
    },
    leftArea: {
      flexDirection: 'row'
    },
    userIcon: {
      backgroundColor: 'transparent',
      fontSize: 22
    },
    accountBoxHeaderText: {
      fontSize: 18,
      color: 'white',
      backgroundColor: 'transparent',
      marginLeft: 16
    },
    dropdownIcon: {
      textAlignVertical: 'center',
      alignSelf: 'center',
      height: 24,
      fontSize: 24,
      backgroundColor: 'transparent'
    },
    optionsIcon: {
        backgroundColor: 'transparent',
        fontSize: 22
    },

    ////// Beginning of Settings Row ///////
    settingsRowContainer: {
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'space-around'        
    },
    settingsRowTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    settingsRowLeftContainer: {
        justifyContent: 'center'
    },  
    settingsRowLeftText: {
        color: '#58595C',
        fontSize: 16      
    },
    settingsRowRightArrow: {
        color: '#58595C',
        height: 20        
    },
    
    ///////// End of Settings Row /////////

})