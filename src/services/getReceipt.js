const getReceipt = async (id) => {
  return await fetch(`data/receipt${id}.json`);
};

export default getReceipt;
