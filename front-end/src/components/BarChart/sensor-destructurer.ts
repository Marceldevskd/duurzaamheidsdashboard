function destructurer(data: any) {
   if (!data) {
      return null;
   };

   try {
      let result = [];

      for (let i=0; i < data.length; i++) {
         result[i] = data[i].totalAmount 
      }

      return result;
   } catch (err) { 
      console.log(err); 
      return null; 
   };
}

export default destructurer;