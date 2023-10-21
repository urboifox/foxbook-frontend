import { useState } from "react";

export default function useForm(initialValues) {
  const [data, setData] = useState(initialValues || {});

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setData(initialValues || {});
  };

  return {
    data,
    handleChange,
    resetForm,
  };
}
