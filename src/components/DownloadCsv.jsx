import React from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";

const DownloadCsv = ({ data }) => {
  console.log(data);
  const csvData = data?.map((item) => {
    return {
      Contact: item?.name,
      Email: item?.email,
      ConnectedWith: item?.connectedWith,
      Date: item?.date,
      Job: item?.job,
      Company: item?.company,
      phone: item?.phone,
      note: item?.message,
    };
  });

  const { t } = useTranslation();

  return (
    <CSVLink
      data={csvData}
      filename={`MyContacts.csv`}
      style={{ textDecoration: "none", color: "black" }}
    >
      {t("Export CSV")}
    </CSVLink>
  );
};

export default DownloadCsv;
