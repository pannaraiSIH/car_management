import { useState } from "react";
import Swal from "sweetalert2";

const useSwal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  const success = ({ title = "" } = {}) => {
    hideLoading();
    return Swal.fire({
      icon: "success",
      title: title || "Created!",
      timer: 1500,
    });
  };

  const error = ({ title = "", text = "" } = {}) => {
    hideLoading();
    return Swal.fire({
      icon: "error",
      title: title ? title : "Error",
      text: text || "Something went wrong!",
      timer: 1500,
    });
  };

  const confirm = (fn) => {
    return Swal.fire({
      title: "Do you want to delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        return fn();
        // Swal.fire("Delete!", "", "success");
      }
    });
  };

  return { isLoading, loading, hideLoading, success, error, confirm };
};

export default useSwal;
