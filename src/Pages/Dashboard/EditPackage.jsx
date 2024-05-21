import React from 'react'
import { Form, Button, Input } from "antd"
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate} from "react-router-dom"
import BackButton from './BackButton';
import Swal from 'sweetalert2';
const EditPackage = () => {
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem("package"))
    console.log(data);


    const initialFormValues = {
        package_name: data?.name,
        package_price: data?.price,
        package_validity: data?.validity,
        products_count: data?.products_count,
        features: data?.features,
    };
    const handleUpdate=(values)=>{
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Updated Successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }
    const handleRest=(values)=>{
        window.location.reload();
    }
    return (
        <div>
            <div style={{margin: "0 0 23px 0"}}>
                <BackButton link="/package" />
            </div>
            <div 
                style={{
                    width: "100%",
                    background: "white",
                    padding: "25px 0 0 0",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <div 
                    style={{
                        width: "507px",
                    }}
                >
                    <Form
                        name="update-package"
                        initialValues={initialFormValues} 
                        onFinish={handleUpdate}
                    >   
                        
                        <div style={{width: "100%"}}>
                            <Form.Item  
                                name="package_name"
                                style={{marginBottom: "21px"}}
                            >
                                <Input
                                    size="large"
                                    style={{
                                        border: "none",
                                        color: "#D1D2D6",
                                        outline: "none",
                                        padding: 0,
                                        backgroundColor: "transparent",
                                    }}
                                    readOnly
                                />
                            </Form.Item>
                        </div> 


                        <div style={{width: "100%"}}>
                            <label htmlFor="" style={{display: "block", color: "#6A6D7C", marginBottom: "10px"}}>Packeage For</label>
                            <Form.Item 
                                name="package_price"
                                style={{marginBottom: "24px"}}
                            >  
                                <Input
                                    size="large"
                                    style={{
                                        width: "100%",
                                        height: "52px",
                                        border: "1px solid #EAEAEA",
                                        borderRadius: "8px",
                                        padding : "16px",
                                        color: "#D1D2D6",
                                        outline: "none",
                                        backgroundColor: "white",
                                    }}
                                />
                            </Form.Item>
                        </div>

                        <div style={{width: "100%"}}>
                            <label htmlFor="" style={{display: "block", color: "#6A6D7C", marginBottom: "10px"}}>Packeage Validity</label>
                            <Form.Item
                                name="package_validity"
                                style={{marginBottom: "24px"}}
                            >
                                <Input
                                    style={{
                                        width: "100%",
                                        height: "52px",
                                        border: "1px solid #EAEAEA",
                                        borderRadius: "8px",
                                        padding : "16px",
                                        color: "#D1D2D6",
                                        outline: "none",
                                        backgroundColor: "white",
                                    }}
                                />
                            </Form.Item>
                        </div>
                        
                        <div style={{width: "100%"}}>
                            <label htmlFor="" style={{display: "block", color: "#6A6D7C", marginBottom: "10px"}}>How many products seller add</label>
                            <Form.Item 
                                name="products_count"
                                style={{marginBottom: "24px"}}
                            >  
                                <Input
                                    size="large"
                                    style={{
                                        width: "100%",
                                        height: "52px",
                                        border: "1px solid #EAEAEA",
                                        borderRadius: "8px",
                                        padding : "16px",
                                        color: "#D1D2D6",
                                        outline: "none",
                                        backgroundColor: "white",
                                    }}
                                    type='number'
                                />
                            </Form.Item>
                        </div>
                        
                        <label htmlFor="" style={{display: "block", color: "#6A6D7C", marginBottom: "10px"}}>Feature</label>
                        <div className="grid grid-cols-1 gap-[21px]">
                            <Form.List name="features">
                                {
                                    (fields, { add, remove }) => (
                                        <>
                                            {
                                                fields.map((field, index) => (
                                                    <Form.Item
                                                        required={false}
                                                        key={field.key}
                                                        initialValue={initialFormValues?.features[index]?.feature}
                                                        className="w-full"
                                                    >
                                                        <Form.Item
                                                            {...field}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            style={{marginBottom : 0}}
                                                            className='w-full'
                                                        >
                                                            <Input
                                                                style={{
                                                                    width: "100%",
                                                                    height: "52px",
                                                                    border: "1px solid #EAEAEA",
                                                                    borderRadius: "8px",
                                                                    padding : "16px",
                                                                    color: "#D1D2D6",
                                                                    outline: "none",
                                                                    backgroundColor: "white",
                                                                }}
                                                                readOnly
                                                            />
                                                        </Form.Item>          
                                                    </Form.Item>
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </Form.List>   
                        </div> 

                        <div>
                            <div style={{width: "100%", display: "flex", gap: "16px", alignItems: "center"}}>
                                <div style={{width: "100%"}}>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            block
                                            style={{
                                                border: "none",
                                                height: "51px",
                                                background: "#2FD5C7",
                                                color: "white",
                                                borderRadius: "8px",
                                                outline: "none",
                                            }}
                                        >
                                            UPDATE
                                        </Button>
                                    </Form.Item>
                                </div>

                                <div style={{width: "100%"}}>
                                    <Form.Item>
                                        <Button
                                            onClick={handleRest}
                                            block
                                            style={{
                                                border: "none",
                                                height: "51px",
                                                background: "#BFF2EE",
                                                color: "#2FD5C7",
                                                borderRadius: "8px",
                                                outline: "none",
                                            }}
                                        >
                                            RESET
                                        </Button>
                                    </Form.Item>
                                </div>

                            </div>
                        </div>

                    </Form>  
                </div>
            </div>
        </div>
    )
}

export default EditPackage;