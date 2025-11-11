import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./assets/css/quanlysp.css"; 

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isCreating = id === "new";

  const initialProductState = {
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating_rate: 0,
    rating_count: 0,
  };

  const [product, setProduct] = useState(initialProductState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true); 
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("product_id", id)
        .single();

      if (error) {
        console.error("Lỗi khi tải sản phẩm:", error.message);
        navigate("/admin/products");
      } else {
        setProduct(data);
      }
      setIsLoading(false);
    };

    if (isCreating) {
      setProduct(initialProductState);
    } else if (id) {
      fetchProduct();
    }
  }, [id, isCreating, navigate]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: (name === 'price' || name === 'rating_rate' || name === 'rating_count')
              ? parseFloat(value) || 0 
              : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let error;

    try {
      if (isCreating) {
        const { product_id, ...insertData } = product; 
        const { error: insertError } = await supabase
          .from("products")
          .insert([insertData]);
        error = insertError;
      } else {
        const { product_id, ...updateData } = product;
        const { error: updateError } = await supabase
          .from("products")
          .update(updateData)
          .eq("product_id", id);
        error = updateError;
      }

      if (error) throw error; 

      alert(isCreating ? "Thêm sản phẩm thành công!" : "Cập nhật thành công!");
      navigate("/admin/products"); 

    } catch (err) {
      alert("Đã xảy ra lỗi: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !isCreating) {
    return <div className="container"><h2>Đang tải dữ liệu...</h2></div>;
  }

  // JSX (Form)
  return (
    <div className="container">
      <h2>{isCreating ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}</h2>
      
      <form onSubmit={handleSubmit} className="form">
        <label>
          Tên sản phẩm (Title):
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
            // Dấu '}' bị thừa đã được XÓA ở đây
          />
        </label>

        <label>
          Giá (Price):
          <input
            type="number"
            name="price"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mô tả (Description):
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="5"
            style={{ fontFamily: 'Arial', fontSize: '14px', padding: '8px' }}
          />
        </label>

        <label>
          Danh mục (Category):
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </label>

        <label>
          Link hình ảnh (Image URL):
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
          {product.image && (
            <img 
              src={product.image} 
              alt="Preview" 
              className="thumb" 
              style={{ marginTop: '10px', maxWidth: '100px' }} 
            />
          )}
        </label>
        
        <div className="actions">
          <button
            type="button"
            className="btn gray"
            onClick={() => navigate("/admin/products")}
            disabled={isLoading}
          >
            Hủy
          </button>
          <button type="submit" className="btn green" disabled={isLoading}>
            {isLoading ? "Đang lưu..." : "Lưu lại"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;