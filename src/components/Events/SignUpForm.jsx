import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner, Modal, Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { Tooltip } from "bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

export default function SignUpForm() {
  const [colleges, setColleges] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isWARegistered, setIsWARegistered] = useState(true); // State for WhatsApp registration
  const [subscribe, setSubscribe] = useState(true); // State for newsletter subscription

  // State for modals
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const seattleColleges = [
    { name: "University of Washington" },
    { name: "University of Washington Tacoma" },
    { name: "University of Washington Bothell" },
    { name: "Shoreline Community College" },
    { name: "Edmonds Community College" },
    { name: "Bellevue College" },
    { name: "North Seattle College" },
    { name: "Cascadia College" },
    { name: "Northwest University" },
    { name: "Seattle University" },
    { name: "Green River College" },
    { name: "Seattle Pacific University" },
    { name: "Seattle Central College" },
    { name: "Whatcom Community College" },
  ];

  // Initialize tooltips
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  const renderCollegeListTemp = (name) => {
    if (name) {
      // Filter the seattleColleges based on the input
      const filteredColleges = seattleColleges.filter((college) =>
        college.name.toLowerCase().includes(name.toLowerCase())
      );

      if (filteredColleges.length > 0) {
        setColleges(filteredColleges);
        setShowSuggestions(true);
        setSelectedCollege(name);
      } else {
        setColleges([{ name }]);
        setShowSuggestions(true);
        setSelectedCollege(name);
      }
    } else {
      setColleges([]);
      setShowSuggestions(false);
      setSelectedCollege("");
    }
  };

  const onSubmit = async (data) => {
    // The phoneNumber is already validated by react-hook-form, no need for manual validation.
    console.log(data);
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      selectedCollege: selectedCollege,
      isWARegistered: isWARegistered, // Use state value
      subscribe: subscribe, // Use state value
      timestamp: new Date(),
    };

    try {
      setIsLoading(true); // Show loader when form is being submitted
      await addDoc(
        collection(db, "2024/stamp-quest/event-registrations-dev"),
        formData
      );
      setShowSuccessModal(true); // Show success modal
    } catch (e) {
      console.error("Error adding document: ", e);
      setShowErrorModal(true); // Show error modal
    } finally {
      setIsLoading(false); // Hide loader after submission is complete
    }
  };

  const handleSelectCollege = (collegeName) => {
    setSelectedCollege(collegeName);
    setSearchInput(collegeName);
    setShowSuggestions(false);
  };

  return (
    <div className="justify-content-center align-items-center h-100">
      <div
        style={{
          backgroundImage: `url('../images/bg_form_gradient.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          minHeight: "140vh",
        }}
      >
        <div className="flex justify-center">
          <div className="bg-light rounded-lg w-10/12 md:w-2/5 mt-28 md:mt-24 mb-24 shadow-md">
            <img
              src="../images/stamp_quest_poster.png"
              alt="stamp quest poster"
              className="mb-2 object-fill h-42 rounded-t-lg"
            />

            <div className="p-4 overflow-hidden">
              <h1 className="text-center mb-4 text-lg font-bold">
                Seattle Stamp Quest Registration
              </h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* First Name */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    <div className="flex flex-row gap-1">
                      First Name <div className="text-red-500"> *</div>
                    </div>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    autoComplete="first-name"
                    placeholder="Enter your first name"
                    className="form-control"
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                  />
                  {errors.firstName && (
                    <div className="text-danger">
                      {errors.firstName.message}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    <div className="flex flex-row gap-1">
                      Last Name <div className="text-red-500"> *</div>
                    </div>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    placeholder="Enter your last name"
                    autoComplete="last-name"
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                  />
                  {errors.lastName && (
                    <div className="text-danger">{errors.lastName.message}</div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <div className="flex flex-row gap-1">
                      Email
                      <div className="text-red-500"> *</div>
                    </div>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="form-control"
                    placeholder="Enter your email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email.message}</div>
                  )}
                </div>

                {/* University Search and Suggest */}
                <div className="mb-3">
                  <label htmlFor="selectedCollege" className="form-label">
                    University / College
                  </label>
                  <input
                    id="selectedCollege"
                    name="selectedCollege"
                    type="text"
                    className="form-control"
                    placeholder="Enter your University / College"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      renderCollegeListTemp(e.target.value);
                    }}
                  />
                  {showSuggestions && !isLoading && (
                    <ul
                      className="list-group mt-2"
                      style={{
                        maxHeight: "200px",
                        overflowY: "auto",
                        overflowX: "hidden",
                      }}
                    >
                      {colleges.map((college, index) => (
                        <li
                          key={index}
                          className="list-group-item list-group-item-action"
                          onClick={() => handleSelectCollege(college.name)}
                          style={{ cursor: "pointer" }}
                        >
                          {college.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Phone Number */}
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    <div className="flex flex-row gap-1">
                      Phone Number
                      <div className="text-red-500"> *</div>
                    </div>
                  </label>
                  <PhoneInput
                    id="phoneNumber"
                    name="phoneNumber"
                    className="form-control"
                    placeholder="Enter your phone number"
                    international
                    defaultCountry="US"
                    value={phoneNumber} // The state for the phone number
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                      validate: (value) =>
                        isValidPhoneNumber(value) || "Phone Number is invalid",
                    })}
                    onChange={(value) => {
                      setPhoneNumber(value); // Update the phoneNumber state
                      setValue("phoneNumber", value); // Update the form value for react-hook-form
                      clearErrors("phoneNumber");
                    }}
                  />
                  <small>
                    Input a <i className="fa fa-whatsapp"></i>
                    <a
                      href="https://whatsapp.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      WhatsApp
                    </a>{" "}
                    registered number for event reminders.
                  </small>
                  {errors.phoneNumber && (
                    <div className="text-danger">
                      {errors.phoneNumber.message}
                    </div>
                  )}
                </div>

                {/* Boolean Whatsapp */}
                <div className="flex flex-row gap-2">
                  <label htmlFor="isWARegistered" className="form-label">
                    Is your number registered on{" "}
                    <a
                      href="https://whatsapp.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </a>
                    ?
                  </label>
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Check if your number is WhatsApp registered"
                  >
                    <input
                      type="checkbox"
                      id="isWARegistered"
                      className="form-check-input"
                      checked={isWARegistered}
                      onChange={(e) => setIsWARegistered(e.target.checked)} // Update state
                    />
                  </div>
                </div>

                {/* Boolean Subscribe Newsletter */}
                <div className="mb-3 flex flex-row gap-2">
                  <label htmlFor="subscribe" className="form-label">
                    Subscribe to our newsletter?
                  </label>

                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Subscribe to get updates about ISAUW, and much more!"
                  >
                    <input
                      type="checkbox"
                      id="subscribe"
                      className="form-check-input"
                      checked={subscribe}
                      onChange={(e) => setSubscribe(e.target.checked)} // Update state
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-1">
                  <div className="text-red-500"> *</div>
                  <small> indicates required fields </small>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>

                {/* Success Modal */}
                <Modal
                  show={showSuccessModal}
                  onHide={() => setShowSuccessModal(false)}
                  centered
                  className="rounded-xl"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Your registration has been successfully submitted! See you
                    on Stamp Quest!
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={() => setShowSuccessModal(false)}
                    >
                      Close
                    </Button>
                    <Link to="/" className="btn btn-success">
                      Go to Home
                    </Link>
                  </Modal.Footer>
                </Modal>

                {/* Error Modal */}
                <Modal
                  show={showErrorModal}
                  onHide={() => setShowErrorModal(false)}
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    There was an error submitting your registration. Please try
                    again.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="danger"
                      onClick={() => setShowErrorModal(false)}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
