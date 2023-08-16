import FormikTF from "@/containers/AuthCont/FormikTF";
import {
  initialValues,
  validationSchema,
} from "@/containers/AuthCont/Registration/helpers";
import { IRegister } from "@/interfaces";
import { registerAPI } from "@/store/services/RegisterService";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Registration = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [createReg, { isSuccess }] = registerAPI.useCreateRegMutation();

  const handleChange = async (values: IRegister) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("fullName", values.fullName);
    formData.append("birthDate", values.birthDate);
    formData.append("country", values.country);
    if (selectedFile) {
      formData.append("avatar", selectedFile, selectedFile.name);
    } else {
      formData.append("avatar", "");
    }
    try {
      const response = await createReg(formData);
    } catch (error) {
      console.error("Ошибка при создании регистрации:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const base64Data = fileReader.result;
        setPreviewUrl(base64Data as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  if (isSuccess) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={handleChange}
      >
        {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <FormikTF name="fullName" type="text" label="Your username" />
            <FormikTF name="password" type="password" label="Your password" />
            <FormikTF name="email" type="email" label="Your email" />
            <FormikTF name="country" type="text" label="Your country" />
            <div>
              <span>Your birthday</span>
              <div>
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  value={values.birthDate}
                  min="1950-01-01"
                  max="2012-12-31"
                  onChange={e => setFieldValue("birthDate", e.target.value)}
                />
                <div>{values.birthDate}</div>
              </div>
            </div>
            <div>
              <span>Your avatar</span>
              <div>
                <div>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    id="fileInput"
                    onChange={handleFileChange}
                  />
                  <div>
                    <div>
                      <label htmlFor="fileInput">
                        <span>Choose file</span>
                      </label>
                      <span>{selectedFile?.name}</span>
                    </div>
                  </div>
                </div>
                {previewUrl && (
                  <div>
                    <img src={previewUrl} alt="Preview" />
                  </div>
                )}
              </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Registration;
