import { useState } from "react";

const useForm = (initialState) => {
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setData({
        ...data,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const resetForm = () => {
    setData(initialState);
  };

  return {
    data,
    handleChange,
    resetForm,
  };
};

export default useForm;
