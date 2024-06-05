import { useState } from "react";

export const usePreviewImageURl = () => {
  const [imageSrc, setimageSrc] = useState();
  // const [imageFile, setimageFile] = useState();

  function handleChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      // setimageFile(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        setimageSrc(reader.result);
      };
    }
  }

 

  return {
    handleChange,
   
    imageSrc,
  };
};
