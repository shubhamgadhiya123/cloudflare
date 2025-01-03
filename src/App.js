
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import axios from "axios";
function ManufacturerSearch() {
  // const [keywords, setKeywords] = useState("");
  // const [condition, setCondition] = useState("AND");

  // const [filterAttribute, setFilterAttribute] = useState("All");
  // const [executionTime, setExecutionTime] = useState(0);

  // const handleSearch = () => {
  //   const startTime = performance.now();
  //   setTimeout(() => {
  //     const endTime = performance.now();
  //     setExecutionTime(((endTime - startTime) / 1000).toFixed(2));
  //   }, 1000);
  // };

  // const [manufacturers, setManufacturers] = useState([]);
  // const [selectedManufacturer, setSelectedManufacturer] = useState("");

  // const [equipmentType, setEquipmentType] = useState([]);
  // const [selectedEquipmentType, setSelectedEquipmentType] = useState("");

  // const [productLine, setProductLine] = useState([]);
  // const [selectedProductLine, setSelectedProductLine] = useState("");

  // const [productNumber, setProductNumber] = useState([]);
  // const [selectedProductNumber, setSelectedProductNumber] = useState("");

  // const [allEquipmentData, setAllEquipmentData] = useState([]);

  // console.log('manufacturers', manufacturers)
  // console.log('selectedManufacturer', selectedManufacturer)

  const manufacturerApi = async () => {
    try {
      // const startTime = performance.now();
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
      // const allManufacturers = response?.data?.data?.result[0]?.results

      // const manufacturerNames = [...new Set(allManufacturers.map(item => item.Manufacturer))]
      // setManufacturers(manufacturerNames);
      // const endTime = performance.now();
      // setExecutionTime(((endTime - startTime) / 1000).toFixed(2));

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
    <h1>hello world</h1>
    </div>
  );
}

export default ManufacturerSearch;
