
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import axios from "axios";
function ManufacturerSearch() {
  const [keywords, setKeywords] = useState("");
  const [condition, setCondition] = useState("AND");

  const [filterAttribute, setFilterAttribute] = useState("All");
  const [executionTime, setExecutionTime] = useState(0);

  const handleSearch = () => {
    const startTime = performance.now();
    setTimeout(() => {
      const endTime = performance.now();
      setExecutionTime(((endTime - startTime) / 1000).toFixed(2));
    }, 1000);
  };

  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("");

  const [equipmentType, setEquipmentType] = useState([]);
  const [selectedEquipmentType, setSelectedEquipmentType] = useState("");

  const [productLine, setProductLine] = useState([]);
  const [selectedProductLine, setSelectedProductLine] = useState("");

  const [productNumber, setProductNumber] = useState([]);
  const [selectedProductNumber, setSelectedProductNumber] = useState("");

  // const [allEquipmentData, setAllEquipmentData] = useState([]);

  console.log('manufacturers', manufacturers)
  console.log('selectedManufacturer', selectedManufacturer)

  const manufacturerApi = async () => {
    try {
      const startTime = performance.now();
        const response = await axios.post(
                  "https://api.cloudflare.com/client/v4/accounts/dd9b190e5bb824e610cd76610082c40b/d1/database/dcc9bc13-e2fa-4687-8c6e-9b43fda04a58/query",
                  { sql: "SELECT DISTINCT manufacturer FROM search2;" },
                  {
                      headers: {
                          Authorization: "Bearer 7rIiBBGVbZu8Mo9fB1sTuEelJHo_PwU64HSYtBlN",
                          "Content-Type": "application/json",
                      },
                  }
              );

      // const response = await axios.get("http://localhost:5000/api/manufacturer")
      console.log('response', response)
      console.log('response1', response?.data?.data?.result[0]?.results)
      const allManufacturers = response?.data?.data?.result[0]?.results

      const manufacturerNames = [...new Set(allManufacturers.map(item => item.Manufacturer))]
      setManufacturers(manufacturerNames);
      const endTime = performance.now();
      setExecutionTime(((endTime - startTime) / 1000).toFixed(2));

    } catch (err) {
      console.log('err', err)
    }
  }
  // const EquipmentApi = async () => {
  //   try {
  //     const startTime = performance.now();
  //     const response = await axios.post("http://localhost:5000/api/Equipment", { selectedManufacturer: selectedManufacturer })
  //     console.log('response', response?.data?.result[0]?.results)
  //     const allEquipment = response?.data?.result[0]?.results
  //     setAllEquipmentData(allEquipment);

  //     const equipmentNames = [...new Set(allEquipment.map(item => item.EQType))]
  //     setEquipmentType(equipmentNames);

  //     const productNames = [...new Set(allEquipment.map(item => item.MfgProdLine))]
  //     setProductLine(productNames);

  //     const productNumberNames = [...new Set(allEquipment.map(item => item.MfgProdNo))]
  //     setProductNumber(productNumberNames);

  //     const endTime = performance.now();
  //     if (selectedManufacturer != "") {
  //       setExecutionTime(((endTime - startTime) / 1000).toFixed(2));
  //     }

  //   } catch (err) {
  //     console.log('err', err)
  //   }
  // }
  useEffect(() => {
    manufacturerApi();
  }, [])
  // useEffect(() => {
  //   EquipmentApi()
  // }, [selectedManufacturer])

  // useEffect(() => {
  //   if (selectedEquipmentType) {
  //     const filteredData = allEquipmentData.filter(
  //       (item) => item.EQType === selectedEquipmentType
  //     );
    
  // console.log('filteredData',filteredData )
  //     setProductLine([...new Set(filteredData.map((item) => item.MfgProdLine))]);
  //     setProductNumber([new Set(filteredData.map((item) => item.MfgProdNo))]);
  //   } else {
  //     // Reset to all values if no Equipment Type is selected
  //     setProductLine([...new Set(allEquipmentData.map((item) => item.MfgProdLine))]);
  //     setProductNumber([new Set(allEquipmentData.map((item) => item.MfgProdNo))]);
  //   }
  // }, [selectedEquipmentType, allEquipmentData]);
  // useEffect(() => {
  //   // Filter Product Numbers when Product Line changes
  //   if (selectedProductLine) {
  //     const filteredData = allEquipmentData.filter(
  //       (item) => item.MfgProdLine === selectedProductLine
  //     );
  //     setProductNumber([...new Set(filteredData.map((item) => item.MfgProdNo))]);
  //   } else {
  //     // Reset to all values if no Product Line is selected
  //     setProductNumber([...new Set(allEquipmentData.map((item) => item.MfgProdNo))]);
  //   }
  // }, [selectedProductLine, allEquipmentData]);


  return (
    <div className="container w-50 mt-5">
      <div className="p-4 shadow">
        <h3 className="mb-4">Manufacturer Search</h3>
        <div className="mb-3 d-flex">
          <label className="form-label">Enter Keywords:</label>
          <input
            type="text"
            className=" w-50 ms-4"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <button className="ms-4">search</button>

        </div>
        <div className="mb-3  d-flex">
          <label className="form-label">Condition:</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input ms-auto"
                value="AND"
                checked={condition === "AND"}
                onChange={(e) => setCondition(e.target.value)}
              />
              <label className="form-check-label">AND</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                value="OR"
                checked={condition === "OR"}
                onChange={(e) => setCondition(e.target.value)}
              />
              <label className="form-check-label">OR</label>
            </div>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <label className="form-label">Manufacturer:</label>
          <select
            className="form-select ms-4 w-60"
            value={selectedManufacturer}
            onChange={(e) => setSelectedManufacturer(e.target.value)}
          >
            <option value="">Select Manufacturer</option>
            {manufacturers.map((manu, index) => (
              <option key={index} value={manu}>
                {manu}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <label className="form-label">Equipment Type:</label>
          <select
            className="form-select ms-4 "
            value={selectedEquipmentType}
            onChange={(e) => setSelectedEquipmentType(e.target.value)}
          >
            <option value="">Select Equipment</option>
            {equipmentType.map((eq, index) => (
              <option key={index} value={eq}>
                {eq}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <label className="form-label">Product Line:</label>
          <select
            className="form-select ms-4"
            value={selectedProductLine}
            onChange={(e) => setSelectedProductLine(e.target.value)}
          >
            <option value="">Select Product</option>

            {productLine.map((pr, index) => (
              <option key={index} value={pr}>
                {pr}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <label className="form-label">Product Number:</label>
          <select
            className="form-select ms-4"
            value={selectedProductNumber}
            onChange={(e) => setSelectedProductNumber(e.target.value)}
          >
            <option value="">Select Product</option>
            {productNumber.map((prn, index) => (
              <option key={index} value={prn}>
                {prn}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <label className="form-label">Filter By Attribute:</label>
          <select
            className="form-select  ms-4"
            value={filterAttribute}
            onChange={(e) => setFilterAttribute(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Attribute1">Attribute 1</option>
            <option value="Attribute2">Attribute 2</option>
          </select>
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label className="form-label">Search Result:</label>
          <button
            className=" ms-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>


        <div className="mt-3 d-flex">
          <label className="form-label">Total Seconds:</label>
          <p className="ms-4">{executionTime}</p>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerSearch;
