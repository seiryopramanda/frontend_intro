import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, provinceUrl, cityUrl, districtUrl } from "./api-service";

type Provinces = {
  id: number;
  name: string;
};
type Cities = {
  id: number;
  name: string;
};
type District = {
  id: number;
  name: string;
};

const SingleApp = () => {
  const [province, setProvince] = useState([]);
  const [id_prov, setId_prov] = useState();
  const handleProv = (event) => {
    setId_prov(event.target.value);
  };

  const [city, setCity] = useState([]);
  const [id_city, setId_city] = useState();
  const handleCity = (event) => {
    setId_city(event.target.value);
  };

  const [district, setDistrict] = useState([]);
  const [id_district, setId_district] = useState();
  const handleDistrict = (event) => {
    setId_district(event.target.value);
  };

  useEffect(() => {
    axios
      .get(baseUrl + provinceUrl)
      .then((res) => {
        // handle success
        // console.log("ini data province", res.data);
        setProvince(res.data);
      })
      .catch(function (err) {
        // handle error
        console.log(err);
      });
  });

  useEffect(() => {
    axios
      .get(baseUrl + cityUrl + id_prov + ".json")
      .then((res) => {
        // console.log("res data city", res.data);
        setCity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id_prov]);

  useEffect(() => {
    axios
      .get(baseUrl + districtUrl + id_city + ".json")
      .then((res) => {
        // console.log("ini data kec", res.data);
        setDistrict(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id_city]);

  return (
    <div className="mt-5 w-50 mx-auto bg-danger-subtle">
      <div>
        <h2 className="text-center mb-5">Select Your Region</h2>
      </div>
      <label className="text-center fw-bold">Province :</label>
      <select
        className="form-select mb-5"
        aria-label="Default select example"
        onChange={handleProv}
      >
        <option value="" hidden>
          --Select Province--
        </option>
        {province.map((items: Provinces) => (
          <option key={items.id} value={items.id} label={items.name}>
            {items.name}
          </option>
        ))}
      </select>

      <label className="text-center fw-bold">City :</label>
      <select
        className="form-select mb-5"
        aria-label="Default select example"
        onChange={handleCity}
      >
        <option value="" hidden>
          --Select City--
        </option>
        {city.map((items: Cities) => (
          <option key={items.id} value={items.id} label={items.name}>
            {items.name}
          </option>
        ))}
      </select>

      <label className="text-center fw-bold">District :</label>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={handleDistrict}
      >
        <option value="" hidden>
          --Select District--
        </option>
        {district.map((items: District) => (
          <option key={items.id} value={items.id} label={items.name}>
            {items.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SingleApp;
