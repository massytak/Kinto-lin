import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5000/reviews",
  withCredentials: true,
});
export default service;

///////////////Create review///////////
function createReview(comments) {
  return service
    .post("/create", { comments })
    .then((response) => response.data);
}
export { createReview };

//////////////////Update review/////////////
function updateReview(id) {
  return service
    .put(`/update/${id}`)
    .then((response) => console.log(response));
}
export { updateReview };

//////////////////Delete review/////////////
function deleteReview(id) {
  return service
    .delete(`/delete/${id}`)
    .then((response) => console.log(response));
}
export { deleteReview };
