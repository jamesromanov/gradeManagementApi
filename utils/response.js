const response = (res, data, sts = 200) => {
  if (sts < 200 || sts < 205)
    res.status(sts).json({ status: "Failed!", error: data });
  else res.status(sts).json({ status: "Success!", data: data });
};

module.exports = { response };
