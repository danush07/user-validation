import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { editUser,getSingleUser, reset } from "../features/userSlice";
import Select from "react-select";
import { Country, State,City } from "country-state-city";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function EditUserCanvas({ onClose, userId }) {
  const { isError, message } = useSelector((state) => state.persist);
  const dispatch = useDispatch();
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [mobile, setMobile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
   const [state, setState] = useState([]);
   const [selectedStates, setSelectedStates] = useState([]);
  const [zipcode, setZipcode] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [firstnameError, setfirstNameError] = useState("");
  const [lastnameError, setlastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [address1Error, setAddress1Error] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [stateError, setStateError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [zipcodeError, setZipcodeError] = useState("");
  const [cityError, setCityError] = useState("");
    

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isError, message]);

    useEffect(() => {
      dispatch(getSingleUser(userId));
    }, [userId, dispatch]);
  

  useEffect(() => {
    const fetchCountries = () => {
      const countriesData = Country.getAllCountries();
      const formattedCountries = countriesData.map((country) => ({
        label: country.name,
        value: country.isoCode,
      }));
      setCountries(formattedCountries);
    };

    fetchCountries();
  }, []);
  useEffect(() => {
    const fetchStates = () => {
      if (selectedCountry) {
        const statesData = State.getStatesOfCountry(selectedCountry.value);
        const formattedStates = statesData.map((state) => ({
          label: state.name,
          value: state.isoCode,
        }));
        setState(formattedStates);
      }
    };

    fetchStates();
  }, [selectedCountry]);
     useEffect(() => {
       if (selectedCountry && selectedStates.length > 0) {
         const allCities = selectedStates.reduce((acc, state) => {
           const citiesData = City.getCitiesOfState(
             selectedCountry.value,
             state.value
           );
           const formattedCities = citiesData.map((city) => ({
             label: city.name,
             value: city.name,
           }));
           return [...acc, ...formattedCities];
         }, []);
         setCities(allCities);
       }
     }, [selectedCountry, selectedStates]);

const handleCountryChange = (selectedOption) => {
  setSelectedCountry(selectedOption);
  setSelectedStates([]);
  setSelectedCity([]); 
};

const handleStateChange = (selectedOptions) => {
  setSelectedStates(selectedOptions || []);
  setSelectedCity([]); 
};
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const validateInput = (field, value) => {
    if (field === "firstname") {
      setfirstNameError(
        value === null || value.trim().length >= 5
          ? ""
          : "First Name must be at least 5 characters long"
      );
    } else if (field === "lastname") {
      setlastNameError(
        value === null || value.trim().length >= 5
          ? ""
          : "Last Name must be at least 5 characters long"
      );
    } else if (field === "email") {
      setEmailError(value.trim() === "" ? "Email is required" : "");
    } else if (field === "address1") {
      setAddress1Error(value.trim() === "" ? "Address is required" : "");
    } else if (field === "mobile") {
      setMobileError(
        value === null || isNaN(value) ? "Mobile number is required" : ""
      );
    } else if (field === "zipcode") {
      setZipcodeError(
        value === null || isNaN(value) ? "Zipcode is required" : ""
      );
    } else if (field === "country") {
     setCountryError(value ? "" : "Country is required");
   } else if (field === "state") {
     setStateError(value ? "" : "State is required");
   } else if (field === "city") {
     setCityError(value ? "" : "City is required");
   }
  };
// 
  const handleZipCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setZipcode(value);
  };
  const SingleUser = useSelector((state) => state.persist.singleUser);
  
useEffect(() => {
  if (SingleUser) {
    setfirstName(SingleUser.firstname || "");
    setlastName(SingleUser.lastname || "");
    setEmail(SingleUser.email || "");
    setAddress1(SingleUser.address1 || "");
    setAddress2(SingleUser.address2 || "");
    setMobile(SingleUser.mobile ? String(SingleUser.mobile) : "");
    setZipcode(SingleUser.zipcode || "");
  }
}, [SingleUser, countries, state, cities]);


// 
  const handleUserUpdate = (e) => {
    e.preventDefault();
      validateInput("firstname", firstname);
      validateInput("lastname", lastname);
      validateInput("email", email);
      validateInput("mobile", mobile);
      validateInput("address1", address1);
      validateInput("country", selectedCountry);
      validateInput("state", selectedStates);
      validateInput("city", selectedCity);
      validateInput("zipcode", zipcode);
    const userDetails = {
      userId,
      firstname,
      lastname,
      mobile,
      address1,
      address2,
      state: selectedStates,
      city:selectedCity,
      country: selectedCountry,
      zipcode,
      email,
    };
    if (!firstnameError && !lastnameError && !mobileError && !address1Error && !stateError && !cityError && !countryError) { 

      dispatch(editUser(userDetails));
      dispatch(getSingleUser(userId));
      onClose()
      toast.success('User Details Updated !')
    }

  };
  return (
    <div className="text-black">
      <div
        id="drawer-form"
        className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform ease-in-out  w-2/3 dark:bg-gray-800"
        tabIndex="-1"
        aria-labelledby="drawer-form-label"
      >
        <h5
          id="drawer-label"
          class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Edit User
        </h5>
        <button
          onClick={onClose}
          type="button"
          data-drawer-hide="drawer-form"
          aria-controls="drawer-form"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close menu</span>
        </button>
        <form className="mb-2 grid grid-cols-2 gap-4">
          <div class="mb-2">
            <label class="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
              First name <span className="text-red-500 ml-2">*</span>
            </label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setfirstName(e.target.value)}
              onBlur={() => validateInput("firstname", firstname)}
              onFocus={() => setfirstNameError("")}
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter the First Name"
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                color: "#333",
                padding: "10px",
              }}
            />
            <span className="text-red-500 flex">{firstnameError}</span>
          </div>

          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Last Name <span className="text-red-500 ml-2">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              value={lastname}
              onChange={(e) => setlastName(e.target.value)}
              onBlur={() => validateInput("lastname", lastname)}
              onFocus={() => setlastNameError("")}
              placeholder="Enter the Last Name"
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                color: "#333",
                padding: "10px",
              }}
            />
            <span className="text-red-500 flex">{lastnameError}</span>
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email <span className="text-red-500 ml-2">*</span>
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateInput("email", email)}
              onFocus={() => setEmailError("")}
              id="email"
              class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter the Email Address"
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                color: "#333",
                padding: "10px",
              }}
            />
            <span className="text-red-500 flex">{emailError}</span>
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mobile <span className="text-red-500 ml-2">*</span>
            </label>
            <PhoneInput
              value={mobile}
              onChange={setMobile}
              onBlur={() => validateInput("mobile", mobile)}
              onFocus={() => setMobileError("")}
              id="mobile"
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                color: "#333",
                padding: "10px",
              }}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <span className="text-red-500 flex">{mobileError}</span>
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Address 1 <span className="text-red-500 ml-2">*</span>
            </label>
            <textarea
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              onBlur={() => validateInput("address1", address1)}
              onFocus={() => setAddress1Error("")}
              id="address1"
              rows="2"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter the Address..."
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                color: "#333",
                padding: "10px",
              }}
            ></textarea>
            <span className="text-red-500 flex">{address1Error}</span>
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Address 2
            </label>
            <textarea
              id="address2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              rows="2"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Add Additional Address..."
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                color: "#333",
                padding: "10px",
              }}
            ></textarea>
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Country <span className="text-red-500 ml-2">*</span>
            </label>
            <Select
              className=""
              options={countries}
              value={selectedCountry}
              onChange={handleCountryChange}
              onBlur={() => validateInput("country", selectedCountry)}
              onFocus={() => setCountryError("")}
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                color: "#333",
                padding: "10px",
              }}
            />
            <span className="text-red-500 flex">{countryError}</span>
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              State <span className="text-red-500 ml-2">*</span>
            </label>
            <Select
              options={state}
              isMulti
              placeholder="Select state"
              value={selectedStates}
              onChange={handleStateChange}
              onBlur={() => validateInput("state", selectedStates)}
              onFocus={() => setStateError("")}
            />
            <span className="text-red-500 flex">{stateError}</span>
          </div>
          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              City <span className="text-red-500 ml-2">*</span>
            </label>
            <Select
              options={cities}
              isMulti
              placeholder="Select City"
              value={selectedCity}
              onChange={handleCityChange}
              onBlur={() => validateInput("city", selectedCity)}
              onFocus={() => setCityError("")}
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                color: "#333",
                padding: "10px",
              }}
            />
            <span className="text-red-500 flex">{cityError}</span>
          </div>

          <div class="mb-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Zip-Code <span className="text-red-500 ml-2">*</span>
            </label>
            <input
              value={zipcode}
              type="text"
              onChange={handleZipCodeChange}
              onBlur={() => validateInput("zipcode", zipcode)}
              onFocus={() => setCountryError("")}
              id="zipcode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter the Zip-Code"
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                color: "#333",
                padding: "10px",
              }}
            />
            <span className="text-red-500 flex">{zipcodeError}</span>
          </div>
        </form>
        <button
          type="click"
          onClick={(e) => handleUserUpdate(e)}
          class="text-white justify-center flex items-center bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Update User
        </button>
      </div>
    </div>
  );
}

export default EditUserCanvas;
