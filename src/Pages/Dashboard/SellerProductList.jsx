import React, { useEffect, useRef, useState } from 'react'
import BackButton from './BackButton'
import { CiFilter } from 'react-icons/ci'
import { Dropdown, Slider, Table, Calendar } from 'antd'
import StockDropdown from '../../Util/StockDropdown'
import { DownOutlined } from "@ant-design/icons";

const data = [
    {
      key: "1",
      image: "https://www.custommacbd.com/cdn/shop/products/iphone-14-pro-Max-deeppurple-Custom-Mac-BD_06a3babc-a8fa-4ab1-8bb1-6fa5b55e0dd9.jpg?v=1662622355",
      name: "Iphone 14 pro max",
      price: "600",
      selling: "500",
      status: "In Stock",
    },
    {
      key: "2",
      image: "https://www.clove.co.uk/cdn/shop/products/iphone-13-mini-starlight_1200x.jpg?v=1665065093",
      name: "Iphone 13 Mini",
      price: "600",
      selling: "500",
      status: "In Stock",
    },
    {
      key: "3",
      image: "https://cdn.dxomark.com/wp-content/uploads/medias/post-127929/Google-Pixel-7_featured-image-packshot-review.jpg",
      name: "Google Pixel 7",
      price: "600",
      selling: "500",
      status: "Out of Stock",
    },
    {
      key: "4",
      image: "https://www.gizchina.com/wp-content/uploads/images/2022/05/Google-Pixel-7-Pro.jpg",
      name: "Google Pixel 7 Pro",
      price: "600",
      selling: "500",
      status: "Out of Stock",
    },
    {
        key: "5",
        image: "https://www.custommacbd.com/cdn/shop/products/iphone-14-pro-Max-deeppurple-Custom-Mac-BD_06a3babc-a8fa-4ab1-8bb1-6fa5b55e0dd9.jpg?v=1662622355",
        name: "Iphone 14 pro max",
        price: "600",
        selling: "500",
        status: "In Stock",
      },
      {
        key: "6",
        image: "https://www.clove.co.uk/cdn/shop/products/iphone-13-mini-starlight_1200x.jpg?v=1665065093",
        name: "Iphone 13 Mini",
        price: "600",
        selling: "500",
        status: "Out of Stock",
    },
    {
        key: "7",
        image: "https://cdn.dxomark.com/wp-content/uploads/medias/post-127929/Google-Pixel-7_featured-image-packshot-review.jpg",
        name: "Google Pixel 7",
        price: "600",
        selling: "500",
        status: "In Stock",
    },
    {
        key: "8",
        image: "https://www.gizchina.com/wp-content/uploads/images/2022/05/Google-Pixel-7-Pro.jpg",
        name: "Google Pixel 7 Pro",
        price: "600",
        selling: "500",
        status: "In Stock",
    },
    {
        key: "9",
        image: "https://cdn.dxomark.com/wp-content/uploads/medias/post-127929/Google-Pixel-7_featured-image-packshot-review.jpg",
        name: "Google Pixel 7",
        price: "600",
        selling: "500",
        status: "In Stock",
    },
    {
        key: "10",
        image: "https://www.gizchina.com/wp-content/uploads/images/2022/05/Google-Pixel-7-Pro.jpg",
        name: "Google Pixel 7 Pro",
        price: "600",
        selling: "500",
        status: "In Stock",
    },
    {
        key: "11",
        image: "https://www.gizchina.com/wp-content/uploads/images/2022/05/Google-Pixel-7-Pro.jpg",
        name: "Google Pixel 7 Pro",
        price: "600",
        selling: "500",
        status: "In Stock",
    },
    {
        key: "12",
        image: "https://cdn.dxomark.com/wp-content/uploads/medias/post-127929/Google-Pixel-7_featured-image-packshot-review.jpg",
        name: "Google Pixel 7",
        price: "600",
        selling: "500",
        status: "In Stock",
    },
    {
        key: "13",
        image: "https://www.gizchina.com/wp-content/uploads/images/2022/05/Google-Pixel-7-Pro.jpg",
        name: "Google Pixel 7 Pro",
        price: "600",
        selling: "500",
        status: "In Stock",
    }
];
  
const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_,record) => (
        <img src={record?.image} style={{width:"40px", height: "40px"}}  alt="" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_,record) => (
        <p>${record?.price}</p>
      ),
    },
    {
      title: "Sold",
      dataIndex: "selling",
      key: "selling",
    },
    {
      title: "Stock",
      dataIndex: "status",
      key: "status",
      render: (_,record) => (
        <div style={{display: "flex", alignItems: 'center', gap: "8px"}}>
            <div 
                style={{
                    width: "10px", 
                    height: "10px", 
                    background: record.status === "In Stock" ?  "#03FB75" : "#FB0303" ,
                    borderRadius: "100%",
                }}
            ></div>
            <p>{record?.status}</p>
        </div>
      ),
    }
];
const SellerProductList = () => {
    const [value, setValue] = useState(new URLSearchParams(window.location.search).get('date') || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }));
    const [page, setPage] = useState( new URLSearchParams(window.location.search).get('page') || 1);
    const [category, setCategory] = useState(new URLSearchParams(window.location.search).get('category') || "All")
    const [stock, setStock] = useState(new URLSearchParams(window.location.search).get('stock') || "In Stock");
    const [date, setDate] = useState(false);
    const [filter, setFilter] = useState(false);
    const dropdownRef = useRef();
    
    const items = [
        {
            label: "House",
            key: "House",
        },
        {
            label: "Car",
            key: "Car",
        },
        {
            label: "Phone",
            key: "Phone",
        },
    ];

    const onClick = ({ key }) => {
        setCategory(key)
        const params = new URLSearchParams(window.location.search);
        params.set('category', key);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    const handlePageChange=(page)=>{
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.pushState(null, "", `?${params.toString()}`);
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setFilter(false);
                setDate(false)
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    
    const onSelect = (newValue) => {
        const date = newValue.format('MMM-DD-YYYY')
        setValue(date);
        const params = new URLSearchParams(window.location.search);
        params.set('date', date);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    return (
        <div >
            <div style={{marginBottom: "25px"}}>
                <BackButton link="/seller-details/1" />
            </div>
            <div  style={{
                background:"white",
                width: "100%",
                height: "80vh",
                borderRadius: "12px",
                padding: "20px"
            }}>
                <div style={{display: "flex", alignItems: "center", marginBottom: "20px", justifyContent: "space-between"}}>
                    <h1 style={{fontSize: "20px", fontWeight: 600, color: "#2F2F2F"}}>Seller Products List</h1>
                    <div style={{display: "flex", alignItems: "center", gap:"16px", position: "relative"}}>
                        <div onClick={(e)=>(e.stopPropagation(), setFilter(true))} style={{width: "38px", cursor: "pointer", height: "39px", display:"flex", alignItems:"center", justifyContent: "center", background: "#F6F6F6", borderRadius:"8px"}}>
                            <CiFilter size={24} color='#717171' />
                        </div>
                        <div onClick={(e)=>(e.stopPropagation(), setDate(true))}  style={{background: "#F6F6F6", cursor: "pointer", color:'#717171', padding: "9px", borderRadius:"8px"}}>
                            {value}
                        </div>
                        
                        {
                            filter
                            &&
                            <div 
                                ref={dropdownRef}
                                onClick={(e)=>e.stopPropagation()}
                                style={{
                                    width: "328px", 
                                    zIndex: "2", 
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
                                    borderRadius: "8px",
                                    background: "white", 
                                    height: "fit-content", 
                                    position: "absolute", 
                                    right: "0",
                                    top: "50px",
                                    padding: "16px"
                                }}
                            >
                                {/* category section */}
                                <label htmlFor="" style={{color: "#8B8B8B", display: "block", marginBottom: "4px"}}>Category</label>
                                <div
                                    style={{
                                    borderRadius: "6px",
                                    border: "1px solid #E9E9E9",
                                    display: "flex",
                                    flexDirection: 'column',
                                    color: "#8B8B8B",
                                    padding: "8px"
                                    }}
                                >
                                    <Dropdown menu={{ items, onClick}} >
                                        <p 
                                            style={{ 
                                            cursor: "pointer", 
                                            color:'#717171', 
                                            borderRadius: "4px",
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                            }} 
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            {category}
                                            <DownOutlined style={{paddingLeft: "18px"}} color='#717171' />
                                        </p>
                                    </Dropdown>
                                </div>

                                {/* {/* stock section */}
                                <label htmlFor="" style={{color: "#8B8B8B", display: "block", margin: "12px 0 4px 0"}}>Stock</label>
                                <StockDropdown stock={stock} setStock={setStock} />

                                {/* price range */}
                                <div style={{marginTop: "25px"}}>
                                    <Slider
                                    trackStyle={{
                                        background: "#2FD5C7",
                                        height: "6px"
                                    }}
                                    railStyle={{
                                        background: "#6A6D7C",
                                        height: "6px"
                                    }}
                                    handleStyle={{
                                        borderColor: "#ff0000",
                                        boxShadow: "none" 
                                    }}
                                    min={1}
                                    max={20}
                                    />
                                </div>
                            </div>
                        }

                        {
                            date
                            &&
                            <div 
                                ref={dropdownRef}
                                onClick={(e)=>e.stopPropagation()}
                                style={{
                                    width: "328px", 
                                    zIndex: "2", 
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
                                    borderRadius: "8px",
                                    background: "white", 
                                    height: "fit-content", 
                                    position: "absolute", 
                                    right: "0",
                                    top: "50px",
                                    padding: "16px"
                                }}
                            >
                                <Calendar fullscreen={false}  onSelect={onSelect}  />
                            </div>
                        }

                    </div>
                </div>


                <div style={{}}>
                    <Table 
                        columns={columns} 
                        dataSource={data} 
                        pagination={{
                            pageSize: 8,
                            defaultCurrent: parseInt(page),
                            onChange: handlePageChange
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SellerProductList