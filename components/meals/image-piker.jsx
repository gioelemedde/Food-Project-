"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickerImage, setPickerImage] = useState();
  const imageInput = useRef();

  function HandleClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickerImage(null)
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickerImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickerImage && <p>No file selected</p>}
          {pickerImage && (
            <Image src={pickerImage} alt="image selected by user" fill />
          )}
        </div>
        <input
          ref={imageInput}
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={HandleClick}>
          Pick asn Image
        </button>
      </div>
    </div>
  );
}
