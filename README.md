Summary:
This project is a Photoshop function tool where I implemented core functionalities such as "Rotate," "Filter," "Crop," "Draw," and "Sticker." To realize these features, I predominantly utilized React, Fabric.js, and the React-image-crop library.

Challenges:

1. I encountered conflicts between the Fabric.js canvas and the crop canvas, making it challenging to create a unified environment for both.

2. When attempting to use other functionalities like the "Blur" or "Rotate" tool after using the "Draw" or "Text" tool, I observed that the drawn paths or text were not being applied to the canvas.

3. In the "Draw" tool, the drawn paths were reset when dragged.

4. There were several issues related to canvas re-rendering, affecting the overall application performance.

Solving:

1. I ensured uniformity in the application of effects, including blur intensity and rotation angles, for both the Fabric.js canvas and the crop tool canvas.

2. Leveraging the power of useEffect with dependencies on the draw and text states, I orchestrated the re-rendering of the canvas to seamlessly update drawn paths and text elements as state changes occurred.

3. Employing setState, I efficiently managed the collection of drawn paths, effectively adding both previous and new paths to an array. Subsequently, each path was iteratively incorporated into the canvas using a for loop.

4. To address and resolve conflicts between the prior canvas instance and the new canvas, I judiciously employed canvas.dispose() within the useEffect. This facilitated the clean unmounting of the component and a comprehensive cleanup of resources.

