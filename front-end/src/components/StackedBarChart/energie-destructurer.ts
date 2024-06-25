function energieDestructurer(data: any) {
   if (!data) {
      return null;
   };

   try {
      interface resultProps { 
         days: Array<string>
         necessaryLight: Array<string>
         unnecessaryLight: Array<string>
      }
      let result: resultProps= {
         days: [],
         necessaryLight: [],
         unnecessaryLight: []
      };

      for (let i=0; i < 7; i++) {
         result.days[i] = data[i].day 
      }

      for (let i=0; i < 7; i++) {
         result.necessaryLight[i] = data[i].necessaryLight
      }

      for (let i=0; i < data.length; i++) {
         result.necessaryLight[i] = data[i].necessaryLight
      }

      
      // console.log(result);

      return result

   } catch (err) { 
      // console.log(err); 
      return null; 
   };
}

export default energieDestructurer;