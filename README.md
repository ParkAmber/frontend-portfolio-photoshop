# Photo Editing Website
+ Demo: https://portfolio-photoshop.amberpark.site/photoshop/

  
### **Summary:**
This project encompasses a Photoshop function tool featuring core functionalities like "Rotate," "Filter," "Crop," "Draw," and "Sticker." The implementation relied heavily on React, Fabric.js, and the React-image-crop library.

### **Project Objective:**
In the capacity of a web designer, a deep dive into the proficient use of various photo editing tools sparked the inspiration to develop a customized photo editing tool. Motivated by the widespread adoption of photo editing, the primary objective was to seamlessly integrate essential functionalities gleaned from experience with existing tools. This inspiration ignited the development journey for a comprehensive photo editing application.

### **Development Goals:** 
Understanding of relevant libraries and Canvas to build powerful and interactive applications.

### **Sills:** 
+ HTML
+ CSS
+ React.js
+ Styled Components
  
-------
+ **Challenges:**

1. Encountered conflicts between the Fabric.js canvas and the crop canvas, posing difficulties in establishing a unified environment for both.

2. Noticed a challenge when using additional functionalities like the "Blur" or "Rotate" tool after employing the "Draw" or "Text" tool, where drawn paths or text were not effectively applied to the canvas.

3. Faced an issue in the "Draw" tool where drawn paths were reset when dragged.

4. Addressed various concerns related to canvas re-rendering, impacting the overall performance of the application.

   

+ **Solutions:**

1. Ensured consistency in applying effects, such as blur intensity and rotation angles, across both the Fabric.js canvas and the crop tool canvas.

2. Implemented the useEffect hook with dependencies on the draw and text states to meticulously orchestrate the re-rendering of the canvas. This strategic approach ensures a seamless update of drawn paths and text elements with each state change, contributing to a responsive and dynamic user interface.

3. Efficiently managed the collection of drawn paths by employing setState, adding both previous and new paths to an array. Subsequently, each path was iteratively incorporated into the canvas using a for loop.

4. Resolved conflicts between the prior canvas instance and the new canvas by judiciously employing canvas.dispose() within the useEffect. This ensured the clean unmounting of the component and comprehensive cleanup of resources.

-------

### **Advanced Feature:** 
+ Draw Tool

![draw](https://github.com/ParkAmber/frontend-portfolio-photoshop/blob/main/draw.png)

+ Sticker Tool

  ![sticker](https://github.com/ParkAmber/frontend-portfolio-photoshop/blob/main/sticker.png)
