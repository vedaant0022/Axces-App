

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// const PropertyCalendar = ({ onDateSelect }) => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [markedDates, setMarkedDates] = useState({});

//   const onDayPress = (day) => {
//     if (!startDate) {
//       setStartDate(day.dateString);
//       setMarkedDates({
//         [day.dateString]: { startingDay: true, color: 'green', textColor: 'white',  }
//       });
//     } else if (!endDate) {
//       setEndDate(day.dateString);
//       let marked = {};
//       const start = new Date(startDate);
//       const end = new Date(day.dateString);
//       for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
//         let dateString = d.toISOString().split('T')[0];
//         marked[dateString] = { color: 'green', textColor: 'white' };
//       }
//       marked[startDate] = { startingDay: true, color: 'green', textColor: 'white' };
//       marked[day.dateString] = { endingDay: true, color: 'green', textColor: 'white' };
//       setMarkedDates(marked);
//       onDateSelect(startDate, day.dateString); // Call the onDateSelect prop function
//     } else {
//       // Reset dates if both are already selected
//       setStartDate(day.dateString);
//       setEndDate(null);
//       setMarkedDates({
//         [day.dateString]: { startingDay: true, color: 'green', textColor: 'white' }
//       });
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <Calendar
//         onDayPress={onDayPress}
//         markedDates={markedDates}
//         markingType={'period'}
//       />
//       <View style={{ marginTop: 20, alignItems: 'center', flexDirection:'row', justifyContent:'center', gap:45 }}>
//         <Text style={{ width:82, gap:5, color:'#000000', fontWeight:'500', fontSize:15 }}>
//           Start Date: {startDate}
//         </Text>
//         {/* <Text style={{ width:82, gap:5, color:'#000000', fontWeight:'500', fontSize:15 }}>
//           End Date: {endDate}
//         </Text> */}
//       </View>
//     </View>
//   );
// };

// export default PropertyCalendar;

// import React, { useState } from 'react';
// import { View, Text } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// const PropertyCalendar = ({ onDateSelect }) => {
//   const [startDate, setStartDate] = useState(null);
//   const [markedDates, setMarkedDates] = useState({});

//   const onDayPress = (day) => {
//     setStartDate(day.dateString);
//     setMarkedDates({
//       [day.dateString]: { selected: true, selectedColor: 'green', textColor: 'white' }
//     });
//     onDateSelect(day.dateString); 
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <Calendar
//         onDayPress={onDayPress}
//         markedDates={markedDates}
//         markingType={'simple'}
//       />
//     </View>
//   );
// };

// export default PropertyCalendar;

import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const PropertyCalendar = ({ onDateSelect }) => {
  const [startDate, setStartDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day) => {
    // Convert the date to DD-MM-YYYY format
    const date = new Date(day.dateString);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${date.getFullYear()}`;

    setStartDate(formattedDate);
    setMarkedDates({
      [day.dateString]: {
        selected: true,
        selectedColor: 'green',
        textColor: 'white',
      },
    });
    onDateSelect(formattedDate); 
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType={'simple'}
      />
    </View>
  );
};

export default PropertyCalendar;



