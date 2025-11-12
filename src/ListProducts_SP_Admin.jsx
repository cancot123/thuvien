import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import "./assets/css/quanlysp.css";

const ListProducts_SP_Admin = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Thêm loading
  const [error, setError] = useState(null);  // Thêm error
  const navigate = useNavigate();

  const fetchProducts = async () => {
<<<<<<< HEAD
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("product_id", { ascending: true });
    if (error) console.error("Lỗi:", error.message);
    else setProducts(data);
=======
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("product_id", { ascending: true });
      if (error) throw error;
      setProducts(data);
    } catch (err) {
      console.error("Lỗi:", err.message);
      setError("Không thể tải danh sách sản phẩm.");
    } finally {
      setIsLoading(false);
    }
>>>>>>> 54dec5420c93dd81e5ebbaa3ba9087c01f9f94dd
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
<<<<<<< HEAD


      const { error } = await supabase
        .from("products")
        .delete()
        .eq("product_id", id);
      if (error) alert("Lỗi khi xóa: " + error.message);
      else fetchProducts();
=======
      try {
        const { error } = await supabase
          .from("products")
          .delete()
          .eq("product_id", id);
        
        if (error) throw error;
        fetchProducts();  // Refresh list
      } catch (err) {
        alert("Lỗi khi xóa: " + err.message);
      }
>>>>>>> 54dec5420c93dd81e5ebbaa3ba9087c01f9f94dd
    }
  };

  if (isLoading) {
    return <div className="container"><h2>Đang tải danh sách...</h2></div>;
  }

  if (error) {
    return (
      <div className="container">
        <h2>Lỗi</h2>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={fetchProducts}>Thử lại</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="table-actions">
          <button
            className="btn green"
            onClick={() => navigate("/admin/edit/new")}
          >
            ➕ Thêm mới
          </button>
        </div>

        <div>
          <h2>Quản lý sản phẩm (Admin)</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Đánh giá</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
              {/* Kiểm tra nếu products tồn tại và là mảng */}
              {products && products.map((p) => (
                <tr key={p.product_id || Math.random()}> {/* Thêm Math.random để tránh lỗi key */}
=======
              {products && products.map((p) => (
                <tr key={p.product_id}>  {/* Sửa: Dùng p.product_id thay vì Math.random() */}
>>>>>>> 54dec5420c93dd81e5ebbaa3ba9087c01f9f94dd
                  <td style={{ width: "100px" }}>
                    <img src={p.image} alt={p.title} className="thumb" />
                  </td>
                  <td style={{ width: "500px" }}>{p.title}</td>
                  <td>{p.price}</td>
                  <td>
                    ⭐ {p.rating_rate} ({p.rating_count})
                  </td>
                  <td style={{ width: "150px" }}>
                    {/* [SỬA LỖI] Thêm 'disabled' để ngăn lỗi 'undefined' */}
                    <button
                      className="btn yellow"
                      onClick={() => navigate(`/admin/edit/${p.product_id}`)}
<<<<<<< HEAD
                      disabled={!p.product_id} // Nút Sửa sẽ bị mờ nếu không có ID
=======
                      disabled={!p.product_id} 
>>>>>>> 54dec5420c93dd81e5ebbaa3ba9087c01f9f94dd
                    >
                      Sửa
                    </button>
                    <button
                      className="btn red"
                      onClick={() => handleDelete(p.product_id)}
<<<<<<< HEAD
                      disabled={!p.product_id} // Nút Xóa sẽ bị mờ nếu không có ID
=======
                      disabled={!p.product_id} 
>>>>>>> 54dec5420c93dd81e5ebbaa3ba9087c01f9f94dd
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListProducts_SP_Admin;