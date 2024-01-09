import Swal from "sweetalert2";

export async function showSuccess(header, body) {
  await Swal.fire({
    icon: "success",
    title: header,
    text: body,
  }).finally((res) => {
    return res;
  });
}

export function showError(header, body) {
  Swal.fire({
    icon: "error",
    title: header,
    html: body.map((err) => {
      return `<p>${err} </p>`;
    }),
  });
}
