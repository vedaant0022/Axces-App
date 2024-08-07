// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';
// import { demoUser } from '../../constants/imgURL'; // Assuming this is the correct import

// const ContactOwner = ({ ownerContact }: { ownerContact: string }) => {
//   const [modalVisible, setModalVisible] = useState(false);

//   return (
//     <View style={styles.container}>
//       <View style={styles.innerContainer}>
//         <Image source={{ uri: demoUser }} style={styles.image} />
//         <TouchableOpacity
//           style={styles.contactButton}
//           onPress={() => setModalVisible(true)}
//         >
//           <Text style={styles.contactButtonText}>Contact Owner</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.chargesContainer}>
//         <Text style={styles.chargesText}>Charges</Text>
//         <Text style={styles.coinsText}>50 Coins</Text>
//       </View>

//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Owner's Contact Number</Text>
//             <Text style={styles.modalContent}>{ownerContact}</Text>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F2F8F6',
//     padding: 10,
//     borderRadius: 10,
//     justifyContent: 'space-between',
//   },
//   innerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   image: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   contactButton: {
//     backgroundColor: '#BDEA09',
//     borderRadius: 20,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginLeft: 10,
//   },
//   contactButtonText: {
//     color: '#181A53',
//     fontWeight: 'bold',
//   },
//   chargesContainer: {
//     alignItems: 'flex-end',
//   },
//   chargesText: {
//     color: '#181A5399',
//   },
//   coinsText: {
//     color: '#181A53',
//     fontWeight: 'bold',
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     width: 300,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   modalContent: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   closeButton: {
//     backgroundColor: '#BDEA09',
//     borderRadius: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   closeButtonText: {
//     color: '#181A53',
//     fontWeight: 'bold',
//   },
// });

// export default ContactOwner;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';
import { demoUser } from '../../constants/imgURL'; // Assuming this is the correct import

const ContactOwner = ({ ownerContact }: { ownerContact: string }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={{ uri: demoUser }} style={styles.image} />
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.contactButtonText}>Contact Owner</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chargesContainer}>
        <Text style={styles.chargesText}>Charges</Text>
        <Text style={styles.coinsText}>50 Coins</Text>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Owner's Contact Number</Text>
            <Text style={styles.modalContent}>{ownerContact}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F8F6',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contactButton: {
    backgroundColor: '#BDEA09',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 10,
  },
  contactButtonText: {
    color: '#181A53',
    fontWeight: 'bold',
  },
  chargesContainer: {
    alignItems: 'flex-end',
  },
  chargesText: {
    color: '#181A5399',
  },
  coinsText: {
    color: '#181A53',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#BDEA09',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeButtonText: {
    color: '#181A53',
    fontWeight: 'bold',
  },
});

export default ContactOwner;
