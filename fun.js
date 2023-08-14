function p() {
  console.log("hi");
}
const c = (f, s) => async (pf) => {
  console.log("inside");
  pf();
};

const a = p(c(1, 3));
