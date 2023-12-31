import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
    title: yup.string().required("The title is required"),
    date: yup.string().required("The date is required"),
    description: yup.string().required("The description is required"),
});

const FormField = [
    {
        name: "title",
        type: "text",
    },
    {
        name: "subtitle",
        type: "text",
    },
    {
        name: "date",
        type: "date",
    },
    {
        name: "description",
        type: "text",
    },
    {
        name: "image",
        type: "file",
    },
];


const Update = () => {
    const { id } = useParams();
    const handleSubmit = async (values) => {
        try {
            await axios.put(`http://localhost:3001/update/${id}`, values);
            console.log("Data updated successfully!");
        } catch (error) {
            console.error("Error inserting data into the database:", error);
        }
    };

    const [showimage, setShowImage] = useState("");
    const [newImage, setImage] = useState([]);

    const handleImageChange = (event) => {
        setShowImage(event.target.files[0]);
        setImage(newImage);
    };

    return (
        <div className="grid grid-cols-7">
            <Formik
                initialValues={{
                    title: "",
                    subtitle: "",
                    date: "",
                    description: "",
                    image: "",
                }}

                validationSchema={schema}          //passing schema
                onSubmit={handleSubmit}
            >

                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit} encType="multipart/form-data" className="col-start-2 col-span-3">
                            {FormField.map((val, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="grid grid-cols-6">
                                        <label htmlFor={val.name} className="capitalize font-bold col-span-1 mt-8">
                                            {val.name}
                                        </label>

                                        {val.type === "file" ? (
                                            <div className="col-start-3">
                                                <img
                                                    src={
                                                        showimage
                                                            ? URL.createObjectURL(showimage)
                                                            : ""
                                                    }
                                                    alt=""
                                                    className="mt-8"
                                                />
                                                <input                       //Input field
                                                    type={val.type}
                                                    name={val.name}
                                                    accept=".png,.jpg,.jpeg,.gif"
                                                    multiple
                                                    onChange={(e) => handleImageChange(e)}
                                                    className=""
                                                />
                                            </div>
                                        ) : (
                                            <div className="col-start-3 col-span-5 mt-8">
                                                <Field
                                                    type={val.type}
                                                    name={val.name}
                                                    autoComplete='off'
                                                    placeholder={`Enter your ${val.name}`}
                                                    className="border-2 border-gray-400 pl-2 focus:outline-none rounded-md py-1 col-span-3 w-[400px]"
                                                />
                                                <div className="h-1">
                                                    <ErrorMessage
                                                        component={"div"}
                                                        name={val.name}
                                                        className="text-red-600 text-sm pl-4"
                                                    >
                                                    </ErrorMessage>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <button type="submit" className="rounded-md bg-[#845EC2] w-96 mt-8 text-white p-2">submit</button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
};

export default Update;
