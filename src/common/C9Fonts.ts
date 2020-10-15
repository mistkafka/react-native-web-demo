import  { StyleSheet, Platform } from 'react-native';
import C9Colors from "./C9Colors";

const stylesObject = {
    baseStyle: {
        textAlignVertical: 'center' as 'center',
        includeFontPadding: false,
        color: C9Colors.darkText,
    },
    boldFont: Platform.select({
        ios: {
            fontFamily: 'ProximaNova-Bold',
        },
        android: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
        },
        web: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
        }
    }) as any,
    regularFont: Platform.select({
        ios: {
            fontFamily: 'ProximaNova-Regular',
        },
        android: {
            fontFamily: 'sans-serif',
        },
        web: {
            fontFamily: 'sans-serif',
        }
    }) as any,
    lightFont: Platform.select({
        ios: {
            fontFamily: 'ProximaNova-Light',
        },
        android: {
            fontFamily: 'sans-serif-light',
        },
        web: {
            fontFamily: 'sans-serif-light',
        }
    }) as any,
    semiboldFont: Platform.select({
        ios: {
            fontFamily: 'ProximaNova-Semibold',
        },
        android: {
            fontFamily: 'sans-serif-medium',
        },
        web: {
            fontFamily: 'sans-serif-medium',
        }
    }) as any,
    italicFont: Platform.select({
        ios: {
            fontFamily: 'ProximaNova-RegularIt',
        },
        android: {
            fontFamily: 'sans-serif',
            fontStyle: 'italic',
        },
        web: {
            fontFamily: 'sans-serif',
            fontStyle: 'italic',
        },
    }) as any,
    boldItalicFont: Platform.select({
        ios: {
            fontFamily: 'ProximaNova-BoldIt',
        },
        android: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            fontStyle: 'italic',
        },
        web: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            fontStyle: 'italic',
        },
    }) as any,
};
export default StyleSheet.create(stylesObject);
