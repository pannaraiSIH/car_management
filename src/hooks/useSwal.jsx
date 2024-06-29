import Swal from "sweetalert2";

const useSwal = () => {
  const loading = () => {};

  const hideLoading = () => {};

  const success = ({ title = "" } = {}) => {
    return Swal.fire({
      icon: "success",
      title: title || "Your car has been created",
      timer: 1500,
    });
  };

  const error = ({ title = "", text = "" } = {}) => {
    return Swal.fire({
      icon: "error",
      title: title ? title : "Oops...",
      text: text || "Something went wrong!",
    });
  };

  const confirm = (fn) => {
    return Swal.fire({
      title: "Do you want to delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fn();
        Swal.fire("Delete!", "", "success");
      }
    });
  };

  return { loading, hideLoading, success, error, confirm };
};

export default useSwal;
